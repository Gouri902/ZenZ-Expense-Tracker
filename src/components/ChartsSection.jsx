import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { formatCurrency, getCategoryBreakdown, getMonthlyTrend } from "../utils/helpers";

function ChartsSection({ transactions }) {
	const trendData = getMonthlyTrend(transactions).map((item) => ({
		month: item.month,
		amount: item.amount,
	}));

	const categoryData = getCategoryBreakdown(transactions).map((item) => ({
		name: item.category,
		value: item.amount,
		percentage: item.percentage,
	}));

	const pieColors = ["#2c3b5e", "#334155", "#64748b", "#94a3b8", "#cbd5e1", "#22d3ee"];

	const isDarkMode = document.documentElement.classList.contains("dark");

	const axisColor = isDarkMode ? "#94a3b8" : "#64748b";
	const gridColor = isDarkMode ? "#334155" : "#cbd5e1";
	const tooltipBg = isDarkMode ? "#0f172a" : "#ffffff";
	const tooltipBorder = isDarkMode ? "#334155" : "#e2e8f0";
	const tooltipText = isDarkMode ? "#f8fafc" : "#0f172a";
	const barColor = isDarkMode ? "#2c3b5e" : "#0f172a";

	return (
		<section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
				<div className="mb-4">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Monthly Trend</h3>
					<p className="text-sm text-slate-500 dark:text-slate-400">Net monthly movement based on current transactions</p>
				</div>

				<div className="h-72">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
							<XAxis dataKey="month" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
							<YAxis tickFormatter={(value) => `₹${Math.abs(value) / 1000}k`} tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
							<Tooltip
								formatter={(value) => formatCurrency(value)}
								contentStyle={{
									borderRadius: "12px",
									border: `1px solid ${tooltipBorder}`,
									backgroundColor: tooltipBg,
									color: tooltipText,
								}}
								labelStyle={{ color: tooltipText }}
								itemStyle={{ color: tooltipText }}
							/>
							<Bar dataKey="amount" fill={barColor} radius={[8, 8, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
				<div className="mb-4">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h3>
					<p className="text-sm text-slate-500 dark:text-slate-400">Expense categories based on current transactions</p>
				</div>

				<div className="h-72">
					{categoryData.length > 0 ? (
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={categoryData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={90}
									label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
									labelLine={true}
								>
									{categoryData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} stroke={isDarkMode ? "#0f172a" : "#ffffff"} />
									))}
								</Pie>
								<Tooltip
									formatter={(value) => formatCurrency(value)}
									contentStyle={{
										borderRadius: "12px",
										border: `1px solid ${tooltipBorder}`,
										backgroundColor: tooltipBg,
										color: tooltipText,
									}}
									labelStyle={{ color: tooltipText }}
									itemStyle={{ color: tooltipText }}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					) : (
						<div className="flex h-full items-center justify-center">
							<p className="text-sm text-slate-500 dark:text-slate-400">No expense data available yet.</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default ChartsSection;
