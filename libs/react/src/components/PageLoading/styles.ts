import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
`;

const EnhancedSpin = styled.div`
	display: initial;
	background: red;
	height: 100%;
	width: 100%;
`;

const LoadingMessage = styled.div`
	margin: 1em;
`;

export {
	Wrapper,
	LoadingMessage,
	EnhancedSpin as Spin,
};
