import React from "react";
import Form from "./formData";


function InvoiceForm ({formData, setFormData, formTable, setFormTable}) {

    const handleChange = (formKey, value) => {
        setFormData((preState) => {
            preState[formKey] = value;
            return preState;
        })
    }


    const handleCellChange = (key, col, value) => {
        console.log('key, col, value :>> ', key, col, value);
        setFormTable((preState) => {
            preState[key][col] = value;
            return preState;
        })
    }

    const addTableRow = (e) => {
        setFormTable(preState => {
            return [...preState, {}]
        })
    }
    const removeItem = (removeIndex) => {
        setFormTable(preState => {
            return preState?.filter( (x, index) => index != removeIndex  )
        })
    }


    React.useEffect(() => {
        console.log('formTable :>> ', formTable);
    }, [formTable])
 
   

    return <>
        <div className="m-5">
            <div className="mb-2">
                <label htmlFor="">Invoice Number:</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                        type="text" 
                       name="invoiceNumber" 
                       defaultValue={formData?.invoiceNumber}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor=""> VAT  (%)</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                        type="number" 
                       name="vat" 
                       defaultValue={formData?.vat}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor=""> Service Charge(%)</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                        type="number" 
                       name="serviceCharge" 
                       defaultValue={formData?.serviceCharge}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Date:</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"  
                        type="text" 
                       name="date" 
                       defaultValue={formData?.date}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
        </div>

            {/* FROM ADDRESS */}

            
        <div className="m-5">
            <h3 className="my-2 font-bold">From Address</h3>
            <div className="mb-2">
                <label htmlFor="">Address Line 1</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"  
                        type="text" 
                       name="fromAddressLine1" 
                       defaultValue={formData?.fromAddressLine1}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Address Line 2</label>
                <input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"  
                        type="text" 
                       name="fromAddressLine2" 
                       defaultValue={formData?.fromAddressLine2}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Address Line 3</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"  
                       name="fromAddressLine3" 
                       defaultValue={formData?.fromAddressLine3}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>

        </div>



            {/* BILL TO */}
        <div className="m-5">
            <h3 className="my-2 font-bold">Billed To</h3>
            <div className="mb-2">
                <label htmlFor="">Address Line 1</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                       name="ToAddressLine1" 
                       defaultValue={formData?.ToAddressLine1}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Address Line 2</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                       name="ToAddressLine2" 
                       defaultValue={formData?.ToAddressLine2}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Address Line 3</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                       name="ToAddressLine3" 
                       defaultValue={formData?.ToAddressLine3}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
        </div>

            {/* PAYABLE TO */}
        <div className="m-5">
            <h3 className="my-2 font-bold">Payable To</h3>
            <div className="mb-2">
                <label htmlFor="">Line 1</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                       name="payableToAddressLine1" 
                       defaultValue={formData?.payableToAddressLine1}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Line 2</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded-lg p-0.5"
                       name="payableToAddressLine2" 
                       defaultValue={formData?.payableToAddressLine2}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Line 3</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded-lg p-0.5"
                       name="payableToAddressLine3" 
                       defaultValue={formData?.payableToAddressLine3}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
        </div>

            {/* ITEMS TABLE */}
        <div className="m-5">
            <table className="my-3 ">
                <tr className="font-bold text-xl">
                    <th>#</th>
                    <th>Item</th>
                    <th>Desc.</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                </tr>
                {
                    formTable?.length > 0 && formTable?.map( (row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5" type="text" defaultValue={row?.item} 
                                        onChange={ (e) => handleCellChange(index, 'item', e.target.value)} /></td>
                            <td><input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5" type="text" defaultValue={row?.desc}
                                        onChange={ (e) => handleCellChange(index, 'desc', e.target.value)} /></td>
                            <td><input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5" type="number" defaultValue={row?.price}
                                        onChange={ (e) => handleCellChange(index, 'price', e.target.value)} /></td>
                            <td ><input className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5" type="number" defaultValue={row?.qty} 
                                        onChange={ (e) => handleCellChange(index, 'qty', e.target.value)} /></td>
                            <td>
                                <button className="text-red-500 bg-gray-200 hover:bg-gray-300 font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2"
                                        onClick={() => removeItem(index)} > Remove </button>
                            </td>
                        </tr>
                    ))
                }
            </table>

            <button onClick={addTableRow} className="bg-gray-200 hover:bg-gray-300  font-medium rounded text-sm px-5 py-0.5 mr-2 mb-2">Add Row</button>
        </div>

{/* CONTACT */}
        <div className="m-5">
            <h3 className="my-2 font-bold">Contact</h3>
            <div className="mb-2">
                <label htmlFor="">Tel:</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded p-0.5"
                       name="telephone" 
                       defaultValue={formData?.telephone}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="">Email:</label>
                <input type="text" 
                        className="border border-gray-300 mx-2 text-gray-900 text-sm rounded-lg p-0.5"
                       name="email" 
                       defaultValue={formData?.email}
                       onChange={(e) => handleChange(e.target.name, e.target.value)} />
            </div>
        </div>
    
    </>
}

export default InvoiceForm;

