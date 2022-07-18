import React from 'react';
import s from './PasswordRecovery.module.scss';
import {Preloader} from '../../common/preloader/Preloaders';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {Redirect} from 'react-router-dom';

export type PasswordRecoveryPropsType = {
    formik: any
    status: RequestStatusType
}

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const PasswordRecovery: React.FC<PasswordRecoveryPropsType> = (props) => {

    const lgoInRedirectHandler = () => {
        return <Redirect to={path.LOGIN}/>
    }

    return (
        <div className={s.passwordRecoveryBlock}>
            {props.status === 'loading' && <Preloader/>}
            <div className={s.passwordRecovery}>
                <h1 className={s.title}>It-incubator</h1>
                <h2 className={s.title}>Forgot your password?</h2>
                <form className={s.formBlock} onSubmit={props.formik.handleSubmit}>
                    <div className={s.inputItem}>
                        <label htmlFor="'registration/email'">Email</label>
                        <input
                            placeholder="Enter email ..."
                            type="text"
                            className={s.inputPassword}
                            {...props.formik.getFieldProps('email')}
                        />
                        {props.formik.touched.email && props.formik.errors.email &&
                        <div style={{color: 'red'}}>{props.formik.errors.email}</div>}

                        <span className={s.redirectSpan}>
                          Enter your email address and we will send you further instructions
                    </span>
                    </div>
                    <div className={s.buttonsBlock}>
                        <button
                            className={s.sendBtn}
                            type="submit"
                            disabled={props.status === 'loading'}
                        > Send Instructions
                        </button>
                    </div>
                    <div className={s.inputText}>
                        <div className={s.redirectSpan}>Did you remember your password?</div>
                        <button type="button" className={s.signBtn} onClick={lgoInRedirectHandler}>Try logging in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
