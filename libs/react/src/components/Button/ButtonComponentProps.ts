import React from 'react';

export type ButtonComponentProps = {
	children?: React.ReactNode;
	onClick?: (e?: React.MouseEvent) => void;
	bgColor?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
