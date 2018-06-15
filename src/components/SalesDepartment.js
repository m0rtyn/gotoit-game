import React, { Component } from 'react';

class SalesDepartment extends Component {
    render() {
        const data = this.props.data;

        return (
            <div className="card border text-center">
                <h5>Reputation</h5>

                <div className="progress slim">
                    <div className='progress-bar' role="progressbar"
                         style={{width: Math.min(100, data.reputation)+'%'}}>
                        <label>{data.reputation}%</label>
                    </div>
                </div>
                <div>
                    <div>
                        <button className="btn btn-info" onClick={() => {data.helpers.salesDepartmentUp('cold')}}>Cold Sales: +1 Reputation</button>
                    </div>
                    <div>
                        <button className={100 <= data.money ? "btn btn-info" : "btn btn-info disabled"} onClick={() => {data.helpers.salesDepartmentUp('advert')}}>Advertise: cost $100 => +10 Reputation</button>
                    </div>
                    <div>
                        <button className={10 <= data.rumor ? "btn btn-info" : "btn btn-info disabled"} onClick={() => {data.helpers.salesDepartmentUp('demo')}}>Live Demo: cost 10 Rumor</button>
                        {(data.demo > 0) ? <span>You {data.demo} generate {data.demo} reputation/day</span> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesDepartment;