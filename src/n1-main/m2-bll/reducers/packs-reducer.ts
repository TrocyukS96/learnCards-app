import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusActionType, setIsInitializedAC} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {CreateCardsPackType, packsApi, RequestParamsType} from '../../m3-dal/packs-api';

const initialState = {
    cardPacks: [] as Array<CardsPacksType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    min: 0,
    max: 100,
    portionSize: 7,
    myPacks: false,
    packName: '',
    sortPacks: '0updated',
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'Packs/SET-PACKS':
            return {
                ...state,
                ...action.payload,
                // cardPacks: action.packs
            }
        case 'Packs/ADD-PACK':
            return {
                ...state,
                cardPacks: [...state.cardPacks, action.newPack]
            }
        case 'Packs/DELETE-PACK':
            return {
                ...state,
                cardPacks: state.cardPacks.filter(p => p.user_id !== action.userId)
            }
        case 'packs/SET-MY-PACKS':
            return {
                ...state,
                myPacks: action.myPacks
            };
        case 'packs/SET-USER-ID':
            return {
                ...state,
                user_id: action.userId
            };
        case 'packs/SET-PAGE':
            return {
                ...state,
                page: action.page
            };
        case 'packs/SET-PAGE-COUNT':
            return {
                ...state,
                pageCount: action.pageCount
            };
        case 'Packs/SET-VALUE-SEARCH':
            return {...state, packName: action.value}
        case 'Packs/SORT-PACKS':
            return {...state, sortPacks: action.value}
        case 'packs/SET-MIN-MAX-VALUE':

            return {
                ...state,
                min: action.payload.newMin,
                max: action.payload.newMax
            };
        default:
            return state
    }
}

//actionCreators
export const setPacksAc = (payload: PacksType) => ({type: 'Packs/SET-PACKS', payload} as const)
export const addPackAc = (newPack: any) => ({type: 'Packs/ADD-PACK', newPack} as const)
export const deletePackAc = (userId: string) => ({type: 'Packs/DELETE-PACK', userId} as const)
export const setMyPacksAC = (myPacks: boolean) => ({type: 'packs/SET-MY-PACKS', myPacks} as const)
export const setUserIdAC = (userId: string) => ({type: 'packs/SET-USER-ID', userId} as const)
export const setPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const)
export const setPageCountAC = (pageCount: number) => ({type: 'packs/SET-PAGE-COUNT', pageCount} as const)
export const setValueSearchAC = (value: string) => ({type: 'Packs/SET-VALUE-SEARCH', value} as const)
export const sortPacksAC = (value: string) => ({type: 'Packs/SORT-PACKS', value} as const)
export const setMinMaxValueAC = (payload: { newMin: number, newMax: number }) => ({
    type: 'packs/SET-MIN-MAX-VALUE',
    payload
} as const)


//thunks
export const getPacksTC = (params: RequestParamsType) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const userId = getState().profile._id
        const {myPacks, pageCount, sortPacks, packName, min, max, page} = getState().packs

        if (myPacks) {
            params = {...params, user_id: userId}
        }
        if (params.packName === undefined) {
            params = {...params, packName}
        }
        if (!params.min && !params.max) {
            params = {...params, min, max}
        }
        if (!params.pageCount) {
            params = {...params, pageCount}
        }
        if (!params.page) {
            params = {...params, page}
        }
        if (!params.sortPacks) {
            params = {...params, sortPacks}
        }
        let data = await packsApi.getPacks(params)
        dispatch(setPacksAc(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {

    }
}

export const addPackTC = (cardsPack: CreateCardsPackType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsApi.addPack(cardsPack).then(
        () => {
            dispatch(getPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    }).finally(() => [
        dispatch(setAppStatusAC('succeeded'))
    ])
}
export const deletePackTC = (userId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsApi.deletePack(userId).then(
        () => {
            dispatch(deletePackAc(userId))
            dispatch(getPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    }).finally(() => [
        dispatch(setAppStatusAC('succeeded'))
    ])
}

export const updateCardsPackTC = (_id: string, name: string, count: number, userId: string | null): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsApi.updatePack(_id, name)
        .then(() => {
            debugger
            dispatch(getPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            // dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType = ReturnType<typeof setPacksAc>
    | ReturnType<typeof addPackAc>
    | ReturnType<typeof deletePackAc>
    | ReturnType<typeof setMyPacksAC>
    | ReturnType<typeof setUserIdAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setValueSearchAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof setMinMaxValueAC>
    | SetAppStatusActionType

export type SortValuesType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number
    user_id?: string
}

export type PacksType = {
    cardPacks: Array<CardsPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardsPacksType = {
    _id: string
    user_id: string
    name: string
    user_name: string
    path: string
    cardsCount: string
    grade: string
    shots: string
    rating: string
    type: string
    created: Date
    updated: Date
    _v: string
}

//other info






