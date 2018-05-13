import React, { Component } from 'react';

class ButtonToolbar extends Component {

    render() {
        let data = this.props.data;

        return (
            <div className="panel panel-success">
                <div className="flex-container-row" style={{margin: '5px 0px 5px 0px'}}>
                    <span className="flex-element">
                        <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('StartProject'); }}>Start Project</button>
                    </span>
                    <span className="flex-element">
                        <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('ProjectsFind'); }}>Find Projects</button>
                    </span>
                    <span className="flex-element">
                        {data.projects.length > 0 ? <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('StartMeeting'); }}>Start Meeting</button> : ''}
                    </span>
                    <span className="flex-element">
                        <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Loans'); }}>Loans</button>
                    </span>
                    <span className="flex-element">
                        <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Exchange'); }}>Exchange</button>
                    </span>
                    <span className="flex-element">
                        <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('MarketTop'); }}>Market Top</button>
                    </span>

                    <span className="flex-element">
                        {data.projects_archive_reports.length > 0 ? <button className="btn btn-success btn-sm" onClick={() => { data.helpers.changeContent('Archive'); }}>Archive</button> : ''}
                    </span>
                </div>
            </div>
        );
    }
}

export default ButtonToolbar;