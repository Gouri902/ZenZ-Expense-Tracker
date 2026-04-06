import { formatCurrency, getExpenseComparisonText, getHighestExpenseCategory, getUsefulObservation } from "../utils/helpers";

function InsightsSection({ transactions }) {
	const highestExpense = getHighestExpenseCategory(transactions);
	const comparisonText = getExpenseComparisonText(transactions);
	const observationText = getUsefulObservation(transactions);

	const insights = [
		{
			title: "Highest Spending Category",
			text: `${highestExpense.category} (${formatCurrency(highestExpense.amount)})`,
		},
		{
			title: "Monthly Comparison",
			text: comparisonText,
		},
		{
			title: "Useful Observation",
			text: observationText,
		},
	];

	return (
		<section className="grid grid-cols-1 gap-4 md:grid-cols-3">
			{insights.map((item) => (
				<div
					key={item.title}
					className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
				>
					<h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
					<p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
				</div>
			))}
		</section>
	);
}

export default InsightsSection;
