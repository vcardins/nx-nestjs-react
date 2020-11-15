import styled, { css } from 'styled-components';

const leftRightStyle = css`
	position: absolute;
	top: 0;
	height: 100px;
	width: 50px;
	overflow: hidden;
`;

export const HalfCircle = styled.div`
	position: absolute;
	top: 0;
	width: 100px;
	height: 100px;
	box-sizing: border-box;
	border: 10px solid #4285f4;
	border-bottom-color: transparent;
	border-radius: 50%;
`;

export const SpinProgressMessage = styled.div`
	text-align: center;
`;

export const Gap = styled.div`
	position: absolute;
	left: 49px;
	right: 49px;
	top: 0;
	bottom: 0;
	border-top: 10px solid;
	box-sizing: border-box;
`;

export const Left = styled.div`
	${leftRightStyle};
	left: 0;

	${HalfCircle} {
		left: 0;
		border-right-color: transparent;
		animation: left-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
	}
`;

export const Right = styled.div`
	${leftRightStyle};
	right: 0;

	${HalfCircle} {
		right: 0;
		border-left-color: transparent;
		animation: right-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
	}
`;

export const Spinner = styled.div`
	position: absolute;
	overflow: hidden;
	left: 50%;
	margin-left: -50px;
	animation: outer-rotate 2.91667s linear infinite;
`;

export const SpinnerContainer = styled.div`
	width: 100px;
	height: 100px;
	position: relative;
	animation: sporadic-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;
`;

export const SpinProgressShape = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-end;
	min-height: 100px;
	height: 100px;

	@keyframes outer-rotate {
		0% {
			transform: rotate(0deg) scale(0.5);
		}

		100% {
			transform: rotate(360deg) scale(0.5);
		}
	}

	@keyframes left-wobble {
		0%,
		100% {
			transform: rotate(130deg);
		}

		50% {
			transform: rotate(-5deg);
		}
	}

	@keyframes right-wobble {
		0%,
		100% {
			transform: rotate(-130deg);
		}

		50% {
			transform: rotate(5deg);
		}
	}

	@keyframes sporadic-rotate {
		12.5% {
			transform: rotate(135deg);
		}

		25% {
			transform: rotate(270deg);
		}

		37.5% {
			transform: rotate(405deg);
		}

		50% {
			transform: rotate(540deg);
		}

		62.5% {
			transform: rotate(675deg);
		}

		75% {
			transform: rotate(810deg);
		}

		87.5% {
			transform: rotate(945deg);
		}

		100% {
			transform: rotate(1080deg);
		}
	}
`;
