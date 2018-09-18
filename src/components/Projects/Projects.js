import React, { Component } from "react";

import Meeting from "../Meeting/Meeting";
import Project from "./Project";
import { DefaultClickSoundButton } from "../../game/knowledge/sounds";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { show_archive: true };
    }

    render() {
        let data = this.props.data;

        return (
            <section className="projects">
                <div className="column-buttons">
                    <DefaultClickSoundButton
                        className="btn btn-bold btn-w-lg btn-success"
                        onClick={() => {
                            data.helpers.changeContent("StartProject");
                        }}
                    >
                        New project
                    </DefaultClickSoundButton>
                </div>

                <div>
                    {this.props.data.projects.length ? (
                        <div>
                            {this.props.data.projects.map(
                                (meeting, i) =>
                                    meeting.type === "meeting" ? <Meeting key={meeting.id} project={meeting} data={this.props.data} /> : ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    {this.props.data.projects.length ? (
                        <div>
                            {this.props.data.projects.map(
                                (project, i) =>
                                    project.type !== "meeting" ? <Project key={project.id} project={project} data={this.props.data} /> : ""
                            )}
                        </div>
                    ) : (
                        <div className="text-center">You have no projects in progress.</div>
                    )}
                </div>
            </section>
        );
    }
}

export default Projects;
