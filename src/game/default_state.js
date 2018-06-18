
import _ from 'lodash';

import WorkerModel from '../models/WorkerModel';
import ProjectModel, {flush} from '../models/ProjectModel';
import OfficeModel from '../models/OfficeModel';

import {project_platforms, project_kinds} from './knowledge';

var default_state =
{
    data: {
        game_speed: 1000,
        game_speed_multiplier: 1,
        game_paused: true,
        stage: 'start',
        date: {
            tick: 0,
            hour: 0,
            day: 0,
            weak: 0,
            month: 0,
            year: 0,
            is_working_time: false
        },

        content: 'Welcome',
        context: {},

        money: 0,
        btc: 0,
        current_btc_price: 10000,
        taken_loans: [],
        old_loans: [],
        early_payed_loans: 0,

        office: new OfficeModel(1),
        office_things: {
            coffeemaker: false,
            lunch: false,
            gadget: 0
        },

        candidates: {
            resumes: [
                WorkerModel.generate(3)
            ],
            agency: []
        },

        offered_projects: [],

        rumor: 0,
        meetup: 0,
        reputation: 0,
        demo: 0,

        hiring_agency_state: {},
        sales_agency_state: {},

        workers: [],
        workers_roles: {player: {design: true, manage: true, program: true}},

        projects: [],
        projects_end_reports: [],
        projects_archive_reports: [],
        simplified_reports: [],
        projects_known_technologies: ['overtime', 'creativity'],
        projects_technologies: [],
        projects_default_technologies: [],

        wasRecentlyHackathon: false,

        relations: [],

        helpers: {},

        attainments: [],

        achieved: {},

        animation_items: [],

        timelineScale: [],
        timelineEvents: []


    },
    is_animation_fresh: false
};

_.keys(project_platforms).forEach((platform) => {
    _.keys(project_kinds).forEach((kind) => {
        for (let top = 1; top <= 10; top++) {
            let q = (11-top)*2;
            let size = Math.ceil(q/5);
            default_state.data.simplified_reports.push(ProjectModel.generate(q, size, false, kind, platform).generateReport(false));
        }
    });
});
flush();

export default default_state;

export const getDefaultState = () => {
    return _.cloneDeep(default_state);
};