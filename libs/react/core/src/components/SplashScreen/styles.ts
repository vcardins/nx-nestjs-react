import styled from 'styled-components';

const Wrapper = styled.div`
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${({ theme }) => theme.colors.primary.blue };
	z-index: 99999;
	pointer-events: none;

	.center {
		display: block;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.logo {
		width: 128px;
		margin: 0 auto;
	}

	.spinner-wrapper {
		display: block;
		position: relative;
		width: 100%;
		min-height: 100px;
		height: 100px;

		.spinner {
			position: absolute;
			overflow: hidden;
			left: 50%;
			margin-left: -50px;
			animation: outer-rotate 2.91667s linear infinite;

			.inner {
				width: 100px;
				height: 100px;
				position: relative;
				animation: sporadic-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;

				.gap {
					position: absolute;
					left: 49px;
					right: 49px;
					top: 0;
					bottom: 0;
					border-top: 10px solid;
					box-sizing: border-box;
				}

				.left,
				.right {
					position: absolute;
					top: 0;
					height: 100px;
					width: 50px;
					overflow: hidden;

					.half-circle {
						position: absolute;
						top: 0;
						width: 100px;
						height: 100px;
						box-sizing: border-box;
						border: 10px solid #4285f4;
						border-bottom-color: transparent;
						border-radius: 50%;
					}
				}

				.left {
					left: 0;

					.half-circle {
						left: 0;
						border-right-color: transparent;
						animation: left-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
					}
				}

				.right {
					right: 0;

					.half-circle {
						right: 0;
						border-left-color: transparent;
						animation: right-wobble 1.3125s cubic-bezier(0.35, 0, 0.25, 1) infinite;
					}
				}
			}
		}
	}
`;

export {
	Wrapper,
};
