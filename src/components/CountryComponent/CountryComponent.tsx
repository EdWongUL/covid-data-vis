import styles from './CountryComponent.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';

export type CountryProps = {
	setCountry: Dispatch<SetStateAction<string>>;
	country: string;
};

const CountryComponent: React.ComponentType<CountryProps> = ({ setCountry, country }) => {
	const [countries, setCountries] = useState<{ value: string; label: string }[]>();

	useEffect(() => {
		const getCountries = async () => {
			const fullURL = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/01-01-2021.csv`;
			const result = await fetch(fullURL);
			if (result.status !== 404) {
				const el = await result.text();
				if (el !== undefined) {
					const parsedCSV = Papa.parse(el)['data'];
					const parsed = parsedCSV as string[][];
					const countriesArray: string[] = [];
					for (let idx = 1; idx < parsed.length; idx++) {
						const { 3: currCountry } = parsed[idx];
						if (countriesArray.indexOf(currCountry) === -1) {
							countriesArray.push(parsed[idx][3]);
						}
					}
					const options = countriesArray.map((country) => ({
						value: country,
						label: country,
					}));
					setCountries(options);
				}
			}
		};

		getCountries();
	}, []);

	return (
		<div className={styles.container}>
			Select Country:
			<Select
				options={countries}
				onChange={(e) => {
					if (e !== null) {
						setCountry(e.value);
					}
				}}
				placeholder={country}
			/>
		</div>
	);
};

export default CountryComponent;
