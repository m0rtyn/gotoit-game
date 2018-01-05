import React, { Component } from 'react';

class HrDepartment extends Component {
    render() {
        const data = this.props.data;

        return (
            <div className="panel panel-success text-center">
                <h5>Rumor</h5>

                <div className="progress slim">
                    <div className='progress-bar' role="progressbar"
                         style={{width: Math.min(100, data.rumor)+'%'}}>
                        <label>{data.rumor}%</label>
                    </div>
                </div>
                <div>
                    <p>
                        <button className="btn btn-info" onClick={() => {data.helpers.hrDepartmentUp('looking')}}>Forum thread: +1 Rumor</button>
                    </p>
                    <p>
                        <button className={100 <= data.money ? "btn btn-info" : "btn btn-info disabled"} onClick={() => {data.helpers.hrDepartmentUp('vacancy')}}>Advertise: cost $100 => +10 Rumor</button>
                    </p>
                    <p>
                        <button className={10 <= data.reputation ? "btn btn-info" : "btn btn-info disabled"} onClick={() => {data.helpers.hrDepartmentUp('meetup')}}>Meet Up: cost 10 Reputation</button>
                        {(data.meetup > 0) ? <span>You {data.meetup} generate {data.meetup} reputation/yer</span> : ''}
                    </p>
                </div>
            </div>
        );
    }
}

export default HrDepartment;