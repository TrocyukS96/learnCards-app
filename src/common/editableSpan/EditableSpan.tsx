import React, {ChangeEvent, useState} from "react";
import s from './EditableSpan.module.scss';

//types
type EditableSpanPropsType = {
    title: string | null
    className: any
    updateUserName:(value:string)=>void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const {title, className, updateUserName} = props

    //hooks
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState<any>(title)

    //handlers
    const onclickSetEditMode = () => {
        setEditMode(true)
        setInputValue(title)
    }

    const onBlurSetEditMode = () => {
        updateUserName(inputValue)
        setEditMode(false)
    }
    const onChangeInputValue = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    //common flexible class for editBox
    let finalClassName = `${s.editBox} ${className}`

    return (
        <div className={finalClassName}>
            {!editMode
                ? <span onDoubleClick={onclickSetEditMode}>{inputValue}</span>
                : <input type={'text'} onBlur={onBlurSetEditMode} autoFocus onChange={onChangeInputValue} value={inputValue}/>
            }
        </div>
    )
})