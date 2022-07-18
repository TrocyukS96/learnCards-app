import {instance} from './auth-api';
import {AxiosResponse} from "axios";

export const cardsApi = {
    getCards(packId: string, sortCards: string, cardAnswer: string, cardQuestion: string) {
        return instance.get(`/cards/card?cardsPack_id=${packId}&sortCards=${sortCards}&cardAnswer=${cardAnswer}&cardQuestion=${cardQuestion}`)
            .then(res => res.data)
    },
    addCard(newCardData: addCardType) {
        return instance.post<addCardType, AxiosResponse<OneCardType>>('/cards/card', {card: newCardData})
    },
    deleteCard(cardId: string) {
        return instance.delete(`/cards/card?id=${cardId}`)
    },
    updateCard(updatedCardData: UpdatedCardDataType) {
        return instance.put<UpdatedCardDataType, AxiosResponse<OneCardType>>('/cards/card', {card: updatedCardData})
    },
    updateCardGrade(card_id: string, grade: number){
        return instance.put<UpdateCardGradeType>('cards/grade',{card_id, grade})
    }
}

//types
export type UpdatedCardDataType = {
    _id: string,
    question?: string,
    comments?: string,
    answer?: string
}

type UpdateCardGradeType = {
    _id: ''
    cardsPack_id: ''
    card_id: ''
    user_id: ''
    grade: number
    shots: number
}
export type OneCardType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    questionImg: string,
    answerImg: string,
    answerVideo: string,
    questionVideo: string,
    comments: string,
    type: string,
    rating: number,
    more_id: string,
    created: string,
    updated: string,
    __v: number
}
export type RequestCardsParamsType = {
    cardAnswer?: string// не обязательно
    cardQuestion?: string // не обязательно
    cardsPack_id: string // id юзера
    min?: number// не обязательно
    max?: number // не обязательно
    sortCards?: number // не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
}
export type addCardType = {
    cardsPack_id: string,
    question: string,
    answer: string,
    grade?: number,
    shots?: number,
    rating?: number,
    answerImg?: string,
    questionImg?: string,
    answerVideo?: string,
    type?: string
}