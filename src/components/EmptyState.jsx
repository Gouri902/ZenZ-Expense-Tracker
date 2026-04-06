function EmptyState({ role, onOpenModal, onClearFilters }) {
	return (
		<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
			<h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">No transactions found</h3>
			<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">There are no matching records right now. Try clearing filters or add a new transaction.</p>

			<div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<button
					onClick={onClearFilters}
					className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
				>
					Clear Filters
				</button>

				{role === "admin" && (
					<button
						onClick={onOpenModal}
						className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
					>
						Add Transaction
					</button>
				)}
			</div>
		</div>
	);
}

export default EmptyState;
