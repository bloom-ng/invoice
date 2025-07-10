<>
	<div className="flex items-center justify-between font-semibold">
		<p className="px-6 py-4">SUB TOTAL</p>
		<p className="px-6 py-4">
			{invoice?.currency}
			{getSubtotal().toLocaleString()}
		</p>
	</div>
	<div className="flex items-center justify-between">
		<p className="px-6 py-4">Discount</p>
		<p className="px-6 py-4">
			{invoice?.currency}
			{invoice?.discount}
		</p>
	</div>
	<div className="flex items-center justify-between">
		<p className="px-6 py-4">Sub total less discount</p>
		<p className="px-6 py-4">
			{invoice?.currency}
			{(getSubtotal() - invoice?.discount).toLocaleString()}
		</p>
	</div>
	<div className="flex items-center justify-between">
		<p className="px-6 py-4">VAT</p>
		<div className="px-6 py-4">{invoice?.vat}%</div>
		<div className="px-6 py-4">
			{invoice?.currency}
			{parseFloat(getVat().toFixed(2)).toLocaleString()}
		</div>
	</div>
	<div className="flex items-center justify-between">
		<div className="px-6 py-4">SERVICE CHARGE</div>
		<div className="px-6 py-4">{invoice?.service_charge}%</div>
		<div className="px-6 py-4">
			{invoice?.currency}
			{parseFloat(getServiceCharge().toFixed(2)).toLocaleString()}
		</div>
	</div>
	<div className="flex items-center justify-between">
		<div className="px-6 py-4">DEPOSIT REQUESTED</div>

		<div className="px-6 py-4">
			{invoice?.currency}{" "}
			{parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
		</div>
	</div>
	<div className="flex items-center justify-between">
		<div className="px-6 py-4">DEPOSIT DUE</div>

		<div className="px-6 py-4">
			{invoice?.currency}{" "}
			{parseFloat(getNetTotal().toFixed(2)).toLocaleString()}
		</div>
	</div>
</>;
