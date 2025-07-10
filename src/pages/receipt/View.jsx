import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Requests from "../../services/Requests";
import BloomLogo from "../../assets/BloomLogo";

function View() {
	const params = useParams();
	const location = useLocation();
	const mode = location.pathname.includes("receipt") ? "receipt" : "invoice";
	const companyId = 1;
	const [company, setCompany] = React.useState({});
	const [item, setItem] = React.useState({});
	const [lineItems, setLineItems] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			await getItem(params?.id);
			await getCompany(companyId);
		})();
	}, [mode, params?.id]);

	const getItem = async (id) => {
		try {
			let res = await (mode === "receipt"
				? Requests.ReceiptView(id)
				: Requests.InvoiceView(id)
			);
			setItem(res);
			setLineItems(JSON.parse(res.line_items));
		} catch (error) {}
	};

	const getCompany = async (id) => {
		try {
			let res = await Requests.CompanyView(id);
			setCompany(res);
		} catch (error) {}
	};

	const getSubtotal = () => {
		let subtotal = 0;
		lineItems.forEach((row) => {
			subtotal += Number(row.price) * Number(row.qty);
		});
		return subtotal;
	};

	const getVat = () => {
		return ((getSubtotal() - item.discount) * item.vat) / 100;
	};

	const getServiceCharge = () => {
		return (
			((getSubtotal() - item.discount) * item.service_charge) / 100
		);
	};

	const getNetTotal = () => {
		return getSubtotal() + getVat() + getServiceCharge() - item.discount;
	};

	const getDate = (date) => {
		let d = new Date(date);
		d = `${d.toDateString()}`;
		d = d.slice(4);
		return d;
	};

	function mainDate(date) {
		const originalDate = new Date(date);
		const year = originalDate.getFullYear().toString();
		const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
		const day = originalDate.getDate().toString().padStart(2, "0");
		const finalDate = year + month + day;
		return finalDate;
	}

	return (
		<>
			<div className="flex w-full flex-row">
				<div className="flex flex-row w-1/15 h-300vh">
					<div className="bg-white w-2/5"></div>
					<div className="flex flex-col w-3/5">
						<div className="bg-[#ffe6cd] h-1/5"></div>
						<div className="bg-[#FFCD9A] h-1/5"></div>
						<div className="bg-[#FFB367] h-1/5"></div>
						<div className="bg-[#FF9934] h-1/5"></div>
						<div className="bg-[#ff8100] h-1/5"></div>
					</div>
				</div>
				<div>
					<div className="flex flex-col w-full  px-14">
						<div className="flex flex-col justify-between z-10">
							<div className="-ml-4">
								<BloomLogo />
							</div>
						</div>
						<div className="flex flex-col z-0 -mt-28">
							<div>
								<div className="flex flex-row-reverse">
									<div className="text-[60px] font-bold text-[#ff8100]">
										<u>{mode === "receipt" ? "RECEIPT" : "INVOICE"}</u>
									</div>
								</div>
								<div className="flex flex-row-reverse gap-10 leading-[16px]">
									<div className="">
										<p className="font-bold">{mode === "receipt" ? "Receipt No:" : "Invoice No:"}</p>
										<p>
											{mode === "receipt" ? "REC" : "INV"}
											{mainDate(item?.created_at)}
											{item?.id}
										</p>
									</div>
									<div className="">
										<p className="font-bold">Date</p>
										<p>{getDate(item?.date)}</p>
									</div>
								</div>
								<div className="flex flex-col leading-[18px] justify-start text-base">
									<p className="font-bold leading-[22px]">
										{item?.billed_to_line_1}
									</p>
									<p className="">
										{item?.billed_to_line_2}
									</p>
									<p>{item?.billed_to_line_3}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-10">
						<table className="w-full text-sm text-left text-black ">
							<thead className="text-[14px] text-black font-bold border-b border-b-[#C63028]">
								<tr>
									<th scope="col" className="px-12 py-3 border-b border-b-white">
										No.
									</th>
									<th scope="col" className="pr-6 py-3">
										Item Description
									</th>
									<th scope="col" className="px-6 py-3">
										Unit Price {item?.currency}
									</th>
									<th scope="col" className="px-6 py-3">
										Qty
									</th>
									<th scope="col" className="px-6 py-3">
										Total {item?.currency}
									</th>
								</tr>
							</thead>
							<tbody>
								{lineItems?.length > 0 &&
									lineItems?.map((row, index) => {
										return (
											<tr key={index} className="bg-white border-b border-b-[#C63028] ">
												<th scope="row" className="w-10 px-12 text-bold py-4 font-medium border-b border-b-white text-gray-900 ">
													0{index + 1}
												</th>
												<td className="pr-6 py-4 w-full">
													{row?.item} <br /> {row?.desc}
												</td>
												<td className="px-6 py-4">
													{item?.currency}
													{Number(row?.price).toLocaleString()}
												</td>
												<td className="px-6 py-4">
													{row?.qty}
												</td>
												<td className="px-6 py-4">
													{item?.currency}
													{(row?.qty * row?.price).toLocaleString()}
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
						<div className="pt-8 w-full flex">
							<div className="w-6/15">
								<div className=""></div>
							</div>
							<div className="w-9/15 items-center justify-center flex-col self-end">
								<div className="flex justify-between pb-2 items-center gap-2 text-sm">
									<div className="flex flex-col z-20">
										<div className="p-4 font-semibold bg-[#FFCD9A]">
											Sub Total
										</div>
										<div className="p-4 font-semibold bg-[#FFE6CD]">
											Discount
										</div>
										<div className="p-4 font-semibold bg-[#FFCD9A]">
											Sub Total Less Discount
										</div>
										<div className="p-4 font-semibold bg-[#FFE6CD]">
											VAT
										</div>
										<div className="p-4 font-semibold bg-[#FFCD9A]">
											Service Charge
										</div>
										{/* <div>DEPOSIT REQUESTED</div>
										<div>DEPOSIT DUE</div> */}
									</div>
									<div className="flex flex-col">
										<div className="p-4 font-semibold -mx-64 text-center  bg-[#FFCD9A]">
											-
										</div>
										<div className="p-4 font-semibold -mx-64 text-center  bg-[#FFE6CD]">
											-
										</div>
										<div className="p-4 font-semibold -mx-64 text-center  bg-[#FFCD9A]">
											-
										</div>
										<div className="p-4 font-semibold -mx-64 text-center  bg-[#FFE6CD]">
											{item?.vat}%
										</div>
										<div className="p-4 font-semibold -mx-64 text-center  bg-[#FFCD9A]">
											{item?.service_charge}%
										</div>
										{/* <div>-</div>
										<div>-</div> */}
									</div>
									<div className="flex flex-col">
										<div className="font-semibold p-4  bg-[#FFCD9A]">
											{item?.currency}
											{getSubtotal().toLocaleString()}
										</div>
										<div className="p-4  bg-[#FFE6CD]">
											{item?.currency}
											{item?.discount}
										</div>
										<div className="p-4  bg-[#FFCD9A]">
											{item?.currency}
											{(
												getSubtotal() -
												item?.discount
											).toLocaleString()}
										</div>
										<div className="p-4  bg-[#FFE6CD]">
											{item?.currency}
											{parseFloat(
												getVat().toFixed(2)
											).toLocaleString()}
										</div>
										<div className="p-4  bg-[#FFCD9A]">
											{item?.currency}
											{parseFloat(
												getServiceCharge().toFixed(2)
											).toLocaleString()}
										</div>
										{/* <div>
										{item?.currency} {parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
										</div>
										<div>
										{item?.currency} {parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
										</div> */}
									</div>
								</div>
								<div className="flex justify-between w-full bg-[#ff8100]">
									<div className="px-6 py-4 text-white font-bold">
										Total:
									</div>
									<div className="px-6 py-4 text-white font-bold">
										{item?.currency} {parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
									</div>
								</div>
							</div>
						</div>
						<div className="pt-12 pb-4 px-12 flex gap-8">
							<div className="w-9/15">
								<p className="text-md font-bold">Note: </p>
								<p className="text-sm self-start">
									Kindly pay to the Account number provided in the {mode === "receipt" ? "receipt" : "invoice"}, kindly share payment receipt after payment has been made. If for any reason a refund is requested, administrative charge will be applied before refunds is made.
								</p>
							</div>
							<div className="w-6/15 text-sm">
								<div className="text-black">
									<span className="font-bold">PAY TO : &nbsp;&nbsp;&nbsp;</span>
									<p className="text-md">{item?.account_name}</p>
									<p>{item?.bank_name}</p>
									<p>{item?.account_number}</p>
								</div>
							</div>
						</div>
						<div className=" px-12 pb-6">
							<div className="flex flex-row text-xs gap-2 justify-between border-t border-t-[#C63028]">
								<div className="pt-8 pr-32">
									<p className="text-md font-bold text-black">
										Thanks For Your Business!
									</p>
								</div>
								<div className="flex flex-col pt-8 items-center gap-2">
									<img className="w-6" src="/viber.svg" alt="" />
									<p className="text-md font-semibold">
										{company?.phone}
									</p>
								</div>
								<div className="flex flex-col pt-8 items-center gap-2">
									<img className="w-6" src="/link.svg" alt="" />
									<p className="text-md font-semibold">
										<a href="https://bloomdigitmedia.com" target="_blank" rel="noopener noreferrer">
											bloomdigitmedia.com
										</a>
									</p>
								</div>
								<div className="flex flex-col pt-8 items-center gap-2">
									<img className="w-6" src="/location.svg" alt="" />
									<p className="text-md font-semibold text-center">
										Plot 91A, 43 Cres,<br />
										Gwarinpa Estate, Gwarinpa 901108<br />
										Abuja, Nigeria<br />
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default View;
