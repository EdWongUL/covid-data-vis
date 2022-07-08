import ExampleModule from 'components/ExampleModule';
import HeroModule from 'components/HeroModule';
import HeroCarouselModule from 'components/HeroCarouselModule';
import IconGrid from 'components/IconGrid';
import ContactModule from 'components/ContactModule';
import InfoTabs from 'components/InfoTabs';
import NewsletterSignup from 'components/NewsletterSignup';
import GridModuleVariation1 from 'components/GridModuleVariation1';
import GridModuleVariation2 from 'components/GridModuleVariation2';
import { Module } from 'types/page';
import CarouselModule from 'components/CarouselModule';
import CardModule from 'components/CardModule';
import TextModule from 'components/TextModule';
import CTA from 'components/CTA';
import BlogCarousel from 'components/BlogCarousel';
import AccordionModule from 'components/AccordionModule';

type PageModulesProps = {
	modules: Module[];
};

const modulesMap: Record<string, unknown> = {
	'modules.example': ExampleModule,
	'modules.icon-grid': IconGrid,
	'modules.info-tabs': InfoTabs,
	'modules.contact': ContactModule,
	'modules.hero-module': HeroModule,
	'modules.hero-carousel-module': HeroCarouselModule,
	'modules.card': CardModule,
	'modules.card-carousel': CarouselModule,
	'modules.text': TextModule,
	'modules.cta': CTA,
	'modules.newsletter-signup': NewsletterSignup,
	'modules.grid-module-variation-1': GridModuleVariation1,
	'modules.grid-module-variation-2': GridModuleVariation2,
	'modules.blog-carousel': BlogCarousel,
	'modules.accordion': AccordionModule,
};

const PageModules: React.ComponentType<PageModulesProps> = ({ modules }) => (
	<>
		{modules.map((mod) => {
			const Component = modulesMap[mod.__component] as React.ComponentType;
			return <Component key={`${mod.__component}_${mod.id}`} {...mod} />;
		})}
	</>
);
export default PageModules;
