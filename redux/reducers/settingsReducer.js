const initialState = {
    settingValues: {
        selectedGenres: [],
        sortVal: 'popularity',
        yearTxt: '',
        startRuntimeVal: '',
        endRuntimeVal: ''
    },
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SETTING_VALUES' :
            return {
                ...state,
                settingValues: action.payload
            }
        default:
            return state
    }
}