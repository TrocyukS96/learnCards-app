import React, {useState} from 'react';
import s from './Modal.module.scss';
import icon from '../../assets/images/Page.png';

type ModalPropsType = {
    onModalClose: () => void
    childrenWidth: number
    childrenHeight: number
    onSaveClick?: (value: string) => void
    onDeleteClick?: () => void
    type: 'input' | 'info'
    header: string
    buttonTitle: string
    inputTitle?: string
    packName?: string
}

const Modal: React.FC<ModalPropsType> = (props) => {

    const {
        onModalClose,
        childrenWidth,
        childrenHeight,
        onSaveClick,
        onDeleteClick,
        header,
        buttonTitle,
        type,
        packName,
        inputTitle
    } = props

    const top = `calc(50vh - ${childrenHeight / 2}px)`;
    const left = `calc(50vw - ${childrenWidth / 2}px)`;

    const modalMessageStyle = {
        top,
        left,
        width: childrenWidth,
        height: childrenHeight
    }

    const [inputValue, setInputValue] = useState<string>('')

    return (
        <>
            <div className={s.modalBackground} onClick={onModalClose}>
                Modal window
            </div>
            <div className={s.modalMessage} style={modalMessageStyle}>
                <h3>{header} <img src={icon} onClick={onModalClose}
                                  alt="del"/></h3>
                <div className={s.line}/>
                {type === 'info' && <div className={s.info}>
                    <p>Do you really want to remove <span>{packName}?</span></p>
                    <p>All cards will be excluded from this course.</p>
                </div>}
                {type === 'input' && <div className={s.input}>
                    <h4>{inputTitle}</h4>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                </div>}
                <div className={s.buttonBlock}>
                    <button className={s.cancelBtn} onClick={onModalClose}>Cancel</button>
                    {type === 'info' && <button className={s.delBtn} onClick={onDeleteClick}>
                        {buttonTitle}
                    </button>}
                    {type === 'input' &&
                    <button className={s.saveBtn}
                            onClick={() => {
                                onSaveClick && onSaveClick(inputValue)
                            }}>{buttonTitle}</button>}
                </div>
            </div>
        </>
    )
}
export default Modal;