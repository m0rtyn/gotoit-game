import React, { Component } from 'react';
import Portal from 'react-portal';

import TeamDialog from './TeamDialog';


class Market extends Component {
    render() {
        const data = this.props.data;

        const open_button = <button className="btn-link">Market</button>;

        return (
            <Portal ref="loans" closeOnEsc openByClickOn={open_button}>
                <TeamDialog>
                    <div className="text-center">
                        <h3 className="text-center">Market</h3>
                        <h4>Current BTC Price: ${data.current_btc_price} per 1 BTC</h4>
                        <div className="flex-container-row">
                            <h5 className="flex-element">Your USD: {data.money}</h5>
                            <h5 className="flex-element">Your BTC: {data.btc}</h5>
                        </div>
                        <div className="flex-container-row">
                            <label className="flex-element">
                                Buy BTC for
                                <div>
                                    <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1)}>$1</button>
                                    <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10)}>$10</button>
                                    <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(100)}>$100</button>
                                    <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1000)}>$1000</button>
                                    <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10000)}>$10000</button>
                                </div>
                            </label>
                            <label className="flex-element">
                                Sell BTC for
                                <div>
                                    <button className={data.btc >= (1 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(1)}>$1</button>
                                    <button className={data.btc >= (10 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(10)}>$10</button>
                                    <button className={data.btc >= (100 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(100)}>$100</button>
                                    <button className={data.btc >= (1000 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(1000)}>$1000</button>
                                    <button className={data.btc >= (10000 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(10000)}>$10000</button>
                                </div>
                            </label>
                        </div>
                        <div>
                            {data.miner ? <div>
                                You have {data.miner} miner which generate {data.miner} BTC/Year.
                            </div> : ''}
                            <button className={data.btc >= 0.1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyMiner()}>Buy Miner for 1 BTC</button>
                        </div>
                    </div>
                </TeamDialog>
            </Portal>
        );
    }
}

export default Market;