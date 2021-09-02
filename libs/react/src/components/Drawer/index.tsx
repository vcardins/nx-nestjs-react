import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import styled, { css } from 'styled-components';

import { useMountTransition } from '../../hooks';

interface IDrawerProps {
	id: string;
	isOpen: boolean;
	children: React.ReactElement;
	position: 'left' | 'right' | 'bottom' | 'top';
	size?: string;
	removeWhenClosed?: boolean;
	speed?: number;
	overflow?: CSSStyleDeclaration['overflow'];
	onClose: () => void;
}

const DrawerBackdrop = styled.div<{ onClick: IDrawerProps['onClose'] }>`
	visibility: hidden;
	opacity: 0;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	position: fixed;
	pointer-events: none;
	z-index: 0;
`;

const DrawerPanel = styled.div<Pick<IDrawerProps, 'size' | 'overflow' | 'position'>>`
	overflow: ${({ overflow = 'auto' }) => overflow};
	background: #fff;
	position: fixed;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	z-index: 1000;
	scroll-margin-right: 1em;

	${({ position, size }) => {
		switch (position) {
			case 'left':
				return css`
					top: 0;
					left: 0;
					width: ${size};
					height: 100%;
					transform: translateX(-105%);
				`;
			case 'right':
				return css`
					top: 0;
					right: 0;
					width: ${size};
					height: 100%;
					transform: translateX(100%);
				`;
			case 'top':
				return css`
					top: 0;
					left: 0;
					right: 0;
					width: 100%;
					height: ${size};
					transform: translateY(-100%);
				`;
			case 'bottom':
				return css`
					bottom: 0;
					left: 0;
					right: 0;
					width: 100%;
					height: ${size};
					transform: translateY(100%);
				`;
		}
	}}
`;

const getDrawerPosition = (position: IDrawerProps['position']) => {
	switch (position) {
		case 'left':
		case 'right':
			return css`
				transform: translateX(0);
			`;
		case 'top':
		case 'bottom':
			return css`
				transform: translateY(0);
			`;
	}
};

const DrawerContainer = styled.div<Pick<IDrawerProps, 'speed' | 'isOpen' | 'position'> & { isTransitioning: boolean; }>`
	${DrawerBackdrop} {
		transition: opacity ${({ speed }) => `${speed}ms`} ease, visibility ${({ speed }) => `${speed}ms`} ease;
	}

	${DrawerPanel} {
		transition: transform ${({ speed }) => `${speed}ms`} ease;
	}

	${({ isTransitioning, isOpen, position }) =>
		isTransitioning &&
		isOpen &&
		css`
			${DrawerBackdrop} {
				visibility: visible;
				opacity: 1;
				pointer-events: auto;
				z-index: 999;
			}

			${DrawerPanel} {
				transform: translateX(0);
				${getDrawerPosition(position)}
			}
		`}
`;

function createPortalRoot(id: string) {
	const drawerRoot = document.createElement('div');
	drawerRoot.setAttribute('id', id);

	return drawerRoot;
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-drawer-component-with-react-portals
 */
export const Drawer = (props: IDrawerProps) => {
	const {
		id = 'drawer-root',
		isOpen,
		children,
		onClose,
		position = 'right',
		speed = 300,
		size = '40%',
		overflow,
		removeWhenClosed = true,
	} = props;
	const bodyRef = useRef(document.querySelector('body'));
	const portalRootRef = useRef(document.getElementById(id) || createPortalRoot(id));
	const isTransitioning = useMountTransition(isOpen, speed);

	// Append portal root on mount
	useEffect(() => {
		bodyRef.current.appendChild(portalRootRef.current);
		const portal = portalRootRef.current;
		const bodyEl = bodyRef.current;

		return () => {
			// Clean up the portal when drawer component unmounts
			portal.remove();
			// Ensure scroll overflow is removed
			bodyEl.style.overflow = '';
		};
	}, []);

	// Prevent page scrolling when the drawer is open
	useEffect(() => {
		bodyRef.current.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);

	// Allow Escape key to dismiss the drawer
	useEffect(() => {
		const onKeyPress = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener('keyup', onKeyPress);
		}

		return () => {
			window.removeEventListener('keyup', onKeyPress);
		};
	}, [isOpen, onClose]);

	if (!isTransitioning && removeWhenClosed && !isOpen) {
		return null;
	}

	return createPortal(
		<FocusTrap active={isOpen}>
			<DrawerContainer
				position={position}
				speed={speed}
				isOpen={isOpen}
				isTransitioning={isTransitioning}
				aria-hidden={isOpen ? 'false' : 'true'}
			>
				<DrawerPanel
					position={position}
					size={size}
					role="dialog"
					overflow={overflow}
				>
					{children}
				</DrawerPanel>
				<DrawerBackdrop onClick={onClose} />
			</DrawerContainer>
		</FocusTrap>,
		portalRootRef.current,
	);
};
