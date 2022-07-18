 import React, {ChangeEvent, useState} from 'react';
import s from './Paginator.module.scss'
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {getPacksTC, InitialStateType} from '../../n1-main/m2-bll/reducers/packs-reducer';

export const Paginator = React.memo(() => {
    const packsState = useSelector<RootStateType, InitialStateType>(
        state => state.packs)
    const dispatch = useDispatch()

    const {
        cardPacksTotalCount,
        pageCount,
        page,
        portionSize
    } = packsState

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount);
    let pages: number[] = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const pagesOptions = [4, 10, 15]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    const pagesCountPacksChange = (pageCount: number) => {
        dispatch(getPacksTC({pageCount}))
    }

    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        pagesCountPacksChange(+event.currentTarget.value)
    }

    return (
        <div className={s.paginator}>
            <div className={s.paginatorContainer}>
                <div className={s.pageContainer}>
                    {portionNumber > 1 &&
                    <button
                        className={s.paginatorBtn}
                        disabled={!(portionNumber > 1)}
                        onClick={() => setPortionNumber(portionNumber - 1)}>
                        {'<<<'}
                    </button>}
                    <div className={s.pageNumbersBlock}>
                        {
                            pages
                                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                                .map((p, i) => {
                                    return <div className={`${s.pageNumber} ${page === p ? s.selectedPage : ''}`}
                                                key={i}
                                                onClick={() => dispatch(getPacksTC({page: p}))}> {p}</div>
                                })
                        }
                    </div>
                    {portionCount > portionNumber &&
                    <button
                        className={s.paginatorBtn}
                        disabled={!(portionCount > portionNumber)}
                        onClick={() => setPortionNumber(portionNumber + 1)}>
                        {'>>>'}
                    </button>}
                </div>
                <div className={s.selectWrapper}>
                    Show
                    <select name="pagesCountSelect"
                            id="pagesCountSelect"
                            value={pageCount}
                            onChange={onPagesCountChangeHandler}>
                        {pagesOptionsTags}
                    </select>
                    Cards per page
                </div>
            </div>
        </div>
    )
})