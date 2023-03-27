import React from "react";
import Requests from "../../services/Requests";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { useNavigate } from "react-router-dom";


const InvoiceList = () =>{

    const [data, setData] = React.useState({loading: false, error: false, list: []});
    const [load, setLoad] = React.useState(false);
    const [pagination, setPagination] = React.useState({currentPage: 1, prevUrl: null, nextUrl: null, firstUrl: null, lastUrl: null, links: [], total: 0});

    const {state: authState, dispatch} = React.useContext(AuthContext);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if (localStorage.getItem('token') == null)  {
           return navigate('/login')
        }
        ( async function () {
            try {
              const result = await Requests.InvoiceList();
              setData({...data, list: result?.data});
              setPagination({
                ...pagination, 
                currentPage: result?.current_page, 
                prevUrl: result?.prev_page_url,
                nextUrl: result?.next_page_url,
                firstUrl: result?.first_page_url,
                lastUrl: result?.last_page_url,
                links: result?.links,
                total: result?.total
            })
              
            } catch ( error ) {
              
            }
          } )();
    }, [load])


    const deleteInvoice = async (id) => {
        if (!confirm('Proceed to delete Invoice?')) return;

        try {
            await Requests.InvoiceDelete(id);
            setLoad( pre => !pre)
        } catch (error) {
            alert('Something went wrong.')
        }
    }

    const logout = ()=> {
        // dispatch("LOGOUT");
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login');
    }


    return (
        <>
            <div className="px-8 py-8">
                <div className="flex justify-end">
                    <button className="uppercase shadow px-2 py-2 text-white bg-red-500 hover:bg-red-600" onClick={ () => logout()}>Sign out</button>
                </div>
            <div className="text-2xl text-gray-700 my-4">
                Invoices
            </div>

            <div className="my-4 flex justify-end">
                <button className="uppercase shadow px-2 text-blue-700 hover:bg-slate-100" onClick={ () => navigate('/invoice/add')}>Create Invoice</button>
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
                

                {data.list?.length > 0 && data.list?.map((row, index) => {
            return <tr key={index} className="bg-white border-b ">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
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
                        <button className="text-orange-600 px-1" onClick={e => navigate(`/invoice/${row?.id}`) }>View</button>
                        <button className="text-blue-600 px-1" onClick={e => navigate(`/invoice/edit/${row?.id}`) }>Edit</button>
                        <button className="text-red-600 px-1" onClick={e => deleteInvoice(row?.id) }>Delete</button>
                    </td>
            
            </tr>
        })}

            </tbody>
        </table>
            </div>
        </>
    )
}

export default InvoiceList;
