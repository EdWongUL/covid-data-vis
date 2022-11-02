import styles from './TimeComponent.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export type TimeProps = {
	startDate: Date;
	endDate: Date;
	setStartDate: Dispatch<SetStateAction<Date>>;
	setEndDate: Dispatch<SetStateAction<Date>>;
};

const tmpMax = new Date();
tmpMax.setDate(tmpMax.getDate() - 1);

const TimeComponent: React.ComponentType<TimeProps> = ({
	setStartDate,
	setEndDate,
	startDate,
	endDate,
}) => {
	const [state, setState] = useState<Range[]>([
		{
			startDate: startDate,
			endDate: endDate,
			key: 'selection',
		},
	]);

	return (
		<div className={styles.container}>
			Select Date Range:
			<DateRangePicker
				onChange={(item) => {
					if (item.selection.startDate !== undefined) {
						setStartDate(item.selection.startDate);
					}
					if (item.selection.endDate !== undefined) {
						setEndDate(item.selection.endDate);
					}
					if (
						item.selection.startDate !== undefined &&
						item.selection.endDate !== undefined
					) {
						setState([
							{
								startDate: item.selection.startDate,
								endDate: item.selection.endDate,
								key: 'selection',
							},
						]);
					}
				}}
				months={1}
				minDate={new Date(2020, 1, 1)}
				maxDate={tmpMax}
				direction="vertical"
				scroll={{ enabled: true }}
				ranges={state}
			/>
		</div>
	);
};

export default TimeComponent;
