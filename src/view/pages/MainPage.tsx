import React, {useCallback, useEffect, useState} from 'react';
import style from './MainPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../redux/store';
import {getRepos, LoadingStatusType, setCurrentPage, setSearchQuery} from '../../redux/reposReducer';
import {RepoType} from '../../services/repo-service';
import {Paginator} from '../common/Paginator/Paginator';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {Search} from '../common/Search';

const useQueryParams = () => {
    const location = useLocation();
    const search = location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    return params
}

function MainPage() {
    const searchQuery = useSelector<AppStateType, string>(state => state.repos.searchQuery);

    const repositories = useSelector<AppStateType, Array<RepoType>>(state => state.repos.repos)
    let currentPage = useSelector<AppStateType, number>(state => state.repos.currentPage)
    let totalCount = useSelector<AppStateType, number>(state => state.repos.totalCount)
    let loadingStatus = useSelector<AppStateType, LoadingStatusType>(state => state.repos.loadingStatus)
    let errorMessage = useSelector<AppStateType, string | null>(state => state.repos.errorMessage)

    const dispatch = useDispatch()

    const history = useHistory();
    //const location = useLocation();

    const params = useQueryParams();

    useEffect(() => {
        //const search = location.search; // could be '?foo=bar'

        const query = params.get('q'); // bar
        const page = params.get('page'); // bar

        if (query) {
            dispatch(setSearchQuery(query))
        }
        if (page) {
            dispatch(setCurrentPage(+page))
        }

    }, [])

    useEffect(() => {
        dispatch(getRepos());
    }, [currentPage, searchQuery])

    const setCurrentPageHandler = (page: number) => {
        const clone = new  URLSearchParams(params.toString());
        clone.set("page", page.toString());
        history.push({
            search:  clone.toString()
        })
        dispatch(setCurrentPage(page))
    }

    const repositoriesMap = repositories.map(repo => {
        return <div style={{display: 'flex'}} key={repo.id}>
            <div style={{margin: 5}}>
                <NavLink to={`/repo/${repo.owner.login}/${repo.name}`}>{repo.full_name}</NavLink>
            </div>
            <div style={{margin: 5}}>{repo.stargazers_count}</div>
            <div style={{margin: 5}}>{repo.updated_at}</div>
            <div style={{margin: 5}}> {repo.url}</div>
        </div>
    }); 

    const [editMode, setEditMode] = useState(false);

    const onSearchQueryChanged = useCallback((query: string) => {
        dispatch(setSearchQuery(query));
        dispatch(setCurrentPage(1));
        history.push({
            search: '?q=' + query
        })
    }, [dispatch]);
    return (

        <div>
            <div className={style.navigation}><h2>Hello guys</h2></div>
            <Search value={searchQuery} onChange={onSearchQueryChanged} throttle={1000}/>
            { loadingStatus === 'IN-PROGRESS' ? "loading..." : "" }
            { loadingStatus === 'ERROR' && <div style={{border: "1px red solid"}}>{errorMessage}</div>  }
            <div>
                {repositoriesMap}
            </div>
            <Paginator currentPage={currentPage} totalCount={totalCount} onPageChanged={setCurrentPageHandler}/>
        </div>
    );
}

export default MainPage;
