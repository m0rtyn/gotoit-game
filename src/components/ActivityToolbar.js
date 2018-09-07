import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";

class ActivityToolbar extends Component {
    static propTypes = {
        data: PropTypes.shape({
            helpers: PropTypes.object.isRequired
        })
    };
    // shouldComponentUpdate() {
    //   return false;
    // }
    render() {
        let data = this.props.data;
        let unread_messages_count = (() => {
            let count = 0;
            _.map(data.mailbox, letter => {
                if (!letter.isRead) count++;
            });
            return count;
        })();
        return (
            <div className="card-header">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("Mail");
                            }}
                        >
                            <span>Mail </span>
                            {unread_messages_count !== 0 ? (
                                <span className="badge badge-pill badge-info">{unread_messages_count}</span>
                            ) : (
                                ""
                            )}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("PublicRelations");
                            }}
                        >
                            Relations
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("Office");
                            }}
                        >
                            Office
                        </a>
                    </li>
                    {/*<li className="nav-item">
                        {data.projects.length > 0 ? (
                            <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent('StartMeeting');
                            }}
                            >
                            Start Meeting
                            </a>
                        ) : (
                            ''
                        )}
                    </li>*/}

                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("MarketTop");
                            }}
                        >
                            Analitics
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("Loans");
                            }}
                        >
                            Loans
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => {
                                data.helpers.changeContent("Exchange");
                            }}
                        >
                            Exchange
                        </a>
                    </li>
                    {data.projects_archive_reports.length > 0 ? (
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={() => {
                                    data.helpers.changeContent("Archive");
                                }}
                            >
                                Archive
                            </a>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>
            </div>
        );
    }
}

export default ActivityToolbar;
