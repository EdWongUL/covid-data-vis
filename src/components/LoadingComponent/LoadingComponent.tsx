import styles from './LoadingComponent.module.scss';
import React from 'react';

export type LoadingProps = {
	loading: boolean;
};

const LoadingComponent: React.ComponentType<LoadingProps> = ({ loading }) => (
	<div className={styles.loadingContainer}>
		{loading ? <div className={styles.loadingHeader}> Fetching data... </div> : <></>}
	</div>
);
export default LoadingComponent;
