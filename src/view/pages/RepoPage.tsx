import React, {useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleRepo, getSingleRepoSuccess} from '../../redux/reposReducer';
import {AppStateType} from '../../redux/store';
import {RepoDetailsType} from '../../services/repo-service';

export const RepoPage = () => {
    const {ownerName, repoName} = useParams();
    const dispatch = useDispatch();
    const repo = useSelector<AppStateType, RepoDetailsType | null>(state => state.repos.currentRepo);

    useEffect(() => {
        if (repo?.name !== repoName || repo?.owner.login != repo?.owner.login) {
            dispatch(getSingleRepoSuccess(null));
            dispatch(getSingleRepo(ownerName, repoName))
        }
    }, [ownerName, repoName])


    return <div>
        {!!repo
            ? <div>{repo.name}
            {repo.stargazers_count}
            {repo.updated_at}
            <img src={repo.owner.avatar_url}/>
            {repo.owner.login}
            {repo.language}

        </div>
            : <span>Loading...</span>
        }
    </div>
}
