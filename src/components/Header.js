import React, { Component } from 'react';
import {FormattedDate} from 'react-intl';
import classNames from 'classnames';

class Header extends Component {
    render() {
        const data = this.props.data;
        const date = this.props.data.date;

        var real_date = new Date();
        var game_date = new Date();
        game_date.setDate(real_date.getDate()+(date.tick/24));

        return (
            <header className="topbar" style={{borderBottom: '1px solid black'}}>
                <div className="topbar-left">
                    <a className="topbar-btn" onClick={() => {
                        if (data.game_paused) {
                            data.helpers.playGame();
                        } else {
                            data.helpers.pauseGame();
                        }
                    }}>
                        <i className={classNames('fa', (data.game_paused ? 'fa-play' : 'fa-pause'))}></i>
                    </a>

                    <span onClick={() => {
                        let i = 1;
                        let n = 24;
                        while (i <= n) {
                            data.helpers.tick((i === n));
                            i++;
                        }
                    }}>

                        {[1, 3].map((speed, index) => {
                            return <a className="topbar-btn" key={index}>
                                {data.game_speed_multiplier === speed
                                    ? <span className="">
                                        {{0: 'slow',1: 'fast'}[index]}
                                    </span>
                                    : <span className="" onClick={() => {
                                        data.helpers.setGameSpeed(speed); }}>
                                        {{0: 'slow',1: 'fast',2: 'faster'}[index]}
                                    </span>}
                            </a>
                        })}
                        
                        <a className="topbar-btn">
                            <img src={"day-forward.svg"} alt={"Next Day"} title={"Next Day"}
                                    className="img"/>
                        </a>
                    </span>
                </div>

                <div className="topbar-center">
                    <p>
                        <FormattedDate
                            value={game_date}
                            weekday="short"
                            day="numeric"
                            month="short"
                            year="numeric"
                            hour="numeric"
                            />
                    </p>
                    <p>
                        {(date.is_working_time ?
                            <label className="label-success">Working</label> :
                            (date.day > 5) ?
                                <label className="label-default">Weekends</label> :
                                <label className="label-info">Sleeping</label>)}
                    </p>
                </div>

                <div className="topbar-right" onClick={() => {
                    console.log(data);
                }}>
                    <span className="topbar-btn font-weight-bold">
                        <i className="fa fa-dollar"></i>
                         {data.money}
                        {/*<label onClick={() => { CHEAT!
                                data.helpers.addMoney(10000, 'usd');
                                }}>$</label>*/}
                    </span>
                    
                    <div className="topbar-divider"></div>

                    <span className="topbar-btn font-weight-bold">
                        <i className="fa fa-bitcoin"></i>
                         {data.btc.toFixed(2)}
                        {/*<label onClick={() => { CHEAT!
                                data.helpers.addMoney(1, 'btc');
                                }}> BTC </label>*/}
                    </span>
                </div>
            </header>
        );
    }
}

export default Header;
