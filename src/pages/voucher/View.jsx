import React from "react";
import { useParams } from "react-router-dom";
import Requests from "../../services/Requests";
import BloomLogo from "../../assets/BloomLogo";

function VoucherView() {
	const params = useParams();
	const companyId = 1;
	const [company, setCompany] = React.useState({});
	const [voucher, setVoucher] = React.useState({});
	const [lineItems, setLineItems] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			await getVoucher(params?.id);
			await getCompany(companyId);
		})();
	}, []);

	const getVoucher = async (id) => {
		try {
			let res = await Requests.VoucherView(id);
			setVoucher(res);

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
			subtotal += Number(row.price);
		});

		return subtotal;
	};

	const getNetTotal = () => {
		return getSubtotal();
	};

	const getDate = (date) => {
		let d = new Date(date);
		d = `${d.toDateString()}`;
		d = d.slice(4);

		return d;
	};

	function mainDate(voucherDate) {
		const originalDate = new Date(voucherDate);

		const year = originalDate.getFullYear().toString();
		const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
		const day = originalDate.getDate().toString().padStart(2, "0");

		const finalDate = year + month + day;

		return finalDate;
	}

	return (
		<div className="flex flex-col h-screen">
			<div className="py-4 px-8 flex-grow">
				<div className="flex justify-between">
					{/* BLOOM LOGO */}
					<div>
						<div className="pr-20 mr-1">
							<BloomLogo />
						</div>
						<div className="w-fullflex-col pr-8  mt-10">
							<p className=" font-semibold">
								Bloom Digital Media Ltd,
							</p>
							<p>{company?.address_line_1}</p>
							<p>{company?.address_line_2}</p>
							<p>{company?.address_line_3}</p>
						</div>
					</div>

					<div className="">
						<div className="mt-5">
							<div>
								<span className=" pb-0 font-extrabold text-5xl text-[#ff8100] uppercase">
									Voucher &nbsp;&nbsp;&nbsp;
								</span>
								{/* <p className="">{getDate(voucher?.date)}</p> */}
							</div>
							<div className="flex-col mt-8">
								<p className="font-normal my-1">
									Voucher No: {mainDate(voucher?.created_at)}
									{voucher?.id}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-row items-start justify-between">
					<div className="w-auto flex flex-col items-start mt-2 gap-2">
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Place:</p>
							<p className="underline">{voucher?.place}</p>
						</div>
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Month:</p>
							<p className="underline">{voucher?.month}</p>
						</div>
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Beneficiary:</p>
							<p className="underline">{voucher?.beneficiary}</p>
						</div>
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Amount (in Words):</p>
							<p className="underline">{voucher?.amount_words}</p>
						</div>
					</div>
					<div className="w-auto flex flex-col items-start mt-2 gap-6">
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Date:</p>
							<p className="underline">{voucher?.date}</p>
						</div>
						<div className="flex items-start justify-start gap-2">
							<p className="font-semibold">Expense Head:</p>
							<p className="underline">{voucher?.expense_head}</p>
						</div>
					</div>
				</div>

				<div className="border-b-[#ff8100] border-b-8 pt-8 pb-0"></div>

				<div></div>

				<div className="relative">
					<table className="w-full text-sm text-left text-black ">
						<thead className="text-xs text-white uppercase bg-[#ff8100] ">
							<tr>
								<th scope="col" className="px-3 py-3">
									#
								</th>
								<th scope="col" className="px-3 py-3">
									Date
								</th>
								<th scope="col" className="px-6 py-3">
									Detailed Description
								</th>
								<th scope="col" className="px-6 py-3">
									Amount {voucher?.currency}
								</th>
								{/* <th scope="col" className="px-6 py-3">
									Total {voucher?.currency}
								</th> */}
							</tr>
						</thead>
						<tbody>
							{lineItems?.length > 0 &&
								lineItems?.map((row, index) => {
									return (
										<tr
											key={index}
											className="bg-white border-b border-black "
										>
											<th
												scope="row"
												className="w-10 px-3 py-4 font-medium text-gray-900 "
											>
												{index + 1}
											</th>
											<td className="px-6 py-4 w-auto">
												{row?.item} <br /> {row?.date}
											</td>
											{/* <td className="px-6 py-4">{row?.desc}</td> */}
											<td className="px-6 py-4  w-auto">
												{row?.desc}
											</td>
											<td className="px-6 py-4">
												{voucher?.currency}
												{Number(
													row?.price
												).toLocaleString()}
											</td>
											{/* <td className="px-6 py-4">
												{voucher?.currency}
												{(
													row?.qty * row?.price
												).toLocaleString()}
											</td> */}
										</tr>
									);
								})}
						</tbody>
					</table>
					<div className="flex items-center justify-between">
						<div className="basis-2/5 self-start">
							<p className="text-lg mt-5 font-semibold self-start">
								{/* Note: Kindly pay to the Account number provided
								in the invoice, kindly share payment receipt
								after payment has been made. If for any reason a
								refund is requested, administrative charge will
								be deducted before refunds is made. */}
								Cash/Cheque No: {voucher.cash_cheque_no}
							</p>
						</div>
						<div className="basis-3/5 w-full items-center justify-center flex-col self-end">
							<div className="flex justify-between items-center gap-2 p-4 text-sm">
								<div className="flex flex-col gap-4">
									<div className="font-semibold">
										SUB TOTAL
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<div>-</div>
								</div>
								<div className="flex flex-col gap-4">
									<div className="font-semibold">
										{voucher?.currency}
										{getSubtotal().toLocaleString()}
									</div>
								</div>
							</div>

							<div className="flex justify-between w-full bg-[#ff8100]">
								<div className="px-6 py-4 text-white font-bold">
									TOTAL DUE:
								</div>

								<div className="px-6 py-4 text-white font-bold">
									{voucher?.currency}{" "}
									{parseFloat(
										getNetTotal().toFixed(2)
									).toLocaleString()}
								</div>
							</div>
						</div>
					</div>
					{/* <div className="border-b-orange-500 border-b-8 "></div> */}
				</div>
			</div>
			<footer className="">
				<div className="bg-[#ff8100] flex justify-between text-white px-6">
					{/* <div className="p-8 text-white">
						<span className="font-bold uppercase">
							PAY TO : &nbsp;&nbsp;&nbsp;
						</span>
						<p className="mt-4">{voucher?.account_name}</p>
						<p>{voucher?.bank_name}</p>
						<p>{voucher?.account_number}</p>
					</div>
					<div className="text-white mr-10 mt-6">
						<span className="text-white font-bold">
							CONTACT DETAILS:
						</span>
						<p className="">{company?.phone}</p>
						<p>{company?.email}</p>
					</div> */}

					<div className="mt-10 mb-5 w-full flex justify-between">
						<div className="w-auto flex flex-col items-start mt-2 gap-6">
							<div className="flex items-start justify-start gap-2">
								<p className="font-semibold">Prepared By:</p>
								<p className="underline">
									{voucher?.prepared_by}
								</p>
							</div>
							<div className="flex items-start justify-start gap-2">
								<p className="font-semibold">
									Authorized for payment:
								</p>
								<p className="underline">
									{voucher?.authorized_for_payment}
								</p>
							</div>
							<div className="flex items-start justify-start gap-2">
								<p className="font-semibold">Signatory:</p>
								<p className="underline"></p>
							</div>
						</div>
						<div className="w-auto flex flex-col items-start mt-2 gap-6">
							<div className="flex items-start justify-start gap-2">
								<p className="font-semibold">Examined By:</p>
								<p className="underline">
									{voucher?.examined_by}
								</p>
							</div>
							<div className="flex items-start justify-start gap-2">
								<p className="font-semibold">Date:</p>
								<p className="underline">{voucher?.date}</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default VoucherView;
