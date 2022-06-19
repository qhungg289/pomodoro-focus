type Props = {
	minute: number;
	onClick: () => void;
};

const SetTimeButton = ({ minute, onClick }: Props) => (
	<button
		className="border-2 border-zinc-700 rounded-md px-4 py-3 text-left sm:text-center hover:bg-zinc-700 focus-visible:bg-zinc-700 transition-all"
		onClick={onClick}
	>{`${minute} min`}</button>
);

export default SetTimeButton;
