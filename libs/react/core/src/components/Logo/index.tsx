import React from 'react';
import Icon from '@mdi/react';
import styled, { css } from 'styled-components';

// type SizeProp = 'mini' | 'small' | 'large' | 'big';

interface Props {
	size?: number;
	title?: string;
	icon?: string;
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

export function Logo ({
	size = 1,
	title = '',
	icon = '',
	onClick,
}: Props): JSX.Element {
	function handleClick() {
		if (typeof onClick === 'function') {
			onClick();
		}
	}

	return (
		<LogoWrapper onClick={handleClick}>
			{ icon &&
				<span className="logo-icon">
					<Icon path={icon} title={title} size={1}/>
				</span>
			}
			{ !icon &&
				<Img size={size} src="/assets/images/logo.svg"/>
			}
			{ title && <LogoTitle>{title}</LogoTitle>}
		</LogoWrapper>
	);
}
