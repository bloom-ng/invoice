import React from "react";
import Requests from "../../services/Requests";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import endpoints from "../../endpoints";

const List = () => {
	const location = useLocation();
	const mode = location.pathname.includes("receipt") ? "receipt" : "invoice";

	const [data, setData] = React.useState({
		loading: false,
		error: false,
		list: [],
	});
	const [load, setLoad] = React.useState(false);
	const [pagination, setPagination] = React.useState({
		currentPage: 1,
		prevUrl: null,
		nextUrl: null,
		firstUrl: null,
		lastUrl: null,
		links: [],
		total: 0,
	});

	const [searchQuery, setSearchQuery] = React.useState("");

	const { state: authState, dispatch } = React.useContext(AuthContext);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (localStorage.getItem("token") == null) {
			return navigate("/login");
		}
		(async function () {
			try {
				const result = await (mode === "receipt"
					? Requests.ReceiptList()
					: Requests.InvoiceList()
				);
				setData({ ...data, list: result?.data });
				setPagination({
					...pagination,
					currentPage: result?.current_page,
					prevUrl: result?.prev_page_url,
					nextUrl: result?.next_page_url,
					firstUrl: result?.first_page_url,
					lastUrl: result?.last_page_url,
					links: result?.links,
					total: result?.total,
				});
			} catch (error) {}
		})();
	}, [load, mode]);

	const goNext = async () => {
		const result = await Requests.GetRequest(pagination.nextUrl);
		setData({ ...data, list: result?.data });
		setPagination({
			...pagination,
			currentPage: result?.current_page,
			prevUrl: result?.prev_page_url,
			nextUrl: result?.next_page_url,
			firstUrl: result?.first_page_url,
			lastUrl: result?.last_page_url,
			links: result?.links,
			total: result?.total,
		});
	};
	const goBack = async () => {
		const result = await Requests.GetRequest(pagination.prevUrl);
		setData({ ...data, list: result?.data });
		setPagination({
			...pagination,
			currentPage: result?.current_page,
			prevUrl: result?.prev_page_url,
			nextUrl: result?.next_page_url,
			firstUrl: result?.first_page_url,
			lastUrl: result?.last_page_url,
			links: result?.links,
			total: result?.total,
		});
	};

	const search = async () => {
		const queryParams = new URLSearchParams({ search: searchQuery });
		const result = await (mode === "receipt"
			? Requests.ReceiptList(endpoints.receiptList + "?" + queryParams)
			: Requests.InvoiceList(endpoints.invoiceList + "?" + queryParams)
		);
		setData({ ...data, list: result?.data });
		setPagination({
			...pagination,
			currentPage: result?.current_page,
			prevUrl: result?.prev_page_url,
			nextUrl: result?.next_page_url,
			firstUrl: result?.first_page_url,
			lastUrl: result?.last_page_url,
			links: result?.links,
			total: result?.total,
		});
	};

	const deleteItem = async (id) => {
		if (!confirm(`Proceed to delete ${mode === "receipt" ? "Receipt" : "Invoice"}?`)) return;

		try {
			await (mode === "receipt"
				? Requests.ReceiptDelete(id)
				: Requests.InvoiceDelete(id)
			);
			setLoad((pre) => !pre);
		} catch (error) {
			alert("Something went wrong.");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<>
			<div className="px-8 py-8">
				<div className="flex justify-between">
					<div className="flex items-center">
						<input
							className="rounded-l-full border-gray-200 py-2 px-6 focus:border-none active:border-none"
							type="text"
							onChange={(event) =>
								setSearchQuery(event.target.value)
							}
							name=""
							id=""
						/>
						<button
							onClick={search}
							className="rounded-r-full px-2 py-2 bg-orange-600 text-white font-medium border border-orange-600"
						>
							Search
						</button>
					</div>
					<button
						className="uppercase shadow px-2 py-2 text-white bg-red-500 hover:bg-red-600"
						onClick={() => logout()}
					>
						Sign out
					</button>
				</div>
				<div className="text-2xl text-gray-700 my-4">{mode === "receipt" ? "Receipts" : "Invoices"}</div>

				<div className="my-4 flex justify-end">
					<button
						className="uppercase shadow px-2 text-blue-700 hover:bg-slate-100"
						onClick={() => navigate(mode === "receipt" ? "/receipt/add" : "/invoice/add")}
					>
						Create {mode === "receipt" ? "Receipt" : "Invoice"}
					</button>
				</div>

				<table className="w-full text-sm text-left text-gray-500 ">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
						<tr>
							<th scope="col" className="px-6 py-3">
								#
							</th>
							<th scope="col" className="px-6 py-3">
								VAT
							</th>
							<th scope="col" className="px-6 py-3">
								Service Charge
							</th>
							<th scope="col" className="px-6 py-3">
								Date
							</th>
							<th scope="col" className="px-6 py-3">
								Billing Line 1
							</th>
							<th scope="col" className="px-6 py-3">
								...
							</th>
						</tr>
					</thead>
					<tbody>
						{data.list?.length > 0 &&
							data.list?.map((row, index) => {
								return (
									<tr
										key={index}
										className="bg-white border-b "
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
										>
											{index + 1}
										</th>
										<td className="px-6 py-4">
											{row?.vat}%
										</td>
										<td className="px-6 py-4">
											{row?.service_charge}%
										</td>
										<td className="px-6 py-4">
											{row?.date}
										</td>
										<td className="px-6 py-4">
											{row?.billed_to_line_1}
										</td>
										<td className="px-6 py-4">
											<button
												className="text-orange-600 px-1"
												onClick={(e) =>
													navigate(
														`/${mode}/${row?.id}`
													)
												}
											>
												View
											</button>
											<button
												className="text-blue-600 px-1"
												onClick={(e) =>
													navigate(
														`/${mode}/edit/${row?.id}`
													)
												}
											>
												Edit
											</button>
											<button
												className="text-red-600 px-1"
												onClick={(e) =>
													deleteItem(row?.id)
												}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
				<div className="flex items-center justify-center gap-6 w-full">
					<button
						disabled={pagination.prevUrl == null}
						onClick={goBack}
						className={
							pagination.prevUrl
								? "opacity-100 shadow-sm border rounded px-6 py-2 my-4 font-medium pointer"
								: "opacity-20 shadow-sm border rounded px-6 py-2 my-4 font-medium pointer"
						}
					>
						Prev
					</button>
					{/* {pagination.links.map((link, index) => (
						<button
							className="hover:shadow-sm border rounded px-6 py-2 my-4 font-medium pointer"
							onClick={() => goTo(link.url)}
							key={index}
						>
							{link.label}
						</button>
					))} */}
					<button
						disabled={pagination.nextUrl == null}
						onClick={goNext}
						className={
							pagination.nextUrl
								? "opacity-100 shadow-sm border rounded px-6 py-2 my-4 font-medium pointer"
								: "opacity-20 shadow-sm border rounded px-6 py-2 my-4 font-medium pointer"
						}
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
};

export default List;
