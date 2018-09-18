import React, { Component } from "react";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

//import {offices} from '../game/knowledge';

class Office extends Component {
    render() {
        const data = this.props.data;

        const coffeemaker = (
            <div className="card">
                {data.office_things.coffeemaker ? (
                    <DefaultClickSoundButton
                        className="btn btn-info disabled"
                        data-provide="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Workers come to work earlier because of the Coffeemaker in the office."
                    >
                        Coffeemaker is bought
                    </DefaultClickSoundButton>
                ) : (
                    <div>
                        Workers will come to work earlier if there is a Coffeemaker in the office.
                        <DefaultClickSoundButton
                            onClick={() => {
                                data.helpers.buyCoffeemaker();
                            }}
                            className={data.money >= 5000 ? "btn btn-info" : "btn btn-info disabled"}
                        >
                            Buy Coffeemaker $5000
                        </DefaultClickSoundButton>
                    </div>
                )}
            </div>
        );

        const lunch = (
            <div className="card">
                {" "}
                After a delicious Lunch for $25, employees will stay at work until night.
                {data.office_things.lunch ? (
                    <DefaultClickSoundButton
                        onClick={() => {
                            data.helpers.lunchOff();
                        }}
                        className="btn btn-info"
                    >
                        Off
                    </DefaultClickSoundButton>
                ) : (
                    <DefaultClickSoundButton
                        onClick={() => {
                            data.helpers.lunchOn();
                        }}
                        className="btn btn-info"
                    >
                        On
                    </DefaultClickSoundButton>
                )}
            </div>
        );
        const gadget = (
            <div className="card">
                {" "}
                Fancy gadgets gives 1% happiness Boost per gadget. You Own:
                {data.office_things.gadget}{" "}
                <DefaultClickSoundButton
                    onClick={() => {
                        data.helpers.buyGadget();
                    }}
                    className={data.money >= data.helpers.getGadgetCost() ? "btn btn-info" : "btn btn-info disabled"}
                >
                    Buy Gadget ${data.helpers.getGadgetCost()}
                </DefaultClickSoundButton>
            </div>
        );

        if (data.office.size > 1) {
            return (
                <div className="card">
                    {data.office.size > 1 ? coffeemaker : ""}
                    {data.office.size > 2 ? lunch : ""}
                    {data.office.size > 3 ? gadget : ""}
                </div>
            );
        } else {
            return <div />;
        }
    }
}

export default Office;
