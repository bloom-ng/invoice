import React from "react";
import {AuthProvider} from "./providers/auth/AuthProvider";
import RouteProvider from "./providers/router/RouteProvider";

const App = ()=> {

    React.useEffect(() => {
        const importTE = async () => {
          await import("tw-elements");
        };
        importTE();
      }, []);

    return (
        <AuthProvider>
            <RouteProvider fallbackElement={<>...</>}></RouteProvider>
        </AuthProvider>
    )
}

export default App;




