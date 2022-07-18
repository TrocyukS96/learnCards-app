import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.scss';
import {path} from '../../../routes/Routes';

type NavbarPropsType = {}

const Navbar: React.FC<NavbarPropsType> = () => {
    return (
        <div>
            <div className={s.navLinkItems}>
                <div className={s.item}>
                    <NavLink to={path.LOGIN} className={s.navLink} activeClassName={s.active}> Login </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={path.REG} className={s.navLink}
                             activeClassName={s.active}> Registration </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={path.PASS_REC} className={s.navLink}
                             activeClassName={s.active}> PasswordRecovery </NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={path.PASSWORD} className={s.navLink}
                             activeClassName={s.active}> NewPassword </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;