import React from 'react';
import s from '../PasswordRecovery.module.scss';


export type CheckEmailPropsType = {
    email: string
}


export const CheckEmail = (props: CheckEmailPropsType) => {
    const email = props.email
    const img = 'https://aravia-prof.ru/bitrix/templates/aravia_mobile/components/bitrix/news.detail/vacancies/img/email.svg'
    return (
        <div className={s.passwordRecoveryBlock}>
            <div className={s.passwordRecovery}>
                <h1 className={s.title}>It-incubator</h1>
                <h2 className={s.title}>Check Email</h2>
                <div className={s.formBlock}>
                    <img src={img} alt=''/>

                    <div className={s.inputText}>
                        <div className={s.redirectSpan}> We’ve sent an Email with instructions to email {email} </div>
                        <h4>Close the tab</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

