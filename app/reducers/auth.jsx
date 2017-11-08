import axios from 'axios';

//ACTIONS
const AUTHENTICATED = 'AUTHENTICATED';
const LOGOUT = 'LOGOUT'

//ACTION CREATOR
export const authenticated = user => ({
    type: AUTHENTICATED,
    user
})

export const logOutUser = () => ({
    type: LOGOUT
})

//checks to confirm if the user is logged in
export const whoami = () =>
    dispatch =>
        axios.get('/api/auth/whoami')
            .then(response => {
                const user = response.data;
                dispatch(authenticated(user))
            })
            .catch(() => dispatch(authenticated(null)))

//logs in the user
export const login = (email, password) =>
    dispatch =>
        axios.post('/api/auth/login', { email, password })
            .then(res => res.data)
            .then(user => dispatch(whoami(user)))
            .catch(() => dispatch((whoami())))

//logs out the user
export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
            .then(() => dispatch(logOutUser()))
            .catch(() => dispatch(whoami()))


//REDUCER
const reducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return Object.assign({}, state, action.user)
        case LOGOUT:
            return {};
    }
    return state
}

export default reducer;
