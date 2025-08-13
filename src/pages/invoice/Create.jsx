import React from "react";
import { useNavigate } from "react-router-dom";
import Requests from "../../services/Requests";

function InvoiceCreate({}) {
	const [accountArray, setAccountArray] = React.useState([
		{
			account_name: "Bloom Digital media ltd (Billing)",
			account_number: "0126532175",
			bank_name: "Wema Bank",
		},
		{
			account_name: "Bloom Digital media ltd",
			account_number: "0126528905",
			bank_name: "Wema Bank",
		},
	]);

	const [formData, setFormData] = React.useState({
		vat: 7.5,
		service_charge: 10,
		account_name: null,
		account_number: null,
		bank_name: null,
		currency: "₦",
		discount: 0,
	});
	const [lineItems, setLineItems] = React.useState([
		{ item: "", desc: "", qty: "", price: "" },
	]);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleChange = (formKey, value) => {
		setFormData((preState) => {
			preState[formKey] = value;
			return preState;
		});
	};

	const handleCellChange = (key, col, value) => {
		setLineItems((preState) => {
			preState[key][col] = value;
			return preState;
		});
	};

	const addTableRow = (e) => {
		setLineItems((preState) => {
			return [...preState, { item: "", desc: "", qty: "", price: "" }];
		});
	};
	const removeItem = (removeIndex) => {
		setLineItems((preState) => {
			return preState?.filter((x, index) => index != removeIndex);
		});
	};

	const createInvoice = async () => {
		let data = {
			...formData,
			line_items: JSON.stringify(lineItems),
		};

		try {
			setLoading(true);
			let res = await Requests.InvoiceCreate(data);
			navigate("/invoices");
		} catch (error) {
			alert("Something went wrong");
			setLoading(false);
		}
	};

	return (
		<>
			<div className="m-5">
				<div className="my-4 flex justify-start">
					<button
						className="uppercase shadow px-2 text-blue-700 hover:bg-slate-100"
						onClick={() => navigate("/invoices")}
					>
						{" "}
						Invoices
					</button>
				</div>

				<div className="text-2xl text-gray-700 my-4">
					Create Invoice
				</div>

				<div className="mb-2">
					<label htmlFor=""> VAT (%)</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="number"
						name="vat"
						defaultValue={formData?.vat}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor=""> Service Charge(%)</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="number"
						name="service_charge"
						defaultValue={formData?.service_charge}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor=""> Discount</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="number"
						name="discount"
						defaultValue={formData?.discount}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor=""> Currency</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="currency"
						defaultValue={formData?.currency}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Date:</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="date"
						name="date"
						defaultValue={formData?.date}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
			</div>

			{/* BILL TO */}
			<div className="m-5">
				<h3 className="my-2 font-bold">Billed To</h3>
				<div className="mb-2">
					<label htmlFor="">Address Line 1</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						name="billed_to_line_1"
						defaultValue={formData?.billed_to_line_1}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Address Line 2</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						name="billed_to_line_2"
						defaultValue={formData?.billed_to_line_2}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Address Line 3</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						name="billed_to_line_3"
						defaultValue={formData?.billed_to_line_3}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
					/>
				</div>
			</div>

			{/* PAYABLE TO */}
			<div className="m-5">
				<h3 className="my-2 font-bold">Payable To</h3>
				<select
					className="mb-2"
					onChange={(e) => {
						const selectedAccount = accountArray[e.target.value];
						// handleChange(
						// 	"account_name",
						// 	selectedAccount.account_name
						// );
						// handleChange("bank_name", selectedAccount.bank_name);
						// handleChange(
						// 	"account_number",
						// 	selectedAccount.account_number
						// );
						setFormData({
							...formData,
							account_name: selectedAccount.account_name,
							bank_name: selectedAccount.bank_name,
							account_number: selectedAccount.account_number,
						});
					}}
				>
					{accountArray.map((account, i) => (
						<option key={i} value={i}>
							{account.account_name}
						</option>
					))}
				</select>

				<div className="mb-2">
					<label htmlFor="">Account Name</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm  p-0.5"
						name="account_name"
						defaultValue={formData?.account_name}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Bank Name</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm  p-0.5"
						name="bank_name"
						defaultValue={formData?.bank_name}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Account Number</label>
					<input
						type="text"
						className="border border-gray-300 mx-2 text-gray-900 text-sm  p-0.5"
						name="account_number"
						defaultValue={formData?.account_number}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
					/>
				</div>
			</div>

			{/* ITEMS TABLE */}
			<div className="m-5">
				<table className="my-3 ">
					<thead>
						<tr className="font-bold text-xl">
							<th>#</th>
							<th>Item</th>
							<th>Desc.</th>
							<th>Unit Price</th>
							<th>Qty</th>
						</tr>
					</thead>
					<tbody>
						{lineItems?.length > 0 &&
							lineItems?.map((row, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<input
											className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
											type="text"
											defaultValue={row?.item}
											onChange={(e) =>
												handleCellChange(
													index,
													"item",
													e.target.value
												)
											}
										/>
									</td>
									<td>
										<input
											className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
											type="text"
											defaultValue={row?.desc}
											onChange={(e) =>
												handleCellChange(
													index,
													"desc",
													e.target.value
												)
											}
										/>
									</td>
									<td>
										<input
											className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
											type="number"
											defaultValue={row?.price}
											onChange={(e) =>
												handleCellChange(
													index,
													"price",
													e.target.value
												)
											}
										/>
									</td>
									<td>
										<input
											className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
											type="number"
											defaultValue={row?.qty}
											onChange={(e) =>
												handleCellChange(
													index,
													"qty",
													e.target.value
												)
											}
										/>
									</td>
									<td>
										<button
											className="text-red-500 bg-gray-200 hover:bg-gray-300 font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2"
											onClick={() => removeItem(index)}
										>
											{" "}
											Remove{" "}
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>

				<button
					onClick={addTableRow}
					className="bg-gray-200 hover:bg-gray-300  font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2"
				>
					Add Row
				</button>

				<div className="mt-8">
					<button
						onClick={createInvoice}
						className="bg-orange-200 hover:bg-orange-300  font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2"
					>
						{loading ? "Processing..." : "Create"}
					</button>
				</div>
			</div>
		</>
	);
}

export default InvoiceCreate;
