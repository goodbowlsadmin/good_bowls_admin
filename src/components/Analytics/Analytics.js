import React, { useState } from "react";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
propertyId = '406180211';


const Analytics = () => {


async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });
  
    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

  runReport();
    return (
        <div>
            <h1>Analytics</h1>
        </div>
    )
}

export default Analytics