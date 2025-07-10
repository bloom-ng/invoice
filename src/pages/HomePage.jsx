import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div className="h-[100vh] flex items-center justify-center">
			<div className="flex flex-col lg:flex-row gap-6">
				<button
					onClick={() => navigate("/invoices")}
					className="text-white bg-orange-600 px-6 py-2 hover:bg-white hover:text-orange-600 font-semibold text-4xl"
				>
					Invoice
				</button>
				<button
					onClick={() => navigate("/receipts")}
					className="text-white bg-orange-600 px-6 py-2 hover:bg-white hover:text-orange-600 font-semibold text-4xl"
				>
					Receipt
				</button>
				<button
					onClick={() => navigate("/vouchers")}
					className="text-white bg-orange-600 px-6 py-2 hover:bg-white hover:text-orange-600 font-semibold text-4xl"
				>
					Voucher
				</button>
			</div>
		</div>
	);
};

export default HomePage;
