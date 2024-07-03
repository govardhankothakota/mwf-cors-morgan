import React, { useState, useEffect, useRef } from "react";

function EmployeeData() {
  let [countriesList, setcountriesList] = useState([]);
  let [departmentsList, setDepartmentsList] = useState([]);
  let [gendersList, setGendersList] = useState([]);
  let [employees, setEmployees] = useState([]);

  let countrySelectRef = useRef();
  let depSelectRef = useRef();
  let genderSelectRef = useRef();

  useEffect(() => {
    getCountriesList();
    getDepartmentsList();
    getGendersList();
  }, []);

  let getCountriesList = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:7799/countriesList",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setcountriesList(JSOData);

    console.log(JSOData);
  };
  let getDepartmentsList = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:7799/departmentsList",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setDepartmentsList(JSOData);

    console.log(JSOData);
  };
  let getGendersList = async () => {
    let reqOptions = {
      method: "GET",
    };
    let JSONData = await fetch("http://localhost:7799/gendersList", reqOptions);
    let JSOData = await JSONData.json();
    setGendersList(JSOData);

    console.log(JSOData);
  };

  let getEmployeesFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };
    let url = `http://localhost:7799/employees?country=${countrySelectRef.current.value}&department=${depSelectRef.current.value}&gender=${genderSelectRef.current.value}&limit=8&order=asc`;

    // let url = `http://localhost:7799/employees/${countrySelectRef.current.value}/${depSelectRef.current.value}/${genderSelectRef.current.value}?limit=8&order=asc`;

    let JSONData = await fetch(url, reqOptions);
    let JSOData = await JSONData.json();
    setEmployees(JSOData);

    console.log(url);
    console.log(JSOData);
  };
  return (
    <div>
      <form>
        <div>
          <label>Country</label>
          <select ref={countrySelectRef}>
            {countriesList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Department</label>
          <select ref={depSelectRef}>
            {departmentsList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Gender</label>
          <select ref={genderSelectRef}>
            {gendersList.map((ele, i) => {
              return <option key={i}>{ele}</option>;
            })}
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            getEmployeesFromServer();
          }}
        >
          Get Employees
        </button>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>Profilepic</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Email</th>
            <th>Department</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((ele, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{ele.id}</td>
                <td>
                  <img src={ele.profilepic}></img>
                </td>
                <td>{ele.first_name}</td>
                <td>{ele.last_name}</td>
                <td>{ele.gender}</td>
                <td>{ele.age}</td>
                <td>{ele.email}</td>
                <td>{ele.department}</td>
                <td>{ele.country}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default EmployeeData;
