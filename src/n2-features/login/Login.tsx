import React from 'react';
import s from './Login.module.scss';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {Input} from '../super components/InputText/Input';
import {NavLink} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';

type LoginPropsType = {
    formik: any,
    status: RequestStatusType,
    error: string
    resetError: () => void
}

export const Login: React.FC<LoginPropsType> = React.memo((props) => {
    return (
        <div className={s.loginBlock}>
            {props.error && <div style={{color: 'red', fontSize: '20px'}}>{props.error}</div>}
            <h2 className={s.logo}>It-incubator</h2>
            <h3 className={s.title}>Sign in</h3>
            <form onSubmit={props.formik.handleSubmit}>
                <div className={s.inputItem}>
                    <label htmlFor="'login/email'">Email</label>
                    <Input
                        type={'text'}
                        className={s.inputText}
                        onClick={props.resetError}
                        {...props.formik.getFieldProps('email')}
                    />
                    {props.formik.touched.email && props.formik.errors.email ? (
                        <div style={{color: 'red'}}>{props.formik.errors.email}</div>
                    ) : null}
                </div>
                <div className={s.inputItem}>
                    <label htmlFor="login/password">Password</label>
                    <Input
                        type={'password'}
                        className={s.inputPassword}
                        {...props.formik.getFieldProps('password')}
                    />
                    {props.formik.touched.password && props.formik.errors.password ? (
                        <div style={{color: 'red'}}>{props.formik.errors.password}</div>
                    ) : null}
                </div>
                <NavLink to={path.PASS_REC} className={s.link}>Forgot password</NavLink>
                <div className={s.checkboxBlock}>
                    <input
                        type={'checkbox'}
                        className={s.inputPassword}
                        {...props.formik.getFieldProps('rememberMe')}
                    />
                    <span>Remember me</span>
                </div>
                <button
                    disabled={props.status === 'loading'}
                    className={s.loginBtn}
                    type="submit"
                > Login
                </button>
            </form>
            <div className={s.redirectBlock}>
                <span className={s.redirectSpan}>Don’t have an account?</span>
                <NavLink to={path.REG} className={s.signBtn}>Sign Up</NavLink>
            </div>
        </div>
    )
})