
import React, { Component } from 'react';
import ChartsController from "./ChartsController";
import btc_icon from '../../../public/btc_logo.png'

class Exchange extends Component {
    render() {
        const data = this.props.data;

        return (
            <div className="text-center">
                <h1 className="text-center">
                    <img style={{marginLeft: '3px'}} width={40} height={40} src={btc_icon} role="presentation" />
                    {' '}Bitcoin Exchange</h1>
                <h4>Current BTC Price: ${data.current_btc_price} per 1 BTC</h4>
                {   ChartsController({
                        chart: {type: 'BTC'},
                        data: data
                    })
                }
                {/*<ChartsController chart={ {type: 'BTC'} }/>*/}

                <div className="">
                    <h5 className="">Your USD: {data.money}</h5>
                    <h5 className="">Your BTC: {data.btc}</h5>
                </div>
                <div className="">
                    <label className="">
                        Buy BTC for
                        <div>
                            <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1)}>$1</button>
                            <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10)}>$10</button>
                            <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(100)}>$100</button>
                            <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1000)}>$1000</button>
                            <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10000)}>$10000</button>
                        </div>
                    </label>
                    <label className="">
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
            </div>
        );
    }
}

export default Exchange;