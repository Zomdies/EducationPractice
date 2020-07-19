import { combineReducers } from 'redux';

import expositionReducer from './exposition';
import exhibitReducer from './exhibit'
import appReducer from './app'


const rootReducer = combineReducers({
    exposition : expositionReducer,
    exhibit : exhibitReducer,
    app : appReducer
  });

export default rootReducer;