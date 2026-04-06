export const formatCurrency = (value) => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0,
	}).format(value);
};

export const calculateSummary = (transactions) => {
	const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);

	const expenses = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);

	return {
		income,
		expenses,
		balance: income - expenses,
	};
};

export const getHighestExpenseCategory = (transactions) => {
	const expenseTransactions = transactions.filter((item) => item.type === "expense");

	if (expenseTransactions.length === 0) {
		return { category: "None", amount: 0 };
	}

	const totals = {};

	expenseTransactions.forEach((item) => {
		if (!totals[item.category]) {
			totals[item.category] = 0;
		}
		totals[item.category] += item.amount;
	});

	let highestCategory = "";
	let highestAmount = 0;

	for (const category in totals) {
		if (totals[category] > highestAmount) {
			highestAmount = totals[category];
			highestCategory = category;
		}
	}

	return {
		category: highestCategory,
		amount: highestAmount,
	};
};

export const getExpenseComparisonText = (transactions) => {
	const expenses = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);

	if (expenses > 10000) {
		return "Spending is on the higher side this month.";
	}

	if (expenses > 5000) {
		return "Spending is moderate this month.";
	}

	return "Spending is relatively controlled this month.";
};

export const getUsefulObservation = (transactions) => {
	const incomeCount = transactions.filter((item) => item.type === "income").length;
	const expenseCount = transactions.filter((item) => item.type === "expense").length;

	if (incomeCount === 0 && expenseCount === 0) {
		return "No financial activity has been recorded yet.";
	}

	if (expenseCount > incomeCount) {
		return "You have more expense entries than income entries.";
	}

	if (incomeCount > expenseCount) {
		return "Income entries are fewer, but larger in value.";
	}

	return "Income and expense entries are balanced in count.";
};

export const getCategoryBreakdown = (transactions) => {
	const expenseTransactions = transactions.filter((item) => item.type === "expense");

	if (expenseTransactions.length === 0) return [];

	const totals = {};
	let totalExpenseAmount = 0;

	expenseTransactions.forEach((item) => {
		totals[item.category] = (totals[item.category] || 0) + item.amount;
		totalExpenseAmount += item.amount;
	});

	return Object.entries(totals)
		.map(([category, amount]) => ({
			category,
			amount,
			percentage: Math.round((amount / totalExpenseAmount) * 100),
		}))
		.sort((a, b) => b.amount - a.amount);
};

export const getMonthlyTrend = (transactions) => {
	const monthMap = {};

	transactions.forEach((item) => {
		const date = new Date(item.date);
		const month = date.toLocaleString("en-IN", { month: "short" });

		if (!monthMap[month]) {
			monthMap[month] = 0;
		}

		monthMap[month] += item.type === "income" ? item.amount : -item.amount;
	});

	const trend = Object.entries(monthMap).map(([month, amount]) => ({
		month,
		amount,
	}));

	if (trend.length === 0) {
		return [
			{ month: "Jan", amount: 0 },
			{ month: "Feb", amount: 0 },
			{ month: "Mar", amount: 0 },
			{ month: "Apr", amount: 0 },
		];
	}

	return trend;
};

