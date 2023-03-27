
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user:  action.payload.user
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null
            };
    
        default:
            return state;
    }
}

export default AuthReducer;