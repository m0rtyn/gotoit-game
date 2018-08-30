import React, { PureComponent } from "react";
import * as PropTypes from "prop-types";
import _ from "lodash";

export class Avatar extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        kind: PropTypes.string,
        name: PropTypes.string,
        platform: PropTypes.string,
        size: PropTypes.number,
        style: PropTypes.object,
        sources: PropTypes.array
    };

    render() {
        let props = {};
        if (this.props.size) {
            props = {
                ...props,
                width: this.props.size,
                height: this.props.size
            };
        }
        if (this.props.style) {
            props = {
                ...props,
                style: this.props.style
            };
        }
        // if (this.props.className) {
        //   props = {
        //     ...props,
        //     className: this.props.className
        //   };
        // }

        return (
            <div className={this.props.className}>
                {_.map(this.props.sources, ([type, src], index) => {
                    if (!src) {
                        return null;
                    }
                    return (
                        <img className="avatar-fragment" key={`${index}${type}`} alt={this.props.name + " avatar"} src={src} {...props} />
                    );
                })}
            </div>
        );
    }
}
