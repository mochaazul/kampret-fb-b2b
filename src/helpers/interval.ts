import { useEffect, useRef } from "react";

type AppInterval = {
	start: () => void;
	stop: () => void;
};

const useInterval = (
	action: () => void,
	timeout: number,
): AppInterval => {

	const id = useRef<number>();

	const interval = {
		start: () => {
			id.current = setInterval(
				() => action(),
				timeout,
			);
		},
		stop: () => {
			if (id.current !== undefined) {
				clearInterval(id.current);
				id.current = undefined;
			}
		},
	};

	useEffect(() => interval.stop, []);

	return interval;
};

export default useInterval;