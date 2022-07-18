import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {useFormik} from 'formik';
import {RequestStatusType} from '../../n1-main/m2-bll/reducers/app-reducer';
import {FormikErrorType, PasswordRecovery} from './PasswordRecovery';
import {passwordRecoveryTC} from '../../n1-main/m2-bll/reducers/password-recovery-reducer';
import {CheckEmail} from './CheckEmail/CheckEmail';

export const PasswordRecoveryContainer: React.FC = () => {
    const isSentEmail = useSelector<RootStateType, boolean>(state => state.passwordRecovery.isSentEmail)
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()
    const from = `test-front-admin <ai73a@yandex.by>`
    const message = `<div style="background-color: lime; padding: 20px">password recovery link:
                     <a href='http://localhost:3000/#/newPassword/$token$'>Follow the link to change your password</a></div>`
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            const email = values.email
            dispatch(passwordRecoveryTC({email, message, from}))
            formik.resetForm()
        },
    })

    if (isSentEmail) {
        const email = formik.values.email
        return <CheckEmail email={email}/>
        //<Redirect to={path.CHECK_EMAIL}/>
    }

    return (
        <div>
            <PasswordRecovery formik={formik} status={status}/>
        </div>
    )
}
