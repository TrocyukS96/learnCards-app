import React, {useEffect, useState} from 'react';
import styles from './LearnPage.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {OneCardType} from "../../n1-main/m3-dal/cards-api";
import {getCardsTC, setCardsGradeTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import Radio from "../super components/Radio/Radio";

type LearnPagePropsType = {
    cardsPack_id: string
    onModalClose?: () => void
}

const grades = ['1', '2', '3', '4', '5'];
const getCard = (cards: OneCardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage: React.FC<LearnPagePropsType> = (props) => {
    const {cardsPack_id} = props
    const cards = useSelector<RootStateType, any>(state => state.cards.cards)
    const packName = useSelector<RootStateType, any | undefined>(state => state.packs.cardPacks && state.packs.cardPacks.find(pack => pack._id === cardsPack_id));
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState(1)
    const [card, setCard] = useState<any>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        user_id: '',
        __v: 0,
        created: '',
        updated: '',
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCardsTC(cardsPack_id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsPack_id, cards, first]);
    const checkAnswer = () => {
        setIsChecked(true)
    }
    const onNext = () => {
        setIsChecked(false);
        if (cards.length > 0) {
            dispatch(setCardsGradeTC(card._id, grade ));
        } else {

        }
    }
    const onChangeCallBack = (value:number)=>{
        setGrade(value)
    }
    return (
        <div className={styles.learnPageContainer}>
            <h3>Learn "{packName?.name}"</h3>
            {!isChecked &&
                <div className={styles.questionBlock}>
                    <h4>Question: "{card.question}"</h4>
                    <div className={styles.buttonsBlock}>
                        <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                        <button className={styles.saveBtn} onClick={checkAnswer}>show answer</button>
                    </div>
                </div>
            }
            {isChecked && (
                <div className={styles.answerBlock}>
                    <h4>Question: "{card.question}"</h4>
                    <h4>Answer: "{card.answer}"</h4>
                    <div className={styles.answer}>
                        <h4>Rate yourself: </h4>
                        <div className={styles.ratingBox}>
                                <Radio
                                    name={'radio'}
                                    options={grades}
                                    onChangeOption={onChangeCallBack}
                                />
                        </div>
                    </div>
                    <div className={styles.buttonsBlock}>
                        <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                        <button
                            className={styles.saveBtn}
                            onClick={ onNext}
                        >
                            next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnPage;
