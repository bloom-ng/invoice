import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import { Login } from "../../pages/auth";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
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

