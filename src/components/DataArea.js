import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import UserContext from "../utils/userContext";
import "../styles/DataArea.css";

function DataArea() {

  const [headings, setHeadings] = useState([
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]);
  const [usersState, setUsers] = useState({
    users: [{}],
    filteredUsers: [{}]
  });
  const [order, setOrder] = useState("descend");

  useEffect(() => {
    API.getUsers().then(results => {
      console.log("API results", results.data.results);
      setUsers({
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }, []);

  function handleSort(heading) {
    if (order === "descend") {
      setOrder("ascend");
    } else {
      setOrder("descend");
    }

    function compareFnc(a, b) {
      if (order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].last.localeCompare(b[heading].last);
        } else if (heading === "email") {
          return a[heading].localeCompare(b[heading]);
        } else if (heading === "dob") {
          let aDOB = new Date(a[heading].date);
          let bDOB = new Date(b[heading].date);
          return aDOB > bDOB ? -1 : 1;
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].last.localeCompare(a[heading].last);
        } else if (heading === "email") {
          return b[heading].localeCompare(a[heading]);
        } else if (heading === "dob") {
          let aDOB = new Date(a[heading].date);
          let bDOB = new Date(b[heading].date);
          return aDOB > bDOB ? 1 : -1;
        } else {
          return b[heading] - a[heading];
        }
      }
    }
    const sortedUsers = usersState.filteredUsers.sort(compareFnc);
    setUsers({ ...usersState, filteredUsers: sortedUsers });
  }

  function handleDOBSort(e) {
    e.preventDefault();
    const fromDate = new Date(document.getElementById("from-date").value);
    const toDate = new Date(document.getElementById("to-date").value);

    const filteredDOB = usersState.users.filter(item => {
      const DOB = new Date(item.dob.date)
      return DOB > fromDate && DOB < toDate
    });
    setUsers({ ...usersState, filteredUsers: filteredDOB })
  }

  function handleSearchChange(event) {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = usersState.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setUsers({ ...usersState, filteredUsers: filteredList });
  }

  return (
    <UserContext.Provider value={{ headings, usersState, order, handleSort, handleSearchChange, handleDOBSort }}>
      <Nav />
      <div className="data-area">
        <DataTable />
      </div>
    </UserContext.Provider>
  );
};

export default DataArea;