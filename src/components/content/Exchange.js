import React, { Component } from 'react';
import ChartsController from './ChartsController';
import btc_icon from '../../assets/images/btc_logo.png';
import { shares } from '../../game/knowledge/shares';
import _ from 'lodash';

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  render() {
    const data = this.props.data;
    if (this.props.data.exchange_unlocked_shares.length === 0) return <div />;
    let current = this.state.current;
    let key = this.props.data.exchange_unlocked_shares[current];
    let share = shares[key];
    let content = (
      <div>
        <h1 className="text-center">
          {/*<img
            style={{ marginLeft: '3px' }}
            width={40}
            height={40}
            src={btc_icon} //need make icons for each company
            role="presentation"
          />{' '}*/}
          {share.name} Exchange
        </h1>
        <h4>
          Current {share.short} Price: {data[`current_${key}_price`]} per 1{' '}
          {share.short}
        </h4>
        {ChartsController({
          chart: { type: key },
          data: data
        })}
        {/*<ChartsController chart={ {type: 'BTC'} }/>*/}

        <div className="">
          <h5 className="">Your USD: {data.money}</h5>
          <h5 className="">
            Your {share.short}: {data[key]}
          </h5>
        </div>
        <div className="">
          <div className="">
            Buy {share.short} for
            <div>
              <button
                className={
                  data.money >= 1 ? 'btn btn-info' : 'btn btn-info disabled'
                }
                onClick={() => share.onBuy(data, 1)}
              >
                $1
              </button>
              <button
                className={
                  data.money >= 10 ? 'btn btn-info' : 'btn btn-info disabled'
                }
                onClick={() => share.onBuy(data, 10)}
              >
                $10
              </button>
              <button
                className={
                  data.money >= 100 ? 'btn btn-info' : 'btn btn-info disabled'
                }
                onClick={() => share.onBuy(data, 100)}
              >
                $100
              </button>
              <button
                className={
                  data.money >= 1000 ? 'btn btn-info' : 'btn btn-info disabled'
                }
                onClick={() => share.onBuy(data, 1000)}
              >
                $1000
              </button>
              <button
                className={
                  data.money >= 10000 ? 'btn btn-info' : 'btn btn-info disabled'
                }
                onClick={() => share.onBuy(data, 10000)}
              >
                $10000
              </button>
            </div>
          </div>
          <div className="">
            Sell {share.short} for
            <div>
              <button
                className={
                  data.btc >= 1 / data.current_btc_price
                    ? 'btn btn-info'
                    : 'btn btn-info disabled'
                }
                onClick={() => share.onSell(data, 1)}
              >
                $1
              </button>
              <button
                className={
                  data.btc >= 10 / data.current_btc_price
                    ? 'btn btn-info'
                    : 'btn btn-info disabled'
                }
                onClick={() => share.onSell(data, 10)}
              >
                $10
              </button>
              <button
                className={
                  data.btc >= 100 / data.current_btc_price
                    ? 'btn btn-info'
                    : 'btn btn-info disabled'
                }
                onClick={() => share.onSell(data, 100)}
              >
                $100
              </button>
              <button
                className={
                  data.btc >= 1000 / data.current_btc_price
                    ? 'btn btn-info'
                    : 'btn btn-info disabled'
                }
                onClick={() => share.onSell(data, 1000)}
              >
                $1000
              </button>
              <button
                className={
                  data.btc >= 10000 / data.current_btc_price
                    ? 'btn btn-info'
                    : 'btn btn-info disabled'
                }
                onClick={() => share.onSell(data, 10000)}
              >
                $10000
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div className="text-center">
        <ul className="nav nav-tabs nav-tabs-light-mode">
          {_.map(this.props.data.exchange_unlocked_shares, (share_name, i) => {
            return (
              <a
                key={i}
                className="nav-link"
                onClick={() => {
                  this.setState({ current: i });
                }}
              >
                {shares[share_name].name}
              </a>
            );
          })}
        </ul>
        {content}
      </div>
    );
  }
}

export default Exchange;
