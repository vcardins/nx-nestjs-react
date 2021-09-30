// hook from https://usehooks.com/useOnClickOutside/
import React, { useEffect } from 'react';

export function useOnClickOutside(ref: React.RefObject<any>, handler) {
	useEffect(
		() => {
			const listener = (event: MouseEvent) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}

				handler(event);
			};

			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);

			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		[ref, handler],
	);
}
