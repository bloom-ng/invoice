import React from "react";



function Invoice ({formData, formTable}) {


    const getSubtotal = () => {
        let subtotal = 0;
        formTable.forEach( row => {
            subtotal += Number(row.price) * Number(row.qty)
        } )

        return subtotal;
    }

    const getVat = () => {        
        return (getSubtotal() * formData.vat)/100;
    }

    const getServiceCharge = () => {
        return (getSubtotal() * formData.serviceCharge)/100;
    }

    const getNetTotal = () => {
        return getSubtotal() + getVat() + getServiceCharge();
    }

    return < div className="py-4 px-8">


        <div className="flex justify-between">
            <div className="">
                <span className="border-b-orange-500 border-b-4 pb-0 font-extrabold text-3xl uppercase">
                    Invoice &nbsp;&nbsp;&nbsp;
                </span>
                </div>
                
                {/* BLOOM LOGO */}
                <svg class="sm:mt-5" width="140" height="45" viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1132 17.8461C19.6295 17.2832 19.0605 16.8328 18.4346 16.4669C19.7149 15.3972 20.3977 13.8209 20.3977 11.7942C20.3977 10.049 19.7718 8.47267 18.5769 7.09339C17.894 6.33338 16.8698 5.7141 15.561 5.29188C14.3376 4.8978 12.8581 4.67261 11.208 4.67261H1.13623V29.556H12.2891C15.7602 29.556 18.2639 28.7115 19.7434 27.0789C21.0237 25.6714 21.678 24.0107 21.678 22.1529C21.6496 20.464 21.1375 19.0284 20.1132 17.8461ZM8.50511 11.2312H9.81386C11.5494 11.2312 12.2322 11.4564 12.4883 11.5972C12.7159 11.7098 12.8297 12.0475 12.8297 12.5824C12.8297 13.3424 12.5736 13.4831 12.4598 13.5113C12.09 13.6802 11.3218 13.8772 9.75696 13.8772H8.47666V11.2312H8.50511ZM13.6548 22.6314C13.2565 22.8284 12.4598 23.0536 10.8666 23.0536H8.50511V20.098H10.3829C12.2891 20.098 13.1996 20.3232 13.6548 20.5203C13.8255 20.6047 14.1385 20.7173 14.1385 21.5618C14.11 22.4062 13.797 22.5751 13.6548 22.6314Z" fill="black"></path>
                        <path d="M42.4476 22.8284V29.584H25.2915V4.70068H32.6888V22.8284H42.4476Z" fill="black"></path>
                        <path d="M130.077 4.70068V29.584H122.709V19.0283L118.355 27.6981H113.917L109.593 19.0565V29.584H102.224V4.70068H110.987L116.165 15.6223L121.371 4.70068H130.077Z" fill="black"></path>
                        <path d="M1.575 43.5212H6C9.375 43.5212 11.67 41.3912 11.67 38.2712C11.67 35.1512 9.375 33.0212 6 33.0212H1.575V43.5212ZM3.075 42.2162V34.3262H5.91C8.505 34.3262 10.17 35.9162 10.17 38.2712C10.17 40.6262 8.505 42.2162 5.91 42.2162H3.075ZM13.9676 43.5212H15.4676V33.0212H13.9676V43.5212ZM25.8861 41.6312C25.1361 42.1112 24.3111 42.3062 23.4261 42.3062C21.0111 42.3062 19.2561 40.5812 19.2561 38.2712C19.2561 35.9312 21.0111 34.2362 23.4411 34.2362C24.6261 34.2362 25.6161 34.6112 26.4861 35.4512L27.4161 34.5212C26.4561 33.4562 25.0461 32.9012 23.3811 32.9012C20.1261 32.9012 17.7561 35.1662 17.7561 38.2712C17.7561 41.3762 20.1261 43.6412 23.3511 43.6412C24.8211 43.6412 26.2761 43.1912 27.3261 42.3062V38.2112H25.8861V41.6312ZM30.198 43.5212H31.698V33.0212H30.198V43.5212ZM36.9266 43.5212H38.4116V34.3262H42.0116V33.0212H33.3266V34.3262H36.9266V43.5212ZM50.963 43.5212H52.538L47.768 33.0212H46.283L41.528 43.5212H43.073L44.228 40.8962H49.808L50.963 43.5212ZM44.753 39.6962L47.018 34.5512L49.283 39.6962H44.753ZM54.1043 43.5212H61.2893V42.2162H55.6043V33.0212H54.1043V43.5212Z" fill="black"></path>
                        <path d="M92.2661 43.5212L92.2511 33.0212H91.0211L86.7011 40.4012L82.3211 33.0212H81.0911V43.5212H82.5311V35.9162L86.3261 42.2462H87.0161L90.8111 35.8712L90.8261 43.5212H92.2661ZM96.9173 42.2162V38.8262H102.182V37.5512H96.9173V34.3262H102.827V33.0212H95.4173V43.5212H103.037V42.2162H96.9173ZM105.466 43.5212H109.891C113.266 43.5212 115.561 41.3912 115.561 38.2712C115.561 35.1512 113.266 33.0212 109.891 33.0212H105.466V43.5212ZM106.966 42.2162V34.3262H109.801C112.396 34.3262 114.061 35.9162 114.061 38.2712C114.061 40.6262 112.396 42.2162 109.801 42.2162H106.966ZM117.859 43.5212H119.359V33.0212H117.859V43.5212ZM130.347 43.5212H131.922L127.152 33.0212H125.667L120.912 43.5212H122.457L123.612 40.8962H129.192L130.347 43.5212ZM124.137 39.6962L126.402 34.5512L128.667 39.6962H124.137Z" fill="black"></path>
                        <path d="M55.1648 0.028146V10.8091C54.4819 11.0342 53.856 11.372 53.3154 11.7943V0H55.1648V0.028146Z" fill="#C7322A"></path>
                        <path d="M58.2375 4.22232V10.5276C57.953 10.4713 57.64 10.4713 57.3271 10.4713C57.0141 10.4713 56.7011 10.4994 56.3882 10.5276V4.19417C56.7011 4.16602 57.0141 4.16602 57.3271 4.16602C57.64 4.16602 57.9246 4.19417 58.2375 4.22232Z" fill="#C7322A"></path>
                        <path d="M96.5615 16.9453V17.1705C96.5331 18.9157 96.2201 20.5483 95.5942 22.0402C94.9683 23.5602 94.0009 24.9395 92.7491 26.1781C90.4445 28.4018 87.6278 29.6403 84.3275 29.8092V23.4195C84.3844 23.4195 84.4697 23.3914 84.5267 23.3914C84.6689 23.3632 84.7827 23.3351 84.925 23.3069C84.9819 23.3069 85.0103 23.2788 85.0672 23.2788C85.2379 23.2506 85.4086 23.1943 85.5509 23.138C85.6078 23.1099 85.6932 23.0817 85.7501 23.0536C85.8639 22.9973 86.0061 22.9691 86.1199 22.9128C86.1768 22.8847 86.2622 22.8565 86.3191 22.8284C86.3475 22.8002 86.4044 22.8002 86.4329 22.7721C86.4613 22.7439 86.5182 22.7158 86.5467 22.7158C86.5751 22.7158 86.6036 22.6876 86.6036 22.6876C86.7174 22.6313 86.8312 22.5469 86.945 22.4906C86.9735 22.4624 87.0019 22.4624 87.0304 22.4343C87.1157 22.378 87.2011 22.3217 87.258 22.2654C87.3149 22.2373 87.3718 22.181 87.4287 22.1528C87.5425 22.0684 87.6278 21.9839 87.7416 21.8995L87.7701 21.8713C87.8839 21.7869 87.9693 21.6743 88.0546 21.5898C88.14 21.5054 88.2253 21.4209 88.3107 21.3365C88.3391 21.3084 88.3676 21.2802 88.396 21.2239C88.4814 21.1395 88.5383 21.055 88.6236 20.9424C88.6521 20.9143 88.6805 20.8861 88.709 20.8298C88.7374 20.7735 88.7659 20.7454 88.7943 20.6891C88.8797 20.5765 88.965 20.4358 89.0504 20.3232C89.0789 20.2669 89.1358 20.2106 89.1642 20.1261C89.3349 19.8446 89.4772 19.535 89.591 19.1972C89.6194 19.1128 89.6479 19.0283 89.6763 18.9439C89.7048 18.8594 89.7332 18.775 89.7617 18.6905C89.7617 18.6624 89.7901 18.6061 89.7901 18.5779C89.8186 18.4935 89.8186 18.4372 89.847 18.3809C89.847 18.3528 89.8755 18.2965 89.8755 18.2683C89.9039 18.1839 89.9039 18.0713 89.9324 17.9868C89.9608 17.9024 89.9608 17.8179 89.9608 17.7053C89.9893 17.5927 89.9893 17.4801 89.9893 17.3676C89.9893 17.255 89.9893 17.1424 89.9893 17.0016C89.9893 13.4268 87.0588 10.5274 83.4455 10.5274C79.8322 10.5274 76.9017 13.4268 76.9017 17.0016C76.9017 17.1142 76.9017 17.2268 76.9017 17.3394C76.9017 17.4239 76.9017 17.5364 76.9302 17.6209V17.7053C76.9302 17.7898 76.9586 17.9024 76.9586 17.9868V18.015L76.1335 17.2268L74.1135 15.2564L71.0977 12.329C71.3253 11.7097 71.6098 11.1186 71.9796 10.5274C72.5487 9.5704 73.26 8.69779 74.085 7.88148C76.6172 5.43256 79.7468 4.22217 83.4171 4.22217C87.0873 4.22217 90.2454 5.46071 92.7491 7.88148C95.2528 10.2741 96.5331 13.3423 96.5615 16.9453Z" fill="#FF9500"></path>
                        <path d="M82.4779 23.3916C82.3641 23.3916 82.2787 23.3634 82.1649 23.3353H82.1365C82.0227 23.3071 81.9373 23.3071 81.8235 23.279C81.795 23.279 81.7666 23.279 81.7097 23.2508C81.6243 23.2227 81.539 23.1945 81.4536 23.1664C81.3683 23.1382 81.2829 23.1101 81.1976 23.0819C81.1122 23.0538 81.0553 23.0256 80.97 22.9975C80.9131 22.9693 80.8561 22.9412 80.7992 22.913C80.7423 22.8849 80.657 22.8567 80.6001 22.8286C80.5147 22.7723 80.4294 22.7442 80.3156 22.6879C80.2302 22.6597 80.1733 22.6034 80.1164 22.5753C80.0311 22.519 79.9457 22.4908 79.8604 22.4345C79.8319 22.4064 79.8034 22.4064 79.775 22.3782C79.6896 22.3219 79.6043 22.2656 79.5474 22.2093L79.5189 22.1812C79.4905 22.153 79.462 22.153 79.462 22.1249C79.4336 22.0967 79.4051 22.0967 79.3767 22.0686C79.2913 22.0123 79.2344 21.956 79.1775 21.8997C79.1206 21.8434 79.0637 21.8152 79.0068 21.7589C78.9215 21.6745 78.8646 21.6182 78.7792 21.5338C78.6939 21.4493 78.637 21.393 78.5516 21.3086C78.4947 21.2241 78.4093 21.1678 78.3524 21.0834C78.2955 20.9989 78.2386 20.9426 78.1817 20.8582C78.1248 20.8019 78.0964 20.7456 78.0395 20.6612C78.0395 20.633 78.011 20.633 78.011 20.6049C77.9826 20.5486 77.9257 20.4923 77.8972 20.436C77.8403 20.3515 77.8119 20.2952 77.755 20.2108C77.6981 20.1545 77.6696 20.07 77.6412 20.0137C77.5843 19.9293 77.5558 19.8448 77.5274 19.7604C77.4989 19.7323 77.4989 19.676 77.4705 19.6478C77.442 19.5634 77.4135 19.5071 77.3851 19.4226C77.3566 19.3382 77.3282 19.2537 77.2997 19.1693C77.2713 19.113 77.2428 19.0567 77.2428 18.9722C77.2144 18.9159 77.2144 18.8596 77.1859 18.8033C77.1575 18.6908 77.129 18.6063 77.1006 18.4937C77.0721 18.3811 77.0437 18.2967 77.0152 18.1841C76.9868 18.0996 76.9868 17.987 76.9583 17.8744L76.1332 17.0863L74.1132 15.1159L71.0974 12.1884L70.6422 11.7381L67.8824 9.03579L67.797 8.95134C67.4556 8.52912 67.0857 8.10689 66.659 7.71281C64.582 5.68611 62.0499 4.50387 59.1763 4.13794V10.5558C61.9076 11.344 63.8992 13.821 63.8992 16.7767C63.8992 17.5085 63.7854 18.2122 63.5578 18.8596C63.5293 18.9722 63.5009 19.0567 63.444 19.1693C62.4766 21.5619 60.1152 23.2508 57.3554 23.2508C53.7421 23.2508 50.8116 20.3515 50.8116 16.7767C50.8116 15.144 51.4091 13.6522 52.4333 12.5262V4.8698C50.7832 5.48907 49.3322 6.41797 48.0234 7.68466C45.4912 10.1336 44.2109 13.2018 44.2109 16.8329C44.2109 20.4641 45.4912 23.5323 48.0234 25.9812C50.5556 28.402 53.6852 29.6406 57.3554 29.6406C58.4366 29.6406 59.4893 29.528 60.4851 29.3028C62.8465 28.7961 64.9234 27.6702 66.6874 25.9531C66.8866 25.756 67.1142 25.5309 67.2849 25.3338C67.2849 25.3338 67.3134 25.3057 67.3418 25.3057C68.2807 24.2642 69.0204 23.1101 69.5325 21.8434C69.6179 21.6464 69.6748 21.4775 69.7602 21.2804C70.0731 21.5901 70.3576 21.8997 70.6422 22.2093C71.5526 23.1664 72.3208 23.9827 72.7191 24.4049C73.1174 24.9679 73.6011 25.4746 74.1132 25.9812C76.3893 28.1768 79.1775 29.4154 82.421 29.6124C82.4494 29.6124 82.4779 29.6124 82.5348 29.6124L82.4779 23.3916Z" fill="#FF8100"></path>
                        <path d="M82.8768 20.3515L81.255 21.2804C81.255 21.2804 81.2266 21.3086 81.1981 21.3086C81.1697 21.3086 81.1412 21.3367 81.1412 21.3367C81.1128 21.3367 81.1128 21.3367 81.0843 21.3649C81.0559 21.3649 81.0559 21.3649 81.0274 21.3649C80.999 21.3649 80.9705 21.3649 80.9421 21.3649C80.8283 21.3649 80.7429 21.3367 80.6576 21.2804C80.4584 21.1678 80.373 20.9708 80.373 20.7737L80.9421 19.2256L81.5395 17.6211C81.9663 17.9026 82.8768 20.3515 82.8768 20.3515Z" fill="#C7322A"></path>
                        <path d="M88.1683 17.0018C88.1683 17.0581 88.1683 17.1144 88.1399 17.1425C88.1114 17.2833 87.9976 17.424 87.8554 17.5085L83.4454 20.0137C83.5592 19.5633 81.7384 16.9736 81.7384 16.9736L80.9133 14.7217L80.3442 13.2017C80.3442 12.9765 80.458 12.8076 80.6288 12.695C80.8279 12.5824 81.0271 12.5824 81.2262 12.695L87.8554 16.467C88.0261 16.5795 88.1399 16.7203 88.1399 16.9173C88.1683 16.9455 88.1683 16.9736 88.1683 17.0018Z" fill="#C7322A"></path>
                        <path d="M63.3872 11.2312C63.3872 11.2312 68.3946 12.8638 71.5243 18.6061L63.3872 11.2312Z" fill="black"></path>
                        <path d="M70.4434 17.4238C70.4434 17.4238 72.691 22.1528 78.808 24.5173L70.4434 17.4238Z" fill="black"></path>
                    </svg>
        </div>

       <div className="flex justify-between font-bold mt-2"> 
            <div className="flex-col">
                <p className="font-normal my-1">No {formData.invoiceNumber}</p>
                <p className="font-normal mb-1">Billed To:</p>
                <p>{formData.ToAddressLine1}</p>
                <p>{formData.ToAddressLine2}</p>
                <p>{formData.ToAddressLine3}</p>
            </div>
            <div className="flex-col mt-2">
                <p>{formData.fromAddressLine1}</p>
                <p>{formData.fromAddressLine2}</p>
                <p>{formData.fromAddressLine3}</p>

                <p className="mt-6">{formData.date}</p>
            </div> 
        </div>

   

    <div className="border-b-orange-500 border-b-8 pt-8 pb-0"></div>

    <div></div>

   



    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    # 
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Item  
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Unit Price 	&#8358;
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Qty
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Total 	&#8358;
                    </th>
                </tr>
            </thead>
            <tbody>
                

                {formTable?.length > 0 && formTable?.map((row, index) => {
            return <tr key={index} class="bg-white border-b ">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {index + 1}
                    </th>
                    <td class="px-6 py-4">
                    {row?.item}
                    </td>
                    <td class="px-6 py-4">
                    {row?.desc}
                    </td>
                    <td class="px-6 py-4">
                    &#8358;{row?.price}
                    </td>
                    <td class="px-6 py-4">
                    {row?.qty}
                    </td>
                    <td class="px-6 py-4">
                    &#8358;{row?.qty * row?.price}
                    </td>
            
            </tr>
        })}

                <tr>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                      
                    </th>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                    Sub Total 	&#8358;
                    </th>
                    <th scope="col" class="px-6 py-4">
                        
                    </th>
                    <th scope="col" class="px-6 py-4">
                    &#8358;{getSubtotal() } 
                    </th>
                </tr>
                <tr>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                      
                    </th>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                    VAT
                    </th>
                    <th scope="col" class="px-6 py-4">
                        {formData?.vat}%
                    </th>
                    <th scope="col" class="px-6 py-4">
                    &#8358;{getVat() }
                    </th>
                </tr>
                <tr>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                      
                    </th>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                    Service Charge
                    </th>
                    <th scope="col" class="px-6 py-4">
                        {formData?.serviceCharge}%
                    </th>
                    <th scope="col" class="px-6 py-4">
                    &#8358;{getServiceCharge() }
                    </th>
                </tr>
                <tr>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4">
                      
                    </th>
                    <th scope="col" class="px-6 py-4">
                    
                    </th>
                    <th scope="col" class="px-6 py-4 border-t-2 border-t-orange-500">
                    Net Total 	&#8358;
                    </th>
                    <th scope="col" class="px-6 py-4 border-t-2 border-t-orange-500">

                    </th>
                    <th scope="col" class="px-6 py-4 border-t-2 border-t-orange-500">
                    &#8358; {getNetTotal() }
                    </th>
                </tr>
                    
            
            </tbody>
        </table>
        <div className="border-b-orange-500 border-b-8 "></div>

    </div>

    <div className="my-8">
        <span className="border-b-orange-500 border-b-4 font-bold uppercase">
            Payable To : &nbsp;&nbsp;&nbsp;
        </span>
        <p className="mt-4">{formData.payableToAddressLine1}</p>
        <p>{formData.payableToAddressLine2}</p>
        <p>{formData.payableToAddressLine3}</p>
       
    </div> 
    <div className="fixed bottom-5 left-20 flex">
        <p className="mx-4">{formData.telephone}</p>
        <p>{formData.email}</p>
       
    </div> 
    
    {/* <div className="fixed bottom-5 left-20 flex">
        <p className="mx-4">Bloom Digital Media + (234) 7086278644</p>
        <p>Email- info@bloomdigitmedia.com</p>
    </div> */}
    
    
    </div>
}

export default Invoice;

