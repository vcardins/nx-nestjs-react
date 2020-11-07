import styled from 'styled-components';

export const LinearProgressContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
	>* { text-align: center; }
`;

export const LinearProgressBar = styled.progress`
	appearance: none;
	border: none;
	height: 0.25em;
	width: 20em;
	color: ${({ theme }) => theme.colors.primary.blue };
	background-color: ${({ theme }) => theme.colors.secondary.lightBlue };
	font-size: 16px;
	margin-top: 1em;

	&::-webkit-progress-bar {
		background-color: transparent;
	}

	&::-webkit-progress-value,
	&::-moz-progress-bar {
		background-color: currentColor;
		transition: all 0.2s;
	}

	&::-ms-fill {
		border: none;
		background-color: currentColor;
		transition: all 0.2s;
	}

	&:indeterminate {
		background-size: 200% 100%;
		background-image: linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 60%, transparent 60%, transparent 71.5%, currentColor 71.5%, currentColor 84%, transparent 84%);
		animation: progress-linear 2s infinite linear;

		&::-moz-progress-bar {
			background-color: transparent;
		}

		&::-ms-fill {
			animation-name: none;
		}
	}
`;
