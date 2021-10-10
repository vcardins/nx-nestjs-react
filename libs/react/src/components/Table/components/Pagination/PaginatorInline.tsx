import React from 'react';
import styled, { css } from 'styled-components';

import { DOTS, IPaginatorProps } from './types';

const PaginationContainer = styled.ul`
	display: flex;
	list-style-type: none;
`;

const PaginationItem = styled.li<{ disabled?: boolean; selected?: boolean; dots?: boolean }>`
	padding: 0 0.5em;
	height: 2em;
	width: 2em;
	margin: auto 0.25em;
	color: rgba(0, 0, 0, 0.87);
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	letter-spacing: 0.01071em;
	border-radius: 2px;
	font-size: 12px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
		cursor: pointer;
    }

	${({ dots }) => dots && css`
		&:hover {
			background-color: transparent;
			cursor: default;
		}
	`}

	${({ selected }) => selected && css`
		background-color: rgba(0, 0, 0, 0.08);
	`}

	${({ disabled }) => disabled && css`
		pointer-events: none;

		[data-arrow]::before {
			border-right: 0.12em solid rgba(0, 0, 0, 0.43);
			border-top: 0.12em solid rgba(0, 0, 0, 0.43);
		}

		&:hover {
			background-color: transparent;
			cursor: default;
		}
	`}

	[data-arrow]::before {
		position: relative;
		/* top: 3pt; Uncomment this to lower the icons as requested in comments*/
		content: '';
		/* By using an em scale, the arrows will size with the font */
		display: inline-block;
		width: 0.4em;
		height: 0.4em;
		border-right: 0.12em solid rgba(0, 0, 0, 0.87);
		border-top: 0.12em solid rgba(0, 0, 0, 0.87);
	}

	[data-arrow="left"] {
		transform: rotate(-135deg) translate(-50%);
	}

	[data-arrow="right"] {
		transform: rotate(45deg);
	}
`;

export function PaginatorInline (props: IPaginatorProps): React.ReactElement<any> {
	const { currentPage, lastPage, paginationRange, onGoToPage, onGoPrevious, onGoNext } = props;

	return (
		<PaginationContainer>
			<PaginationItem disabled={currentPage === 1} onClick={onGoPrevious}>
				<div data-arrow="left" />
			</PaginationItem>

			{paginationRange.map((pageNumber, index) => {
				const key = `page-${index}`;

				if (pageNumber === DOTS) {
					return <PaginationItem key={key} dots={true}>&#8230;</PaginationItem>;
				}

				return (
					<PaginationItem
						key={key}
						selected={pageNumber === currentPage}
						onClick={() => onGoToPage(pageNumber)}
					>
						{pageNumber}
					</PaginationItem>
				);
			})}
			<PaginationItem disabled={currentPage === lastPage} onClick={onGoNext}>
				<div data-arrow="right" />
			</PaginationItem>
		</PaginationContainer>
	);
}
