import React from 'react';
import { CSSProperties } from 'styled-components';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	bgColor?: CSSProperties['color'];
	hoverBgColor?: CSSProperties['color'];
	role?: 'primary' | 'secondary';
	onClick?: (e: React.MouseEvent) => void;
}
