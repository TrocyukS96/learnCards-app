import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';
import s from './Select.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const Select: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map((o, i) => (
        <option className={s.options} key={o + '-' + 1}> {o}</option>
    )) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select
            className={s.select}
            onChange={onChangeCallback}
            {...restProps}>
            {mappedOptions}
        </select>
    );
}

export default Select;
