import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import { support } from "../game/app_config";
import Timeline from "./Timeline/Timeline";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

class Header extends Component {
    render() {
        const data = this.props.data;
        const date = this.props.data.date;

        return (
            <header className="header">
                <div className="topbar">
                    <div className="topbar-left">
                        <div
                            className="logo"
                            onClick={() => {
                                console.log(data);
                            }}
                        >
                            {/* <Icon name="logo" />  TODO: commented until webpack.config appears*/}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                <use xlinkHref="#icon-logo" />
                            </svg>
                            Go to IT
                        </div>
                        <DefaultClickSoundButton
                            className="topbar-btn"
                            href="#"
                            onClick={this.props.newGame}
                            title="Hard Reset For Developers"
                        >
                            New game
                        </DefaultClickSoundButton>
                        <DefaultClickSoundButton
                            className="topbar-btn"
                            onClick={() => {
                                data.helpers.changeContent("Achievements");
                            }}
                            href="#"
                        >
                            Achievements
                        </DefaultClickSoundButton>
                        <DefaultClickSoundButton
                            className="topbar-btn"
                            onClick={() => {
                                data.helpers.changeContent("ChartsController");
                            }}
                            href="#"
                            title="Statistics"
                        >
                            Charts
                        </DefaultClickSoundButton>
                        <DefaultClickSoundButton className="topbar-btn" rel="noopener noreferrer">
                            <a href={support.show}>Support</a>
                        </DefaultClickSoundButton>
                    </div>

                    <div
                        className="topbar-right"
                        onClick={() => {
                            // console.log(data);
                        }}
                    >
                        <div className="topbar-left">
                            <button
                                className={`topbar-btn icon-pause ${data.game_paused ? "active" : ""}`}
                                onClick={() => {
                                    if (data.game_paused) {
                                        data.helpers.playGame();
                                    } else {
                                        data.helpers.pauseGame();
                                    }
                                }}
                            />

                            <div className="time-controls">
                                {[1, 3, 5].map((speed, index) => {
                                    return (
                                        <button
                                            className={`topbar-btn ${
                                                data.game_speed_multiplier === speed && !data.game_paused ? "active" : ""
                                            }`}
                                            key={index}
                                            onClick={() => {
                                                data.helpers.setGameSpeed(speed);
                                            }}
                                        >
                                            {data.game_speed_multiplier === speed ? (
                                                <span className="speed-control" key={index}>
                                                    {
                                                        {
                                                            0: <span className="icon-play-arrow" />,
                                                            1: <span className="icon-fast-forward" />,
                                                            2: <span className="icon-ultra-fast-speed" />
                                                        }[index]
                                                    }
                                                </span>
                                            ) : (
                                                <span className="speed-control" key={index}>
                                                    {
                                                        {
                                                            0: <span className="icon-play-arrow" />,
                                                            1: <span className="icon-fast-forward" />,
                                                            2: <span className="icon-ultra-fast-speed" />
                                                        }[index]
                                                    }
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => {
                                        let i = 1;
                                        let n = 24;
                                        while (i <= n) {
                                            data.helpers.tick(i === n);
                                            i++;
                                        }
                                    }}
                                    className="topbar-btn"
                                >
                                    <span className="icon-h-cycle" />
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        let i = 1;
                                        let n = 24 * 30.5;
                                        while (i <= n) {
                                            data.helpers.tick(i === n);
                                            i++;
                                        }
                                    }}
                                >
                                    M
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        let i = 1;
                                        let n = 24 * 365;
                                        while (i <= n) {
                                            data.helpers.tick(i === n);
                                            i++;
                                        }
                                    }}
                                >
                                    Y
                                </button>
                            </div>
                        </div>

                        <div className="topbar-center game-time">
                            {date.is_working_time ? (
                                <span> Working </span>
                            ) : date.day > 5 ? (
                                <span> Weekends </span>
                            ) : (
                                <span> Sleeping </span>
                            )}
                            <FormattedDate
                                value={data.current_game_date}
                                weekday="short"
                                day="numeric"
                                month="short"
                                year="numeric"
                                hour="numeric"
                            />
                        </div>

                        <div className="topbar-divider" />

                        <div className="topbar-right">
                            {/* Bitcoin ========================================================================= */}
                            {/* <button
                className="topbar-btn flexbox"
                onClick={() => {
                  data.helpers.changeContent('Exchange');
                }}
              >
                <span className="icon-btc">
                  <span className="path1" />
                  <span className="path2" />
                </span>
                <h6 className="fw-700 mb-0">{' ' + data.btc.toFixed(2)}</h6>
                /*<span onClick={() => { CHEAT! data.helpers.addMoney(1, 'btc'); }}> BTC </span>
              </button> */}

                            <button className="topbar-btn flexbox" onClick={() => data.helpers.addMoney(10000, "usd")}>
                                <span className="icon-usd">
                                    <span className="path1" />
                                    <span className="path2" />
                                </span>
                                <h6 className="fw-700 mb-0">{data.money}</h6>
                                {/*<span onClick={() => { CHEAT! }}> $ </span>*/}
                            </button>

                            <button className="topbar-btn flexbox">
                                <span className="icon-account-balance-wallet" />
                            </button>
                        </div>
                    </div>
                </div>

                <Timeline data={this.props.data} />
            </header>
        );
    }
}

export default Header;
