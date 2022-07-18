import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Navbar.module.scss';
import {path} from '../../../routes/Routes';
import packsLogo from '../../../../../assets/images/packs.png';
import profileLogo from '../../../../../assets/images/profile.png';

type NavbarPropsType = {}

const NavbarProfile: React.FC<NavbarPropsType> = () => {
    return (
        <div className={s.navLinkProfileContainer}>
            <div className={s.navLogotypeContainer}>
                <div className={s.navLogotype}>
                    LearnCards
                </div>
            </div>
            <div className={s.navLinkProfile}>
                <div className={s.itemProfile}>
                    <NavLink to={path.PACKS}
                             className={s.navLink}
                             activeClassName={s.active}
                    >
                        <img src={packsLogo} alt="packsLogo"/>
                        Packs list </NavLink>
                </div>
                <div className={s.itemProfile}>
                    <NavLink to={path.PROFILE}
                             className={s.navLink}
                             activeClassName={s.active}
                    >
                        <img src={profileLogo} alt="profileLogo"/>
                        Profile </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavbarProfile;