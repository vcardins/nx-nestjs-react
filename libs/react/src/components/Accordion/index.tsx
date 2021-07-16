import React from 'react';
import styled from 'styled-components';

import { IWrapperProps, IAccordionProps } from './types';

const Wrapper = styled.div<IWrapperProps>`
	width: ${({ width, unit }: IWrapperProps) => `${width}${typeof width === 'string' ? '' : unit}`};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
`;

const AccordionLabel = styled.label`
	display: flex;
	justify-content: space-between;
	padding: 1em;
	background: ${({ theme }) => theme.colors.primary.blue };
	color: ${({ theme }) => theme.colors.primary.white };
	font-weight: bold;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.secondary.blue };
	}

	&:after {
		content: '❯';
		width: 1em;
		height: 1em;
		text-align: center;
		transition: all .35s;
	}
`;

const AccordionContent = styled.div`
	max-height: 0;
	padding: 0 1em;
	background: white;
	transition: all .35s;
`;

const AccordionItem = styled.div`
	width: 100%;
	overflow: hidden;

	input {
		position: absolute;
		opacity: 0;
		z-index: -1;

		// :checked
		&:checked {
			+ ${AccordionLabel} {
				background: ${({ theme }) => theme.colors.secondary.blue };
				&::after {
					transform: rotate(90deg);
				}
			}
			~ ${AccordionContent} {
				max-height: 100vh;
				padding: 1em;
			}
		}
	}
`;


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
