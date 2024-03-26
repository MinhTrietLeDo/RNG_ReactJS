import { legacy_createStore as createStore, combineReducers, compose } from 'redux';
import masotrungthuongReducer from './masotrungthuongReducer';

const rootReducer = combineReducers({
    masotrungthuong: masotrungthuongReducer,
});

export default rootReducer;
