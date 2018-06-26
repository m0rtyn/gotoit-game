import React from 'react'
import Chart from '../Chart'
import {charts_parameters} from '../../game/knowledge'
import _ from 'lodash'

let ChartsController = (props) => {

  let type = props.chart ? props.chart.type : 'default';
  let text = props.chart ? props.chart.name : 'Game statistics';
  let labels = [];
  let datasets = [];

    switch(type) {
        case 'BTC': /*
            some btc-chart logic
            break;
        */

        case 'Archive': /*
            projects archive logic
            break;
        */

        case 'Market': /*
            some market logic
            break;
        */

        default:

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
    text: text
  }

  return <Chart data={data}/>

};

export default ChartsController;
