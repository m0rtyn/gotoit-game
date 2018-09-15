import React, { Component } from "react";
import Worker from "./Worker";
import { offices } from "../game/knowledge/office";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

class Workers extends Component {
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
        const cancel_office = (
            <DefaultClickSoundButton
                onClick={() => {
                    data.helpers.downOffice();
                }}
                className="btn btn-warning btn-xs"
            >
                Cancel the Office
            </DefaultClickSoundButton>
        );

        const down_office = (
            <DefaultClickSoundButton
                onClick={() => {
                    data.helpers.downOffice();
                }}
                className="btn btn-warning btn-xs"
            >
                Downgrade the Office
            </DefaultClickSoundButton>
        );
        const extend_office = (
            <DefaultClickSoundButton
                onClick={() => {
                    data.helpers.upOffice();
                }}
                className="btn btn-warning btn-xs"
            >
                Extend the Office
            </DefaultClickSoundButton>
        );
        const rent_office = (
            <DefaultClickSoundButton
                onClick={() => {
                    data.helpers.upOffice();
                }}
                className="btn btn-warning btn-xs"
            >
                Rent the Office
            </DefaultClickSoundButton>
        );

        return (
            <section className="workers">
                {data.workers.length < data.office.space ? (
                    <div className="column-buttons">
                        {/*
                        <button
                            className="btn btn-success btn-xs"
                            onClick={() => { data.helpers.changeContent('HireWorkers')}}>
                            Hire Worker
                        </button>
                        */}

                        {data.office.size > 1 && offices[data.office.size - 1].space >= data.workers.length
                            ? data.office.size === 2
                                ? cancel_office
                                : down_office
                            : ""}

                        {data.office.size < 4 && data.workers.length === data.office.space ? { extend_office } : ""}
                    </div>
                ) : data.office.size === 1 ? (
                    <div className="column-buttons">{rent_office}</div>
                ) : data.office.size < 4 && data.workers.length === data.office.space ? (
                    <div className="column-buttons">{extend_office}</div>
                ) : (
                    ""
                )}

                {data.workers.map((x, i) => (
                    <Worker key={x.id} worker={x} data={data} />
                ))}
            </section>
        );
    }
}

export default Workers;
