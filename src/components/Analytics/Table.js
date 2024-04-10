import React from "react";

export function Table({ reports }) {
  const { dimensionHeaders = [], metricHeaders = [], rows = [] } = reports;

  return (
    <table className="table">
      <thead>
        <tr>
          {dimensionHeaders.map((header, index) => (
            <th key={index}><strong>{header.name}</strong></th>
          ))}
          {metricHeaders.map((header, index) => (
            <th key={index}><strong>{header.name}</strong></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.dimensionValues.map((dimension, dimensionIndex) => (
              <td key={dimensionIndex}>{dimension.value}</td>
            ))}
            {row.metricValues.map((metric, metricIndex) => (
              <td key={metricIndex}>{metric.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
