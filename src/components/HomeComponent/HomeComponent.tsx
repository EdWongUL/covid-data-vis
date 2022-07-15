import CountryComponent from 'components/CountryComponent';
import GraphComponent from 'components/GraphComponent';
import LoadingComponent from 'components/LoadingComponent';
import TimeComponent from 'components/TimeComponent';
import { useState } from 'react';
import styles from './HomeComponent.module.scss';

const tmpStart = new Date();
tmpStart.setDate(tmpStart.getDate() - 600);
const tmpEnd = new Date();
tmpEnd.setDate(tmpEnd.getDate() - 1);

const HomeComponent = () => {
	const [loading, setLoading] = useState(true);
	const [country, setCountry] = useState('Belgium');
	const [startDate, setStartDate] = useState(tmpStart);
	const [endDate, setEndDate] = useState(tmpEnd);

	return (
		<div className={styles.container}>
			<div className={styles.container}>
				<div className={styles.loadingHeader}>Covid Deaths Data</div>
				<div className={styles.graphContainer}>
					<LoadingComponent loading={loading} />
					<GraphComponent
						loading={loading}
						setLoading={setLoading}
						country={country}
						startDate={startDate}
						endDate={endDate}
					/>
				</div>
				<CountryComponent setCountry={setCountry} country={country} />
				<TimeComponent
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					startDate={startDate}
					endDate={endDate}
				/>
			</div>
		</div>
	);
};

export default HomeComponent;
