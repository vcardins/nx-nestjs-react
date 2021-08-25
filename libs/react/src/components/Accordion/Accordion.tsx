import React from 'react';

import { Wrapper, AccordionItem, AccordionLabel, AccordionContent } from './styles';
import { IAccordionProps } from './types';

export const Accordion = ({ width = 'auto', unit = 'px', openMultiple = true, items }: IAccordionProps) => {
	const getInputProps = (id: string | number): { id: string; type: string; name?: string } => openMultiple
		? { id: `checkbox-${id}`, type: 'checkbox' }
		: { id: `radio-${id}`, type: 'radio', name: 'rd' };

	return (
		<Wrapper width={width || 'auto'} unit={unit}>
			{ items.map((item) => {
				const props = getInputProps(item.id);

				return (
					<AccordionItem key={item.id}>
						<input { ...props } />
						<AccordionLabel htmlFor={props.id}>{ item.label }</AccordionLabel>
						<AccordionContent>
							{ item.content }
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Wrapper>
	);
};
