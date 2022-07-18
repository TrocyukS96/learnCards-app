import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import {appReducer} from './reducers/app-reducer';
import {loginReducer} from './reducers/login-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {registrationReducer} from './reducers/registration-reducer';
import {passwordRecoveryReducer} from "./reducers/password-recovery-reducer";
import {packsReducer} from "./reducers/packs-reducer";
import {cardsReducer} from "./reducers/cards-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    packs:packsReducer,
    cards:cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown,any>