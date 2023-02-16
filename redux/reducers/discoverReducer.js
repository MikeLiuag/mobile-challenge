const initialState = {
    discoverList: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_DISCOVER_LIST' :
            return {
                ...state,
                discoverList: action.payload
            }
        default:
            return state
    }
}