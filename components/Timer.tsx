import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const secondToMinute = (second: number) => {
	const minute = Math.floor(second / 60);
	const secondRemainder = second % 60;
	return `${minute < 10 ? "0" : ""}${minute} : ${
		secondRemainder < 10 ? "0" : ""
	}${secondRemainder}`;
};

export const minuteToSecond = (minute: number) => minute * 60;

type Props = {
	countdownSecond: number;
	isCountdownActive: boolean;
	keyForUpdate: string;
	onComplete?: () => void;
};

const Timer = ({
	countdownSecond,
	isCountdownActive,
	keyForUpdate,
	onComplete,
}: Props) => {
	return (
		<CountdownCircleTimer
			duration={countdownSecond}
			colors={"#f43f5e"}
			size={240}
			isPlaying={isCountdownActive}
			onComplete={onComplete}
			key={keyForUpdate}
			strokeWidth={10}
			trailStrokeWidth={4}
			rotation="counterclockwise"
		>
			{({ remainingTime }) => (
				<span className="text-5xl font-semibold">
					{secondToMinute(remainingTime)}
				</span>
			)}
		</CountdownCircleTimer>
	);
};

export default Timer;
