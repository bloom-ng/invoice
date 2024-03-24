import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "../../services/Requests";

function VoucherUpdate() {
	const [formData, setFormData] = React.useState({
		place: "",
		expense_head: "",
		month: "",
		date: "",
		beneficiary: "",
		amount_words: "",
		cash_cheque_no: "0",
		prepared_by: "",
		examined_by: "",
		authorized_for_payment: "",
		date_prepared: "",
		currency: "₦",
	});
	const [lineItems, setLineItems] = React.useState([
		{ item: "", desc: "", qty: "", price: "" },
	]);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	const params = useParams();

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

	React.useEffect(() => {
		(async () => {
			await getVoucher(params?.id);
		})();
	}, []);

	const getVoucher = async (id) => {
		try {
			let res = await Requests.VoucherView(id);
			console.log(
				"res Voucher :>> ",
				res,
				console.log("res.line_items :>> ", JSON.parse(res.line_items))
			);
			setFormData({ ...res, line_items: JSON.parse(res.line_items) });

			setLineItems(JSON.parse(res.line_items));
		} catch (error) {}
	};

	const updateVoucher = async () => {
		let data = {
			...formData,
			line_items: JSON.stringify(lineItems),
		};

		try {
			setLoading(true);
			let res = await Requests.VoucherUpdate(data, params?.id);
			navigate("/vouchers");
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
						onClick={() => navigate("/vouchers")}
					>
						{" "}
						Vouchers
					</button>
				</div>

				<div className="text-2xl text-gray-700 my-4">Edit Voucher</div>

				<div className="mb-2">
					<label htmlFor="">Place</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="place"
						defaultValue={formData?.place}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Expense Head</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="expense_head"
						defaultValue={formData?.expense_head}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Month</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="month"
						defaultValue={formData?.month}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="">Date</label>
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
				<div className="mb-2">
					<label htmlFor="">Beneficiary</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="beneficiary"
						defaultValue={formData?.beneficiary}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
				<div className="mb-2">
					<label htmlFor="amount_words">Amount in Words:</label>
					<input
						className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
						type="text"
						name="amount_words"
						id="amount_words"
						defaultValue={formData?.amount_words}
						onChange={(e) =>
							handleChange(e.target.name, e.target.value)
						}
						required
					/>
				</div>
			</div>

			{/* BILL TO */}
			{/* <div className="m-5">
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
			</div> */}

			{/* PAYABLE TO */}
			{/* <div className="m-5">
				<h3 className="my-2 font-bold">Payable To</h3>
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
			</div> */}

			{/* ITEMS TABLE */}
			<div className="m-5">
				<table className="my-3 ">
					<thead>
						<tr className="font-bold text-xl">
							<th>#</th>
							<th>Date</th>
							<th>Detailed Description.</th>
							<th>Unit Price</th>
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
											type="date"
											defaultValue={row?.date}
											onChange={(e) =>
												handleCellChange(
													index,
													"date",
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

				<div className="my-5">
					<div className="mb-2">
						<label htmlFor="cash_cheque_no">Cash/Cheque No:</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="text"
							name="cash_cheque_no"
							id="cash_cheque_no"
							defaultValue={formData?.cash_cheque_no}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="cash_cheque_no">Prepared By:</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="text"
							name="prepared_by"
							id="prepared_by"
							defaultValue={formData?.prepared_by}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="cash_cheque_no">Examined By:</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="text"
							name="examined_by"
							id="examined_by"
							defaultValue={formData?.examined_by}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="cash_cheque_no">
							Authorized For Payment:
						</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="text"
							name="authorized_for_payment"
							id="authorized_for_payment"
							defaultValue={formData?.authorized_for_payment}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="cash_cheque_no">Date Prepared:</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="date"
							name="date_prepared"
							id="date_prepared"
							defaultValue={formData?.date_prepared}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="cash_cheque_no">Currency:</label>
						<input
							className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
							type="text"
							name="currency"
							id="currency"
							defaultValue={formData?.currency}
							onChange={(e) =>
								handleChange(e.target.name, e.target.value)
							}
							required
						/>
					</div>
				</div>

				<div className="mt-8">
					<button
						onClick={updateVoucher}
						className="bg-orange-200 hover:bg-orange-300  font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2"
					>
						{loading ? "Processing..." : "Update"}
					</button>
				</div>
			</div>
		</>
	);
}

export default VoucherUpdate;
