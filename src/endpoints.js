const baseURL = "https://ads.bloomdigitmedia.com/api/";
// const baseURL = "http://127.0.0.1:8000/api/";

export default {
	login: baseURL + "login",

	invoiceList: baseURL + "invoice",
	invoiceCreate: baseURL + "invoice",
	invoiceView: (id) => `${baseURL}invoice/${id}`,
	invoiceUpdate: (id) => `${baseURL}invoice/${id}`,
	invoiceDelete: (id) => `${baseURL}invoice/${id}`,

	voucherList: baseURL + "voucher",
	voucherCreate: baseURL + "voucher",
	voucherView: (id) => `${baseURL}voucher/${id}`,
	voucherUpdate: (id) => `${baseURL}voucher/${id}`,
	voucherDelete: (id) => `${baseURL}voucher/${id}`,

	companyView: (id) => `${baseURL}company-info/${id}`,
};
