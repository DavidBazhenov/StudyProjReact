import React from "react";
import { getPagesArray} from '../../../utils/pages'
import cl from './MyPagination.module.css'

const MyPagination = ({totalPages, page, funck}) => {
    let pagesArray = getPagesArray(totalPages);
    return (
        <div className={cl.page__wrapper}>
          { pagesArray.map(p=>

            <span
              onClick={()=>{funck(p)}}
              key = {p}
              className={page === p ? cl.page_active : cl.page }
            >
              {p}
            </span>
          )}
        </div>
    );
}

export default MyPagination;