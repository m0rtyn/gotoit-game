import React, { Component } from 'react';

import Worker from './Worker';

import Office from './Office';

import {offices} from '../game/knowledge';

class People extends Component {
    constructor(props) {
        super(props);

        this.hire = this.hire.bind(this);
        this.reject = this.reject.bind(this);
    }

    hire(event, type) {
        this.props.data.helpers.hireCandidate(event.target.id, type);
    }

    reject(event, type) {
        this.props.data.helpers.rejectCandidate(event.target.id, type);
    }

    render() {
        const data = this.props.data;




        return (
            <div>
                <h4 className="text-center slim-top"><label> Your Team </label>
                </h4>
                {data.workers.map((x, i) =>
                    <Worker key={x.id} worker={x} data={data} />
                )}
                {(data.workers.length < data.office.space)
                    ?
                    <div className="panel panel-success">
                        <button className="btn btn-success" onClick={() => { data.helpers.changeContent('HireWorkers')}}>Hire Worker</button>

                        <div className="panel panel-warning">
                            <span>
                                {(data.office.size > 1 && offices[data.office.size-1].space >= data.workers.length)
                                    ? ((data.office.size === 2)
                                    ? <button onClick={() => {data.helpers.downOffice();}} className="btn btn-warning">Cancel the Office</button>
                                    : <button onClick={() => {data.helpers.downOffice();}} className="btn btn-warning">Downgrade the Office</button>)
                                    : ''}
                                {data.office.size < 4
                                    ? <button onClick={() => {data.helpers.upOffice();}} className="btn btn-warning">Extend the Office</button>
                                    : ''}
                            </span>
                        </div>
                    </div>
                    :
                    <div className="panel panel-warning">
                        <span>
                            {(data.office.size === 1)
                                ? <button onClick={() => {data.helpers.upOffice();}} className="btn btn-warning">Rent a Office</button>
                                : ((data.office.size < 4)
                                    ? <button onClick={() => {data.helpers.upOffice();}} className="btn btn-warning">Extend the Office</button>
                                    : '')}
                        </span>
                    </div>
                    }

                <Office data={this.props.data}/>

            </div>
        );
    }
}

export default People;