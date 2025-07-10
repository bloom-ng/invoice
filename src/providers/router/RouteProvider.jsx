import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "../../pages/auth";
import {
	InvoiceList,
	InvoiceView,
	InvoiceCreate,
	InvoiceUpdate,
} from "../../pages/invoice";
import {
	ReceiptList,
	ReceiptView,
	ReceiptCreate,
	ReceiptUpdate,
} from "../../pages/receipt";
import {
	VoucherList,
	VoucherView,
	VoucherCreate,
	VoucherUpdate,
} from "../../pages/voucher";
import HomePage from "../../pages/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/invoices",
		element: <InvoiceList />,
	},
	{
		path: "/invoice",
		element: <InvoiceList />,
	},
	{
		path: "/invoice/:id",
		element: <InvoiceView />,
	},
	{
		path: "/invoice/add",
		element: <InvoiceCreate />,
	},
	{
		path: "/invoice/edit/:id",
		element: <InvoiceUpdate />,
	},
	// Receipt routes
	{
		path: "/receipts",
		element: <ReceiptList />,
	},
	{
		path: "/receipt",
		element: <ReceiptList />,
	},
	{
		path: "/receipt/:id",
		element: <ReceiptView />,
	},
	{
		path: "/receipt/add",
		element: <ReceiptCreate />,
	},
	{
		path: "/receipt/edit/:id",
		element: <ReceiptUpdate />,
	},
	{
		path: "/vouchers",
		element: <VoucherList />,
	},
	{
		path: "/voucher",
		element: <VoucherList />,
	},
	{
		path: "/voucher/:id",
		element: <VoucherView />,
	},
	{
		path: "/voucher/add",
		element: <VoucherCreate />,
	},
	{
		path: "/voucher/edit/:id",
		element: <VoucherUpdate />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

const RouteProvider = ({ fallbackElement }) => {
	return <RouterProvider fallbackElement={fallbackElement} router={router} />;
};

export default RouteProvider;
