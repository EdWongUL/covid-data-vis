import styles from './ContactModule.module.scss';
import { validationSchema } from './schema';
import { Formik, Form } from 'formik';
import { InputField } from './inputField/InputField';
import { TextArea } from './TextArea/TextArea';

type ContactModuleProps = {
	title: string;
};

const ContactModule: React.ComponentType<ContactModuleProps> = ({ title }) => (
	<div className={styles.container}>
		<div className={styles.contactModule}>
			<div className={styles.headerContainer}>
				<h2 className={styles.headerText}>{title}</h2>
			</div>
			<Formik
				initialValues={{
					name: '',
					email: '',
					textField: '',
					textArea: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(fields) => {
					alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
				}}
				render={({ errors, touched }) => (
					<Form>
						<InputField
							placeholder={'name'}
							touched={touched}
							errors={errors}
							type="name"
						/>
						<InputField
							placeholder={'Email'}
							touched={touched}
							errors={errors}
							type="email"
						/>
						<InputField
							placeholder={'Favorite Colour'}
							touched={touched}
							errors={errors}
							type="textField"
						/>
						<TextArea
							placeholder="placeholder message"
							touched={touched}
							errors={errors}
							type="textArea"
						/>
						<div className={styles.btnContainer}>
							<button type="submit" className={styles.btn}>
								Send
							</button>
						</div>
					</Form>
				)}
			/>
		</div>
	</div>
);

export default ContactModule;
