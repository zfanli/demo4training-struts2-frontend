import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./App.css";
import Axios from "axios";

function getRateData(prev) {
  return Axios.get(`${window.location.href}api/rate?prev=${prev}`);
}

const chartColors = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
];

function App() {
  const ref = useRef(null);

  return (
    <div className="App">
      <Line
        ref={ref}
        data={{
          datasets: [
            {
              label: "Data 1",
              fill: false,
              borderColor: chartColors[0],
              backgroundColor: chartColors[0],
              lineTension: 0,
              cubicInterpolationMode: "monotone",
              data: []
            }
          ]
        }}
        options={{
          title: {
            display: true,
            text: "demo4training"
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                type: "realtime",
                realtime: {
                  duration: 20000,
                  refresh: 1000,
                  delay: 2000,
                  onRefresh: function(chart) {
                    chart.data.datasets.forEach(function(dataset) {
                      let prev = dataset.data[dataset.data.length - 1];
                      prev = prev && prev.y ? prev.y : 1;
                      getRateData(prev).then(({ data }) => {
                        dataset.data.push({
                          x: Date.now(),
                          y: JSON.parse(data).rate
                        });
                      });
                    });
                  }
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "value"
                }
              }
            ]
          },
          tooltips: {
            position: "nearest",
            intersect: false
          },
          animation: {
            duration: 0
          }
        }}
      />
    </div>
  );
}

export default App;
