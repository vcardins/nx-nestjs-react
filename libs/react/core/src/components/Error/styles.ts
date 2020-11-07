import styled from 'styled-components';

const Emoji = styled.div`
	font-size: ${({theme}) => theme.fontSizes[8]}px;
	user-select: none;
`;

const Code = styled.div`
	font-size: ${({theme}) => theme.fontSizes[6]}px;
`;

const Title = styled.div`
	color: ${({theme}) => theme.colors.tertiary.grey};
	font-size: ${({theme}) => theme.fontSizes[6]}px;
	text-align: center;
`;

const Message = styled.div`
	font-size: ${({theme}) => theme.fontSizes[2]}px;
	padding-top: ${({theme}) => theme.spacing.small};
	text-align: center;
`;

export {
	Code,
	Emoji,
	Title,
	Message,
};
