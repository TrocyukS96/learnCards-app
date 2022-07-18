import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from "react";
import s from './Radio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const Radio: React.FC<RadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={o} className={s.label}  >
            <input
                type={"radio"}
                name="radio"
                value={o}
                // checked={value === o}
                onChange={onChangeCallback}
            />
             {o}
        </label>
    )) : [];

    return (
        <>
            {mappedOptions}
        </>
    );
}

export default Radio;
