// https://codepen.io/finnhvman/pen/OBLZRX
import React from 'react';

import { IProgressTypesProps } from './components/IProgressTypesProps';
import { LinearProgress } from './components/LinearProgress';
import { SpinProgress } from './components/SpinProgress';

import { ProgressType } from './ProgressType';

interface IProgressProps extends IProgressTypesProps {
	type?: ProgressType;
}

export const Progress = ({ type = ProgressType.Linear, ...rest }: IProgressProps) => {
	switch (type) {
		case ProgressType.Linear:
			return <LinearProgress {...rest} />;
		case ProgressType.Spin:
			return <SpinProgress {...rest} />;
	}
};
