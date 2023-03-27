
const baseURL = "https://ads.bloomdigitmedia.com/api/";

export default {
    login:          baseURL + 'login',

    invoiceList:    baseURL + 'invoice',
    invoiceCreate:  baseURL + 'invoice',
    invoiceView:    id => `${baseURL}invoice/${id}`,
    invoiceUpdate:  id => `${baseURL}invoice/${id}`,
    invoiceDelete:  id => `${baseURL}invoice/${id}`,

    companyView:    id => `${baseURL}company-info/${id}`,
    

}