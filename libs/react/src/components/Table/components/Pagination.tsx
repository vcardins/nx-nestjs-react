// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React from 'react';
import styled, { css } from 'styled-components';

import { usePagination, IUsePaginationProps, DOTS } from '../hooks/usePagination';

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
	border-radius: 50%;
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

export interface IPaginationProps extends IUsePaginationProps {
	onPageChange: (page: number) => void;
}

export const Pagination = (props: IPaginationProps) => {
	const { onPageChange, currentPage } = props;

	const paginationRange = usePagination(props);

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => onPageChange(currentPage + 1);

	const onPrevious = () => onPageChange(currentPage - 1);

	const lastPage = paginationRange[paginationRange.length - 1];

	return (
		<PaginationContainer>
			<PaginationItem disabled={currentPage === 1} onClick={onPrevious}>
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
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</PaginationItem>
				);
			})}
			<PaginationItem disabled={currentPage === lastPage} onClick={onNext}>
				<div data-arrow="right" />
			</PaginationItem>
		</PaginationContainer>
	);
};
