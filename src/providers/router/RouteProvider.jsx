import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { Login } from "../../pages/auth";
import { InvoiceList, InvoiceView, InvoiceCreate, InvoiceUpdate } from "../../pages/invoice";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <InvoiceList />,
    },
    {
      path: "/invoice",
      element: <InvoiceList />,
    },
    {
      path: "/invoice/:id",
      element: <InvoiceView />,
    },
    {
      path: "/invoice/add",
      element: <InvoiceCreate />,
    },
    {
      path: "/invoice/edit/:id",
      element: <InvoiceUpdate />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  
  const RouteProvider = ({fallbackElement})=> {
    return <RouterProvider fallbackElement={fallbackElement} router={router} />
    
  }

  export default RouteProvider;

