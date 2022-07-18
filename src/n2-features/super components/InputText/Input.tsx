import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'
import closeEye from '../../../assets/images/closeEye.png'
import eye from '../../../assets/images/eye.png'
import s from './InputText.module.scss'

export const Input = (props: InputPropsType) => {
    const {view, type, ...restProps} = props
    const [hidePassword, setHidePassword] = useState(true)

    const onClicked = () => {setHidePassword(!hidePassword)}
    let inputType = type === 'password' ? hidePassword ? 'password' : 'text' : type

    return (
        <div>
            <input type={inputType} {...restProps} />
            {type === 'password'
                ? <img
                    src={hidePassword ? closeEye : eye}
                    alt={'password'}
                    className={s.passwordIcon}
                    onClick={onClicked}/>
                : ''
            }
            <span className={s.error}>{props.errorMessage}</span>
        </div>
    )
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type InputPropsType = DefaultInputPropsType & {
    view: StylesType
    type: string
    errorMessage: string
}
export type StylesType = 'submit' | 'button' | 'send' | 'register' | 'checkbox' | 'text'





