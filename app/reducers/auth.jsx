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

export const login = (email, password) =>
    dispatch =>
        axios.post('/api/auth/login', { email, password })
            .then(res => res.data)
            .then(user => dispatch(whoami(user)))
            .catch(() => dispatch((whoami())))

export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
            .then(() => dispatch(whoami()))
            .then(() => dispatch(whoami()))

export const whoami = () =>
    dispatch =>
        axios.get('/api/auth/whoami')
            .then(response => {
                console.log('USER', response.data)
                const user = response.data;
                dispatch(authenticated(user))
            })
            .catch(failed => dispatch(authenticated(null)))


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
