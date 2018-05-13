import React, { Component } from 'react';
import MarketTop from './MarketTop';

import StartProject from './StartProject';
import StartMeeting from './StartMeeting';
import ProjectsFind from './ProjectsFind';

import Loans from './Loans';
import Market from './Market';

class ButtonToolbar extends Component {
    constructor(props) {
        super(props);
        }

    render() {
        let data = this.props.data;

        return (
            <div className="panel panel-success">
                <div className="flex-container-row" style={{margin: '5px 0px 5px 0px'}}>
                    <span className="flex-element">
                        <StartProject data={this.props.data} />
                    </span>
                    <span className="flex-element">
                        {data.projects.length > 0 ? <StartMeeting data={this.props.data} /> : ''}
                    </span>

                    <span className="flex-element">
                        <ProjectsFind data={this.props.data} />
                    </span>
                    <span className="flex-element hidden"> <label> or </label> <button className="btn btn-info" onClick={this.props.data.helpers.draftProject}>Invent Startup</button></span>
                </div>


                <div className="flex-container-row" style={{margin: '5px 0px 5px 0px'}}>
                    <span className="flex-element"> <Loans data={data} /> </span>
                    <span className="flex-element"> <Market data={data} /> </span>

                    <span className="flex-element">
                    <MarketTop data={this.props.data} />
                    </span>
                </div>
            </div>
        );
    }
}

export default ButtonToolbar;