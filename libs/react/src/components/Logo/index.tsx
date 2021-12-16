import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../../components/Icon';

interface Props {
	size?: number;
	title?: string;
	icon?: string;
	logo?: string;
	onClick?: () => void;
}

const LogoWrapper = styled.span`
	display: flex;
	align-items: center;
`;

const Img = styled.img<{size: number}>`
	${({ size }) => css`
		width: ${size}px;
		height: ${size}px;
	`};
`;


const LogoTitle = styled.span`
	font-weight: bold;
`;

export function Logo (props: Props) {
	const { size = 24, title, icon = '', logo = '/assets/images/logo.svg' } = props;

	return (
		<LogoWrapper onClick={() => props.onClick?.()}>
			{ icon &&
				<Icon
					icon={icon}
					title={title}
					size={24}
				/>
			}
			{ !icon &&
				<Img size={size} src={logo}/>
			}
			{ title && <LogoTitle>{title}</LogoTitle>}
		</LogoWrapper>
	);
}
