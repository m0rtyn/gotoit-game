import React from "react";
import { FormattedDate } from "react-intl";

const HistoricalEvent = props => {
    return (
        <div>
            <div className="flexbox">
                <span className="flex-grow">
                    <h2>{props.content.name}</h2>
                </span>
                <span>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            props.closeModal();
                        }}
                    >
                        Close
                    </button>
                </span>
            </div>
            <div>
                <FormattedDate value={props.date} day="numeric" month="short" year="numeric" /> {`${props.content.description}`}
            </div>
        </div>
    );
};

export default HistoricalEvent;
