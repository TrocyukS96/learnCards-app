import React, {useState} from 'react';
import s from './PacksTable.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../n1-main/m2-bll/store';
import {
    deletePackTC,
    InitialStateType,
    sortPacksAC,
    updateCardsPackTC
} from '../../../n1-main/m2-bll/reducers/packs-reducer';
import {NavLink} from 'react-router-dom';
import {path} from '../../../n1-main/m1-ui/routes/Routes';
import {getCardsTC, setPackIdAc} from '../../../n1-main/m2-bll/reducers/cards-reducer';
import Modal from '../../modal/Modal';
import BackModal from '../../modal/BackModal';
import {EditPack} from '../edit pack/EditPack';
import {useParams} from 'react-router';
import LearnPage from '../../learnPage/LearnPage';

type PacksParamsType = {
    id: string
}

export const PacksTable: React.FC = () => {
    //hooks
    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const {cardPacks} = useSelector<RootStateType, InitialStateType>(state => state.packs)
    let sortPacks = useSelector<RootStateType, any>(state => state.packs.sortPacks)
    let name = useSelector<RootStateType, any>(state => state.packs.packName)
    let userId = useSelector<RootStateType, string>(state => state.profile._id)
    const packId = useSelector<RootStateType, string>(state => state.cards.packId)
    const pageCount = useSelector<RootStateType, number>(state => state.packs.pageCount)
    const {id} = useParams<PacksParamsType>();
    const dispatch = useDispatch()
    // console.log(packId)

    //handlers
    const handleOnLearnButton = (id: string) => {
        dispatch(getCardsTC(packId))
        dispatch(setPackIdAc(id))
    }

    const handleOnEditButton = (packId: string, packName: string) => {
        dispatch(getCardsTC(packId))
        dispatch(setPackIdAc(packId))
    }

    const handleOnDeleteButton = (packId: string) => {
        dispatch(getCardsTC(packId))
        dispatch(setPackIdAc(packId))
    }

    const sortPacksHandler = (value: string) => {
        sortPacks.charAt(0) === '0' ? dispatch(sortPacksAC(`1${value}`)) : dispatch(sortPacksAC(`0${value}`))
    }

    const deletePackHandler = (packId: string) => {
        dispatch(deletePackTC(packId))
    }

    const updatePack = (packId: string, packName: string) => {
        dispatch(updateCardsPackTC(packId, packName, pageCount, id))
    }

    return (
        <div className={s.packs}>
            <div className={s.table}>
                <div className={s.tableHeader}>
                    <div className={s.tableItem} onClick={() => {
                        sortPacksHandler('name')
                    }}>Name
                    </div>
                    <div className={s.tableItem} onClick={() => {
                        sortPacksHandler('cardsCount')
                    }}>Cards
                    </div>
                    <div className={s.tableItem} onClick={() => {
                        sortPacksHandler('updated')
                    }}>Last Updated
                    </div>
                    <div className={s.tableItem} onClick={() => {
                        sortPacksHandler('user_name')
                    }}>Created by
                    </div>
                    <div className={s.tableItemActions}>Actions</div>
                </div>
                {
                    cardPacks.map((pack, index) => {
                        return (
                            <div className={s.packRow} key={index}>
                                <div className={s.packRowItem}>
                                    <NavLink className={s.packRowNameLink}
                                             to={`${path.CARDS}${pack._id}`}> {pack.name} </NavLink>
                                </div>
                                <div className={s.packRowItem}>
                                    {pack.cardsCount}
                                </div>
                                <div className={s.packRowItem}>
                                    {pack.updated}
                                </div>
                                <div className={s.packRowItem}>
                                    {pack.user_name}
                                </div>
                                <div className={s.packRowItem}>
                                    <div className={s.packButtonItem}>
                                        {userId === pack.user_id &&
                                        <button
                                            className={s.packDeleteBtn}
                                            disabled={pack.user_id !== userId}
                                            onClick={() => {
                                                handleOnDeleteButton(pack._id)
                                                setShowDelModal(true)
                                            }}
                                        >
                                            Delete
                                        </button>
                                        }
                                        {userId === pack.user_id &&
                                        <button
                                            className={s.packEditLearnBtn}
                                            disabled={pack.user_id !== userId}
                                            onClick={() => {
                                                handleOnEditButton(pack._id, pack.name)
                                                setShowEditModal(true)
                                            }}
                                        >
                                            Edit
                                        </button>
                                        }
                                        <button
                                            className={s.packEditLearnBtn}
                                            onClick={() => {
                                                handleOnLearnButton(pack._id)
                                                setShowLearnModal(true)
                                            }}
                                        >
                                            Learn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                showDelModal && <Modal childrenHeight={220}
                                       childrenWidth={400}
                                       onDeleteClick={() => {
                                           deletePackHandler(packId)
                                           setShowDelModal(false)
                                       }}
                                       onModalClose={() => setShowDelModal(false)}
                                       type={'info'}
                                       header={'Delete pack'}
                                       buttonTitle={'Delete'}
                                       packName={'Pack name'}/>
            }
            {
                showEditModal &&
                <BackModal onModalClose={() => setShowEditModal(false)}
                           childrenWidth={413}
                           childrenHeight={540}
                >
                    <EditPack packId={packId}
                              closeEditModal={() => setShowEditModal(false)}
                              packName={name}
                              updatePack={updatePack}
                    />
                </BackModal>
            }
            {showLearnModal &&
            <BackModal onModalClose={() => setShowLearnModal(false)}
                       childrenWidth={413}
                       childrenHeight={575}
            >
                <LearnPage
                    cardsPack_id={packId}
                    onModalClose={() => setShowLearnModal(false)}
                />
            </BackModal>}
        </div>
    )
}
