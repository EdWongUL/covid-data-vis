/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import styles from './GraphComponent.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Papa from 'papaparse';
import * as d3 from 'd3';

export type GraphProps = {
	setLoading: Dispatch<SetStateAction<boolean>>;
	country: string;
	startDate: Date;
	endDate: Date;
};

// deaths only
const GraphComponent: React.ComponentType<GraphProps> = ({
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
	const [tooltipText, setTooltipText] = useState('Hover over the graph to see the value'); // tooltip text
	const diff = Math.ceil((endDate.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24)); // difference in days
	// min and max of the array of values
	const [dataMin, setDataMin] = useState(-Infinity);
	const [dataMax, setDataMax] = useState(Infinity);

	const scaleX = d3.scaleLinear().domain([startDate, endDate]).range([0, 900]); // from index of data to svg pixel
	const scaleY = d3.scaleLinear().domain([dataMin, dataMax]).range([-500, 0]); // from values in array to svg pixel values

	// triggers once at the start
	useEffect(() => {
		// get's the data and sets the minmax
		const getData = async () => {
			const totals = await Promise.all(
				new Array(diff).fill(undefined).map(async (_, idx) => {
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
				})
			);
			setData(totals);
			const valueArray = totals.map((el) => el.value);
			const min = Math.min(...valueArray);
			setDataMin(min);
			setDataMax(Math.max(...valueArray));
		};

		setLoading(true);
		getData();
	}, [country, startDate, endDate]);

	// only trigger once datamin and max have been redefined in the above
	useEffect(() => {
		// with the data got, this gets the svg path
		if (data !== undefined) {
			const p = d3
				.line<{ date: Date; value: number }>()
				.x((d) => scaleX(d.date))
				.y((d) => -scaleY(d.value)); // there's got to be a way to multiply the scale by
			// .curve(d3.curveNatural);

			setResultSVG(p(data) as string);

			setLoading(false);
			settooltipDisplay('block');
		}
	}, [dataMin, dataMax]);

	// after a mouse move, we calculate the closest x point in the data, and snap the tooltip to that place
	const handleMouseMove = (e: any) => {
		const currentPos = e.clientX - e.target.getBoundingClientRect().left;
		// from pixel value to index of date
		const scaleXPos = d3
			.scaleLinear()
			.domain([0, e.target.getBoundingClientRect().width])
			.range([0, diff])
			.clamp(true);

		if (data !== undefined) {
			// get mouseIdx
			// just use a single scale of each axis and invert
			const mouseIdx = Math.floor(scaleXPos(currentPos));
			// from datavalue to pixel value (NOT svg pixel value...)
			// pixel value -> date -> corresponding Y value
			setTooltipLeft(scaleXPos.invert(mouseIdx) - 5);
			setTooltipTop(-scaleY(data[mouseIdx].value) - 5);
			setTooltipText(
				`Date: ${data[mouseIdx].date.toLocaleDateString()}
				Deaths: ${data[mouseIdx].value}`
			);
		}
	};

	return (
		<div className={styles.container} onMouseMove={handleMouseMove}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 900 500`}
				width={'900px'}
				height={'500px'}
			>
				<path d={resultSVG} stroke="green" fill="none" />
			</svg>
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
