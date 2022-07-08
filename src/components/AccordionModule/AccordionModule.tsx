import styles from './AccordionModule.module.scss';
import AccordionItem, { AccordionItemProps } from '../AccordionItem/AccordionItem';
import { useState } from 'react';

export type AccordionProps = {
	accordionItems: AccordionItemProps[];
};

const AccordionModule: React.ComponentType<AccordionProps> = ({ accordionItems }) => {
	const [openIdx, setOpenIdx] = useState(-1); // -1 (default) = no items open
	const onlyOneOpen = true;
	// setting for dev- if we only want at most 1 item to be expanded at anytime.

	return (
		<div className={styles.container}>
			{accordionItems.map((item, idx) => (
				<AccordionItem
					{...item}
					openIdx={openIdx}
					setOpenIdx={setOpenIdx}
					onlyOneOpen={onlyOneOpen}
					key={idx}
					idx={idx}
				/>
			))}
		</div>
	);
};
export default AccordionModule;
