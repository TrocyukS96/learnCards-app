import React, {useState} from 'react';
import s from '../Cards.module.scss';
import {OneCardType} from '../../../n1-main/m3-dal/cards-api';
import Modal from '../../modal/Modal';
import {EditCard} from '../editCard/EditCard';
import BackModal from '../../modal/BackModal';
import {
    getCardsTC,
    updateCardAc, updateCardTC
} from '../../../n1-main/m2-bll/reducers/cards-reducer';
import {useDispatch} from 'react-redux';

type CardPropsType = {
    card: OneCardType,
    userId: string,
    deleteCard: (packID: string, cardID: string) => void,
    toSetQuestion: (packId: string, cardId: string, question: string) => void
    answer: string
    question: string
}

export const Card = (props: CardPropsType) => {
    //hooks
    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const dispatch = useDispatch()

    //handlers
    const handleOnCardDeleteButton = (cardId: string) => {
        dispatch(getCardsTC(cardId))
        dispatch(updateCardAc(cardId, props.question))
    }

    const handleOnCardEditButton = (cardId: string, packName: string) => {
        dispatch(updateCardAc(cardId, props.question))
    }

    const updateCardCallback = (id: string, question: string, answer: string) => {
        dispatch(updateCardTC(id, question, answer))
        dispatch(getCardsTC(id))
    }

    const updateCard = (id: string, question: string, answer: string) => {
        updateCardCallback && updateCardCallback(id, question, answer)
    }

    const handleDeleteCard = (packId: string, cardId: string) => {
        props.deleteCard(packId, cardId)
    }
    return (
        <div className={s.cardsRow}>
            <div className={s.cardsRowItem}>{props.question}</div>
            <div className={s.cardsRowItem}>
                {props.card.answer}
            </div>
            <div className={s.cardsRowItem}>
                {props.card.updated}
            </div>
            <div className={s.cardsRowItem}>
                {props.card.grade}
            </div>
            <div className={s.cardsRowItem}>
                {props.userId === props.card.user_id &&
                <>
                    <button className={s.cardDeleteBtn}
                            onClick={() => {
                                handleOnCardDeleteButton(props.card._id);
                                setShowDelModal(true);
                            }}
                    >
                        delete
                    </button>
                    <button
                        className={s.cardEditBtn}
                        onClick={() => {
                            handleOnCardEditButton(props.card.cardsPack_id, props.card._id);
                            setShowEditModal(true);
                        }}
                    >
                        edit
                    </button>
                </>
                }
            </div>
            <div className={s.modalItem}>
                {
                    showDelModal &&
                    <Modal childrenHeight={220}
                           childrenWidth={400}
                           onDeleteClick={() => {
                               handleDeleteCard(props.card.cardsPack_id, props.card._id);
                               setShowDelModal(false);
                           }}
                           onModalClose={() => setShowDelModal(false)}
                           type={'info'}
                           header={'Delete pack'}
                           buttonTitle={'Delete'}
                           packName={'Pack name'}
                    />
                }
                {
                    showEditModal &&
                    <BackModal onModalClose={() => setShowEditModal(false)}
                               childrenWidth={413}
                               childrenHeight={444}
                    >
                        <EditCard
                            cardId={props.card._id}
                            updateCard={updateCard}
                            closeEditModal={() => setShowEditModal(false)}
                            answer={props.answer}
                            question={props.question}
                        />
                    </BackModal>
                }
            </div>
        </div>
    )
}