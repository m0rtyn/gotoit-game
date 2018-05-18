import React, { Component } from 'react';
import HrDepartment from '../HrDepartment';
import SalesDepartment from '../SalesDepartment';


class Advertising extends Component {
    render() {
        const data = this.props.data;

        return (
            <div className='flex-container-row'>
            <div className='flex-container-column'>
                <HrDepartment data={data}/>
            </div>
                <div className='flex-container-column'>
                   <SalesDepartment data={data} />
                </div>
            </div>

        )}
}

export default Advertising;
