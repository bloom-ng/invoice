import React, {useReducer} from 'react';
import AuthReducer from './reducer';

const AuthContext = React.createContext();

const INITIAL_STATE = {
    isAuthenticated: false,
    token: null
}

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;