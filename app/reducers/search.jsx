//ACTION
const SEARCH = 'SEARCH';

//ACTION CREATOR
export const search = query => {
    return {
        type: SEARCH,
        query
    }
};

//REDUCER
const reducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH:
            return Object.assign({}, state, action.query)
    }
    return state
}

export default reducer;
