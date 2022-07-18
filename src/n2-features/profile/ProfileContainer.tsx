import React, {useEffect} from 'react';
import s from './Profile.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../n1-main/m2-bll/store';
import {Redirect} from 'react-router-dom';
import {path} from '../../n1-main/m1-ui/routes/Routes';
import {logoutTC} from '../../n1-main/m2-bll/reducers/login-reducer';
import {InitialStateType, updateUser} from '../../n1-main/m2-bll/reducers/profile-reducer';
import Profile from './Profile';
import {Paginator} from '../paginator/Paginator';
import {PacksTable} from '../packs/table/PacksTable';
import {getPacksTC, setMyPacksAC, setValueSearchAC} from '../../n1-main/m2-bll/reducers/packs-reducer';
import {Search} from '../search/Search';

const ProfileContainer: React.FC = React.memo(() => {

    //hooks
    const user = useSelector<RootStateType, InitialStateType>(state => state.profile)
    const loginIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch();
    const name = useSelector<RootStateType, string>(state => state.profile.name)

    const packName = useSelector<RootStateType, string | undefined>(state => state.packs.packName)
    let sortPacks = useSelector<RootStateType, string>(state => state.packs.sortPacks)


    useEffect(() => {
        dispatch(setMyPacksAC(true))
        dispatch(getPacksTC({packName, sortPacks}))
        //hardCode values
    }, [dispatch, packName, sortPacks,])

    useEffect(() => {
        dispatch(setValueSearchAC(''))
    }, [])
    //terms
    if (!loginIn) {
        return <Redirect to={path.LOGIN}/>
    }

    //handlers
    const onClickLogOut = () => {
        dispatch(logoutTC())
    }
    const updateUserName = (value: string) => {
        dispatch(updateUser(value))
    }

    console.log(user)

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.profileSidebar}>
                    <Profile user={user} updateUserName={updateUserName} onClickLogOut={onClickLogOut}/>
                </div>
                <div className={s.listBlock}>
                    <h3>Packs list {name && name + '\'s'}</h3>
                    <Search setValueSearchAC={setValueSearchAC} buttonText={' Search'}/>
                    <PacksTable/>
                    <Paginator/>
                </div>
            </div>

        </div>
    );
})

export default ProfileContainer;