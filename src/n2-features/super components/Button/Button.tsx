import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type ButtonPropsType = DefaultButtonPropsType & {}

const Button: React.FC<ButtonPropsType> = (
    {className, disabled, ...restProps}
) => {

    return (
        <div className={s.buttonContainer}>
            <button
                className={s.defaultButton}
                disabled={disabled}
                {...restProps}
            />
        </div>
    );
}

export default Button;
