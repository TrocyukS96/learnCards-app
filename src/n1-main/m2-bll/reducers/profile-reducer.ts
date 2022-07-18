import {authApi, ProfileType} from '../../m3-dal/auth-api';
import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from './app-reducer';
import {Dispatch} from 'react';

const initialState = {
    // profileData: null as ProfileDataType| null,
    // user: null as ProfileType | null,
    // profileError: '',
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: new Date(2013, 2, 1, 0, 70),
    updated: new Date(2015, 2, 1, 0, 70),
    isAdmin: false,
    verified: false ,
    rememberMe: false,
    error: "",
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER-DATA':
            return {...state, ...action.userData}
        case 'PROFILE/SET-ERROR':
            return {...state, error: action.errorValue}
        // case "PROFILE/UPDATE-USER-NAME":
        //     return {...state, user: action.updatedData}
        default:
            return state
    }
}

//actionCreators
export const setUserDataAC = (userData: ProfileType) => {
    return ({type: 'PROFILE/SET-USER-DATA', userData} as const)
}
const setErrorAc = (errorValue: string) => ({type: 'PROFILE/SET-ERROR', errorValue} as const)
// export const updateUserDataAc = (updatedData: ProfileType) => ({type: 'PROFILE/UPDATE-USER-NAME', updatedData} as const)

//thunks
export const updateUser = (name: string | null, avatar?: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.updateUser(name, avatar)
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC('failed'))
    }
}

//types
export type SetUserDataActionType = ReturnType<typeof setUserDataAC>

type ActionsType =
    SetUserDataActionType
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setErrorAc>
// | ReturnType<typeof updateUserDataAc>

export type InitialStateType = typeof initialState

export type UserProfileType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}





