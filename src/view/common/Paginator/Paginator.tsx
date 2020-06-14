import React from 'react';

type PropsType = {
    currentPage: number
    totalCount: number
    onPageChanged: (newPage: number) => void
}

export const Paginator: React.FC<PropsType> = ({totalCount, currentPage, onPageChanged}) => {
    let pageCount = Math.ceil(totalCount / 10);
    pageCount = pageCount > 10 ? 10 : pageCount
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i); //Изначально пустой массив, пушим на каждой итерации по 1 пэйджу в массив
    }

    const pagesMap = pages.map((page, index) => {
        return <div key={index} onClick={() => onPageChanged(page)} style={{
            border: '1px solid grey',
            padding: 2,
            background: page === currentPage ? 'red' : "white"
        }}>{page}</div>
    })

    return (
        <div style={{display: 'flex'}}>
            {pagesMap}
        </div>
    );
}
