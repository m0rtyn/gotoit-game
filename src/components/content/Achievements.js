import React from 'react';
import {achievements} from '../../game/achievements';
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import _ from 'lodash';
// import '../../css/achievements.css';

const Achievements = (props) => {
    let data = props.data;
    let achievements_list = {};
    let achievements_descriptions = {};
    let achievements_for_render = {
        Breakthroughts: [],
        Conquest: [],
        Challenges: []
    };

    _.each(achievements, (achievement, key) => {
        if (!achievements_list[achievement.name]) {
            achievements_list[achievement.name] = {
                'bronze': false,
                'silver': false,
                'gold': false,
                type: achievement.type,
                name: achievement.name
            }
        }

        if (data.achieved[key]) achievements_list[achievement.name][achievement.rank] = true
    });

    _.each(achievements_list, (achievement) => {
        if (achievement.type === 'breakthrough') achievements_for_render.Breakthroughts.push(achievement);
        if (achievement.type === 'conquest') achievements_for_render.Conquest.push(achievement);
        if (achievement.type === 'challenge') achievements_for_render.Challenges.push(achievement);
    });

    _.each(achievements, (achievement) => {
        achievements_descriptions[`${achievement.name} ${achievement.rank}`] = achievement.text
    });


    return <div className="row">
        {
            Object.keys(achievements_for_render).map((key, id) => {
                return <div key={id} className="row">
                    <div><h3 className="text-center">{key}</h3></div>
                    <div className="flex-container-row justity-content-around">
                        {
                            achievements_for_render[key].map((achievement, i) => {
                                return <span className="achievement" key={i}>
                                    <h4 className="text-center">{achievement.name}</h4>
                                    <div className="achievement-icon">ICON</div>
                                    <div className="flex-container-row justity-content-around medals-bar">
                                        <OverlayTrigger delay={150} placement="top" overlay={<Tooltip id={i}>{achievements_descriptions[`${achievement.name} bronze`]}</Tooltip>}>
                                            <span className={`medal ${achievement.bronze === true ? 'bronze-medal-unlocked' : 'bronze-medal-locked'}`}></span>
                                        </OverlayTrigger>

                                        <OverlayTrigger delay={150} placement="top" overlay={<Tooltip id={i}>{achievements_descriptions[`${achievement.name} silver`]}</Tooltip>}>
                                            <span className={`medal ${achievement.silver === true ? 'bronze-medal-unlocked' : 'silver-medal-locked'}`}></span>
                                        </OverlayTrigger>

                                        <OverlayTrigger delay={150} placement="top" overlay={<Tooltip id={i}>{achievements_descriptions[`${achievement.name} gold`]}</Tooltip>}>
                                            <span className={`medal ${achievement.gold === true ? 'bronze-medal-unlocked' : 'gold-medal-locked'}`}></span>
                                        </OverlayTrigger>
                                    </div>
                                </span>
                            })
                        }
                    </div>
                </div>
            })
        }
    </div>
};

export default Achievements