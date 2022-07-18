import React, {useState} from 'react'
import {DoubleSlider} from './DoubleSlider';
import s from './DoubleSlider.module.scss'
import {useDispatch} from 'react-redux';
import {getPacksTC, setMinMaxValueAC} from '../../n1-main/m2-bll/reducers/packs-reducer';

export const DoubleSliderContainer: React.FC = React.memo(() => {
    const dispatch = useDispatch()
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(100);

    const handleChange = (newValue: number[]) => {
        setValue1(newValue[0]);
        setValue2(newValue[1]);
        dispatch(setMinMaxValueAC({newMin: newValue[0], newMax: newValue[1]}))
    }

    const handleChangeCommitted = () => {
        dispatch(getPacksTC({min: value1, max: value2}))
    }

    return (
        <div>
            <div className={s.doubleSliderContainer}>
                <div className={s.valueWrapper}>
                    <span>{value1}</span>
                    <span>{value2}</span>
                </div>
                <DoubleSlider value={[value1, value2]}
                              handleChangeCommitted={handleChangeCommitted}
                              onChangeRange={handleChange}/>
            </div>
        </div>
    )
});