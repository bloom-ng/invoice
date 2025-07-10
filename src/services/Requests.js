// handle all requests
import endpoints from "../endpoints";
import axios from "axios";

const Requests = {};

const Request = axios.create({
	baseURL: "",
	timeout: 15000,
	headers: {
		"X-Powered-By": "Bloom",
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

Requests.Login = async (email, password) => {
	try {
		let res = await Request.post(endpoints.login, {
			email: email,
			password: password,
		});
		if (res.data.status == "error") {
			throw new Error(res.message);
		}
		return res.data;
	} catch (error) {
		throw new Error(error);
	}
};

Requests.InvoiceList = async (url) => {
	try {
		let res = await Request.get(url ? url : endpoints.invoiceList);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.InvoiceView = async (id) => {
	try {
		let res = await Request.get(endpoints.invoiceView(id));
		console.log(res.data.data[0]);
		return res.data.data[0];
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.InvoiceCreate = async (data) => {
	try {
		let res = await Request.post(endpoints.invoiceCreate, data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.InvoiceUpdate = async (data, id) => {
	try {
		let res = await Request.put(endpoints.invoiceUpdate(id), data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.InvoiceDelete = async (id) => {
	try {
		let res = await Request.delete(endpoints.invoiceDelete(id));
		// console.log(res);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.VoucherList = async (url) => {
	try {
		let res = await Request.get(url ? url : endpoints.voucherList);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.VoucherView = async (id) => {
	try {
		let res = await Request.get(endpoints.voucherView(id));
		console.log(res.data.data[0]);
		return res.data.data[0];
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.VoucherCreate = async (data) => {
	try {
		let res = await Request.post(endpoints.voucherCreate, data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.VoucherUpdate = async (data, id) => {
	try {
		let res = await Request.put(endpoints.voucherUpdate(id), data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.VoucherDelete = async (id) => {
	try {
		let res = await Request.delete(endpoints.voucherDelete(id));
		// console.log(res);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.CompanyView = async (id) => {
	try {
		let res = await Request.get(endpoints.companyView(id));
		// console.log(res.data.data[0]);
		return res.data.data[0];
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.GetRequest = async (url) => {
	try {
		let res = await Request.get(url);
		// console.log(res.data.data[0]);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.PostRequest = async (url, data) => {
	try {
		let res = await Request.post(url, data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.ReceiptList = async (url) => {
	try {
		let res = await Request.get(url ? url : endpoints.receiptList);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.ReceiptView = async (id) => {
	try {
		let res = await Request.get(endpoints.receiptView(id));
		return res.data.data[0];
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.ReceiptCreate = async (data) => {
	try {
		let res = await Request.post(endpoints.receiptCreate, data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.ReceiptUpdate = async (data, id) => {
	try {
		let res = await Request.put(endpoints.receiptUpdate(id), data);
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

Requests.ReceiptDelete = async (id) => {
	try {
		let res = await Request.delete(endpoints.receiptDelete(id));
		return res.data;
	} catch (error) {
		checkAuth(error);
		throw new Error(error);
	}
};

function checkAuth(error) {
	if (error.response.status == 401 || error.response.status == 403) {
		return (window.location.href = "/login");
	}
}

export default Requests;
