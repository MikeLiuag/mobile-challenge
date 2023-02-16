const initialState = {
    genresList: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_GENRES_LIST' :
            return {
                ...state,
                genresList: action.payload
            }
        default:
            return state
    }
}