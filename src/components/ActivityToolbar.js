import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import { TabClickSoundButton } from "../game/knowledge/sounds";
import mail from "../assets/images/icon/browser/1-mail.png";
import pr from "../assets/images/icon/browser/2-pr.png";
import office from "../assets/images/icon/browser/3-office.png";
import market_analysis from "../assets/images/icon/browser/4-market-analysis.png";
import loans from "../assets/images/icon/browser/5-loans.png";
import bsex from "../assets/images/icon/browser/6-bsex.png";
import archive from "../assets/images/icon/browser/7-archive.png";
import advertising from "../assets/images/icon/browser/advertising.png";

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
                        <TabClickSoundButton
                            className={`nav-link ${data.context === "mail" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Mail", "mail");
                            }}
                        >
                            <div className="tab-content">
                                <img src={mail} className="icon" />
                                <div>Mail</div>
                            </div>
                            {unread_messages_count !== 0 ? (
                                <span className="badge badge-pill badge-mail">{unread_messages_count}</span>
                            ) : (
                                ""
                            )}
                        </TabClickSoundButton>
                    </li>
                    <li className="nav-item">
                        <TabClickSoundButton
                            className={`nav-link ${data.context === "relations" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("PublicRelations", "relations");
                            }}
                        >
                            <div className="tab-content">
                                <img src={pr} className="icon" />
                                <div>Relations</div>
                            </div>
                        </TabClickSoundButton>
                    </li>
                    <li className="nav-item">
                        <TabClickSoundButton
                            className={`nav-link ${data.context === "office" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Office", "office");
                            }}
                        >
                            <div className="tab-content">
                                <img src={office} className="icon" />
                                <div>Office</div>
                            </div>
                        </TabClickSoundButton>
                    </li>

                    <li className="nav-item">
                        <TabClickSoundButton
                            className={`nav-link ${data.context === "market" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("MarketTop", "market");
                            }}
                        >
                            <div className="tab-content">
                                <img src={market_analysis} className="icon" />
                                <div>Analytics</div>
                            </div>
                        </TabClickSoundButton>
                    </li>
                    <li className="nav-item">
                        <TabClickSoundButton
                            className={`nav-link ${data.context === "loans" ? "active" : ""}`}
                            onClick={() => {
                                data.helpers.changeContent("Loans", "loans");
                            }}
                        >
                            <div className="tab-content">
                                <img src={loans} className="icon" />
                                <div>Loans</div>
                            </div>
                        </TabClickSoundButton>
                    </li>
                    {data.share0_unlock ? (
                        <li className="nav-item">
                            <TabClickSoundButton
                                className={`nav-link ${data.context === "exchange" ? "active" : ""}`}
                                onClick={() => {
                                    data.helpers.changeContent("Exchange", "exchange");
                                }}
                            >
                                <div className="tab-content">
                                    <img src={bsex} className="icon" />
                                    <div>Exchange</div>
                                </div>
                            </TabClickSoundButton>
                        </li>
                    ) : (
                        ""
                    )}

                    {data.projects_archive_reports.length > 0 ? (
                        <li className="nav-item">
                            <TabClickSoundButton
                                className={`nav-link ${data.context === "archive" ? "active" : ""}`}
                                onClick={() => {
                                    data.helpers.changeContent("Archive", "archive");
                                }}
                            >
                                <div className="tab-content">
                                    <img src={archive} className="icon" />
                                    <div>Archive</div>
                                </div>
                            </TabClickSoundButton>
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
