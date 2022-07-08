import styles from './ExampleModule.module.scss';

type ExampleModuleProps = {
	header: string;
	body: string;
};

const ExampleModule: React.ComponentType<ExampleModuleProps> = ({ header, body }) => (
	<div className={styles.container}>
		<h2 className={styles.header}>{header}</h2>
		<p className={styles.body}>{body}</p>
	</div>
);

export default ExampleModule;
