import React, { useContext, useState, useEffect } from "react";
import * as R from "ramda";
import { HomeContext, ListingTableContext } from "../../hooks/index";
import Search from "../Search/index";
import Pagination from "../Pagination/index";
import styles from "./ListingTable.module.css";

const ListingTable = () => {
  const {
    //data for table
    data,
    title,
    _data,
    _title,
    posts,
    setPosts,

    //sortData
    Ascendsort,
    lastClick,
    handleSortBtn,

    //pagination
    paginate,
    postsPerPage,
    currentPage,
  } = useContext(ListingTableContext);
  return (
    <div className={styles.Container}>
      <Search
        data={data}
        setData={setPosts}
        title={title}
        paginate={paginate}
      />

      <table>
        <tr>
          {_title.map((title) => {
            return (
              <th style={{ width: title.width }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a>{title.display}</a>
                  <button
                    onClick={() => {
                      handleSortBtn(title.value);
                    }}
                  >
                    {R.isNil(lastClick)
                      ? "-"
                      : Ascendsort[title.value] === true
                      ? "v"
                      : "^"}
                  </button>
                </div>
              </th>
            );
          })}
        </tr>

        {!R.isEmpty(_data) ? (
          _data.map((item, index) => {
            return (
              <tr
                className={
                  index % 2 === 0
                    ? styles.evenColumnTable
                    : styles.oddColumnTable
                }
              >
                {item.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            );
          })
        ) : (
          <th
            colspan={_title.length}
            style={{
              textAlign: "center",
            }}
          >
            Don't have any data !
          </th>
        )}

        {/* {_data.map((item, index) => {
          return (
            <tr
              className={
                index % 2 === 0 ? styles.evenColumnTable : styles.oddColumnTable
              }
            >
              {item.map((data) => {
                return <th>{data}</th>;
              })}
            </tr>
          );
        })} */}
      </table>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
export default ListingTable;
