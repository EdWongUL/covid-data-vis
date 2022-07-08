import Circle from './Circle';
import Square from './Square';
import Hexagon from './Hexagon';

const ICON_MAP: { [key: string]: React.ComponentType } = Object.freeze({
	Circle: Circle,
	Square: Square,
	Hexagon: Hexagon,
});

export default ICON_MAP;
