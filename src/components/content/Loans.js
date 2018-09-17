import React, { Component } from "react";

import { loans } from "../../game/knowledge/loans";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

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

        data.helpers.addMoney(loan.money);
        loan.timer = loan.time;
        data.taken_loans.push(loan);

        data.helpers.checkState();
    }

    earlyRepayment(id) {
        const data = this.props.data;
        let loan = data.taken_loans[id];
        data.taken_loans.splice(id, 1);
        data.old_loans.push(loan);
        data.early_payed_loans += 2 * loan.timer * loan.size;

        data.helpers.chargeMoney(this.getEarlyCost(loan));
    }

    getEarlyCost(loan) {
        return Math.floor(((loan.money * (1 + loan.interest / 100)) / loan.time) * loan.timer);
    }

    calcCreditScore() {
        const data = this.props.data;
        const inertia = 500;
        let good_factors = Math.sqrt(data.old_loans.length) * 100 + Math.sqrt(data.early_payed_loans) * 1;
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
                <div className="">
                    {Object.keys(loans).map(size => {
                        let loan = loans[size];
                        return (
                            <div className=" flex-container-column" key={size}>
                                <h4 className="">
                                    {loan.min_credit_score <= this.calcCreditScore() ? (
                                        <DefaultClickSoundButton className="btn btn-success btn-sm" onClick={() => this.take(size)}>
                                            take
                                        </DefaultClickSoundButton>
                                    ) : (
                                        <DefaultClickSoundButton className="btn btn-success btn-sm disabled">
                                            need {loan.min_credit_score} score
                                        </DefaultClickSoundButton>
                                    )}
                                    <span> {loan.name} </span>
                                </h4>
                                <span className=""> Money: {loan.money}$ </span>
                                <span className=""> Time: {loan.time} month </span>
                                <span className=""> Interest: {loan.interest}% </span>
                            </div>
                        );
                    })}
                </div>
                <div className="card">
                    {data.taken_loans.map((loan, i) => {
                        let paid_percent = Math.ceil(((loan.time - loan.timer) / loan.time) * 100);

                        return (
                            <div className="card" key={i}>
                                <div className="">
                                    <h4 className=""> {loan.name} </h4>
                                    <span className=""> Money: {loan.money}$ </span>
                                    <span className=""> Time: {loan.time} month </span>
                                    <span className=""> Interest: {loan.interest}% </span>
                                    <span className={paid_percent ? "" : " hidden"}>
                                        <DefaultClickSoundButton
                                            className={
                                                this.getEarlyCost(loan) <= data.money
                                                    ? "btn btn-success btn-sm"
                                                    : "btn btn-success btn-sm disabled"
                                            }
                                            onClick={() => {
                                                if (this.getEarlyCost(loan) <= data.money) this.earlyRepayment(i);
                                            }}
                                        >
                                            early repayment {this.getEarlyCost(loan)}$
                                        </DefaultClickSoundButton>
                                    </span>
                                </div>
                                <div className="filament">
                                    <div className="progress">
                                        <div
                                            className="progress-bar bg-warning"
                                            role="progressbar"
                                            style={{ width: 100 - paid_percent + "%" }}
                                        >
                                            debt
                                        </div>
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: paid_percent + "%" }}>
                                            paid
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Loans;
