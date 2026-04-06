import { useEffect, useState } from "react";

function AddTransactionModal({ isOpen, onClose, onAddTransaction, onUpdateTransaction, editingTransaction }) {
	const [formData, setFormData] = useState({
		title: "",
		amount: "",
		category: "",
		type: "expense",
		date: "",
		status: "Completed",
	});

	useEffect(() => {
		if (editingTransaction) {
			setFormData({
				title: editingTransaction.title,
				amount: editingTransaction.amount,
				category: editingTransaction.category,
				type: editingTransaction.type,
				date: editingTransaction.date,
				status: editingTransaction.status,
			});
		} else {
			setFormData({
				title: "",
				amount: "",
				category: "",
				type: "expense",
				date: "",
				status: "Completed",
			});
		}
	}, [editingTransaction, isOpen]);

	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.amount || !formData.category.trim() || !formData.date) {
			return;
		}

		const transactionData = {
			id: editingTransaction ? editingTransaction.id : Date.now(),
			title: formData.title.trim(),
			amount: Number(formData.amount),
			category: formData.category.trim(),
			type: formData.type,
			date: formData.date,
			status: formData.status,
		};

		if (editingTransaction) {
			onUpdateTransaction(transactionData);
		} else {
			onAddTransaction(transactionData);
		}

		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-all duration-300">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 dark:bg-slate-900">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h3>
					<button
						onClick={onClose}
						className="rounded-md px-2 py-1 text-sm text-slate-500 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
					>
						Close
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={formData.title}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>

					<input
						type="number"
						name="amount"
						placeholder="Amount"
						value={formData.amount}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>

					<input
						type="text"
						name="category"
						placeholder="Category"
						value={formData.category}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>

					<select
						name="type"
						value={formData.type}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>

					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					/>

					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-all duration-200 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
					>
						<option value="Completed">Completed</option>
						<option value="Pending">Pending</option>
					</select>

					<button
						type="submit"
						className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white transition-all duration-200 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
					>
						{editingTransaction ? "Update Transaction" : "Save Transaction"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddTransactionModal;
