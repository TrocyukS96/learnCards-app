import React, {ChangeEvent, useState} from 'react';
import s from './Search.module.scss'
import {useDispatch} from "react-redux";

type SearchPropsType = {
    setValueSearchAC: (value: string) => void
    buttonText:string
}
export const Search: React.FC<SearchPropsType> = (props) => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

//handlers
    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }
    const setValueSearchHandler = () => {
        dispatch(props.setValueSearchAC(searchValue))
        setSearchValue('')
    }
    return (
        <div className={s.searchContainer}>
            <div className={s.inputSearchWrap}>
                <input className={s.inputSearch}
                       placeholder={'Search...'}
                       onChange={searchHandler}
                       value={searchValue}
                       type={'text'}
                />
            </div>
            <button className={s.addBtn} onClick={setValueSearchHandler}>{props.buttonText}</button>
        </div>
    )
}
