import { Card, CardHeader } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";

export default function PatientAgeChart() {
  const avg_patient_age = useSelector(
    (state) => state.appointment?.avg_patient_age
  );

  const state = {
    labels: [
      "1-10 years old",
      "11-20 years old",
      "21-30 years old",
      "31-40 years old",
      "Above 50 years",
    ],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#016e01",
          "#0a0ef5",
          "#9005ed",
          "#fac802",
          "#fc3003",
        ],
        hoverBackgroundColor: [
          "#b3f5b3",
          "#7a7cf0",
          "#9e64c4",
          "#e8ce66",
          "#c95d44",
        ],
        data: avg_patient_age,
      },
    ],
  };

  return (
    <div>
      <Card>
        <CardHeader
          title="Patient Ages"
          subheader="chart of average age of patients who locked-in appointments"
        />
        <Doughnut
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </Card>
    </div>
  );
}
