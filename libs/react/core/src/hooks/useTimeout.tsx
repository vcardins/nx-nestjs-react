import { useEffect, useRef } from 'react';

function useTimeout(callback: () => void, delay: number = 0) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		// eslint-disable-next-line immutable/no-mutation
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		if ( delay && callback && typeof callback === 'function' ) {
			const timer = setTimeout(callbackRef.current, delay);
			return () => {
				if ( timer ) {
					clearTimeout(timer);
				}
			};
		}
	}, [callback, delay]);
}

export { useTimeout };
