import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import { support } from '../game/app_config';

import Timeline from './Timeline';

class Header extends Component {
  render() {
    const data = this.props.data;
    const date = this.props.data.date;

    var real_date = new Date(1991, 1, 26, 0, 0);
    var game_date = new Date(1991, 1, 26, 0, 0);
    game_date.setDate(real_date.getDate() + date.tick / 24);

    return (
      <header className="header topbar">
        <div className="topbar">
          <div className="topbar-left">
            <div className="logo">
              {/* <Icon name="logo" />  TODO: commented until webpack.config appears*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
              >
                <use xlinkHref="#icon-logo" />
              </svg>
              Go to IT
            </div>

            <button
              className="topbar-btn"
              href="#"
              onClick={this.props.newGame}
              title="Hard Reset For Developers"
            >
              New game
            </button>
            <button
              className="topbar-btn"
              onClick={() => {
                data.helpers.changeContent('Achievements');
              }}
              href="#"
              title="Achievements bar"
            >
              Achievements
            </button>
            <button
              className="topbar-btn"
              onClick={() => {
                data.helpers.changeContent('ChartsController');
              }}
              href="#"
              title="Statistics"
            >
              Charts
            </button>
            <button
              className="topbar-btn"
              rel="noopener noreferrer"
              href={support.show}
            >
              Support
            </button>
          </div>

          <div
            className="topbar-right"
            onClick={() => {
              // console.log(data);
            }}
          >
            <div className="topbar-left">
              <button
                className="topbar-btn"
                onClick={() => {
                  if (data.game_paused) {
                    data.helpers.playGame();
                  } else {
                    data.helpers.pauseGame();
                  }
                }}
              >
                {/* <i className="material-icons">{data.game_paused ? 'play-arrow' : 'pause'}</i> */}
                <i className="fa fa-pause" />
              </button>

              <div
                onClick={() => {
                  let i = 1;
                  let n = 24;
                  while (i <= n) {
                    data.helpers.tick(i === n);
                    i++;
                  }
                }}
              >
                {[1, 3, 5].map((speed, index) => {
                  return (
                    <button className="topbar-btn" key={index}>
                      {data.game_speed_multiplier === speed ? (
                        <span className="speed-control" key={index}>
                          {{ 0: '►', 1: '►►', 2: '►►►' }[index]}
                        </span>
                      ) : (
                        <span
                          className="speed-control"
                          key={index}
                          onClick={() => {
                            data.helpers.setGameSpeed(speed);
                          }}
                        >
                          {{ 0: '►', 1: '►►', 2: '►►►' }[index]}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button className="topbar-btn">
                  <img
                    src={'day-forward.svg'}
                    alt={'Next Day'}
                    title={'Next Day'}
                  />
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
                value={game_date}
                weekday="short"
                day="numeric"
                month="short"
                year="numeric"
                hour="numeric"
              />
            </div>

            <div className="topbar-right">
              <span
                className="topbar-btn font-weight-bold"
                onClick={() => {
                  data.helpers.changeContent('Exchange');
                }}
              >
                <i className="fa fa-bitcoin" />
                 {data.btc.toFixed(2)}
                {/*<span onClick={() => { CHEAT!
                                        data.helpers.addMoney(1, 'btc');
                                        }}> BTC </span>*/}
              </span>

              <span className="topbar-btn font-weight-bold">
                <i className="fa fa-dollar" />
                 {data.money}
                {/*<span onClick={() => { CHEAT!
                                        data.helpers.addMoney(10000, 'usd');
                                        }}> $ </span>*/}
              </span>
            </div>
          </div>

          {/* <a target="_blank" rel="noopener noreferrer" href={social_links.telegram}>
                        <img alt="" src="http://www.advanceduninstaller.com/7b12b396d38166a899fff585e466e50d-icon.ico" />
                        &nbsp;
                        Telegram
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={social_links.wiki}>
                        <img alt="" src="https://static.filehorse.com/icons-web/educational-software/wikipedia-icon-32.png" />
                        &nbsp;
                        Wiki
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={social_links.reddit}>
                        <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/418PuxYS63L.png" />
                        &nbsp;
                        Reddit
                    </a> */}
        </div>

        <Timeline data={this.props.data} />
      </header>
    );
  }
}

export default Header;
