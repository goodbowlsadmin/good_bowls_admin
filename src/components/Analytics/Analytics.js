import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { Table } from "./Table";

const Analytics = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [errors, setError] = useState("");
  const [report, setReport] = useState(null);
  const propertyId = "406180211";

  useEffect(() => {
    if (authenticated) {
      runReport();
    }
  }, [authenticated]);

  async function signIn() {
    if (!authenticated) {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/analytics.readonly");
      provider.addScope("https://www.googleapis.com/auth/analytics");

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const credentials = user.stsTokenManager;
        localStorage.setItem("refreshToken", credentials.refreshToken);
        localStorage.setItem("accessToken", credentials.accessToken);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("user", user);
        setAuthenticated(true);
      } catch (error) {
        console.log(error);
        setError(error);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(true);
    }
  }

  async function runReport() {
    var options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
            startDate: "2024-01-01",
            endDate: "2024-04-01",
          },
        ],
      }),
    };
    await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      options
    )
      .then((response) => response.json())
      .then((data) => setReport(data));
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

      {report ? <Table reports={report} /> : "Loading..."}
    </div>
  );
};

export default Analytics;
