import React from 'react'
import Chart from '../Chart'
import {charts_parameters, btc_chart_parameters} from '../../game/knowledge'
import _ from 'lodash'

let ChartsController = (props) => {

    let type = props.chart ? props.chart.type : 'default';
    let text = props.chart ? props.chart.name : 'Game statistics';
    let labels = [];
    let datasets = [];
    let options = {};


    switch(type) {
        case 'BTC':
          const btc_statistic = props.data.btc_statistic;
          labels = Object.keys(props.data.btc_statistic.values);
          datasets.push({
              data: btc_statistic.values,
              label: btc_chart_parameters.label,
              borderColor: btc_chart_parameters.color,
              fill: false
          });
          options = {
              legend: {
                  display: false
              },
              tooltips: {
                  enabled: false
              }
          }
          break;

        case 'Archive': /*
            projects archive logic
            break;
        */

        case 'Market': /*
            some market logic
            break;
        */

        default:
          options = {
              elements: {
                  point: {
                      radius: 0
                  }
              },
              title: {
                  display: true,
                  text: props.data.text
              }
          }
          labels = Object.keys(props.data.statistics.money_spent.values);
          _.mapValues(props.data.statistics, (stats, key) => {
            datasets.push({
              data: stats.values,
              label: charts_parameters[key].label,
              borderColor: charts_parameters[key].color,
              fill: false
            })
          });
  }

  let data = {
      labels: labels,
      datasets: datasets,
      text: text,
      options: options
  }

  return <Chart data={data}/>

};

export default ChartsController;
