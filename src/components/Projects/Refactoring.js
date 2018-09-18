import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

export class Refactoring extends PureComponent {
    static propTypes = {
        complexity: PropTypes.number,
        complexityMax: PropTypes.number
    };

    render() {
        const { complexity, complexityMax } = this.props;
        return (
            <div key="refactoring" className="row">
                <div className="col-2">Refactoring</div>
                <div className="col-10 progress">
                    <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{
                            width: (complexity / complexityMax) * 100 + "%"
                        }}
                    >
                        <span>{complexity} complexity</span>
                    </div>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                            width: 100 - (complexity / complexityMax) * 100 + "%"
                        }}
                    >
                        {complexityMax - complexity > 0 && <span>{complexityMax - complexity} refactored</span>}
                    </div>
                </div>
            </div>
        );
    }
}

Refactoring.propTypes = {
    complexity: PropTypes.any,
    complexityMax: PropTypes.any
};
