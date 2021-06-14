import { useEffect, useState } from 'react';

function useOffline() {
	const [isOffline, setIsOffline] = useState(false);

	function onOffline() {
		setIsOffline(true);
	}

	function onOnline() {
		setIsOffline(false);
	}

	useEffect(() => {
		window.addEventListener('offline', onOffline);
		window.addEventListener('online', onOnline);

		return () => {
			window.removeEventListener('offline', onOffline);
			window.removeEventListener('online', onOnline);
		};
	}, []);

	return isOffline;
}

export { useOffline };
