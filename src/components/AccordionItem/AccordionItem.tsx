import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './AccordionItem.module.scss';
import { useOnWindowResize } from 'rooks';

export type AccordionItemProps = {
	header: string;
	body: string;
	openIdx: number;
	setOpenIdx: Dispatch<SetStateAction<number>>;
	idx: number;
	onlyOneOpen: boolean;
};

const AccordionItem: React.ComponentType<AccordionItemProps> = ({
	header,
	body,
	openIdx,
	setOpenIdx,
	idx,
	onlyOneOpen,
}) => {
	const [currentOpen, setCurrentOpen] = useState(false); // only used for !onlyOneOpen
	const [currentClicked, setCurrentClicked] = useState(false); // only used for !onlyOneOpen
	const [divHeight, setDivHeight] = useState<string | number>(0);
	const ref = useRef<HTMLInputElement>(null);

	// listener for window resizing
	useOnWindowResize(() => {
		if (ref.current?.getBoundingClientRect().height) {
			const open = divHeight > 0; // keep open items open
			setDivHeight('auto');
			if (open) {
				setDivHeight(ref.current?.getBoundingClientRect().height);
			} else {
				setDivHeight(0);
			}
		}
	});

	useEffect(() => {
		// We must set div height to auto each time this is called as it gets the most
		// recent height. Otherwise, the height returned can sometimes not be correct
		// and there's not enough space for the text.
		if (ref.current?.getBoundingClientRect().height) {
			if (onlyOneOpen) {
				// if we only want 1 open, then we set the divheight to 0, unless it's the one that's been clicked
				setDivHeight('auto');
				if (openIdx !== idx) {
					setDivHeight(0);
				} else {
					setDivHeight(ref.current?.getBoundingClientRect().height);
				}
			} else {
				// If we want multiple open AND the current one has been clicked, switch to the opposite
				if (currentClicked) {
					const oldHeight = divHeight;
					if (oldHeight > 0) {
						setDivHeight(0);
					} else {
						setDivHeight('auto');
						setDivHeight(ref.current?.getBoundingClientRect().height);
					}
				}
				setCurrentClicked(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref, openIdx]);

	return (
		<div className={styles.container}>
			<hr className={styles.line} />
			<div className={styles.headerContainer}>
				<h3 className={styles.header}>{header}</h3>
				<div
					className={
						styles[
							`arrow-${
								(onlyOneOpen && idx === openIdx) || (!onlyOneOpen && currentOpen)
									? 'open'
									: 'close'
							}`
						]
					}
					onClick={() => {
						setOpenIdx(idx === openIdx ? -1 : idx);
						setCurrentClicked(true);
						setCurrentOpen(!currentOpen);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="13.411"
						height="13.411"
						viewBox="0 0 13.411 13.411"
					>
						<path
							d="M1494.895,129.615V121.21h8.56"
							transform="translate(978.102 1155.462) rotate(-135)"
							fill="none"
							stroke="#b100ff"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1"
						/>
					</svg>
				</div>
			</div>
			<div className={styles[`bodyContainer`]} style={{ height: divHeight }}>
				<div className={styles.body} ref={ref}>
					{body}
				</div>
			</div>
		</div>
	);
};
export default AccordionItem;
