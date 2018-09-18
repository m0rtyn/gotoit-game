import React, { Component } from "react";
import { public_relations } from "../../game/knowledge/public_relations";
import { colors } from "../../game/knowledge/colors";
import Bar from "../Bar/Bar";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";
import _ from "lodash";

class PublicRelations extends Component {
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
                width: Math.min(100, data.reputation),
                color: colors.orange,
                value: Math.ceil(data.reputation * 100) / 100,
                id: "reputation"
            }
        ];

        const forum_thread_button_sound = (
            <DefaultClickSoundButton
                className={"btn btn-info"}
                onClick={() => {
                    public_relations["forum_thread"].onClick(data);
                }}
            >
                {public_relations["forum_thread"].name +
                    " " +
                    (() => {
                        let effect = _.find(data.on_tick_effects, effect => {
                            return effect.type === "forum_thread";
                        });
                        return effect ? effect.click_count : 0;
                    })()}
            </DefaultClickSoundButton>
        );
        const search_job_button_sound = (
            <DefaultClickSoundButton
                className={100 <= data.money ? "btn btn-info " : "btn btn-info disabled "}
                onClick={() => {
                    public_relations["search_job"].onClick(data);
                }}
            >
                {public_relations["search_job"].name +
                    " " +
                    (() => {
                        let effect = _.find(data.on_tick_effects, effect => {
                            return effect.type === "search_job";
                        });
                        return effect ? effect.click_count : 0;
                    })()}
            </DefaultClickSoundButton>
        );

        const search_specialist_button_sound = (
            <DefaultClickSoundButton
                className={250 <= data.money ? "btn btn-info " : "btn btn-info disabled "}
                onClick={() => {
                    public_relations["search_specialist"].onClick(data);
                }}
            >
                {public_relations["search_specialist"].name +
                    " " +
                    (() => {
                        let effect = _.find(data.on_tick_effects, effect => {
                            return effect.type === "search_specialist";
                        });
                        return effect ? effect.click_count : 0;
                    })()}
            </DefaultClickSoundButton>
        );

        const big_event_button_sound = (
            <DefaultClickSoundButton
                className={
                    1000 <= data.money && this.state.next_click_will_able_at < data.date.tick ? "btn btn-info " : "btn btn-info disabled "
                }
                onClick={() => {
                    public_relations["big_event"].onClick(data);
                    this.setState({ next_click_will_able_at: data.date.tick + 24 }); //only one click at day
                }}
            >
                {public_relations["big_event"].name +
                    " " +
                    (() => {
                        let effect = _.find(data.on_tick_effects, effect => {
                            return effect.type === "big_event";
                        });
                        return effect ? effect.click_count : 0;
                    })()}
            </DefaultClickSoundButton>
        );

        return (
            <div className="card border text-center">
                <h3>Public Relations</h3>
                <div className="flex-container-row">
                    <div style={{ width: "47%", float: "left", margin: "5px" }}>
                        <h5>Rumor</h5>
                        <p>attracts new candidates to you </p>
                        <Bar bar_data={rumor_bar} />
                    </div>
                    <div style={{ width: "47%", float: "right", margin: "5px" }}>
                        <h5>Reputation</h5>
                        <p>attracts new projects to you</p>
                        <Bar bar_data={reputation_bar} />
                    </div>
                </div>

                <div>
                    <div>{forum_thread_button_sound}</div>
                    <div>{search_specialist_button_sound}</div>
                    <div>{search_job_button_sound}</div>
                    <div>{big_event_button_sound}</div>
                </div>
            </div>
        );
    }
}

export default PublicRelations;
