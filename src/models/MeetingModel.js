import _ from "lodash";

import ProjectModel from "../models/ProjectModel";

import { meetings } from "../game/knowledge/meetings";

class MeetingModel {
    constructor(type, deadline) {
        this.stage = "ready";
        this.id = _.uniqueId("meeting");
        this.name = meetings[type].name;
        this.type = "meeting"; //
        this.meeting_type = type; //
        this.deadline = deadline;
        this.deadline_max = deadline;

        this.facts = { money_spent: 0 };
    }

    static generate(type, team) {
        const meeting_conf = meetings[type];

        if (type === "training") {
            return ProjectModel.generateTrainingHackathon(team);
        }

        return new MeetingModel(type, meeting_conf.deadline);
    }

    isNeed(roles) {
        return roles["meeting"] === true;
    }

    generateReport() {
        return {
            id: this.id,
            name: "",
            type: this.type
        };
    }

    getName() {
        return this.name;
    }

    getDeadlineText() {
        return this.deadline + " hours";
    }
}

export default MeetingModel;
