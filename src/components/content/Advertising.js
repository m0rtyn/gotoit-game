import React, { Component } from 'react';
import PRDepartment from '../PRDepartment';


class Advertising extends Component {
    render() {
        const data = this.props.data;

        return (
            <PRDepartment data={data}/>
        )}
}

export default Advertising;
