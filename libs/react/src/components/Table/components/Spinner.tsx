import React from 'react';
import styled, { css } from 'styled-components';

export interface ISpinnerProps {
	visible: boolean;
	size: 'mini' | 'small' | 'normal' | 'large'
}

const SpinnerWrapper = styled.div<{ visible: ISpinnerProps['visible'] }>`
	${({ visible }) => {
		if (!visible) {
			return css`display: none;`;
		}
	}}
`;

const Icon = styled.div<{ size: ISpinnerProps['size'] }>`
	font-size: 10px;
	margin: 50px auto;
	text-indent: -9999em;
	${({ size }) => {
		switch (size) {
			case 'mini':
				return css`width: 1em; height: 1em;`;
			case 'small':
				return css`width: 1.5em; height: 1.5em;`;
			case 'normal':
				return css`width: 2em; height: 2em;`;
			case 'large':
				return css`width: 3em; height: 3em;`;
		}
	}}
	border-radius: 50%;
	background: #ffffff;
	background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
	position: relative;
	animation: loader 1.4s infinite linear;
	transform: translateZ(0);

	&:before {
		width: 50%;
		height: 50%;
		background: #ffffff;
		border-radius: 100% 0 0 0;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
	}

	&after {
		background: #0dc5c1;
		width: 75%;
		height: 75%;
		border-radius: 50%;
		content: '';
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	@keyframes loader{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const Spinner = (props: ISpinnerProps) => {
	const { visible = false, size = 'small' } = props;

	return (
		<SpinnerWrapper
			role="spinner"
			visible={visible}
		>
			<Icon size={size} />
		</SpinnerWrapper>
	);
};
