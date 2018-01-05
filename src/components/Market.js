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
                            <label className="flex-element">
                                <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC()}>Buy BTC for $100</button>
                            </label>
                            <label className="flex-element">Your BTC: {data.btc}</label>
                            <label className="flex-element">
                                <button className={data.btc >= (100 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC()}>Sell BTC for $100</button>
                            </label>
                        </div>
                        <div>
                            {data.miner ? <div>
                                You have {data.miner} miner
                            </div> : ''}
                            <button className={data.btc >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyMiner()}>Buy Miner for 10 BTC</button>
                        </div>
                    </div>
                </TeamDialog>
            </Portal>
        );
    }
}

export default Market;