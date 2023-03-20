import React, { useState } from 'react';

function Form(props) {
const [item, setItem] = useState('');
const [account, setAccount] = useState('');
const [unitPrice, setUnitPrice] = useState('');

const changeItem = (event) => {
	setItem(event.target.value);
};

const changeAccount = (event) => {
	setAccount(event.target.value);
};

const changeUnitPrice = (event) => {
	setUnitPrice(event.target.value);
};

const transferValue = (event) => {
	event.preventDefault();
	const val = {
	item,
	account,
    unitPrice,
	};
	props.func(val);
	clearState();
};

const clearState = () => {
	setItem('');
	setAccount('');
	setUnitPrice('');
};

return (
	<div>
	<label>Item Description</label>
	<input type="text" value={item} onChange={changeItem} />
	<label>Account</label>
	<input type="text" value={account} onChange={changeAccount} />
	<label>Unit Price</label>
	<input type="text" value={unitPrice} onChange={changeUnitPrice} />
	<button onClick={transferValue}> Click Me</button>
	</div>
);
}

export default Form;

