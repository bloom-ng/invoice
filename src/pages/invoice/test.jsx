import React from "react";
import { useParams } from "react-router-dom";
import Requests from "../../services/Requests";
import BloomLogo from "../../assets/BloomLogo";

function TestView() {
	const params = useParams();
	const companyId = 1;
	const [company, setCompany] = React.useState({});
	const [invoice, setInvoice] = React.useState({});
	const [lineItems, setLineItems] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			await getInvoice(params?.id);
			await getCompany(companyId);
		})();
	}, []);

	const getInvoice = async (id) => {
		try {
			let res = await Requests.InvoiceView(id);
			setInvoice(res);

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
		return ((getSubtotal() - invoice.discount) * invoice.vat) / 100;
	};

	const getServiceCharge = () => {
		return (
			((getSubtotal() - invoice.discount) * invoice.service_charge) / 100
		);
	};

	const getNetTotal = () => {
		return getSubtotal() + getVat() + getServiceCharge() - invoice.discount;
	};

	const getDate = (date) => {
		let d = new Date(date);
		d = `${d.toDateString()}`;
		d = d.slice(4);

		return d;
	};

	function mainDate(invoiceDate) {
		const originalDate = new Date(invoiceDate);

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
						<div className="flex-col pr-8  mt-10">
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
									Invoice &nbsp;&nbsp;&nbsp;
								</span>
								<p className="">{getDate(invoice?.date)}</p>
							</div>
							<div className="flex-col mt-8">
								<p className="font-normal my-1">
									Invoice No: INV
									{mainDate(invoice?.created_at)}
									{invoice?.id}
									{}
								</p>
								<div className="flex items-center gap-2 mt-2">
									<p className="font-semibold">To:</p>
									<p>{invoice?.billed_to_line_1}</p>
								</div>
								<p>{invoice?.billed_to_line_2}</p>
								<p>{invoice?.billed_to_line_3}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex justify-between font-bold mt-2">
					{/* <div className="flex-col">
          <p className="font-normal my-1">
            Invoice No: INV{mainDate(invoice?.created_at)}
            {invoice?.id}
            {}
          </p>
          <p className="font-normal mb-1">Billed To:</p>
          <p>{invoice?.billed_to_line_1}</p>
          <p>{invoice?.billed_to_line_2}</p>
          <p>{invoice?.billed_to_line_3}</p>
        </div> */}
					<div className="flex-col mt-2 pr-8 ">
						{/* <p>{company?.address_line_1}</p>
          <p>{company?.address_line_2}</p>
          <p>{company?.address_line_3}</p> */}

						{/* <p className="mt-6">{getDate(invoice?.date)}</p> */}
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
								<th scope="col" className="px-6 py-3">
									Item Description
								</th>
								{/* <th scope="col" className="px-6 py-3">
                  Description
                </th> */}
								<th scope="col" className="px-6 py-3">
									Unit Price {invoice?.currency}
								</th>
								<th scope="col" className="px-6 py-3">
									Qty
								</th>
								<th scope="col" className="px-6 py-3">
									Total {invoice?.currency}
								</th>
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
											<td className="px-6 py-4 w-full">
												{row?.item} <br /> {row?.desc}
											</td>
											{/* <td className="px-6 py-4">{row?.desc}</td> */}
											<td className="px-6 py-4">
												{invoice?.currency}
												{Number(
													row?.price
												).toLocaleString()}
											</td>
											<td className="px-6 py-4">
												{row?.qty}
											</td>
											<td className="px-6 py-4">
												{invoice?.currency}
												{(
													row?.qty * row?.price
												).toLocaleString()}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<div className="flex items-center justify-between">
						<div className="basis-2/5 self-start">
							<p className="text-xs mt-5 font-bold self-start">
								Note: Kindly pay to the Account number provided
								in the invoice, kindly share payment receipt
								after payment has been made. If for any reason a
								refund is requested, administrative charge will
								be applied before refunds is made.
							</p>
						</div>
						<div className="basis-3/5 w-full items-center justify-center flex-col self-end">
							<div className="flex justify-between items-center gap-2 p-4 text-sm">
								<div className="flex flex-col gap-4">
									<div className="font-semibold">
										SUB TOTAL
									</div>
									<div>DISCOUNT</div>
									<div>SUB TOTAL LESS DISCOUNT</div>
									<div>VAT</div>
									<div>SERVICE CHARGE</div>
									{/* <div>DEPOSIT REQUESTED</div>
									<div>DEPOSIT DUE</div> */}
								</div>
								<div className="flex flex-col gap-4">
									<div>-</div>
									<div>-</div>
									<div>-</div>
									<div>{invoice?.vat}%</div>
									<div>{invoice?.service_charge}%</div>
									{/* <div>-</div>
									<div>-</div> */}
								</div>
								<div className="flex flex-col gap-4">
									<div className="font-semibold">
										{invoice?.currency}
										{getSubtotal().toLocaleString()}
									</div>
									<div>
										{invoice?.currency}
										{invoice?.discount}
									</div>
									<div>
										{invoice?.currency}
										{(
											getSubtotal() - invoice?.discount
										).toLocaleString()}
									</div>
									<div>
										{invoice?.currency}
										{parseFloat(
											getVat().toFixed(2)
										).toLocaleString()}
									</div>
									<div>
										{invoice?.currency}
										{parseFloat(
											getServiceCharge().toFixed(2)
										).toLocaleString()}
									</div>
									{/* <div>
										{invoice?.currency}{" "}
										{parseFloat(
											getNetTotal().toFixed(2)
										).toLocaleString()}
									</div>
									<div>
										{invoice?.currency}{" "}
										{parseFloat(
											getNetTotal().toFixed(2)
										).toLocaleString()}
									</div> */}
								</div>
							</div>

							<div className="flex justify-between w-full bg-[#ff8100]">
								<div className="px-6 py-4 text-white font-bold">
									TOTAL DUE:
								</div>

								<div className="px-6 py-4 text-white font-bold">
									{invoice?.currency}{" "}
									{parseFloat(
										getNetTotal().toFixed(2)
									).toLocaleString()}
								</div>
							</div>
						</div>
					</div>
					{/* <div className="border-b-orange-500 border-b-8 "></div> */}
				</div>

				{/* <div className="fixed bottom-5 left-20 flex">
        <p className="mx-4">Bloom Digital Media + (234) 7086278644</p>
        <p>Email- info@bloomdigitmedia.com</p>
    </div> */}
				<div className="mt-10 mb-5">
					<p className="font-bold">THANKS FOR YOUR PATRONAGE!</p>
				</div>
			</div>
			<footer className="">
				<div className="bg-[#ff8100] flex justify-between">
					<div className="p-8 text-white">
						<span className="font-bold uppercase">
							PAY TO : &nbsp;&nbsp;&nbsp;
						</span>
						<p className="mt-4">{invoice?.account_name}</p>
						<p>{invoice?.bank_name}</p>
						<p>{invoice?.account_number}</p>
					</div>
					<div className="text-white mr-10 mt-6">
						<span className="text-white font-bold">
							CONTACT DETAILS:
						</span>
						<p className="">{company?.phone}</p>
						<p>{company?.email}</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default TestView;
