import React, { Component } from "react";
import _ from "lodash";
import { FormattedDate } from "react-intl";
import { resume_will_expire_after } from "../../game/knowledge/workers";
import { Avatar } from "../Projects/Avatar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

class Resume extends Component {
    render() {
        let data = this.props.data;
        let letter = this.props.letter;
        let worker = this.props.letter.object;
        let expired = this.props.letter.expired;
        let createdAt = this.props.letter.createdAt;
        let hours_to_expire = Math.round(createdAt + resume_will_expire_after - data.date.tick);
        let gender_pointer = (() => {
            if (worker.gender === "male") return "him";
            if (worker.gender === "female") return "her";
            if (worker.gender === "other") return "them";
        })();
        const DefaultClickSoundButtons = (
            <div>
                <DefaultClickSoundButton
                    className="btn btn-success"
                    id={worker.id}
                    onClick={e => {
                        if (data.workers.length !== data.office.space) {
                            this.props.data.helpers.hireCandidate(worker.id, "resumes");
                            worker.hired = true;
                            this.props.closeModal();
                        } else {
                            alert("Your office is full");
                        }
                    }}
                >
                    Accept
                </DefaultClickSoundButton>
                <DefaultClickSoundButton
                    className="btn btn-danger"
                    id={worker.id}
                    onClick={e => {
                        this.props.data.helpers.rejectCandidate(worker.id, "resumes");
                        expired = true;
                        this.props.closeModal();
                    }}
                >
                    Reject
                </DefaultClickSoundButton>
            </div>
        );

        return (
            <section className="resume-modal">
                <div className="modal-header flexbox">
                    <div>
                        <p className="fw-700">enterpreneur resume</p>
                    </div>
                    <div>
                        <FormattedDate value={letter.date} weekday="short" day="numeric" month="short" year="numeric" hour="numeric" />
                        <span className="icon-star_border" />
                        <Avatar
                            className="worker-avatar"
                            name={worker.name}
                            sources={_.toPairs(worker.avatar)}
                            // style={{ position: 'absolute' }}
                            // size={20}
                        />
                    </div>
                </div>

                <div className="modal-body">
                    <h3 className="fw-700">{worker.name}</h3>
                    <div>
                        <p>Salary {worker.salary}</p>
                        <p>Design {worker.stats.design}</p>
                        <p>Program {worker.stats.program}</p>
                        <p>Manage {worker.stats.manage}</p>
                    </div>
                    <h5 className="">{worker.character.description}</h5>
                    {!expired ? <h2 className="fw-700">Enterpreneur offer has expired</h2> : ""}
                    {!worker.hired ? (
                        !expired ? (
                            DefaultClickSoundButtons
                        ) : (
                            <h2 className="fw-700">This employer found another job</h2>
                        )
                    ) : (
                        <h2 className="fw-700">{`You already hired ${gender_pointer}`}</h2>
                    )}
                </div>
            </section>
        );
    }
}

Resume.propTypes = {};

export default Resume;
