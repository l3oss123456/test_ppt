import React, { useContext, useState, useEffect } from "react";
import * as R from "ramda";
import { ListingTableContext } from "../../hooks/index";
import styles from "./Search.module.css";

const SearchComponent = () => {
  const { data, title, setPosts, paginate } = useContext(ListingTableContext);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!R.isEmpty(data)) {
      if (!R.isEmpty(searchValue)) {
        let _data = [...data];
        if (searchValue !== " ") {
          try {
            //filter data
            let search_data = [];
            for (let key in title) {
              const _filterData = _data.filter((item) => {
                const _searchValue = searchValue.toLowerCase();
                const _filterType =
                  !R.isNil(title[key].value) && title[key].value !== "action"
                    ? title[key].value
                    : "";

                return (
                  !R.isEmpty(_filterType) &&
                  item[`${_filterType}`]
                    .toString()
                    .toLowerCase()
                    .match(_searchValue)
                );
              });
              search_data = [...search_data, ..._filterData];
            }

            // dropRepeats
            const new_searchData = [];
            search_data.forEach((obj) => {
              if (!new_searchData.some((o) => o.key === obj.key)) {
                new_searchData.push({ ...obj });
              }
            });
            setPosts(new_searchData);
            paginate(1);
          } catch (error) {
            console.log(
              "error useEffect([data, searchValue]) from search component",
              error
            );
          }
        }
      } else {
        setPosts(data);
      }
    }
  }, [searchValue]);

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Search"
        />
      </div>
    </div>
  );
};
export default SearchComponent;
