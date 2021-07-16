import React from 'react';
export interface IWrapperProps {
	width?: string | number;
	unit?: string;
	openMultiple?: boolean;
}

export interface IAccordionItem {
	id: string | number;
	label: string;
	content: React.ReactNode;
}


export interface IAccordionProps extends IWrapperProps {
	items: IAccordionItem[];
}
