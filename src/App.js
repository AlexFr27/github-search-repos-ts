import React, {useEffect, useState} from 'react';
import style from './App.module.css';


function App() {

    const [searchRep, setSearchRep] = useState('')

    const [repositories, setRepositories] = useState([])
    const [timeOut, setTimeOut] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)



    useEffect(() => {
        if (searchRep) {
            handle(searchRep)
        }
    }, [currentPage])

    const changeSearchRep = (e) => {
        if (timeOut) {
            clearTimeout(timeOut)
        }
        const value = e.currentTarget.value
        setSearchRep(value)
        const timeout = setTimeout(() => {
            handle(value)
        }, 1000)
        setTimeOut(timeout)
    }
    const handle = (searchText) => {
        fetch(`https://api.github.com/search/repositories?q=${searchText}&sort=stars&page=${currentPage}&per_page=10`)
            .then(res => res.json())
            .then(data => {
                setRepositories(data.items);
                setTotalCount(data.total_count);
            })
    }
    let pageCount = Math.ceil(totalCount / 10);
    pageCount = pageCount > 10 ? 10 : pageCount
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }


    return (
        <div>
            <div className={style.navigation}><h2>Hello guys</h2></div>
            <div className={style.search}>
                <input value={searchRep} onChange={changeSearchRep}/>
            </div>
            <div>
                {repositories.map(repo => {
                    return <div style={{display: 'flex'}} key={repo.id}>
                        <div style={{margin: 5}}>{repo.name}</div>
                        <div style={{margin: 5}}>{repo.stargazers_count}</div>
                        <div style={{margin: 5}}>{repo.updated_at}</div>
                        <div style={{margin: 5}}> {repo.url}</div>
                    </div>
                })}
            </div>
            <div style={{display: 'flex'}}>
                {pages.map((page, index) => {
                    return <div key={index} onClick={() => setCurrentPage(page)} style={{
                        border: '1px solid grey',
                        padding: 2,
                        background: page === currentPage ? 'red' : "white"
                    }}>{page}</div>
                })}
            </div>
        </div>
    );
}

export default App;
