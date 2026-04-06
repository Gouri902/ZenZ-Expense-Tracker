import { calculateSummary, formatCurrency } from "../utils/helpers";

function SummaryCards({ transactions }) {
	const { balance, income, expenses } = calculateSummary(transactions);

	const cards = [
		{ label: "Total Balance", value: balance },
		{ label: "Income", value: income },
		{ label: "Expenses", value: expenses },
	];

	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{cards.map((card) => (
				<div
					key={card.label}
					className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
				>
					<p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
					<h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(card.value)}</h2>
				</div>
			))}
		</section>
	);
}


export default SummaryCards;
