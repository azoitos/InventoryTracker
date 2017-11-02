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

export const login = (username, password) =>
    dispatch =>
        axios.post('/api/auth/login', { username, password })
            .then(() => dispatch(whoami()))
            .catch(() => dispatch((whoami())))

export const logout = () =>
    dispatch =>
        axios.post('/api/auth/logout')
            .then(() => dispatch(whoami()))
            .then(() => dispatch(whoami()))

//REDUCER
const reducer = (state = null, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return action.user
    }
    return state
}

export default reducer;
