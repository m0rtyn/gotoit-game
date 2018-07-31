
import React, { Component } from 'react';
import ChartsController from "./ChartsController";
import btc_icon from '../../assets/images/btc_logo.png'

class Exchange extends Component {
    constructor(props){
        super(props);
        this.state = {
            tab: 'share0'
        }
    }
    render() {
        const data = this.props.data;
        var content;
        switch(this.state.tab){
            case 'bitcoin':
                content = <div>
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
                        <div className="">
                            Buy BTC for
                            <div>
                                <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1)}>$1</button>
                                <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10)}>$10</button>
                                <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(100)}>$100</button>
                                <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(1000)}>$1000</button>
                                <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyBTC(10000)}>$10000</button>
                            </div>
                        </div>
                        <div className="">
                            Sell BTC for
                            <div>
                                <button className={data.btc >= (1 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(1)}>$1</button>
                                <button className={data.btc >= (10 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(10)}>$10</button>
                                <button className={data.btc >= (100 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(100)}>$100</button>
                                <button className={data.btc >= (1000 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(1000)}>$1000</button>
                                <button className={data.btc >= (10000 / data.current_btc_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellBTC(10000)}>$10000</button>
                            </div>
                        </div>
                    </div>
                </div>;
                break;
            case 'share0':
                content = <div>
                    <h1 className="text-center">

                        {' '}Future Sight Coin Exchange</h1>
                    <h4>Current FSC Price: ${data.current_share0_price} per 1 FS</h4>
                    {   ChartsController({
                        chart: {type: 'share0'},
                        data: data
                    })
                    }
                    {/*<ChartsController chart={ {type: 'BTC'} }/>*/}

                    <div className="">
                        <h5 className="">Your USD: {data.money}</h5>
                        <h5 className="">Your FSC: {data.share0}</h5>
                    </div>
                    <div className="">
                        <div className="">
                            Buy FSC for
                            <div>
                                <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare0(1)}>$1</button>
                                <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare0(10)}>$10</button>
                                <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare0(100)}>$100</button>
                                <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare0(1000)}>$1000</button>
                                <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare0(10000)}>$10000</button>
                            </div>
                        </div>
                        <div className="">
                            Sell FSC for
                            <div>
                                <button className={data.share0 >= (1 / data.current_share0_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare0(1)}>$1</button>
                                <button className={data.share0 >= (10 / data.current_share0_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare0(10)}>$10</button>
                                <button className={data.share0 >= (100 / data.current_share0_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare0(100)}>$100</button>
                                <button className={data.share0 >= (1000 / data.current_share0_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare0(1000)}>$1000</button>
                                <button className={data.share0 >= (10000 / data.current_share0_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare0(10000)}>$10000</button>
                            </div>
                        </div>
                    </div>
                </div>;
                break;
            case 'share1':
                content = <div>
                    <h1 className="text-center">

                        {' '}L-Ri Coin Exchange</h1>
                    <h4>Current LRC Price: ${data.current_share1_price} per 1 LRC</h4>
                    {   ChartsController({
                        chart: {type: 'share1'},
                        data: data
                    })
                    }
                    {/*<ChartsController chart={ {type: 'BTC'} }/>*/}

                    <div className="">
                        <h5 className="">Your USD: {data.money}</h5>
                        <h5 className="">Your LRC: {data.share1}</h5>
                    </div>
                    <div className="">
                        <div className="">
                            Buy LRC for
                            <div>
                                <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare1(1)}>$1</button>
                                <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare1(10)}>$10</button>
                                <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare1(100)}>$100</button>
                                <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare1(1000)}>$1000</button>
                                <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare1(10000)}>$10000</button>
                            </div>
                        </div>
                        <div className="">
                            Sell LRC for
                            <div>
                                <button className={data.share1 >= (1 / data.current_share1_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare1(1)}>$1</button>
                                <button className={data.share1 >= (10 / data.current_share1_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare1(10)}>$10</button>
                                <button className={data.share1 >= (100 / data.current_share1_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare1(100)}>$100</button>
                                <button className={data.share1 >= (1000 / data.current_share1_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare1(1000)}>$1000</button>
                                <button className={data.share1 >= (10000 / data.current_share1_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare1(10000)}>$10000</button>
                            </div>
                        </div>
                    </div>
                </div>;
                break;
            case 'share2':
                content = <div>
                    <h1 className="text-center">

                        {' '}Murum Coin Exchange</h1>
                    <h4>Current MRM Price: ${data.current_share2_price} per 1 MRM</h4>
                    {   ChartsController({
                        chart: {type: 'share2'},
                        data: data
                    })
                    }
                    {/*<ChartsController chart={ {type: 'BTC'} }/>*/}

                    <div className="">
                        <h5 className="">Your USD: {data.money}</h5>
                        <h5 className="">Your MRM: {data.share2}</h5>
                    </div>
                    <div className="">
                        <div className="">
                            Buy MRM for
                            <div>
                                <button className={data.money >= 1 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare2(1)}>$1</button>
                                <button className={data.money >= 10 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare2(10)}>$10</button>
                                <button className={data.money >= 100 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare2(100)}>$100</button>
                                <button className={data.money >= 1000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare2(1000)}>$1000</button>
                                <button className={data.money >= 10000 ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.buyShare2(10000)}>$10000</button>
                            </div>
                        </div>
                        <div className="">
                            Sell MRM for
                            <div>
                                <button className={data.share2 >= (1 / data.current_share2_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare2(1)}>$1</button>
                                <button className={data.share2 >= (10 / data.current_share2_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare2(10)}>$10</button>
                                <button className={data.share2 >= (100 / data.current_share2_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare2(100)}>$100</button>
                                <button className={data.share2 >= (1000 / data.current_share2_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare2(1000)}>$1000</button>
                                <button className={data.share2 >= (10000 / data.current_share2_price) ? "btn btn-info" : "btn btn-info disabled"} onClick={() => data.helpers.sellShare2(10000)}>$10000</button>
                            </div>
                        </div>
                    </div>
                </div>;
                break;
        }
        return (
            <div className="text-center">
                <ul className="nav nav-tabs nav-tabs-light-mode">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => { this.setState({tab: 'share0'}); }}
                        >
                            Future Sight
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => { this.setState({tab: 'share1'}); }}
                        >
                            L-Ri
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => { this.setState({tab: 'share2'}); }}
                        >
                            Murum
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            onClick={() => { this.setState({tab: 'bitcoin'}); }}
                        >
                            Bitcoin
                        </a>
                    </li>
                </ul>
                {content}
            </div>
        );
    }
}

export default Exchange;