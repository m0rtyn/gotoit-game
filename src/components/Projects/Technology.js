import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class Technology extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        locked: PropTypes.bool.isRequired,
        money: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func,
        price: PropTypes.number
    };

    render() {
        return (
            <div className="row-md-1">
                <div className="form-check-checkbox slim-margin">
                    <span>
                        {!this.props.locked ? (
                            <h5 className="text-center slim">
                                <input type="checkbox" id={this.props.id} checked={this.props.active} onChange={this.props.onChange} />
                                {this.props.name}
                            </h5>
                        ) : (
                            <h5 className="text-center slim">
                                <DefaultClickSoundButton
                                    id={this.props.id}
                                    className={
                                        this.props.price <= this.props.money
                                            ? "btn btn-success btn-sm"
                                            : "btn btn-secondary btn-sm disabled"
                                    }
                                    onClick={this.props.onChange}
                                >
                                    Unlock {this.props.name} {this.props.price}$
                                </DefaultClickSoundButton>
                            </h5>
                        )}

                        <p className="small slim">{this.props.description}</p>
                    </span>
                </div>
            </div>
        );
    }
}
