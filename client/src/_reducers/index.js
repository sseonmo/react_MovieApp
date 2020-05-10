// combineReducers : 여러개의 reducer 를 하나의 root reducer 로 사용하기 위해서 사용한다.
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
