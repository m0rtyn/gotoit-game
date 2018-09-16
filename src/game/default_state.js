import _ from "lodash";

import WorkerModel from "../models/WorkerModel";
import ProjectModel, { flush } from "../models/ProjectModel";
import OfficeModel from "../models/OfficeModel";

import { charts_parameters } from "./knowledge/charts";
import { project_kinds, project_platforms } from "./knowledge/projects";
import { companies } from "./knowledge/companies";
import { GAME_START_UNIXTIME } from "./knowledge/date";

var default_state = {
    data: {
        game_speed: 1000,
        game_speed_multiplier: 1,
        game_paused: true,
        stage: "start",
        current_game_date: new Date(GAME_START_UNIXTIME),
        date: {
            tick: 0,
            hour: 0,
            day: 0,
            week: 0,
            month: 0,
            year: 0,
            is_working_time: false
        },

        content: "Welcome",
        context: {},

        money: 0,
        btc: 0,
        current_btc_price: 10000,

        share0: 0,
        share1: 0,
        share2: 0,
        current_share0_price: 100,
        current_share1_price: 100,
        current_share2_price: 100,

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
            resumes: [WorkerModel.generate(3)],
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
        workers_roles: { player: { design: true, manage: true, program: true } },

        projects: [],
        projects_end_reports: [],
        projects_archive_reports: [],
        simplified_reports: [],
        projects_known_technologies: ["overtime", "creativity"],
        projects_technologies: [],
        projects_default_technologies: [],
        projects_unlocked_platforms: ["desktop"],
        project_team_selector: null,
        top_projects_finished: 0,
        hovered_projects_id: [],
        hovered_workers_id: [],

        wasRecentlyHackathon: false,

        relations: {},

        helpers: {},

        attainments: [],

        achieved: {},

        animation_items: [],

        timelineScale: [],
        timelineEvents: [],

        statistics:
            _.mapValues(charts_parameters, () => {
                return { buffer: 0, values: [0] };
            }) || [],

        on_tick_effects: [],
        exchange_statistics: {
            btc: { buffer: 0, values: [] },
            share0: { buffer: 0, values: [] },
            share1: { buffer: 0, values: [] },
            share2: { buffer: 0, values: [] }
        },
        exchange_unlocked_shares: [],
        share0_unlock: false,
        share1_unlock: false,
        share2_unlock: false,
        company0_done: 0,
        company1_done: 0,
        company2_done: 0,
        btc_unlock: false,
        max_stat: 1,
        max_candidates_stat: 1,
        max_stats_projects_offered: 1,
        mailbox: []
    },

    is_animation_fresh: false
};

_.keys(project_platforms).forEach(platform => {
    _.keys(project_kinds).forEach(kind => {
        for (let top = 1; top <= 10; top++) {
            let q = (11 - top) * 2;
            let size = Math.ceil(q / 5);
            default_state.data.simplified_reports.push(
                ProjectModel.generate(_.sample(companies), q, size, false, kind, platform).generateReport(false)
            );
        }
    });
});
flush();

export default default_state;

export const getDefaultState = () => {
    return _.cloneDeep(default_state);
};
