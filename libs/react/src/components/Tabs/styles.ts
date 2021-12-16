import styled, { css } from 'styled-components';

export const TabItemStyled = styled.li<{ selected: boolean; disabled: boolean }>`
	${({ selected, disabled }) => selected && !disabled && css`
		/* border-bottom: 2px solid red; */
		font-weight: bold;
	`}
	${({ disabled }) => !disabled && css`
		cursor: pointer;
	`}
	color: ${({ disabled }) => disabled ? 'lightgrey' : 'inherit'};
	justify-content: center;
	align-items: center;

	&:not(:last-child) {
		margin-right: 1em;
	}
`;

export const TabsStyled = styled.div`
	position: relative;
`;

export const TabsLinksContainer = styled.ul`
	list-style: none;
	display: inline-flex;
	margin-bottom: 0.25em;
`;

export const TabsContentsContainer = styled.div`
	flex: 1;
	padding: 0.5em 0;
	height: inherit;
`;

export const TabSlider = styled.div`
	position: absolute;
	left: 0;
	transition: all 500ms ease;
	border: 1px solid red;
`;
