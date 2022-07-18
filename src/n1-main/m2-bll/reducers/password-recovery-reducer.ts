import {authApi, ForgotDataType, SetNewPasswordDataType} from '../../m3-dal/auth-api';
import {Dispatch} from 'react';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';

const initialState = {
    isSentEmail: false,
    isSetPassword: false
}

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'forgot/SET-PASSWORD':
            return {
                ...state, isSetPassword: action.value
            }
        case 'forgot/SET-IS-SENT-EMAIL':
            return {
                ...state, isSentEmail: action.value
            }
        default:
            return state
    }
}

//actionCreators
export const setIsSentEmailAC = (value: boolean) =>
    ({type: 'forgot/SET-IS-SENT-EMAIL', value} as const)
export const setPasswordAC = (value: boolean) =>
    ({type: 'forgot/SET-PASSWORD', value} as const)
//добавить экшн error

//thunks
export const passwordRecoveryTC = (data: ForgotDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.forgot(data)
        .then(() => {
            dispatch(setIsSentEmailAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            //добавить dispatch экшн error
            // dispatch(setErrorAc(error)) - этим здесь не пользуемся
            dispatch(setAppStatusAC('failed'))
        })
    // finally(() => {
    //     dispatch(setAppStatusAC('succeeded')) - не нужно, тк в catch есть dispatch(setAppStatusAC('failed'))
}

export const newPasswordTC = (data: SetNewPasswordDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.setNewPassword(data)
        .then(() => {
            dispatch(setPasswordAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            //добавить dispatch экшн error
            // dispatch(setErrorAc(error)) - этим здесь не пользуемся
            dispatch(setAppStatusAC('failed'))
        })
    // finally(() => {
    //     dispatch(setAppStatusAC('succeeded')) - не нужно, тк в catch есть dispatch(setAppStatusAC('failed'))
}

//type
type InitialStateType = typeof initialState
type ActionsType =
    ReturnType<typeof setIsSentEmailAC> |
    ReturnType<typeof setPasswordAC> |
    SetAppStatusActionType
