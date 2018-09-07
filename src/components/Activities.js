import PropTypes from "prop-types";
import React, { Component } from "react";

import Achievements from "./content/Achievements.js";
import PublicRelations from "./content/PublicRelations.js";
import Archive from "./content/Archive.js";
import ChartsController from "./content/ChartsController";
import Exchange from "./content/Exchange.js";
import HireWorkers from "./content/HireWorkers";
import Loans from "../components/content/Loans.js";
import MarketTop from "../components/content/MarketTop.js";
import ProjectsFind from "../components/content/ProjectsFind.js";
//import StartMeeting from '../components/content/StartMeeting.js';
import StartProject from "../components/content/StartProject.js";
import Welcome from "../components/content/Welcome.js";
import Mail from "../components/content/Mail.js";
import Office from "../components/content/Office.js";

const components = {
    Achievements: Achievements,
    PublicRelations: PublicRelations, //перенести отдельный попап
    Archive: Archive,
    ChartsController: ChartsController,
    Exchange: Exchange,
    HireWorkers: HireWorkers,
    Loans: Loans,
    MarketTop: MarketTop,
    ProjectsFind: ProjectsFind,
    // this feature locked for {time}, time = undefined
    //StartMeeting: StartMeeting,
    StartProject: StartProject,
    Welcome: Welcome,
    Mail: Mail,
    Office: Office
};

class Activities extends Component {
    static propTypes = {
        data: PropTypes.shape({
            content: PropTypes.any.isRequired
        })
    };
    // shouldComponentUpdate() {
    //   return false;
    // }
    render() {
        const ContentComponent = components[this.props.data.content];

        return (
            <div className="card-body">
                <ContentComponent data={this.props.data} />
            </div>
        );
    }
}

export default Activities;
