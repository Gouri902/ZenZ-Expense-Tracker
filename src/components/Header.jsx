function Header({ role, setRole, searchTerm, setSearchTerm, darkMode, setDarkMode, onOpenModal }) {
	const inputClass =
		"rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800";

	return (
		<header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/90">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
				<div className="transition-all duration-300">
					<h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">ZenZ Dashboard</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400">Monitor transactions, trends, and spending habits.</p>
				</div>

				<div className="flex flex-col gap-3 lg:flex-row lg:items-center">
					<input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={inputClass} />

					<select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
						<option value="admin">Admin</option>
						<option value="viewer">Viewer</option>
					</select>

					<button
						onClick={() => setDarkMode((prev) => !prev)}
						className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
					>
						{darkMode ? "Light Mode" : "Dark Mode"}
					</button>

					{role === "admin" && (
						<button
							onClick={onOpenModal}
							className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
						>
							Add Transaction
						</button>
					)}
				</div>
			</div>
		</header>
	);
}

export default Header;
