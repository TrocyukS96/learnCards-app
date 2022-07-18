import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './Checkbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
};

const Checkbox: React.FC<CheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeChecked) {
            onChangeChecked(e.currentTarget.checked)
        }
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`;

    return (
        <div className={s.checkboxContainer}>
            <label className={s.label}>
                <input
                    type={'checkbox'}
                    onChange={onChangeCallback}
                    className={finalInputClassName}
                    {...restProps}
                />
                <span className={s.checkboxTick}> </span>
                {children && <span className={s.checkboxText}>{children}</span>}
            </label>
        </div>
    );
}

export default Checkbox;
