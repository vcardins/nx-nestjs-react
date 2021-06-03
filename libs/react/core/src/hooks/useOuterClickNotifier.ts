import React, { useEffect } from 'react';

/**
 * Method that observes click outside a predefined clickable area
 *
 * @param {(e: React.MouseEvent<HTMLElement>) => void} onOuterClick Function to be executed in case the user clicks outside the allowed area
 * @param {React.RefObject<HTMLElement>} innerRef The allowed clickable area component reference
 * @param {string[]} [allowedOuterElements=[]]  Whitelist of outer component allowed to be clicked
 */
export function useOuterClickNotifier(
	onOuterClick: (e: React.MouseEvent<HTMLElement>) => void,
	innerRef: React.RefObject<HTMLElement>,
	conditional: () => boolean = () => true,
	allowedOuterElements: string[] = [],
) {
	useEffect(
		() => {
			if (!innerRef) {
				return;
			}

			/**
			 * Check whether there are whitelisted components allowed to be clickable
			 *
			 * @param {HTMLElement} node
			 * @returns {boolean}
			 */
			function existAllowedOuterClickableElements(node: HTMLElement): boolean {
				return allowedOuterElements.some((selector: string) => {
					const el = document.querySelector(selector) as HTMLElement;

					if (!el) {
						return false;
					}

					return (el.isSameNode(node) || el.contains(node));
				});
			}
			/**
			 * Handle document click
			 *
			 * @param {React.MouseEvent<HTMLElement>} e
			 * @returns
			 */
			function handleClickOutside(e: React.MouseEvent<HTMLElement>) {
				const node = e.target as HTMLElement;

				if (innerRef.current && !innerRef.current.contains(node) && conditional()) {
					const exist = existAllowedOuterClickableElements(node);

					if (!exist) {
						onOuterClick(e);
						return false;
					}
				}
			}

			// only add listener, if the element exists
			if (innerRef.current) {
				// @ts-ignore
				document.addEventListener('mousedown', handleClickOutside);
			}

			// unmount previous first in case input have changed
			// @ts-ignore
			return () => document.removeEventListener('mousedown', handleClickOutside);
		},
		[onOuterClick, innerRef], // invoke again, if inputs have changed
	);
}
