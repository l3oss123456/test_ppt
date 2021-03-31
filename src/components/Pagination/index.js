import React, { useContext } from "react";
import { ListingTableContext } from "../../hooks/index";
import styles from "./Pagination.module.css";

const Pagination = () =>
  // { postsPerPage, totalPosts, paginate, currentPage }
  {
    const { paginate, totalPosts, postsPerPage, currentPage } = useContext(
      ListingTableContext
    );
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ul>
          {pageNumbers.map((number) => {
            const middlePagination =
              currentPage > 2 && currentPage < pageNumbers.length - 1
                ? currentPage
                : Math.ceil(pageNumbers.length / 2);

            return (
              <li key={number} className={styles.pagination}>
                {number === 1 && (
                  <a
                    href="#"
                    onClick={() =>
                      currentPage - 1 > 0 && paginate(currentPage - 1)
                    }
                  >
                    &laquo;
                  </a>
                )}

                {/* first 2 number pagination */}
                {number < 3 && (
                  <a
                    href="#"
                    style={{
                      background:
                        currentPage === number && " rgb(173, 168, 168)",
                      color: currentPage === number && "white",
                      transition: "0.4s",
                    }}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                )}

                {/* middle of pagination */}

                {(number === 3 || number === pageNumbers.length - 3) &&
                  (middlePagination === 3 ||
                  middlePagination === pageNumbers.length - 2 ? null : (
                    <a>...</a>
                  ))}

                {number === 3 && (
                  <>
                    {currentPage === pageNumbers.length - 2 && <a>...</a>}

                    <a
                      href="#"
                      style={{
                        background:
                          currentPage === middlePagination &&
                          " rgb(173, 168, 168)",
                        color: currentPage === middlePagination && "white",
                        transition: "0.4s",
                      }}
                      onClick={() => paginate(middlePagination)}
                    >
                      {middlePagination}
                    </a>

                    {currentPage === 3 && <a>...</a>}
                  </>
                )}

                {/* last 2 pagination number */}
                {number > pageNumbers.length - 2 && pageNumbers.length > 7 && (
                  <a
                    href="#"
                    style={{
                      background:
                        currentPage === number && " rgb(173, 168, 168)",
                      color: currentPage === number && "white",
                      transition: "0.4s",
                    }}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                )}

                {number === pageNumbers.length && (
                  <a
                    href="#"
                    onClick={() =>
                      currentPage + 1 < pageNumbers.length + 1 &&
                      paginate(currentPage + 1)
                    }
                  >
                    &raquo;
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };
export default Pagination;
