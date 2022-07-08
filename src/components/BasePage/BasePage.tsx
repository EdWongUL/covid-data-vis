import { Menu } from 'types/navigation';
// import TopNavigation from 'components/TopNavigation';
// import Footer from 'components/Footer';
// import CookieBanner from 'components/CookieBanner';

type Props = {
	topNavMenu: Menu[];
	footerMenu: Menu[];
	children: React.ReactNode;
};

const BasePage: React.FC<Props> = ({ children }) => (
	<>
		{/* <CookieBanner /> */}

		{/* TODO: Replace siteName */}
		{/* <TopNavigation menu={topNavMenu} /> */}

		{children}
		{/* <Footer menu={footerMenu} /> */}
	</>
);

export default BasePage;
