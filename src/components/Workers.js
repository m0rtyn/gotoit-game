import React, { Component } from "react";
import Worker from "./Worker";
import { offices } from "../game/knowledge/office";

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

                        {data.office.size > 1 && offices[data.office.size - 1].space >= data.workers.length ? (
                            data.office.size === 2 ? (
                                <button
                                    onClick={() => {
                                        data.helpers.downOffice();
                                    }}
                                    className="btn btn-warning btn-xs"
                                >
                                    Cancel the Office
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        data.helpers.downOffice();
                                    }}
                                    className="btn btn-warning btn-xs"
                                >
                                    Downgrade the Office
                                </button>
                            )
                        ) : (
                            ""
                        )}

                        {data.office.size < 4 && data.workers.length === data.office.space ? (
                            <button
                                onClick={() => {
                                    data.helpers.upOffice();
                                }}
                                className="btn btn-warning btn-xs"
                            >
                                Extend the Office
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : data.office.size === 1 ? (
                    <div className="column-buttons">
                        <button
                            onClick={() => {
                                data.helpers.upOffice();
                            }}
                            className="btn btn-warning btn-xs"
                        >
                            Rent an Office
                        </button>
                    </div>
                ) : data.office.size < 4 && data.workers.length === data.office.space ? (
                    <div className="column-buttons">
                        <button
                            onClick={() => {
                                data.helpers.upOffice();
                            }}
                            className="btn btn-warning btn-xs"
                        >
                            Extend the Office
                        </button>
                    </div>
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
