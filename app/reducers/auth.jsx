import axios from 'axios';

//ACTIONS
const AUTHENTICATED = 'AUTHENTICATED';

//ACTION CREATOR

export const authenticated = user => ({
    type: AUTHENTICATED,
    user
})

export const whoami = () =>
    dispatch =>
        axios.get('/api/auth/whoami')
            .then(response => {
                const user = response.data;
                dispatch(authenticated(user))
            })
            .catch(failed => dispatch(authenticated(null)))

export const login = (email, password) =>
    dispatch =>
        axios.post('/api/auth/login', { email, password })
            .then(res => res.data)
            .then(user => dispatch(authenticated(user)))
            .catch(() => dispatch((whoami())))

export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
            .then(() => dispatch(whoami()))
            .then(() => dispatch(whoami()))

//REDUCER
const reducer = (state = {}, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return action.user
    }
    return state
}

export default reducer;
