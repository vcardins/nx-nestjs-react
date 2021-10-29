export enum HorizontalPositioning {
	Left = 'left',
	Right = 'right',
	Center = 'center'
}

export enum VerticalPositioning {
	Top = 'top',
	Bottom = 'bottom',
	Middle = 'middle',
}

export enum HorizontalVerticalPositioning {
	BottomLeft = 'bottomLeft',
	TopLeft = 'topLeft',
	BottomRight = 'bottomRight',
	TopRight = 'topRight',
	BottomCenter = 'bottomCenter',
	TopCenter = 'topCenter',
}

// Typescript doesn't support enums composition or inheritance, hence we used this workaround
// https://github.com/microsoft/TypeScript/issues/17592

export type Positioning = HorizontalPositioning | VerticalPositioning | HorizontalVerticalPositioning;

export const Positioning = {
	...HorizontalPositioning,
	...VerticalPositioning,
	...HorizontalVerticalPositioning
};
