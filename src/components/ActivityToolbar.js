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
                            className={`nav-link ${data.context === "mail" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Mail", "mail");
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
                            className={`nav-link ${data.context === "relations" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("PublicRelations", "relations");
                            }}
                        >
                            Relations
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${data.context === "office" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Office", "office");
                            }}
                        >
                            Office
                        </a>
                    </li>
                    {/*<li className="nav-item">
                        {data.projects.length > 0 ? (
                            <a
                            className={`nav-link ${data.context === "meeting" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent('StartMeeting', "meeting");
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
                            className={`nav-link ${data.context === "market" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("MarketTop", "market");
                            }}
                        >
                            Analitics
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${data.context === "loans" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Loans", "loans");
                            }}
                        >
                            Loans
                        </a>
                    </li>
                    {data.share0_unlock ? (
                        <li className="nav-item">
                            <a
                                className={`nav-link ${data.context === "exchange" ? "active" : ""}`}
                                onClick={() => {
                                    data.helpers.changeContent("Exchange", "exchange");
                                }}
                            >
                                Exchange
                            </a>
                        </li>
                    ) : (
                        ""
                    )}

                    {data.projects_archive_reports.length > 0 ? (
                        <li className="nav-item">
                            <a
                                className={`nav-link ${data.context === "archive" ? "active" : ""}`}
                                onClick={() => {
                                    data.helpers.changeContent("Archive", "archive");
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
