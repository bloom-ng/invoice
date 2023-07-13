// handle all requests
import endpoints from "../endpoints";
import axios from "axios";

const Requests = {};

const Request = axios.create({
    baseURL: '',
    timeout: 15000,
    headers: {'X-Powered-By': 'Bloom', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
  });


 Requests.Login = async (email, password) => {
    try {
        let res = await Request.post(endpoints.login, {
            'email'     : email,
            'password'  : password
        });
        if (res.data.status == 'error') {
            throw new Error(res.message)
        }
        return res.data;
        
    } catch (error) {
        throw new Error(error);
    }
  }

 Requests.InvoiceList = async (url) => {
    try {
        let res = await Request.get(url ? url : endpoints.invoiceList);
        return res.data;
        
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

 Requests.InvoiceView = async (id) => {
    try {
        let res = await Request.get( endpoints.invoiceView(id));
console.log(res.data.data[0]);
        return res.data.data[0];
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

 Requests.InvoiceCreate = async (data) => {
    try {
        let res = await Request.post( endpoints.invoiceCreate,  data);
        return res.data;
        
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

 Requests.InvoiceUpdate = async (data, id) => {
    try {
        let res = await Request.put( endpoints.invoiceUpdate(id),  data);
        return res.data;
        
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

 Requests.InvoiceDelete = async (id) => {
    try {
        let res = await Request.delete( endpoints.invoiceDelete(id));
        return res.data;
        
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

 Requests.CompanyView = async (id) => {
    try {
        let res = await Request.get( endpoints.companyView(id));
        return res.data;
        
    } catch (error) {
        checkAuth(error);
        throw new Error(error);
    }
  }

  function checkAuth(error) {
    if (error.response.status == 401 || error.response.status == 403 ) {
       return  window.location.href = "/login"
    }
  }


  export default Requests;

