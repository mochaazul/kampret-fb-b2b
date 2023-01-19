import { MutableRefObject, useRef } from "react";

type AppInterval = {
	start: () => void;
	stop: () => void;
};

const useInterval = (
	action: () => void,
	timeout: number,
): AppInterval => {
	const id = useRef<number>();

	return {
		start: () => {
			console.log('start interval');
			id.current = setInterval(
				() => {
					console.log('interval', new Date().getTime());
					action();
				},
				timeout,
			);
		},
		stop: () => {
			console.log('stopping interval');
			clearInterval(id.current);
		},
	};
};

export default useInterval;