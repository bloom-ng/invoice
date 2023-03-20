import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import InvoiceForm from './components/InvoiceForm';
import Invoice from './components/Invoice';
// import Form from './components/form';
// import TableData from './components/table';

const INITIAL_FORM_DATA = {
  vat: 7.5,
  serviceCharge: 10,
  fromAddressLine1: "G 10, Pathfield Mall,",
  fromAddressLine2: "4th Avenue, Gwarimpa",
  fromAddressLine3: "Abuja, Nigeria",
  telephone: "Bloom Digital Media + (234) 7086278644",
  email:"Email- info@bloomdigitmedia.com",

}

function App() {
  const [showInvoice, setShowInvoice] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [formTable, setFormTable] = useState([])


  return (
    <div className="App">
        {showInvoice 
          ? <Invoice formData={formData} formTable={formTable} /> 
          : <InvoiceForm 
              formData={formData} 
              setFormData={setFormData}
              formTable={formTable}
              setFormTable={setFormTable}
               />
        }
     

        {/* Show Invoice values for debugging purpose */}
        <br />
        <div className=' fixed bottom-0 bg-orange-500 min-w-full' onClick={() => setShowInvoice(!showInvoice)}>
          &nbsp;
        </div>
      
    </div>
  )
}

export default App
