import React from 'react'
import {Line} from 'react-chartjs-2'

const Chart = (props) => {

    let data = {
        labels: props.data.labels,
        datasets: props.data.datasets
    };

    let options = props.options;

    return <div>
        <Line data={data} options={options}/>
    </div>
};

export default Chart;