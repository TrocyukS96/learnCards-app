import {Dispatch} from 'react';
import {authApi} from '../../m3-dal/auth-api';
import {setUserDataAC, SetUserDataActionType} from './profile-reducer';
import {setIsLoggedInAC, setLoggedInActionType} from './login-reducer';

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actionCreators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

//thunks
export const initializedTC = () => async (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.me()
        dispatch(setUserDataAC(res))

        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

//type
export type AppInitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>
export type AppActionsType =
    SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsInitializedAC
    | SetUserDataActionType
    | setLoggedInActionType






