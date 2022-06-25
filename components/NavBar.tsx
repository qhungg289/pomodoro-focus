import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
	const { data: session, status } = useSession();

	return (
		<nav className="container flex justify-between items-center py-4">
			<h1 className="text-2xl font-bold">
				Tiny <span className="text-rose-600">Tomato</span>
			</h1>

			{status === "loading" ? (
				<div className="flex items-center gap-4 animate-pulse">
					<div className="bg-zinc-700 rounded-full h-4 w-48"></div>
					<div className="cursor-pointer rounded-md border-2 px-6 py-4 border-zinc-200">
						<div className="bg-zinc-700 rounded-full h-2 w-16"></div>
					</div>
				</div>
			) : (
				<div className="flex justify-between items-center gap-4">
					{session ? (
						<>
							<p>Signed in as {session?.user?.name}</p>
							<button
								className="cursor-pointer rounded-md border-2 px-6 py-2 border-zinc-200 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
								onClick={() => signOut()}
							>
								Sign out
							</button>
						</>
					) : (
						<button
							className="cursor-pointer rounded-md border-2 px-6 py-2 border-zinc-200 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
							onClick={() => signIn()}
						>
							Sign in
						</button>
					)}
				</div>
			)}
		</nav>
	);
};

export default NavBar;
