import React from 'react';
import styled from 'styled-components';
import { IAvatarProps } from './IAvatarProps';

const AvatarWrapper = styled.span`
	line-height: 1;
`;

const Img = styled.img<{size: number}>`
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	border-radius: 50%;
	transition: all 0.6s ease-in-out;
`;

export const StyledAvatar = ({size, ...rest}: IAvatarProps) => {
	return (
		<AvatarWrapper>
			<Img size={size} {...rest}/>
		</AvatarWrapper>
	);
};
