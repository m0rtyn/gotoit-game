import React from 'react';
import { achievements } from '../../game/achievements';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import _ from 'lodash';

const Achievements = props => {
  let data = props.data;
  let achievements_list = {};
  let achievements_descriptions = {};
  let achievements_for_render = {
    Breakthroughts: [],
    Conquest: [],
    Challenges: [],
  };

  _.each(achievements, (achievement, key) => {
    if (!achievements_list[achievement.name]) {
      achievements_list[achievement.name] = {
        bronze: false,
        silver: false,
        gold: false,
        type: achievement.type,
        name: achievement.name,
      };
    }

    if (data.achieved[key])
      achievements_list[achievement.name][achievement.rank] = true;
  });

  _.each(achievements_list, achievement => {
    if (achievement.type === 'breakthrough')
      achievements_for_render.Breakthroughts.push(achievement);
    if (achievement.type === 'conquest')
      achievements_for_render.Conquest.push(achievement);
    if (achievement.type === 'challenge')
      achievements_for_render.Challenges.push(achievement);
  });

  _.each(achievements, achievement => {
    achievements_descriptions[`${achievement.name} ${achievement.rank}`] =
      achievement.text;
  });

  return (
    <div className="achievements">
      {Object.keys(achievements_for_render).map((key, id) => {
        return (
          <section key={id} className="">
            <h3 className="text-center">{key}</h3>
            <div className="flexbox">
              {achievements_for_render[key].map((achievement, i) => {
                return (
                  <div className="achievement" key={i}>
                    <h4 className="text-center">{achievement.name}</h4>
                    <div className="achievement-icon">ICON</div>
                    <div className="medals-bar">
                      <OverlayTrigger
                        delay={150}
                        placement="top"
                        overlay={
                          <Tooltip id={i}>
                            {
                              achievements_descriptions[
                                `${achievement.name} bronze`
                              ]
                            }
                          </Tooltip>
                        }
                      >
                        <div
                          className={`medal ${
                            achievement.bronze === true
                              ? 'bronze-medal-unlocked'
                              : 'bronze-medal-locked'
                          }`}
                        />
                      </OverlayTrigger>

                      <OverlayTrigger
                        delay={150}
                        placement="top"
                        overlay={
                          <Tooltip id={i}>
                            {
                              achievements_descriptions[
                                `${achievement.name} silver`
                              ]
                            }
                          </Tooltip>
                        }
                      >
                        <div
                          className={`medal ${
                            achievement.silver === true
                              ? 'bronze-medal-unlocked'
                              : 'silver-medal-locked'
                          }`}
                        />
                      </OverlayTrigger>

                      <OverlayTrigger
                        delay={150}
                        placement="top"
                        overlay={
                          <Tooltip id={i}>
                            {
                              achievements_descriptions[
                                `${achievement.name} gold`
                              ]
                            }
                          </Tooltip>
                        }
                      >
                        <div
                          className={`medal ${
                            achievement.gold === true
                              ? 'bronze-medal-unlocked'
                              : 'gold-medal-locked'
                          }`}
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Achievements;
