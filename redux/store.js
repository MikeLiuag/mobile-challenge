import { legacy_createStore as createStore, combineReducers} from 'redux'
import discoverReducer from './reducers/discoverReducer'
import genresReducer from './reducers/genresReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
    discoverList: discoverReducer,
    genresList: genresReducer,
    settingValues: settingsReducer
})

export const store = createStore(rootReducer);