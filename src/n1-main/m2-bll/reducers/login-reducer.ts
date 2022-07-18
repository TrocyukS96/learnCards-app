import {authApi, LoginDataType} from '../../m3-dal/auth-api';
import {Dispatch} from 'react';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {setUserDataAC, SetUserDataActionType} from './profile-reducer';

const initialState = {
    isLoggedIn: false,
    loginError: ''
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-ERROR':
            return {...state, loginError: action.errorValue}
        default:
            return state
    }
}

//actionCreators
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setErrorAc = (errorValue: string) => ({type: 'login/SET-ERROR', errorValue} as const)

//thunks
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authApi.login(data)
        dispatch(setUserDataAC(res.data))
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAc(error))
        dispatch(setAppStatusAC('failed'))
    }
    // } finally {
    //     dispatch(setAppStatusAC('succeeded'))- не нужно, тк в catch есть dispatch(setAppStatusAC('failed'))
    // }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authApi.logOut()
        console.log(res)
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
    // } finally {
    //     dispatch(setAppStatusAC('succeeded'))- не нужно, тк в catch есть dispatch(setAppStatusAC('failed'))
    // }
}

//type
type InitialStateType = typeof initialState
type SetErrorActionType = ReturnType<typeof setErrorAc>
export type setLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionsType =
    setLoggedInActionType
    | SetAppStatusActionType
    | SetUserDataActionType
    | SetErrorActionType



