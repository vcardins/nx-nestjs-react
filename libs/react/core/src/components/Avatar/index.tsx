import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { IAvatarProps } from './IAvatarProps';
import { StyledAvatar } from './styles';

/**
 * By Artur Heinze
 * based on https://gist.github.com/leecrossley/6027780
 *
 * @param {IAvatarProps} props
 * @returns {string}
 */
function buildLetterAvatar(props: IAvatarProps): string {
	const { avatar, size, bgColor, fgColor } = props;
	if (!avatar) {
		return '';
	}

	const nameSplit = String(avatar).toUpperCase().split(' ');
	const initials = nameSplit.length === 1
		? nameSplit[0] ? nameSplit[0].charAt(0) : '?'
		: `${nameSplit[0].charAt(0)}${nameSplit[1].charAt(0)}`;
	const { devicePixelRatio } = window;
	const newSize = devicePixelRatio
		? (size * devicePixelRatio)
		: size;

	let canvas = document.createElement('canvas');
	canvas.width  = newSize;
	canvas.height = newSize;
	const context = canvas.getContext('2d');

	context.strokeStyle = 'rgba(0, 153, 255, 0.4)';
	context.fillStyle = bgColor;
	context.fillRect (0, 0, canvas.width, canvas.height);
	context.font = `${Math.round(canvas.width / 2)}px Tahoma`;
	context.textAlign = 'center';
	context.fillStyle = fgColor;
	context.fillText(initials, newSize / 2, newSize / 1.5);

	const dataURI = canvas.toDataURL();
	canvas = null;

	return dataURI;
}

export function Avatar(props: IAvatarProps) {
	const theme = useContext(ThemeContext);
	const { size = 42, src: url, inverse } = props;
	const { white, blue } = theme.colors.primary;
	const bgColor = props.bgColor
		? props.bgColor
		: inverse ? blue : white;
	const fgColor = props.fgColor
		? props.fgColor
		: inverse ? white : blue;
	const src = url
		? url
		: buildLetterAvatar({ ...props, bgColor, fgColor });

	return (
		<StyledAvatar
			size={size}
			bgColor={bgColor}
			fgColor={fgColor}
			data-avatar
			src={src}
		/>
	);
}
