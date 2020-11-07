import React from 'react';
import { CSSObject } from 'styled-components';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	bgColor?: CSSObject;
	hoverBgColor?: CSSObject;
	onClick?: (e: React.MouseEvent) => void;
}
