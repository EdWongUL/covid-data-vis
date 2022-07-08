import classNames from 'classnames';
import { useState } from 'react';

import styles from './InfoTabs.module.scss';

type InfoTabsItem = {
	name: string;
	title: string;
	description: string;
};

type InfoTabsProps = {
	infoTabsItem: InfoTabsItem[];
};

const InfoTabs: React.ComponentType<InfoTabsProps> = ({ infoTabsItem }) => {
	const [selected, setSelected] = useState(0);

	return (
		<div className={styles.container}>
			<nav className={styles.nav}>
				<ul className={styles.items}>
					{infoTabsItem.map((item: InfoTabsItem, i: number) => (
						<li
							key={`info-tabs-item-${i}`}
							className={classNames(styles.item, {
								[styles.active]: selected === i,
							})}
						>
							<button className={styles.button} onClick={() => setSelected(i)}>
								{item.name}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.content}>
				<span className={styles.title}>{infoTabsItem[selected].title}</span>
				<span className={styles.description}>{infoTabsItem[selected].description}</span>
			</div>
		</div>
	);
};

export default InfoTabs;
