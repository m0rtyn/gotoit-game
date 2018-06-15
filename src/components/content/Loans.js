import React, { Component } from 'react';

import {loans} from '../../game/knowledge';


class Loans extends Component {
    constructor(props) {
        super(props);

        this.calcCreditScore = this.calcCreditScore.bind(this);
        this.take = this.take.bind(this);
        this.getEarlyCost = this.getEarlyCost.bind(this);
    }

    take(size) {
        const data = this.props.data;

        let loan = JSON.parse(JSON.stringify(loans[size]));

        data.money += loan.money;
        loan.timer = loan.time;
        data.taken_loans.push(loan);

        data.helpers.checkState();
    }

    earlyRepayment(id) {
        const data = this.props.data;
        let loan =  data.taken_loans[id];
        data.taken_loans.splice(id, 1);
        data.old_loans.push(loan);
        data.early_payed_loans += 2 * loan.timer * loan.size;

        data.helpers.chargeMoney(this.getEarlyCost(loan));
    }

    getEarlyCost(loan) {
        return Math.floor(((loan.money * (1 + (loan.interest/100)))/loan.time) * loan.timer);
    }

    calcCreditScore() {
        const data = this.props.data;
        const inertia = 500;
        let good_factors = (Math.sqrt(data.old_loans.length) * 100) + (Math.sqrt(data.early_payed_loans) * 1);
        let bad_factors = Math.pow(data.taken_loans.length, 1.5) * 75;

        let score_rate = 420 * ((inertia + good_factors) / (inertia + bad_factors));
        return Math.floor(score_rate);
    }

    render() {
        const data = this.props.data;

        return (
            <div className="text-center">
                <h3 className="text-center">Loans</h3>
                Your credit score: {this.calcCreditScore()}
                <div className="flex-container-row">
                    {Object.keys(loans).map((size) => {
                        let loan = loans[size];
                        return <div className="flex-element flex-container-column" key={size}>
                            <h4 className="flex-element">
                                {loan.min_credit_score <= this.calcCreditScore()
                                    ? <button className="btn btn-success btn-sm" onClick={() => this.take(size)}>take</button>
                                    : <button className="btn btn-success btn-sm disabled">need {loan.min_credit_score} score</button>
                                }
                                <label> {loan.name} </label>
                            </h4>
                            <label className="flex-element"> Money: {loan.money}$ </label>
                            <label className="flex-element"> Time: {loan.time} month </label>
                            <label className="flex-element"> Interest: {loan.interest}% </label>
                        </div>
                    })}

                </div>
                <div className="panel">
                    {data.taken_loans.map((loan, i) => {
                        let paid_percent = Math.ceil((loan.time - loan.timer) / loan.time * 100);

                        return <div className="card border" key={i}>
                            <div className="flex-container-row">
                                <h4 className="flex-element"> {loan.name} </h4>
                                <label className="flex-element"> Money: {loan.money}$ </label>
                                <label className="flex-element"> Time: {loan.time} month </label>
                                <label className="flex-element"> Interest: {loan.interest}% </label>
                                <label className={paid_percent ? "flex-element" : "flex-element hidden"}>
                                    <button
                                        className={this.getEarlyCost(loan) <= data.money ? "btn btn-success btn-sm" : "btn btn-success btn-sm disabled"}
                                        onClick={() => { if (this.getEarlyCost(loan) <= data.money) this.earlyRepayment(i); }}
                                    >
                                        early repayment {this.getEarlyCost(loan)}$
                                    </button>
                                </label>
                            </div>
                            <div className="filament">
                                <div className="progress">
                                    <div className='progress-bar progress-bar-warning' role="progressbar"
                                         style={{width: (100 - paid_percent) + '%'}}>
                                        <label>debt</label>
                                    </div>
                                    <div className='progress-bar progress-bar-success' role="progressbar"
                                         style={{width: paid_percent + '%'}}>
                                        <label>paid</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Loans;