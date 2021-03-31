import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { ListingTableProvider, ListingTableContext } from "../../hooks/index";
import Table from "../../components/ListingTable/index";
import styles from "./Home.module.css";

const DisplayHome = () => {
  const { listData, setListData, setTitle, setHandleEdit } = useContext(
    ListingTableContext
  );

  const tableTitle = [
    { display: "Name", value: "name", width: 150 },
    { display: "Date", value: "date", width: 100 },
    { display: "Deposit", value: "deposit", width: 100 },
    { display: "Withdraw", value: "withdraw", width: 100 },
    { display: "Total", value: "total", width: 100 },
  ];

  useEffect(() => {
    const _listData = [];
    for (let i = 1; i <= 101; i++) {
      const deposit = Math.floor(Math.random() * 100000) + 100;
      const withdraw = Math.floor(Math.random() * 1000) + 100;
      const total = deposit - withdraw;
      _listData.push({
        key: i,
        // name: `firstName${i} lastName${i}`,
        name: String.fromCharCode(
          Math.floor(Math.random() * 25) + 65,
          Math.floor(Math.random() * 25) + 97,
          Math.floor(Math.random() * 25) + 97
        ),
        // date: moment().format("l"),
        // date: `${Math.floor(Math.random() * 26) + 1}/${
        //   Math.floor(Math.random() * 12) + 1
        // }/${Math.floor(Math.random() * 4) + 2560}`,
        date: moment()
          .subtract(Math.floor(Math.random() * 60) + 8, "days")
          .calendar(),
        deposit: deposit,
        withdraw: withdraw,
        total: total,
      });
    }
    setListData(_listData);
    setTitle(tableTitle);
  }, []);

  return (
    <div className={styles.Container}>
      <p className={styles.titlePage}>Bank Logging</p>
      <Table />
    </div>
  );
};

const Home = () => {
  return (
    <ListingTableProvider>
      <DisplayHome />
    </ListingTableProvider>
  );
};
export default Home;
