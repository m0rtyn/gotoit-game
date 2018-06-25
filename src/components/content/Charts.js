import React from 'react'
import {Line} from 'react-chartjs-2'
import {charts_parameters} from '../../game/knowledge'
import _ from 'lodash'

const Charts = (props) => {
    let labels = Object.keys(props.data.statistics.money_spent.values);
    let datasets = [];

    _.mapValues(props.data.statistics, (stats, key) => {
        datasets.push({
            data: stats.values,
            label: charts_parameters[key].label,
             borderColor: charts_parameters[key].color,
             fill: false
        })
    });

    let data = {
        labels: labels,
        datasets: datasets
    };

    let options = {
        elements: {
            point: {
            radius: 0
            }
        },
        title: {
            display: true,
            text: 'Game statistics'
            }
        };


    return <div>
        <Line data={data} options={options}/>
    </div>
};

export default Charts