import styles from './GraphComponent.module.scss';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { setTimeout } from 'timers';

export type GraphProps = {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	country: string;
	startDate: Date;
	endDate: Date;
};

const delay = 0.2;
const animationDuration = 2;
const animationDuration2 = 1;

const draw = {
	hidden: {
		pathLength: 0,
		transition: {
			pathLength: { type: 'spring', duration: animationDuration2, bounce: 0 },
		},
	},
	visible: {
		pathLength: 1,
		transition: {
			pathLength: { delay, type: 'spring', duration: animationDuration, bounce: 0 },
		},
	},
};

// deaths only
const GraphComponent: React.ComponentType<GraphProps> = ({
	loading,
	setLoading,
	country,
	startDate,
	endDate,
}) => {
	const [resultSVG, setResultSVG] = useState<string>(''); // svg path
	const [data, setData] = useState<{ date: Date; value: number }[]>(); // data array of objects

	const [tooltipTop, setTooltipTop] = useState(0); // top position
	const [tooltipLeft, setTooltipLeft] = useState(0); // left position
	const [tooltipDisplay, settooltipDisplay] = useState('none'); // display: none or block
	const [tooltipText, setTooltipText] = useState(''); // tooltip text
	const diff = Math.ceil((endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24)); // difference in days
	// min and max of the array of values
	const [dataMin, setDataMin] = useState(-Infinity);
	const [dataMax, setDataMax] = useState(Infinity);

	const scaleX = useMemo(
		() => d3.scaleTime().domain([startDate, endDate]).range([0, 900]),
		[startDate, endDate]
	);
	const scaleY = useMemo(
		() => d3.scaleLinear().domain([dataMin, dataMax]).range([-500, 0]),
		[dataMin, dataMax]
	);

	// triggers once at the start
	useEffect(() => {
		// get's the data and sets the minmax
		const getData = async () => {
			// make the minimum time it takes for the request to be the same as animationDuration

			// const totalsTemp = await Promise.all(
			const arrayPromises = new Array(diff).fill(undefined).map(async (_, idx) => {
				const current = new Date(startDate);
				current.setDate(startDate.getDate() + idx);
				// format date
				const currentFormat = `${`0${current.getMonth() + 1}`.slice(
					-2
				)}-${`0${current.getDate()}`.slice(-2)}-${current.getFullYear()}`;
				const fullURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${currentFormat}.csv`;
				const result = await fetch(fullURL);
				if (result.status !== 404) {
					const el = await result.text();
					if (el !== undefined) {
						const parsedCSV = Papa.parse(el)['data'];
						const parsed = parsedCSV as string[][];
						const result = parsed.reduce((prev, curr) => {
							if (curr[3] === country) {
								return prev + Number(curr[8]);
							} else {
								return prev;
							}
						}, 0);
						return { date: current, value: result };
					}
				}
				return { date: current, value: 0 };
			});

			const timeout = new Promise(async (res) => {
				setTimeout(() => {
					res('timeout finished');
				}, 1000 * animationDuration2);
			});

			const totalsTemp = await Promise.all<
				[
					...Promise<{
						date: Date;
						value: number;
					}>[],
					Promise<unknown>
				]
			>([...arrayPromises, timeout]);

			const totals = totalsTemp.slice(0, -1) as { date: Date; value: number }[];
			setData(totals);
			const valueArray = totals.map((el) => el.value);
			const min = Math.min(...valueArray);
			setDataMin(min);
			setDataMax(Math.max(...valueArray));
		};

		setLoading(true);
		getData();
	}, [country, startDate, endDate, setLoading, diff]);

	// only trigger once datamin and max have been redefined in the above
	useEffect(() => {
		// with the data got, this gets the svg path
		if (data !== undefined) {
			const p = d3
				.line<{ date: Date; value: number }>()
				.x((d) => scaleX(d.date))
				.y((d) => -scaleY(d.value));

			setResultSVG(p(data) as string);
			setLoading(false);
		}
	}, [dataMin, dataMax, data, setLoading, scaleX, scaleY]);

	// after a mouse move, we calculate the closest x point in the data, and snap the tooltip to that place
	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (data !== undefined && !loading) {
			// mouse pixel coord in X direction
			const currentPos = e.clientX - e.currentTarget.getBoundingClientRect().left;
			// get the corresponding date by invertin scaleX (continuous)
			const date = new Date(scaleX.invert(currentPos));
			// for getting idx in an array of the data
			const bisectDate = d3.bisector<{ date: Date; value: number }, Date>(
				(d) => d.date
			).center;
			// get the idx in the data
			const idx = bisectDate(data, date);
			// get actual data's date (so it's discrete to the data) then scale
			// to pixel space
			setTooltipLeft(scaleX(data[idx].date) - 5);
			// need negative scaleY as coords are from the top
			setTooltipTop(-scaleY(data[idx].value) - 5);
			setTooltipText(
				`Date: ${data[idx].date.toLocaleDateString()}
				Deaths: ${data[idx].value}`
			);
		}
	};

	return (
		<div
			className={styles.container}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => settooltipDisplay('none')}
			onMouseEnter={() => {
				if (!loading) settooltipDisplay('block');
			}}
		>
			<motion.svg
				viewBox={`0 0 900 500`}
				width={'900px'}
				height={'500px'}
				initial="hidden"
				animate={!loading ? 'visible' : 'hidden'}
			>
				<motion.path
					d={resultSVG}
					stroke="lightblue"
					strokeWidth="3"
					fill="none"
					variants={draw}
				/>
			</motion.svg>

			<div
				className={styles.tooltipPoint}
				style={{ top: tooltipTop, left: tooltipLeft, display: tooltipDisplay }}
			>
				<div className={styles.tooltip}>{tooltipText}</div>
			</div>
		</div>
	);
};

export default GraphComponent;
