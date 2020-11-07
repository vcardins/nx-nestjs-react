import { LayoutStyles } from '../enums/LayoutStyles';
import { PageModes } from '../enums/PageModes';
import { ScrollOptions } from '../enums/ScrollOptions';
import { ToolbarPositions } from '../enums/ToolbarPositions';

export interface IToolbarConfig {
	display: boolean;
	style: boolean;
	position: ToolbarPositions;
}

export interface IFooterConfig {
	display: boolean;
	style: boolean;
	position: ToolbarPositions;
}

export interface INavbarConfig {
	display: boolean;
	folded: boolean;
	position: string;
}

export interface ILayoutConfig {
	scroll?: ScrollOptions;
	navbar?: INavbarConfig;
	toolbar?: IToolbarConfig;
	footer?: IFooterConfig;
	mode?: PageModes;
}
export interface ILayoutConfig {
	scroll?: ScrollOptions;
	navbar?: INavbarConfig;
	toolbar?: IToolbarConfig;
	footer?: IFooterConfig;
	mode?: PageModes;
}

export interface IPageLayout {
	style?: LayoutStyles;
	config?: ILayoutConfig;
}


// layout          : {
// 	style : 'layout1',
// 	config: {
// 		scroll : 'content',
// 		navbar : {
// 			display : true,
// 			folded  : true,
// 			position: 'left'
// 		},
// 		toolbar: {
// 			display : true,
// 			style   : 'fixed',
// 			position: 'below'
// 		},
// 		footer : {
// 			display : true,
// 			style   : 'fixed',
// 			position: 'below'
// 		},
// 		mode   : 'fullwidth'
// 	}
// }
