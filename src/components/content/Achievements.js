import React from "react";
import { achievements } from "../../game/knowledge/achievements";
import _ from "lodash";

const Achievements = props => {
    let data = props.data;
    let achievements_list = {};
    let achievements_descriptions = {};
    let achievements_icons = {};

    _.each(achievements, (achievement, key) => {
        if (!achievements_list[achievement.name]) {
            achievements_list[achievement.name] = {
                bronze: false,
                silver: false,
                gold: false,
                type: achievement.type,
                name: achievement.name
            };
        }

        if (data.achieved[key]) achievements_list[achievement.name][achievement.rank] = true;
        achievements_descriptions[`${achievement.name} ${achievement.rank}`] = achievement.text;
        achievements_icons[`${achievement.name} ${achievement.rank}`] = achievement.icon;
    });

    return (
        <div>
            <h2 className="text-center">Achievements</h2>
            <div className="achievements">
                {Object.keys(achievements_list).map((key, i) => {
                    return (
                        <div className="achievement" key={i}>
                            <div className="icon">
                                {achievements_list[key].gold === true ? (
                                    <img src={achievements_icons[`${achievements_list[key].name} gold`]} />
                                ) : achievements_list[key].silver === true ? (
                                    <img src={achievements_icons[`${achievements_list[key].name} silver`]} />
                                ) : achievements_list[key].bronze === true ? (
                                    <img src={achievements_icons[`${achievements_list[key].name} bronze`]} />
                                ) : (
                                    <img src={achievements_icons[`${achievements_list[key].name} bronze`]} className="blackAndWhite" />
                                )}
                            </div>
                            <h3>{achievements_list[key].name}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Achievements;
