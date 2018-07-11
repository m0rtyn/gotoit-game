import React, { Component } from 'react';
import Lorer from "../services/Lorer";
import ProjectModel from "../models/ProjectModel";

class ButtonToolbar extends Component {

    render() {
        let data = this.props.data;

        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {data.projects.length > 0 ? 
                        <a 
                        className="nav-link" 
                        onClick={() => { data.helpers.changeContent('StartMeeting'); }}
                        >
                            Start Meeting
                        </a> : ''
                    }
                </li>
                <li className="nav-item">
                    {data.projects_archive_reports.length > 0 ? 
                        <a 
                        className="nav-link" 
                        onClick={() => { data.helpers.changeContent('Archive'); }}
                        >
                            Archive
                        </a> : ''
                    }
                </li>
                <li className="nav-item">
                    <a
                    className="nav-link"
                    onClick={() => { data.helpers.changeContent('MarketTop'); }}
                    >
                        Market Analysis
                    </a>
                </li>
                <li className="nav-item">
                    <a
                    className="nav-link"
                    onClick={() => { data.helpers.changeContent('Loans'); }}
                    >
                        Loans
                    </a>
                </li>
                <li className="nav-item">
                    <a
                    className="nav-link"
                    onClick={() => { data.helpers.changeContent('Exchange'); }}
                    >
                        Exchange
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                    className="nav-link" 
                    onClick={() => { data.helpers.changeContent('Mail'); }}
                    >
                        Mail
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={() => { let this_project = Lorer.afterFirstModule(ProjectModel.generate(1, 1, 'player'));
                            data.offered_projects.push(this_project);
                            data.mailbox.push({
                                type: 'Hot offer',
                                content: this_project
                            });
                            data.attainments.push('FirstModule') }}
                    >
                        Create hot offer
                    </a>
                </li>
            </ul>
        );
    }
}

export default ButtonToolbar;