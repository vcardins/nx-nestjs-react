import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

import { IPaginatorProps } from './types';

const PageLink = styled.span<{ disabled: boolean }>`
	padding: 0.25em 0.5em;
	border-radius: 2px;

	${({ disabled = false }) => disabled
		? css`
			color: #bbb;
		`
		: css`
			cursor: pointer;
			:hover {
				background-color: #eee;
			}
		` };
`;

const PaginatorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const PageSelector = styled.span`
	margin: 0 0.5em;
	line-height: 2;
`;

const Select = styled.select`
	margin: 0 0.5em;
`;


export function PaginatorDropdown (props: IPaginatorProps): React.ReactElement<any> {
	const { currentPage, lastPage, onGoToPage, onGoPrevious, onGoFirst, onGoLast, onGoNext } = props;
	let pageSelector = <div>No records</div>;

	if (lastPage > 0) {
		pageSelector = (
			<>
				<PageLink disabled={currentPage === 1} onClick={onGoFirst}>|← First</PageLink>
				<PageLink disabled={currentPage <= 1} onClick={onGoPrevious}> ← Prev</PageLink>
				<PageSelector>
					<span>Page</span>
					<Select
						onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => onGoToPage(Number(value))}
					>
						{ Array.from({ length: lastPage }, (_, index) => {
							const value = index + 1;
							return (
								<option key={value} value={value} selected={currentPage === value}>{value}</option>
							);
						}) }
					</Select>
					<span>of { lastPage }</span>
				</PageSelector>
				<PageLink disabled={currentPage >= lastPage} onClick={onGoNext}>Next →</PageLink>
				<PageLink disabled={currentPage === lastPage} onClick={onGoLast}>Last →|</PageLink>
			</>
		);
	}

	return (
		<PaginatorContainer>
			{ pageSelector }
		</PaginatorContainer>
	);
}
