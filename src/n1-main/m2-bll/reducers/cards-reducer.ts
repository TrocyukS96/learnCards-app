import {Dispatch} from 'redux';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {RootStateType} from '../store';
import {ThunkAction} from 'redux-thunk';
import {addCardType, cardsApi, OneCardType} from '../../m3-dal/cards-api';

const initialState = {
    cards: [] as Array<OneCardType>,
    packId: '',
    sortCards: '0updated',
    cardAnswer: '',
    cardQuestion: '',
    cardsTotalCount: 100,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'cards/SET-CARDS':
            return {
                ...state,
                ...action.cards,
            }
        case 'cards/ADD-CARD':
            return {...state, cards: [...state.cards, action.newCard]}
        case 'cards/SET-PACK-ID':
            return {...state, packId: action.packId}
        case 'cards/DELETE-CARD':
            return {...state, cards: state.cards.filter(c => c._id !== action.cardId)}
        case 'cards/UPDATE-CARD':
            return {
                ...state,
                cards: state.cards.map
                (card => card.cardsPack_id === action.id
                    ?
                    {...card, question: action.question}
                    :
                    card)
            }
        case 'cards/SORT-CARDS':
            return {...state, sortCards: action.value}
        case 'cards/SEARCH-ANSWER-CARDS':
            return {...state, cardAnswer: action.value, cardQuestion: ''}
        case 'cards/SEARCH-QUESTION-CARDS':
            return {...state, cardQuestion: action.value, cardAnswer: ''}
        case 'cards/SET-CARDS-GRADE':
            return {...state, cards: state.cards.map(c => c._id === action.card_id ? {...c, grade: action.grade} : c)}
        default:
            return state
    }
}
//actionCreators
export const setCardsAc = (cards: OneCardType[]) => ({type: 'cards/SET-CARDS', cards} as const)
export const addCardAc = (newCard: OneCardType) => ({type: 'cards/ADD-CARD', newCard} as const)
export const setPackIdAc = (packId: string) => ({type: 'cards/SET-PACK-ID', packId} as const)
export const deleteCardAc = (cardId: string) => ({type: 'cards/DELETE-CARD', cardId} as const)
export const sortCardsAC = (value: string) => ({type: 'cards/SORT-CARDS', value} as const)
export const searchAnswerCardsAC = (value: string) => ({type: 'cards/SEARCH-ANSWER-CARDS', value} as const)
export const searchQuestionCardsAC = (value: string) => ({type: 'cards/SEARCH-QUESTION-CARDS', value} as const)
export const setCardsGradeAC = (card_id: string, grade: number) => ({
    type: 'cards/SET-CARDS-GRADE',
    card_id,
    grade
} as const)
export const updateCardAc = (id: string, question: string) => ({
    type: 'cards/UPDATE-CARD',
    id, question
} as const)

//thunks
export const getCardsTC = (packId: string) => async (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const sortCards = getState().cards.sortCards
        const cardAnswer = getState().cards.cardAnswer
        const cardQuestion = getState().cards.cardQuestion
        console.log('packId', packId)
        let data = await cardsApi.getCards(packId, sortCards, cardAnswer, cardQuestion)
        console.log('getCardsTc', data)
        dispatch(setCardsAc(data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    }
}

export const addCardTC = (newCard: addCardType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.addCard(newCard).then(
        (res) => {
            dispatch(addCardAc(res.data))
            dispatch(getCardsTC(newCard.cardsPack_id))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    })
}
export const deleteCardTC = (packId: string, cardId: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.deleteCard(cardId).then(
        () => {
            dispatch(deleteCardAc(cardId))
            dispatch(getCardsTC(packId))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    })
}
export const updateQuestionTC = (packId: string, cardId: string, question: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.updateCard({_id: cardId, question: question}).then(
        (res) => {
            dispatch(updateCardAc(packId, res.data.question))
            dispatch(getCardsTC(packId))
            dispatch(setAppStatusAC('succeeded'))
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    })
}

export const updateCardTC = (cardId: string, question: string, answer: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.updateCard({_id: cardId, question: question, answer: answer}).then(
        (res) => {
            dispatch(getCardsTC(cardId));
            dispatch(setAppStatusAC('succeeded'));
        }
    ).catch(() => {
        dispatch(setAppStatusAC('failed'))
    })
}

export const setCardsGradeTC = (cardId: string, grade: number): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsApi.updateCardGrade(cardId, grade)
        .then(res => {
            dispatch(setCardsGradeAC(res.data.card_id, res.data.grade))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(() => {
            dispatch(setAppStatusAC('failed'))
        })
}

//types
export type InitialStateType = typeof initialState
type ThunkType = ThunkAction<any, RootStateType, {}, ActionsType>
type ActionsType =
    ReturnType<typeof setCardsAc>
    | ReturnType<typeof addCardAc>
    | SetAppStatusActionType
    | ReturnType<typeof setPackIdAc>
    | ReturnType<typeof deleteCardAc>
    | ReturnType<typeof updateCardAc>
    | ReturnType<typeof sortCardsAC>
    | ReturnType<typeof searchAnswerCardsAC>
    | ReturnType<typeof searchQuestionCardsAC>
    | ReturnType<typeof setCardsGradeAC>







