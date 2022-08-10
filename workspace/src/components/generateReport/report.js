import React from "react";
import { useState } from "react";
import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Report.css";

export const Report = () => {
  const gridRef = useRef();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [rowData, setRowData] = useState([]);

  const changeRowColor = (params) => {
    return { "background-color": "#EEEEEE" };
  };

  const columns = [
    {
      headerName: "Security ID",
      field: "securityid",
      cellStyle: changeRowColor,
      maxWidth: 160,
    },
    {
      headerName: "ISIN",
      field: "isin",
      cellStyle: changeRowColor,
      maxWidth: 150,
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
      cellStyle: changeRowColor,
      maxWidth: 160,
    },
    {
      headerName: "Maturity Date",
      field: "maturity_date",
      cellStyle: changeRowColor,
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
      cellStyle: changeRowColor,
      maxWidth: 150,
    },
  ];

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onGridReady = (params) => {
    console.log("On Grid Ready");
    console.log(params.api);

    // var starting_address = "https://db-grads-93u0-group-10.nw.r.appspot.com";
    // var url =
    //   starting_address +
    //   "/api/v1/security/date?from=" +
    //   localStorage.getItem("start_date") +
    //   "&to=" +
    //   localStorage.getItem("end_date");

    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     console.log(resp);
    //     params.api.applyTransaction({ add: resp });
    //   });
  };

  function onChangeStartDate(e) {
    setStartDate(e.target.value);
  }

  function onChangeEndDate(e) {
    setEndDate(e.target.value);
  }

  const onSubmitEvent = (e) => {
    e.preventDefault();
    localStorage.setItem("start_date", start_date);
    localStorage.setItem("end_date", end_date);
    //
    // https://db-grads-93u0-group-10.nw.r.appspot.com/api/v1/security/all/date?from=2002-12-25&to=2006-12-25
    var starting_address = "https://db-grads-93u0-group-10.nw.r.appspot.com";
    var url =
      starting_address +
      "/api/v1/security/1/date?from=" +
      localStorage.getItem("start_date") +
      "&to=" +
      localStorage.getItem("end_date");
    console.log(url);
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log("here");
        setRowData(resp);
        console.log(resp);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmitEvent}>
          <div className="startdate">
            <label htmlFor="sdate">Start Date &nbsp;&nbsp;-&nbsp;&nbsp; </label>
            <input
              className="dateSelect"
              type="date"
              value={start_date}
              onChange={onChangeStartDate}
            />
          </div>

          <div className="startdate">
            <label htmlFor="edate">
              End Date &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;{" "}
            </label>
            <input
              className="dateSelect"
              type="date"
              value={end_date}
              onChange={onChangeEndDate}
            />
          </div>

          <div className="submit-btn">
            <button className="submit-btn-color" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div
        className="ag-theme-alpine table-container"
        style={{
          height: "36.4vh",
          width: "95%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          rowData={rowData}
          onGridReady={onGridReady}
        />
        <button className="button export-btn" onClick={() => onBtnExport()}>
          Export As CSV
        </button>
      </div>
    </div>
  );
};
