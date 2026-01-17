import React from 'react'
import { getPagesArray } from '../../../utils/pages';
import { useMemo } from 'react';

const Pagination = ({totalPages, page, changePage}) => {
  const pagesArray = useMemo(() => {
    return getPagesArray(totalPages);
  }, [totalPages]);

  return (
    <div className="page__wrapper">
    {pagesArray.map(p =>
        <span 
            onClick={() => changePage(p)}
            key={p} 
            className={page === p ? 'page page__current' : 'page'}>
          {p}
        </span>
    )}
</div>
  )
}

export default Pagination
