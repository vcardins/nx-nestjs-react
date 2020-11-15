import React from 'react';

import { Wrapper, LogoWrapper } from './styles';

import { Progress } from '../Progress';
import { ProgressType } from '../Progress/ProgressType';

type ISplashScreenProps = {
	logo?: string;
	size?: string;
};

export function SplashScreen({
	logo = '/assets/images/logo.svg',
	size = '128',
}: ISplashScreenProps) {
	return (
		<Wrapper>
			<LogoWrapper>
				<img width={size} src={logo} alt="logo"/>
			</LogoWrapper>
			<Progress type={ProgressType.Spin} />
		</Wrapper>
	);
}
