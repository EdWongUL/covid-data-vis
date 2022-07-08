import classnames from 'classnames';

import ICON_MAP from './Icons';

import styles from './IconGrid.module.scss';

type GridItem = {
	name: string;
	description: string;
	icon: string;
};

type IconGridProps = {
	columnLimit: number;
	animationType: string;
	iconGridItems: GridItem[];
};

const IconGrid: React.ComponentType<IconGridProps> = ({
	columnLimit,
	animationType,
	iconGridItems,
}) => {
	const style = {
		gridTemplateColumns: `repeat(${columnLimit}, 1fr)`,
	};

	return (
		<div className={styles.container} style={style}>
			{iconGridItems.map((item: GridItem, i: number) => {
				const IconComponent = ICON_MAP[item.icon];

				return (
					<div
						className={classnames(styles.item, styles[animationType])}
						key={`grid-item-${i}`}
					>
						<div className={styles.icon}>
							<div className={styles.inner}>
								<IconComponent />
							</div>
						</div>
						<span className={styles.name}>{item.name}</span>
						<span className={styles.description}>{item.description}</span>
					</div>
				);
			})}
		</div>
	);
};

export default IconGrid;
