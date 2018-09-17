import React, { Component } from "react";
import { colors } from "../game/knowledge/colors";
import { public_relations } from "../game/knowledge/public_relations";
import Bar from "./Bar/Bar";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

class PRDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next_click_will_able_at: 0
        };
    }

    render() {
        const data = this.props.data;
        const rumor_bar = [
            {
                name: "Rumor",
                width: Math.min(100, data.rumor),
                color: colors.blue,
                value: Math.ceil(data.rumor * 100) / 100,
                id: "rumor"
            }
        ];
        const reputation_bar = [
            {
                name: "Reputation",
                width: Math.min(100, data.rumor),
                color: colors.orange,
                value: Math.ceil(data.reputation * 100) / 100,
                id: "reputation"
            }
        ];

        return (
            <div className="card text-center">
                <div className="">
                    <div style={{ width: "50%", float: "left", margin: "5px" }}>
                        <h5>Rumor</h5>
                        <Bar bar_data={rumor_bar} />
                    </div>
                    <div style={{ width: "50%", float: "right", margin: "5px" }}>
                        <h5>Reputation</h5>

                        <Bar bar_data={reputation_bar} />
                    </div>
                </div>

                <div>
                    <div>
                        <DefaultClickSoundButton
                            className="btn btn-info "
                            onClick={() => {
                                public_relations["forum_thread"].onClick(data);
                            }}
                        >
                            {public_relations["forum_thread"].name}
                        </DefaultClickSoundButton>
                    </div>
                    <div>
                        <DefaultClickSoundButton
                            className={250 <= data.money ? "btn btn-info " : "btn btn-info disabled "}
                            onClick={() => {
                                public_relations["search_specialist"].onClick(data);
                            }}
                        >
                            {public_relations["search_specialist"].name}
                        </DefaultClickSoundButton>
                    </div>
                    <div>
                        <DefaultClickSoundButton
                            className={100 <= data.money ? "btn btn-info " : "btn btn-info disabled "}
                            onClick={() => {
                                public_relations["search_job"].onClick(data);
                            }}
                        >
                            {public_relations["search_job"].name}
                        </DefaultClickSoundButton>
                    </div>
                    <div>
                        <DefaultClickSoundButton
                            className={
                                1000 <= data.money && this.state.next_click_will_able_at < data.date.tick
                                    ? "btn btn-info "
                                    : "btn btn-info disabled "
                            }
                            onClick={() => {
                                public_relations["big_event"].onClick(data);
                                this.setState({ next_click_will_able_at: data.date.tick + 24 }); //only one click at day
                            }}
                        >
                            {public_relations["big_event"].name}
                        </DefaultClickSoundButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default PRDepartment;
