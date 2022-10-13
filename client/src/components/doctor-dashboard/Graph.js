import React, { Fragment } from "react";
import { CardHeader, Card } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Graph = ({ patient }) => {
 
  const patientData = [];
  const jan = [0];
  const feb = [0];
  const mar = [0];
  const apr = [0];
  const may = [0];
  const jun = [0];
  const jul = [0];
  const aug = [0];
  const sep = [0];
  const oct = [0];
  const nov = [0];
  const dec = [0];

  patient?.map((pat) => {
    if (new Date(pat.bookingDate).getMonth() === 0) {
      return jan.push(jan[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 1) {
      return feb.push(feb[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 2) {
      return mar.push(mar[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 3) {
      return apr.push(apr[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 4) {
      return may.push(may[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 5) {
      return jun.push(jun[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 6) {
      return jul.push(jul[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 7) {
      return aug.push(aug[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 8) {
      return sep.push(sep[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 9) {
      return oct.push(oct[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 10) {
      return nov.push(nov[0] + 1);
    } else if (new Date(pat.bookingDate).getMonth() === 11) {
      return dec.push(dec[0] + 1);
    } else {
      return 0;
    }
  });

  var janData = jan.reduce((a, b) => a + b, jan[0]);
  var febData = feb.reduce((a, b) => a + b, feb[0]);
  var marData = mar.reduce((a, b) => a + b, mar[0]);
  var aprData = apr.reduce((a, b) => a + b, apr[0]);
  var mayData = may.reduce((a, b) => a + b, may[0]);
  var junData = jun.reduce((a, b) => a + b, jun[0]);
  var julData = jul.reduce((a, b) => a + b, jul[0]);
  var augData = aug.reduce((a, b) => a + b, aug[0]);
  var sepData = sep.reduce((a, b) => a + b, sep[0]);
  var octData = oct.reduce((a, b) => a + b, oct[0]);
  var novData = nov.reduce((a, b) => a + b, nov[0]);
  var decData = dec.reduce((a, b) => a + b, dec[0]);

  patientData.push(janData);
  patientData.push(febData);
  patientData.push(marData);
  patientData.push(aprData);
  patientData.push(mayData);
  patientData.push(junData);
  patientData.push(julData);
  patientData.push(augData);
  patientData.push(sepData);
  patientData.push(octData);
  patientData.push(novData);
  patientData.push(decData);

 

  const state = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Average appointments per month",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: patientData,
      },
    ],
  };

  return (
    <Fragment>
      <div className="user-graph">
        <Card>
          <CardHeader title="APPOINTMENTS PER MONTHS" />
          <Line
          className="graph"
            data={state}
            options={{
              title: {
                display: true,
                text: "Average appointments per month",
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
    </Fragment>
  );
};

export default Graph;
