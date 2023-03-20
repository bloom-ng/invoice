import React, { useState } from 'react';
import Form from './formData';


function tableData() {
const [invoiceData, setInvoiceData] = useState(false);

const tableRows = formData.map((formData) => {
	return (
	<tr>
		
		<td>{info.itemDescription}</td>
		<td>{info.account}</td>
		<td>{info.unitPrice}</td>
	</tr>
	);
});

const addRows = (data) => {
	const invoiceList = invoiceData.length;
	data.id = invoiceList + 1;
	const updatedInvoiceData = [...invoiceData];
	updatedInvoiceData.push(data);
	setInvoiceData(updatedInvoiceData);
};

return (
	<div>
	<table className="table table-stripped">
		<thead>
		<tr>
			<th>S/N</th>
			<th>Item Description</th>
			<th>Account</th>
			<th>Unit Price</th>
		</tr>
		</thead>
		<tbody>{tableRows}</tbody>
	</table>
	<Form func={addRows} />
	</div>
);
}

export default tableData;