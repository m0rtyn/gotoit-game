import React, { Component } from 'react';
import {FormattedDate} from 'react-intl';
import {support} from '../game/app_config';
import classNames from 'classnames';
import Timeline from './Timeline'

class Header extends Component {
    render() {
        const data = this.props.data;
        const date = this.props.data.date;

        var real_date = new Date();
        var game_date = new Date();
        game_date.setDate(real_date.getDate()+(date.tick/24));
        console.log(game_date)

        return (
            <header>
                <div className="topbar">
                    <div className="topbar-left">

                        <div className="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                                <use xlinkHref="#icon-logo"></use>
                            </svg>
                            Go to IT
                        </div>

                        <button className="topbar-btn" href="#" onClick={this.props.newGame} title='Hard Reset For Developers'>
                            New game
                        </button>
                        <button className="topbar-btn" onClick={() => {data.helpers.changeContent('Achievements')}} href="#" title='Achievements bar'>
                            Achievements
                        </button>
                        <button className="topbar-btn" onClick={() => {data.helpers.changeContent('ChartsController')}} href="#" title='Statistics'>
                            Charts
                        </button>
                        <button className="topbar-btn" rel="noopener noreferrer" href={support.show}>
                            Support
                        </button>
                    </div>

                    <div className="topbar-right" onClick={() => {
                        console.log(data);
                    }}> 

                        <div className="topbar-left">
                            <button className="topbar-btn" onClick={() => {
                                if (data.game_paused) {
                                    data.helpers.playGame();
                                } else {
                                    data.helpers.pauseGame();
                                }
                            }}>
                                {/* <i className="material-icons">{data.game_paused ? 'play-arrow' : 'pause'}</i> */}
                                <i className="fa fa-pause"></i>
                            </button>

                            <div onClick={ () => {
                                let i = 1;
                                let n = 24;
                                while (i <= n) {
                                    data.helpers.tick((i === n));
                                    i++;
                                }
                            }}>

                                {[1, 3].map((speed, index) => {
                                    return (
                                        <button className="topbar-btn" key={index}>
                                            {data.game_speed_multiplier === speed
                                                ? <span>
                                                    {{0: '►',1: '►►'}[index]}
                                                </span>
                                                : <span
                                                onClick={() => {
                                                    data.helpers.setGameSpeed(speed); 
                                                }}>
                                                    {{0: '►',1: '►►',2: '►►►'}[index]}
                                                </span>}
                                        </button>
                                    )
                                })}

                                <button className="topbar-btn">
                                    <img src={"day-forward.svg"} alt={"Next Day"} title={"Next Day"}/>
                                </button>
                            </div>
                        </div>

                        <div className="topbar-divider"></div>
                            
                        <div className="topbar-center">
                            <FormattedDate 
                                value={game_date} 
                                weekday="short" 
                                day="numeric" 
                                month="short" 
                                year="numeric" 
                                hour="numeric" 
                            />

                            {/* <Timeline data={data}/> */}

                            {(date.is_working_time ?
                                <span className="text-success"> Working </span> :
                                (date.day > 5) ?
                                <span  className="text-primary"> Weekends </span> :
                                <span  className="text-info"> Sleeping </span>)}
                        </div>


                        <div className="topbar-divider"></div>

                        <div className="topbar-right">
                            <span 
                            className="topbar-btn font-weight-bold"
                            onClick={() => {
                                data.helpers.changeContent('Exchange');
                            }}
                            >
                                <i className="fa fa-bitcoin"></i>
                                 {data.btc.toFixed(2)}
                                {/*<span onClick={() => { CHEAT!
                                        data.helpers.addMoney(1, 'btc');
                                        }}> BTC </span>*/}
                            </span>

                            <span className="topbar-btn font-weight-bold">
                                <i className="fa fa-dollar"></i>
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

                    <Timeline data={this.props.data}/>
                </div>


            </header>
        );
    }
}

export default Header;
