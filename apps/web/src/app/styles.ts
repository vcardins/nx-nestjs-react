import { createGlobalStyle } from 'styled-components';
import { getTheme } from '@xapp/shared/config';
import 'react-toastify/dist/ReactToastify.css';
import 'react-jsonschema-form-validation/dist/react-jsonschema-form-validation.min.css';

const { fonts, colors, fontSizes, heading } = getTheme();

export const globalStyle = createGlobalStyle`
	::-webkit-scrollbar-track {
		background-color: ${colors.secondary.lightBlue};
	}

	::-webkit-scrollbar {
		width: 0.5em;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${colors.secondary.blue};
	}

	@font-face {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 300;
		src:
		url('/assets/fonts/Lato-Regular.eot'),
		url('/assets/fonts/Lato-Regular.ttf') format('truetype'),
		url('/assets/fonts/Lato-Regular.woff') format('woff');
	}

	* {
		padding: 0;
		margin: 0;
		line-height: inherit;
		font-family: inherit;
		font-size: inherit;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}

	html {
		line-height: 1.5;
		font-family: ${fonts.primary};
		font-size: ${fontSizes[0]}px;
		box-sizing: border-box;

		a {
			color: inherit;
			text-decoration: none;
		}
	}

	/* wrapping these attributes with @media screen so printing is not affected */
	@media screen {
		html,
		body {
			height: 100vh;
			width: 100vw;
			overflow: hidden;
		}
	}

	#root {
		height: 100vh;
	}

	h1 { font-size: ${heading.h1}; }
	h2 { font-size: ${heading.h2}; }
	h3 { font-size: ${heading.h3}; }
	h4 { font-size: ${heading.h4}; }
	h5 { font-size: ${heading.h5}; }

	.Toastify__toast-body {
		font-size: 14px;
	}

	[disabled] {
		input,
		textarea,
		select,
		button {
			cursor: not-allowed;
		}
	}

	fieldset {
		border: 0;
	}
`;
