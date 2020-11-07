/* eslint-disable immutable/no-mutation */
import React, { useRef } from 'react';
import { StyledButton } from './styles';
import { IButtonProps } from './IButtonProps';

function Button({ children, type = 'button', onClick, ...props}: IButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>();
	const handleClick = (e: React.MouseEvent) => {
		animate(e);
		if (typeof onClick === 'function') {
			onClick(e);
		}
	};

	return (
		<StyledButton
			{...props}
			ref={buttonRef}
			type={type}
			onClick={handleClick}
		>
			{children}
		</StyledButton>
	);

	function animate(e: any) {
		const d = document.createElement('div');
		d.className = 'circle';
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		d.style.left = `${x}px`;
		d.style.top = `${y}px`;
		buttonRef.current.appendChild(d);

		d.addEventListener('animationend', () => {
			d.parentElement.removeChild(d);
		});
	}
}

export { Button };
