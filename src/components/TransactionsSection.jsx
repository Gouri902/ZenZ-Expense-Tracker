import { formatCurrency } from "../utils/helpers";

function TransactionsSection({ transactions, role, typeFilter, setTypeFilter, sortBy, setSortBy, onEditTransaction }) {
	return (
		<section className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
			<div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
				<div>
					<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Transactions</h3>
					<p className="text-sm text-slate-500 dark:text-slate-400">Search, filter, sort, and manage transactions</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<select
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800"
					>
						<option value="all">All Types</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>

					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-slate-800"
					>
						<option value="latest">Latest First</option>
						<option value="oldest">Oldest First</option>
						<option value="highest">Amount: High to Low</option>
						<option value="lowest">Amount: Low to High</option>
					</select>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead className="bg-slate-50 dark:bg-slate-800/60">
						<tr className="text-left text-sm text-slate-500 dark:text-slate-400">
							<th className="px-5 py-3 font-medium">Title</th>
							<th className="px-5 py-3 font-medium">Category</th>
							<th className="px-5 py-3 font-medium">Type</th>
							<th className="px-5 py-3 font-medium">Date</th>
							<th className="px-5 py-3 font-medium">Amount</th>
							<th className="px-5 py-3 font-medium">Status</th>
							{role === "admin" && <th className="px-5 py-3 font-medium">Action</th>}
						</tr>
					</thead>

					<tbody>
						{transactions.map((item) => (
							<tr
								key={item.id}
								className="border-t border-slate-100 transition-colors duration-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
							>
								<td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</td>
								<td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{item.category}</td>
								<td
									className={`px-5 py-4 text-sm font-medium capitalize ${item.type === "income" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
								>
									{item.type}
								</td>
								<td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{item.date}</td>
								<td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-slate-100">{formatCurrency(item.amount)}</td>
								<td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{item.status}</td>
								{role === "admin" && (
									<td className="px-5 py-4">
										<button
											onClick={() => onEditTransaction(item)}
											className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
										>
											Edit
										</button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default TransactionsSection;
