import React, {useEffect} from 'react';
import './App.css';
import Routes from '../routes/Routes';
import {Preloader} from '../../../common/preloader/Preloaders';
import {RootStateType} from '../../m2-bll/store';
import {initializedTC, RequestStatusType} from '../../m2-bll/reducers/app-reducer';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../header/Navbar/Header';

const App = () => {
    //hooks
    const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializedTC())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            {status === 'loading' && <Preloader/>}
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;
