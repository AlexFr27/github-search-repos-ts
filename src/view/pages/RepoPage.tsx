import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRepo, getSingleRepoSuccess } from '../../redux/reposReducer';
import { AppStateType } from '../../redux/store';
import { RepoDetailsType } from '../../services/repo-service';
import style from './RepoPage.module.scss';

export const RepoPage = () => {
    const { ownerName, repoName } = useParams();
    const dispatch = useDispatch();
    const repo = useSelector<AppStateType, RepoDetailsType | null>(state => state.repos.currentRepo);

    useEffect(() => {
        if (repo?.name !== repoName || repo?.owner.login != repo?.owner.login) {
            dispatch(getSingleRepoSuccess(null));
            dispatch(getSingleRepo(ownerName, repoName))
        }
    }, [ownerName, repoName])


    return <div className={style.wrapper}>
        <div className={style.repoPage}>
            <div className={style.title}>
                <span>repository card</span>
            </div>
            <div className={style.repoDataWrapper}>
                {!!repo
                    ? <div className={style.repoWrapper}>
                        <div className={style.avatar}>
                            <img src={repo.owner.avatar_url} />
                        </div>
                        <div className={style.repoData}>
                            <div><span>Repo Name:</span><div className={style.item}>{repo.name}</div></div>
                            <div><span>Stars:</span><div className={style.item}>{repo.stargazers_count}</div></div>
                            <div><span>Last update:</span><div className={style.item}>{repo.updated_at}</div></div>
                            <div><span>NickName:</span><div className={style.item}><a target='_blank' href={repo.owner.html_url}>{repo.owner.login}</a></div></div>
                            <div><span>Language:</span><div className={style.item}>{repo.language}</div></div>
                            <div><span>About Repos: </span><div className={style.item}>{repo.description}</div></div>
                        </div>

                    </div>
                    : <span className={style.loading}>Loading...</span>
                }
            </div>
        </div>
    </div>
}
