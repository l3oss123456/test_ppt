import React, { createContext, useState, useEffect } from "react";
import * as R from "ramda";
import moment from "moment";

export const ListingTableContext = createContext();

export const ListingTableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);
  const [handleEdit, setHandleEdit] = useState(null);
  const [handleDelete, setHandleDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  //   const [isAscendSort, setIsAscendSort] = useState(true);
  const [Ascendsort, setAscendsort] = useState({});
  // const [isFirstRenderSortBtn, setIsFirstRenderSortBtn] = useState(true);
  const [lastClick, setLastClick] = useState(null);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const getDisplayTitle = (title) => {
    const _title = title.map((title) => {
      return {
        display: title.display,
        width: title.width,
        value: title.value,
      };
    });
    return _title;
  };

  const getDisplayData = (title, data) => {
    const _data = data.map((item, index) => {
      const dataRow = [];
      let selectedValue = {
        key: item.key,
        data: item,
      };
      // console.log('selectedValue;', selectedValue);
      for (let index in title) {
        if (title[index].value !== "action") {
          dataRow.push(item[`${title[index].value}`]);
        } else {
          dataRow.push(
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {!R.isNil(handleEdit) && (
                <div
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <button
                    title="Edit"
                    onPress={() => {
                      handleEdit(selectedValue.key, selectedValue.data);
                    }}
                  />
                </div>
              )}

              {!R.isNil(handleDelete) && (
                <div
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <button
                    title="Delete"
                    color="red"
                    onPress={() => handleDelete(selectedValue.key)}
                    style={{
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
      }

      return dataRow;
    });
    return _data;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortData = (type) => {
    let _sortPosts = [...posts];
    // if (isAscendSort === true) {
    if (Ascendsort[type] === false) {
      for (let i = 0; i < _sortPosts.length; i++) {
        for (let j = i + 1; j < _sortPosts.length; j++) {
          const value1 = _sortPosts[i][`${type}`];
          const value2 = _sortPosts[j][`${type}`];
          let temp = null;
          if (value1 > value2) {
            temp = _sortPosts[i];
            _sortPosts[i] = _sortPosts[j];
            _sortPosts[j] = temp;
          }
        }
      }
    } else {
      for (let i = 0; i < _sortPosts.length; i++) {
        for (let j = i + 1; j < _sortPosts.length; j++) {
          const value1 = _sortPosts[i][`${type}`];
          const value2 = _sortPosts[j][`${type}`];
          let temp = null;
          if (value1 < value2) {
            temp = _sortPosts[i];
            _sortPosts[i] = _sortPosts[j];
            _sortPosts[j] = temp;
          }
        }
      }
    }
    setPosts(_sortPosts);
  };

  const handleSortBtn = (type) => {
    if (lastClick !== type) {
      // console.log("type", type);
      setAscendsort({
        ...Ascendsort,
        [type]: !Ascendsort[type],
        [lastClick]: true,
      });
      sortData(type);
      setLastClick(type);
    } else {
      setAscendsort({ ...Ascendsort, [type]: !Ascendsort[type] });
      sortData(type);
      setLastClick(type);
    }
  };

  const _title = getDisplayTitle(title);
  const _data = getDisplayData(title, currentPosts);

  //   console.log("data;", data);
  //   console.log("title;", title);

  useEffect(() => {
    setLoading(true);
    setPosts(data);
    setLoading(false);
  }, [data]);

  //set type of sort in each title
  useEffect(() => {
    if (R.isEmpty(Ascendsort) && !R.isNil(_title) && !R.isEmpty(_title)) {
      let _Ascendsort = {};
      for (let key in _title) {
        const titleKey = _title[key].value;
        _Ascendsort = { ..._Ascendsort, [titleKey]: true };
      }
      setAscendsort(_Ascendsort);
    }
  }, [_title]);

  return (
    <ListingTableContext.Provider
      value={{
        //get data
        listData: data,
        setListData: setData,
        setTitle: setTitle,
        setHandleEdit: setHandleEdit,
        setHandleDelete: setHandleDelete,

        //create data for table
        posts: posts,
        _title: _title,
        _data: _data,
        data: data,
        title: title,
        setPosts: setPosts,

        //sort data
        sortData: sortData,
        handleSortBtn: handleSortBtn,
        lastClick: lastClick,
        Ascendsort: Ascendsort,

        //create data for pagination
        postsPerPage: postsPerPage,
        totalPosts: posts.length,
        paginate: paginate,
        currentPage: currentPage,
      }}
    >
      {children}
    </ListingTableContext.Provider>
  );
};
