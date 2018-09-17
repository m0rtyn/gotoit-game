import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class LockedTechnology extends PureComponent {
    render() {
        return (
            <div key={this.props.technology} className="row-md-1">
                <div className="form-check-checkbox slim-margin small">
                    {!this.props.projectsKnownTechnologies.includes(this.props.technology) ? (
                        <span>
                            <h5 className="text-center slim">
                                <DefaultClickSoundButton
                                    id={this.props.technologyId}
                                    className={
                                        this.props.price <= this.props.money
                                            ? "btn btn-success btn-sm"
                                            : "btn btn-secondary btn-sm disabled"
                                    }
                                    onClick={this.props.onClick}
                                >
                                    Unlock {this.props.name} {this.props.price}$
                                </DefaultClickSoundButton>
                            </h5>
                            <p className="small slim">{this.props.description}</p>
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

LockedTechnology.propTypes = {
    technology: PropTypes.string,
    projectsKnownTechnologies: PropTypes.any,
    price: PropTypes.any,
    money: PropTypes.any,
    onClick: PropTypes.func,
    name: PropTypes.any,
    description: PropTypes.any
};
