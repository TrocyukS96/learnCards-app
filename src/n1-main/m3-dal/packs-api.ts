import {instance} from './auth-api';
import {PacksType} from '../m2-bll/reducers/packs-reducer';

export const packsApi = {
    getPacks(params: RequestParamsType) {
        return instance.get<PacksType>('cards/pack', {params}).then(res => res.data)
    },
    addPack(cardsPack: CreateCardsPackType) {
        return instance.post('cards/pack', {cardsPack})
    },
    updatePack(_id: string, name ?: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id, name}})
    },
    deletePack(userId: string) {
        return instance.delete(`cards/pack?id=${userId}`)
    },
}

export type RequestParamsType = {
    packName?: string// не обязательно
    min?: number // не обязательно
    max?: number // не обязательно
    sortPacks?: string// не обязательно
    page?: number // не обязательно
    pageCount?: number // не обязательно
    user_id?: string // чьи колоды
    // не обязательно, или прийдут все
    id?: string | undefined
    _id?: string | undefined
}

export type CreateCardsPackType = {
    name?: string // если не отправить будет таким
    path?: string // если не отправить будет такой
    grade?: number // не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
    type?: string // если не отправить будет таким
}
