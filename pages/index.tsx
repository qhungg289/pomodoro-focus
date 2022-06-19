import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import Timer, { minuteToSecond } from "../components/Timer";
import SetTimeButton from "../components/SetTimeButton";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
	const [isCountdownActive, setIsCountdownActive] = useState(false);
	const [countdownSecond, setCountdownSecond] = useState(25 * 60);
	const [key, setKey] = useState(uuidv4());
	const [minuteInput, setMinuteInput] = useState(1);

	// TODO: Use this to know when is the break time
	const [pomodoroCount, setPomodoroCount] = useState(0);

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		window.onload = () => {
			if (Notification.permission !== "denied") {
				Notification.requestPermission();
			}
		};
	}, []);

	return (
		<>
			<Head>
				<title>Tiny Tomato</title>
				<meta name="description" content="Pomodoro Clock" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container flex flex-col items-center justify-center gap-y-8 min-h-screen">
				<Timer
					countdownSecond={countdownSecond}
					keyForUpdate={key}
					isCountdownActive={isCountdownActive}
					onComplete={() => {
						setIsCountdownActive(false);
						const notification = new Notification("Tiny Tomato", {
							body: "Time is up!",
							icon: "/favicon.ico",
						});
						audioRef.current?.play();
					}}
				/>

				<audio preload="auto" src="/fx/timeup.mp3" ref={audioRef}></audio>

				<button
					onClick={() => {
						setIsCountdownActive(!isCountdownActive);
					}}
					className={`border-2 border-transparent py-3 px-8 rounded-full ${
						!isCountdownActive
							? "bg-rose-600 hover:bg-rose-500 text-white"
							: "border-rose-500 text-rose-500 "
					} font-semibold transition-all`}
				>
					{!isCountdownActive ? <span>Start</span> : <span>Pause</span>}
				</button>

				<AnimatePresence>
					{!isCountdownActive && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<SetTimeButton
								minute={10}
								onClick={() => {
									setCountdownSecond(10 * 60);
									setKey(uuidv4());
								}}
							/>
							<SetTimeButton
								minute={25}
								onClick={() => {
									setCountdownSecond(25 * 60);
									setKey(uuidv4());
								}}
							/>
							<SetTimeButton
								minute={50}
								onClick={() => {
									setCountdownSecond(50 * 60);
									setKey(uuidv4());
								}}
							/>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setCountdownSecond(minuteToSecond(minuteInput));
									setKey(uuidv4());
									setMinuteInput(1);
									setIsCountdownActive(true);
								}}
								className="relative"
							>
								<input
									type="number"
									className="border-2 bg-transparent border-zinc-700 rounded-md px-4 py-3 appearance-none"
									placeholder="Custom (in minutes)"
									min={1}
									value={minuteInput}
									onChange={(e) => setMinuteInput(Number(e.target.value))}
								/>
								<label>
									<input type="submit" value="" className="hidden" />
									<span className="absolute text-zinc-500 right-14 top-3">
										minutes
									</span>
									<ArrowSmRightIcon
										className="h-7 w-7 absolute right-4 top-3 text-zinc-600 cursor-pointer"
										role="button"
									/>
								</label>
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</>
	);
};

export default Home;
