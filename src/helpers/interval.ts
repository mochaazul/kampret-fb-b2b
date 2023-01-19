import { useRef } from "react";

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
			id.current = setInterval(
				() => action(),
				timeout,
			);
		},
		stop: () => {
			clearInterval(id.current);
		},
	};
};

export default useInterval;