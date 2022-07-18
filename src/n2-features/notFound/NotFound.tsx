import React from 'react';
import s from './NotFound.module.css';
import img from '../../assets/images/oops.png';

type NotFoundPropsType = {}

const NotFound: React.FC<NotFoundPropsType> = () => {
    return (
        <div className={s.notFoundContainer}>
            <div className={`${s.page} ${s.errorPage}`}>
                <div className={s.numberError}>404</div>
                <div className={s.errorText}>Oops...Page not found!</div>
                <div className={s.img}><img src={img} alt=""/></div>
            </div>
        </div>
    );
}

export default NotFound;