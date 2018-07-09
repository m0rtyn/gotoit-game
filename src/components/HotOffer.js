import React, { Component } from 'react';
//import ProjectOfferBlock from './ProjectOfferBlock';


class HotOffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //   end_screen_project: null
        };

    }

    componentDidMount() {
        this.refs.hot_offer.openPortal();
    }

    render() {
        /*const data = this.props.data;
        let project = this.props.project;

        const modal = <div>
            <div className="moat">
                <h3>{project.lore.name}</h3>
                <p>
                    {project.lore.text}
                </p>
            </div>
            <div className="moat slim_top">
                <ProjectOfferBlock candidate={project} data={data} type='hot' />
            </div>
        </div>;*/

        return (
            <div>

            </div>
        );
    }
}

export default HotOffer;