import {Dispatch} from 'redux';
import {authApi, RegisterParamsType} from '../../m3-dal/auth-api';
import {setAppStatusAC} from './app-reducer';

const initialStateRegistration: RegistrationType = {
    isRegistration: false,
    error: ''
}

export const registrationReducer = (state: RegistrationType = initialStateRegistration, action: ActionsType): RegistrationType => {
    switch (action.type) {
        case 'REGISTRATION/NEW-USER-CREATED':
            return {...state, isRegistration: action.isRegistration, error: ''}
        case 'REGISTRATION/SET-ERROR':
            return {...state, error: action.value};
        default:
            return state
    }
}

//actionCreators
export const registrationAC = (isRegistration: boolean) =>
    ({type: 'REGISTRATION/NEW-USER-CREATED', isRegistration} as const)
export const setErrorAC = (value: string) =>
    ({type: 'REGISTRATION/SET-ERROR', value} as const)

//thunk
export const registrationTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.register(data)
        dispatch(registrationAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setErrorAC(error))
    } finally {
        dispatch(setAppStatusAC('succeeded')) //уточнить
        setTimeout(() => {
            dispatch(setAppStatusAC('idle')) //уточнить
        }, 3000)
    }
}

//type
type RegistrationType = {
    isRegistration: boolean
    error: string
}
type ActionsType = ReturnType<typeof registrationAC> | ReturnType<typeof setErrorAC>




