import React, { Component } from 'react';
import _ from 'lodash';

class ActivityToolbar extends Component {

    render() {
        let data = this.props.data;
        let unread_messages_count = (()=>{
            let count = 0;
            _.map(data.mailbox, letter => {
                if (!letter.isRead) count++;
            });
            return count;
        })();
        return (
            <ul className="nav nav-tabs nav-tabs-light-mode activity-toolbar">
                <li className="nav-item">
                    <a
                    className="nav-link"
                    onClick={() => { data.helpers.changeContent('PublicRelations'); }}
                    >
                        Public Relations
                    </a>
                </li>
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

                        <span><i className='fa fa-envelope'></i>&nbsp;</span>
                        <span>Mail&nbsp;</span>
                        {
                            unread_messages_count !== 0
                                ? <span className='badge badge-pill badge-info'>
                                    {
                                        unread_messages_count
                                    }
                                </span>
                                : ''
                        }
                    </a>
                </li>

            </ul>
        );
    }
}

export default ActivityToolbar;