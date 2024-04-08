import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { Table } from "./Table";
import { DateRangePicker } from "./DateRangePicker";

const Analytics = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [errors, setError] = useState("");
  const [report, setReport] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loadReport, fetchReport] = useState(false);

  const propertyId = "406180211";

  useEffect(() => {
    if (authenticated && loadReport) {
      runReport(startDate, endDate);
    }
  }, [authenticated, loadReport]);

  async function signIn() {
    if (!authenticated) {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/analytics.readonly");
      provider.addScope("https://www.googleapis.com/auth/analytics");

      const yo = await getRedirectResult(auth);
      console.log(yo);
      localStorage.setItem("redirect", yo);

      try {
        const result = await signInWithPopup(auth, provider);
        getRedirectResult();
        const user = result.user;
        const credentials = user.stsTokenManager;
        localStorage.setItem("refreshToken", credentials.refreshToken);
        localStorage.setItem("accessToken", credentials.accessToken);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("user", user);
        setAuthenticated(true);
      } catch (error) {
        console.error(error);
        alert(error);
        setError(error);
        setAuthenticated(false);
        setReport([]);
      }
    } else {
      setAuthenticated(true);
    }
  }

  async function runReport(startDate, endDate) {
    var options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
      body: JSON.stringify({
        dimensions: [
          {
            name: "unifiedScreenName",
          },
        ],
        metrics: [
          {
            name: "screenPageViews",
          },
        ],
        dateRanges: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        options
      );
      const data = await response.json();
      setReport(data);
      fetchReport(false);
    } catch (error) {
      console.error(error);
      setError(error);
      fetchReport(false);
      setReport(null);
    }
  }

  return (
    <div>
      {errors && <p>{errors}</p>}
      <h1>Analytics</h1>
      <h1>Welcome Back {localStorage.getItem("name")}</h1>
      {!authenticated && (
        <button
          onClick={async () => {
            await signIn();
          }}
        >
          Sign In To Google
        </button>
      )}
      <DateRangePicker
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      <button
        disabled={startDate === "" || endDate === ""}
        onClick={() => {
          fetchReport(true);
        }}
      >
        Get Report
      </button>
      {report ? <Table reports={report} /> : null}
    </div>
  );
};

export default Analytics;
