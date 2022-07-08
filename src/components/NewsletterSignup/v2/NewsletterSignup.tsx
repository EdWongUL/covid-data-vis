import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import CTAButton from '../components/CTAButton';
import TextField from '../components/TextField';

import styles from './NewsletterSignup.module.scss';

interface NewsletterSignupProps {
	title: string;
	description: string;
	ctaText: string;
	theme?: string;
}

const SignupSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is a required field'),
});

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
	title,
	description,
	ctaText,
	theme,
}) => {
	const [success, setSuccess] = useState(false);

	return (
		<div className={classNames(styles.container, styles[`bg-${theme}`])}>
			<div className={styles.newsletter}>
				<h4 className={styles.newsletterTitle}>{title}</h4>
				<Formik
					initialValues={{ email: '' }}
					validationSchema={SignupSchema}
					onSubmit={async (values, { setSubmitting, setErrors }) => {
						const { email } = values;

						try {
							const response = await fetch('/api/newsletter', {
								headers: {
									'content-type': 'application/json',
								},
								body: JSON.stringify({
									email,
								}),
								method: 'POST',
							});

							const json = await response.json();

							if (json.error) {
								setErrors({
									email: json.error,
								});
							}

							if (json.ok) {
								setSuccess(true);
							}
						} catch (error) {
							setErrors({ email: 'Something went wrong' });
						} finally {
							setSubmitting(false);
						}
					}}
				>
					{({ isSubmitting, errors, values, handleChange }) => (
						<Form>
							<div className={styles.inputContainer}>
								<TextField
									errors={errors.email}
									type={'email'}
									placeholder={'email'}
									value={values.email}
									disabled={isSubmitting || success}
									onChange={handleChange}
									name={'email'}
								/>

								<CTAButton
									text={ctaText}
									disabled={isSubmitting || success}
									type={'submit'}
								/>
							</div>

							<div className={styles.invalidFeedback}>{errors.email}</div>

							{success && (
								<div className={styles.newsletterSuccess}>
									Successful Sign up to newsletter
								</div>
							)}

							<p className={styles.newsletterDescription}>{description}</p>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default NewsletterSignup;
