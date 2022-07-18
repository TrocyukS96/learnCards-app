import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from './InputText.module.scss';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
};

const InputText: React.FC<InputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e);

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === 'Enter'
        && onEnter
        && onEnter();
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className}`;

    return (
        <div>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                placeholder={'Enter you email'}
                {...restProps}
            />
            <span className={finalSpanClassName}>{error}</span>
        </div>
    );
}

export default InputText;
