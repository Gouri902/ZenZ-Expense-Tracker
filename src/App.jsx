import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import ChartsSection from "./components/ChartsSection";
import InsightsSection from "./components/InsightsSection";
import TransactionsSection from "./components/TransactionsSection";
import AddTransactionModal from "./components/AddTransactionModal";
import EmptyState from "./components/EmptyState";
import { mockTransactions } from "./data/mockData";

function App() {
	const [role, setRole] = useState("admin");
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("finance_theme");
		return savedTheme === "dark";
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTransaction, setEditingTransaction] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("all");
	const [sortBy, setSortBy] = useState("latest");

	useEffect(() => {
		const savedTransactions = localStorage.getItem("finance_transactions");

		setIsLoading(true);

		const timer = setTimeout(() => {
			setTransactions(savedTransactions ? JSON.parse(savedTransactions) : mockTransactions);
			setIsLoading(false);
		}, 700);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("finance_transactions", JSON.stringify(transactions));
		}
	}, [transactions, isLoading]);

	useEffect(() => {
		localStorage.setItem("finance_theme", darkMode ? "dark" : "light");

		
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const filteredTransactions = useMemo(() => {
		let updatedTransactions = [...transactions];

		if (searchTerm.trim()) {
			const lowerSearch = searchTerm.toLowerCase();

			updatedTransactions = updatedTransactions.filter(
				(item) => item.title.toLowerCase().includes(lowerSearch) || item.category.toLowerCase().includes(lowerSearch) || item.status.toLowerCase().includes(lowerSearch),
			);
		}

		if (typeFilter !== "all") {
			updatedTransactions = updatedTransactions.filter((item) => item.type === typeFilter);
		}

		if (sortBy === "latest") {
			updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
		}

		if (sortBy === "oldest") {
			updatedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
		}

		if (sortBy === "highest") {
			updatedTransactions.sort((a, b) => b.amount - a.amount);
		}

		if (sortBy === "lowest") {
			updatedTransactions.sort((a, b) => a.amount - b.amount);
		}

		return updatedTransactions;
	}, [transactions, searchTerm, typeFilter, sortBy]);

	const handleAddTransaction = (newTransaction) => {
		setTransactions((prev) => [newTransaction, ...prev]);
	};

	const handleEditTransaction = (transaction) => {
		setEditingTransaction(transaction);
		setIsModalOpen(true);
	};

	const handleUpdateTransaction = (updatedTransaction) => {
		setTransactions((prev) => prev.map((item) => (item.id === updatedTransaction.id ? updatedTransaction : item)));
		setEditingTransaction(null);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingTransaction(null);
	};

	const handleClearFilters = () => {
		setSearchTerm("");
		setTypeFilter("all");
		setSortBy("latest");
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="animate-pulse space-y-6">
						<div className="h-16 rounded-2xl bg-white dark:bg-slate-900" />
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div className="h-32 rounded-2xl bg-white dark:bg-slate-900" />
							<div className="h-32 rounded-2xl bg-white dark:bg-slate-900" />
							<div className="h-32 rounded-2xl bg-white dark:bg-slate-900" />
						</div>
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
							<div className="h-72 rounded-2xl bg-white dark:bg-slate-900" />
							<div className="h-72 rounded-2xl bg-white dark:bg-slate-900" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
			<Header
				role={role}
				setRole={setRole}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
				onOpenModal={() => {
					setEditingTransaction(null);
					setIsModalOpen(true);
				}}
			/>

			<main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
				<SummaryCards transactions={transactions} />
				<ChartsSection transactions={transactions} />
				<InsightsSection transactions={transactions} />

				<div className="transition-all duration-300">
					{filteredTransactions.length > 0 ? (
						<TransactionsSection
							transactions={filteredTransactions}
							role={role}
							typeFilter={typeFilter}
							setTypeFilter={setTypeFilter}
							sortBy={sortBy}
							setSortBy={setSortBy}
							onEditTransaction={handleEditTransaction}
						/>
					) : (
						<EmptyState
							role={role}
							onOpenModal={() => {
								setEditingTransaction(null);
								setIsModalOpen(true);
							}}
							onClearFilters={handleClearFilters}
						/>
					)}
				</div>
			</main>

			{role === "admin" && (
				<AddTransactionModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					onAddTransaction={handleAddTransaction}
					onUpdateTransaction={handleUpdateTransaction}
					editingTransaction={editingTransaction}
				/>
			)}
		</div>
	);
}

export default App;
