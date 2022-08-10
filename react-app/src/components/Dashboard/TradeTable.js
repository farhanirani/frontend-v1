import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./TradeTable.css";

export const TradeTable = () => {
  let token = localStorage.getItem("auth-token");

  const changeRowColor = (params) => {
    var cur_date = new Date();
    const date = new Date(params.data.maturity_date);
    if (date < cur_date) {
      return { "background-color": "#FAA0A0" };
    } else {
      return { "background-color": "#EEEEEE" };
    }
  };

  const columns = [
    {
      headerName: "Security ID",
      field: "securityid",
      sortable: true,
      filter: true,
      cellStyle: changeRowColor,
      maxWidth: 160,
    },
    {
      headerName: "ISIN",
      field: "isin",
      cellStyle: changeRowColor,
      maxWidth: 150,
      sortable: true,
    },
    {
      headerName: "CUSIP",
      field: "cusip",
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
    {
      headerName: "Issuer",
      field: "issuer",
      sortable: true,
      cellStyle: changeRowColor,
      maxWidth: 160,
    },
    {
      headerName: "Maturity Date",
      field: "maturity_date",
      cellStyle: changeRowColor,
      sortable: true,
      maxWidth: 167,
    },
    {
      headerName: "Coupon",
      field: "coupon",
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
    {
      headerName: "Type",
      field: "type",
      sortable: true,
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
    {
      headerName: "Face Value",
      field: "facevalue",
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
    {
      headerName: "Status",
      field: "status",
      filter: true,
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
  ];

  const onGridReady = (params) => {
    var starting_address = "https://db-grads-93u0-group-10.nw.r.appspot.com";
    // if (token) {
    //   fetch(starting_address + "/api/v1/security/" + token)
    //     // fetch("http://localhost:8000/trade-sec-api")
    //     .then((resp) => resp.json())
    //     .then((resp) => {
    //       console.log(resp);
    //       params.api.applyTransaction({ add: resp });
    //     });
    // } else {
    fetch(starting_address + "/api/v1/security/all")
      // fetch("http://localhost:8000/trade-sec-api")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        params.api.applyTransaction({ add: resp });
      });
    // }
  };

  const headingStyle = {
    padding: "10px 20px",
    outline: 0,
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
  };

  return (
    <div>
      <div>
        <br></br>
        <h2 className="heading" style={headingStyle}>
          Securities Dashboard
        </h2>
        <br></br>
      </div>
      <div
        className="ag-theme-alpine table-container"
        style={{
          height: "36.2vh",
          width: "95%",
        }}
      >
        <AgGridReact columnDefs={columns} onGridReady={onGridReady} />
      </div>
      <br />
      <div align="center"></div>
    </div>
  );
};
