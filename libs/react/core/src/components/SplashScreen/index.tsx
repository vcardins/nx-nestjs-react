/* eslint-disable no-undef */
import React from 'react';

type ISplashScreenProps = {
	logo?: string;
	size?: string;
};

export function SplashScreen({
	logo = '', // /assets/images/logo.svg
	size = '128',
}: ISplashScreenProps) {
	return (
		<div>
			<div className="center">
				<div className="logo">
					<img width={size} src={logo} alt="logo"/>
				</div>
				<div className="spinner-wrapper">
					<div className="spinner">
						<div className="inner">
							<div className="gap"/>
							<div className="left">
								<div className="half-circle"/>
							</div>
							<div className="right">
								<div className="half-circle"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
