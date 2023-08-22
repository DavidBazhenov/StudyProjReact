import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setfilter}) => {
    let OptionsMas = [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'},
      ]
    return (
        <div>
            <MyInput 
                placeholder='Поиск...'
                onChange={e=>setfilter({...e, query: e.target.value})}
                value={filter.query}

            />
            <MySelect 
                defaultValue='Сортировка'
                options={OptionsMas}
                value={filter.sort} 
                onChange={selectedSort => setfilter({...filter, sort: selectedSort})}
            />
        </div>
    );
}

export default PostFilter;