import GraphComponent from 'components/GraphComponent';
import LoadingComponent from 'components/LoadingComponent';
import { useState } from 'react';
import styles from './HomeComponent.module.scss';

const HomeComponent = () => {
	const [loading, setLoading] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.container}>
				{loading && <LoadingComponent />}
				<GraphComponent setLoading={setLoading} />
			</div>
		</div>
	);
};

export default HomeComponent;
