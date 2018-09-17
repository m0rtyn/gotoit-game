import React from "react";
import { FormattedDate } from "react-intl";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

const HistoricalEvent = props => {
    return (
        <div>
            <div className="flexbox">
                <span className="flex-grow">
                    <h2>{props.content.name}</h2>
                </span>
                <span>
                    <DefaultClickSoundButton
                        className="btn btn-warning"
                        onClick={() => {
                            props.closeModal();
                        }}
                    >
                        Close
                    </DefaultClickSoundButton>
                </span>
            </div>
            <div>
                <FormattedDate value={props.date} day="numeric" month="short" year="numeric" /> {`${props.content.description}`}
            </div>
        </div>
    );
};

export default HistoricalEvent;
