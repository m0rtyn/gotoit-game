import PropTypes from "prop-types";
import React, { Component } from "react";
import _ from "lodash";
import ProjectEndScreen from "../Projects/ProjectEndScreen";
import HistoricalEvent from "../HistoricalEvent";
import HotOffer from "../HotOffer";
import Modal from "../Modal/Modal";
import Resume from "../Modal/ResumeModal";
import Offer from "../Modal/OfferModal";
import { FormattedDate } from "react-intl";
import { Avatar } from "../Projects/Avatar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

import mail from "../../assets/images/icon/browser/1-mail.png";
import pr from "../../assets/images/icon/browser/2-pr.png";
import office from "../../assets/images/icon/browser/3-office.png";
import market_analysis from "../../assets/images/icon/browser/4-market-analysis.png";
import loans from "../../assets/images/icon/browser/5-loans.png";
import bsex from "../../assets/images/icon/browser/6-bsex.png";
import archive from "../../assets/images/icon/browser/7-archive.png";

import clients from "../../assets/images/icon/service/pr/clients.png";
import employees from "../../assets/images/icon/service/pr/employees.png";

import news from "../../assets/images/icon/service/news.png";

class Mail extends Component {
    static propTypes = {
        data: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            current_modal: null,
            letters: null,
            show_modal: false
        };
    }
    closeModal = () => {
        this.setState({ show_modal: false });
    };
    markAllAsRead = () => {
        _.map(this.props.data.mailbox, letter => {
            letter.isRead = true;
        });
    };

    render() {
        const data = this.props.data;
        const inverted_mailbox = (() => {
            let array = [];
            for (let i = data.mailbox.length - 1; i >= 0; i--) {
                array.push(data.mailbox[i]);
            }
            return array;
        })();
        let handleClick;
        const letters = _.map(inverted_mailbox, (letter, i) => {
            switch (letter.type) {
                case "Project report":
                    handleClick = () => {
                        this.setState({
                            current_modal: <ProjectEndScreen closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    break;

                case "Hot offer":
                    handleClick = () => {
                        this.setState({
                            current_modal: <HotOffer closeModal={this.closeModal} key={i} letter={letter.object} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    break;
                case "Resume":
                    handleClick = () => {
                        this.setState({
                            current_modal: <Resume closeModal={this.closeModal} key={i} letter={letter} data={this.props.data} />
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    break;
                case "Offer":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <Offer
                                    letter={letter}
                                    closeModal={this.closeModal}
                                    key={i}
                                    expired={letter.expired}
                                    createdAt={letter.createdAt}
                                    project={letter.object}
                                    data={this.props.data}
                                />
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    break;
                case "Event":
                    handleClick = () => {
                        this.setState({
                            current_modal: (
                                <HistoricalEvent closeModal={this.closeModal} key={i} content={letter.object} date={letter.date} />
                            )
                        });
                        this.setState({ show_modal: true });
                        letter.isRead = true;
                    };
                    break;
                default:
                    break;
            }
            return (
                <div className="letter card" onClick={handleClick} key={i}>
                    {(() => {
                        switch (letter.type) {
                            case "Resume":
                                return <img src={employees} className="mail-icon" />;
                            case "Offer":
                                return <img src={clients} className="mail-icon" />;
                            case "Event":
                                return <img src={news} className="mail-icon" />;
                            case "Office":
                                return <img src={office} className="mail-icon" />;
                            default:
                                return <img src={pr} className="mail-icon" />;
                        }
                    })()}

                    <span className="sender-name">{letter.object.name}</span>

                    {letter.isRead ? <span className="letter-type">{letter.type}</span> : <strong>{letter.type}</strong>}

                    {/* <span className="letter-status">{letter.isRead ? 'read' : ''}</span> */}

                    <span className="formatted-date">
                        <FormattedDate
                            value={letter.date}
                            // weekday="short"
                            day="numeric"
                            month="short"
                            // year="numeric"
                            hour="numeric"
                        />
                    </span>
                </div>
            );
        });

        return (
            <div className="mail">
                <DefaultClickSoundButton className="btn btn-info btn-xs" onClick={this.markAllAsRead}>
                    Mark all as read
                </DefaultClickSoundButton>
                {letters}
                {this.state.show_modal ? (
                    <Modal closeModal={this.closeModal} showCloseButton={true}>
                        {" "}
                        {this.state.current_modal}
                    </Modal>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

export default Mail;
