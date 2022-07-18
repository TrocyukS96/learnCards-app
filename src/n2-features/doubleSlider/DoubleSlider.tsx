import React, {ChangeEvent} from 'react'
import {Slider} from '@material-ui/core';

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    handleChangeCommitted?: () => void
}

export const DoubleSlider: React.FC<SuperDoubleRangePropsType> = ({onChangeRange, value, handleChangeCommitted}) => {
    const handleChange = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        onChangeRange && onChangeRange(newValue as [number, number])
    }

    return (
        <div>
            <Slider
                style={{width: '15vw', color: 'secondary', height: '1vh'}}
                value={value}
                onChange={handleChange}
                onChangeCommitted={() => handleChangeCommitted && handleChangeCommitted()}
                step={1}
            />
        </div>
    )
}