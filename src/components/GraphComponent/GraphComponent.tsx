/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import styles from './GraphComponent.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Papa from 'papaparse';
import { format, nextDay, differenceInDays } from 'date-fns';
import * as d3 from 'd3';

export type GraphProps = {
	setLoading: Dispatch<SetStateAction<boolean>>;
};

// deaths only
const GraphComponent: React.ComponentType<GraphProps> = ({ setLoading }) => {
	const country = 'Belgium';
	const [resultSVG, setResultSVG] = useState<string>('');

	// triggers once at the start
	useEffect(() => {
		const getData = async () => {
			const resultsArray: { date: Date; value: number }[] = [];
			const start = new Date(2022, 4, 22);
			const now = new Date();
			console.log(start);
			console.log(now);
			let min = Infinity;
			let max = -Infinity;

			const diff = differenceInDays(now, start) + 1;

			// TODO await these bois
			// await Promise.all();
			for (let idx = 1; idx < diff; idx++) {
				const date = format(nextDay(start, idx as Day), 'MM-dd-yyyy');
				const fullURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`;
				const res1 = await fetch(fullURL);
				if (res1.status !== 404) {
					const res2 = await res1.text();
					const parsedCSV = Papa.parse(res2)['data'];
					const parsed = parsedCSV as string[][];
					const result = parsed.reduce((prev, curr) => {
						if (curr[3] === country) {
							return prev + Number(curr[8]);
						} else {
							return prev;
						}
					}, 0);
					if (result < min) min = result;
					if (result > max) max = result;
					resultsArray.push({ date: nextDay(start, idx as Day), value: result });
				} else {
					console.log(`got 404 from link: ${fullURL}`);
				}
			}
			const scaleX = d3.scaleLinear().domain([start, now]).range([0, 1000]);
			const scaleY = d3.scaleLinear().domain([min, max]).range([0, 500]);

			const p = d3
				.line<{ date: Date; value: number }>()
				.x((d) => scaleX(d.date))
				.y((d) => scaleY(d.value));
			setResultSVG(p(resultsArray) as string);
			setLoading(false);
			console.log(resultsArray);
		};

		getData();
	}, []);

	return (
		<div className={styles.container}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={styles.svg}
				viewBox={`0 0 1000 500`}
				width={1000}
				height={500}
			>
				<g className={styles.group}>
					<path d={resultSVG} stroke="green" fill="none" />
				</g>
			</svg>
		</div>
	);
};

export default GraphComponent;
