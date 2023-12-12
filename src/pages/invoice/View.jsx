import React from "react";
import { useParams } from "react-router-dom";
import Requests from "../../services/Requests";
import BloomLogo from "../../assets/BloomLogo";

function InvoiceView() {
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
    return (getSubtotal() * invoice.vat) / 100;
  };

  const getServiceCharge = () => {
    return (getSubtotal() * invoice.service_charge) / 100;
  };

  const getNetTotal = () => {
    return getSubtotal() + getVat() + getServiceCharge();
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
              <p className=" font-semibold">Bloom Digital Media,</p>
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
                  Invoice No: INV{mainDate(invoice?.created_at)}
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
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Item Description
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Description
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Unit Price &#8358;
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Total &#8358;
                </th>
              </tr>
            </thead>
            <tbody>
              {lineItems?.length > 0 &&
                lineItems?.map((row, index) => {
                  return (
                    <tr key={index} className="bg-white border-b border-black ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 w-80">
                        {row?.item} <br /> {row?.desc}
                      </td>
                      {/* <td className="px-6 py-4">{row?.desc}</td> */}
                      <td className="px-6 py-4">
                        &#8358;{Number(row?.price).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{row?.qty}</td>
                      <td className="px-6 py-4">
                        &#8358;{(row?.qty * row?.price).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}

              <tr>
                <th scope="col" className="px-6 py-4">
                <p className="text-left w-60 h-8 text-xs">
                    Note: Kindly pay to the Account number provided in the
                    invoice, kindly share payment receipt after payment has been
                    made. If for any reason a refund is requested,
                    administrative charge will be deducted before refunds is
                    made.
                  </p>
                </th>
                <th scope="col" className="px-6 py-4"></th>
                {/* <th scope="col" className="px-6 py-4"></th> */}
                <th scope="col" className="px-6 py-4">
                  SUB TOTAL
                </th>
                <th scope="col" className="px-6 py-4"></th>
                <th scope="col" className="px-6 py-4">
                  &#8358;{getSubtotal().toLocaleString()}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-4"></th>
                <th scope="col" className="px-6 py-4"></th>
                {/* <th scope="col" className="px-6 py-4"></th> */}
                <th scope="col" className="px-6 py-4">
                  VAT
                </th>
                <th scope="col" className="px-6 py-4">
                  {invoice?.vat}%
                </th>
                <th scope="col" className="px-6 py-4 ">
                  &#8358;{parseFloat(getVat().toFixed(2)).toLocaleString()}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-4">
                {/* <p className="text-left w-60 h-8 text-xs">
                    Note: Kindly pay to the Account number provided in the
                    invoice, kindly share payment receipt after payment has been
                    made. If for any reason a refund is requested,
                    administrative charge will be deducted before refunds is
                    made.
                  </p> */}
                </th>
                <th scope="col" className="px-6 py-4"></th>
                {/* <th scope="col" className="px-6 py-4"></th> */}
                <th scope="col" className="px-6 py-4">
                  SERVICE CHARGE
                </th>
                <th scope="col" className="px-6 py-4">
                  {invoice?.service_charge}%
                </th>
                <th scope="col" className="px-6 py-4">
                  &#8358;
                  {parseFloat(getServiceCharge().toFixed(2)).toLocaleString()}
                </th>
              </tr>
              <tr className="">
                <th scope="col" className="">
                  {/* <p className="text-left w-60 h-8 text-xs">
                    Note: Kindly pay to the Account number provided in the
                    invoice, kindly share payment receipt after payment has been
                    made. If for any reason a refund is requested,
                    administrative charge will be deducted before refunds is
                    made.
                  </p> */}
                </th>
                <th scope="col" className="px-6 py-4"></th>
                {/* <th scope="col" className="px-6 py-4"></th> */}
                <th
                  scope="col"
                  className="px-6 py-4 border-t-2 bg-[#ff8100] text-white"
                >
                  TOTAL DUE:
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-t-2 bg-[#ff8100]"
                ></th>
                <th
                  scope="col"
                  className="px-6 py-4 border-t-2 bg-[#ff8100] text-white"
                >
                  &#8358;{" "}
                  {parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
                </th>
              </tr>
            </tbody>
          </table>
          {/* <div className="border-b-orange-500 border-b-8 "></div> */}
        </div>

        {/* <div className="fixed bottom-5 left-20 flex">
        <p className="mx-4">Bloom Digital Media + (234) 7086278644</p>
        <p>Email- info@bloomdigitmedia.com</p>
    </div> */}
        <div className="my-20">
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
            <span className="text-white font-bold">CONTACT DETAILS:</span>
            <p className="">{company?.phone}</p>
            <p>{company?.email}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InvoiceView;
