import React, {useEffect, useState} from 'react';
import s from './Cards.module.scss';
import arrow from './../../assets/images/icons/arrow-icon.png'
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {NavLink} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {AddCard} from './addCard/AddCard';
import {addCardType, OneCardType} from '../../n1-main/m3-dal/cards-api';
import {
    addCardTC,
    deleteCardTC,
    getCardsTC,
    searchAnswerCardsAC,
    searchQuestionCardsAC,
    setPackIdAc,
    sortCardsAC,
    updateQuestionTC
} from '../../n1-main/m2-bll/reducers/cards-reducer';
import {useParams} from 'react-router';
import {Search} from '../search/Search';
import {Card} from './card/Card';
import PageModal from '../modal/BackModal';

type CardsParamsType = {
    cardsPack_id: string
}
export const Cards = () => {
    const sortCards = useSelector<RootStateType, string | undefined>(state => state.cards.sortCards)
    const cardAnswer = useSelector<RootStateType, string | undefined>(state => state.cards.cardAnswer)
    const cardQuestion = useSelector<RootStateType, string | undefined>(state => state.cards.cardQuestion)
    const cards = useSelector<RootStateType, OneCardType[]>(state => state.cards.cards)
    const dispatch = useDispatch()
    const userId = useSelector<RootStateType, string>(state => state.profile._id)
    const packId = useSelector<RootStateType, string>(state => state.cards.packId)
    // HOOKS
    const {cardsPack_id} = useParams<CardsParamsType>();

    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowAddModal(false)
    }

    useEffect(() => {
        dispatch(getCardsTC(cardsPack_id))
    }, [dispatch, sortCards, cardAnswer, cardQuestion])

    // HANDLERS
    const DeleteCard = (packID: string, cardID: string) => {
        dispatch(deleteCardTC(packID, cardID))
        dispatch(setPackIdAc(packId))
    }
    const sortCardsHandler = (value: string) => {
        if (sortCards) {
            sortCards.charAt(0) === '0'
                ? dispatch(sortCardsAC(`1${value}`))
                : dispatch(sortCardsAC(`0${value}`))
        }
    }

    const addCard = (id: string, question: string, answer: string) => {
        const card: addCardType = {
            cardsPack_id: id,
            question: question,
            answer: answer,
        }
        dispatch(addCardTC(card))
    }

    //update card question
    const toSetQuestion = (packId: string, cardId: string, question: string) => {
        dispatch(updateQuestionTC(packId, cardId, question))
    }
    return (
        <div className={s.cards}>
            <div className={s.wrap}>
                <div className={s.top}>
                    <NavLink className={s.backArrowLink} to={path.PACKS}>
                        <img className={s.arrowIcon} src={arrow} alt="arrow-icon"/>
                    </NavLink>
                    <h2 className={s.backBlock}>Pack Name</h2>
                </div>
                <div className={s.btnBox}>
                    <div className={s.inputWrap}>
                        <div className={s.searchWrap}>
                            <Search setValueSearchAC={searchAnswerCardsAC} buttonText={'Answer Search'}/>
                        </div>
                        <div className={s.searchWrap}>
                            <Search setValueSearchAC={searchQuestionCardsAC} buttonText={'Question Search'}/>
                        </div>
                        <button className={s.addBtn} onClick={() => {
                            setShowAddModal(true)
                        }}>Add new card
                        </button>
                    </div>
                </div>

                <div className={s.table}>
                    <div className={s.tableHeader}>
                        <div className={s.tableItem} onClick={() => {
                            sortCardsHandler('question')
                        }}>Question
                        </div>
                        <div className={s.tableItem} onClick={() => {
                            sortCardsHandler('answer')
                        }}>Answer
                        </div>
                        <div className={s.tableItem} onClick={() => {
                            sortCardsHandler('answer')
                        }}>Last Updated
                        </div>
                        <div className={s.tableItem} onClick={() => {
                            sortCardsHandler('answer')
                        }}>Grade
                        </div>
                        <div className={s.tableItem}>Actions</div>
                    </div>
                    {
                        cards.map((card) => {
                            return (
                                <Card
                                    key={card._id}
                                    card={card}
                                    userId={userId}
                                    deleteCard={DeleteCard}
                                    toSetQuestion={toSetQuestion}
                                    answer={card.answer}
                                    question={card.question}
                                />
                            )
                        })
                    }
                </div>
                {showAddModal &&
                <PageModal onModalClose={() => setShowAddModal(false)} childrenWidth={413}
                           childrenHeight={540}>
                    <AddCard closeEditModal={closeEditModal} id={cardsPack_id} updatePack={addCard}/>
                </PageModal>}
            </div>
        </div>
    );
}
