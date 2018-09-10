import _ from "lodash";

import bulkStyler from "../services/bulkStyler";
import ProjectsTop from "../services/ProjectsTop";

import { project_bars, project_kinds, project_sizes } from "../game/knowledge/projects";
import { skills, skills_inf } from "../game/knowledge/skills";
import { getData, hired, projects_done } from "../App";
import { companies } from "../game/knowledge/companies";

export var projects_generated = 0;
export function flush() {
    projects_generated = 0;
}

class ProjectModel {
    constructor(name, type, kind, platform, company, reward, penalty, start_needs, size, deadline, complexity = 0) {
        this.stage = "ready";
        this.is_paused = false;

        this.id = _.uniqueId("project") + "_" + _.random(100000000, 999999999);
        this.name = name;
        this.type = type; //  project, training, hackathon, draft, own
        this.hot = false;
        this.kind = kind;
        this.platform = platform;
        this.reward = reward;
        this.penalty = penalty;
        const platformsSVG = require.context("../assets/images/project/platforms/", true, /^\.\/.*\.svg$/);
        const kindSVG = require.context("../assets/images/project/kind/", true, /^\.\/.*\.svg$/);
        this.avatar = {
            platform: platformsSVG(`./${platform}.svg`),
            kind: kindSVG(`./${kind}.svg`)
        };
        this.company = company;

        this.estimate = JSON.parse(JSON.stringify(start_needs));
        this.original_estimate = JSON.parse(JSON.stringify(start_needs));
        this.done = JSON.parse(JSON.stringify(skills));
        this.bugs = JSON.parse(JSON.stringify(skills));

        //this.needs = JSON.parse(JSON.stringify(start_needs));
        //this.errors = JSON.parse(JSON.stringify(skills));
        //this.needs_max = JSON.parse(JSON.stringify(start_needs));
        //this.needs_original = JSON.parse(JSON.stringify(start_needs));

        this.deadline = deadline;
        this.deadline_max = deadline;
        this.complexity = complexity;
        this.complexity_max = complexity;
        this.iteration = 1;
        this.size = size;
        this.tests = 0;

        this.is_storyline = false;
        this.lore = null;
        this.briefing = false;
        this.accept_default = this.type !== "training" ? true : false;

        this.stored_wisdom = JSON.parse(JSON.stringify(skills));
        this.supporter = null;

        this.facts = {
            money_spent: 0,
            tasks_done: 0,
            bugs_passed: 0,
            refactored: 0,
            tests_wrote: 0,
            cuted_cost: 0
        };
    }

    needs(role = null) {
        if (this.type === "own" && this.stage !== "fixing") {
            if (role === null) {
                return JSON.parse(JSON.stringify(skills_inf));
            } else {
                return Number.POSITIVE_INFINITY;
            }
        }
        if (role === null) {
            let needs = JSON.parse(JSON.stringify(skills));
            _.each(skills, (val, skill) => {
                needs[skill] = Math.max(0, this.estimate[skill] - this.done[skill]);
            });
            return needs;
        } else {
            return Math.max(0, this.estimate[role] - this.done[role]);
        }
    }

    generateReport(is_player = true) {
        return {
            id: this.id,
            name: this.getName(),
            is_player: is_player,
            type: this.type,
            platform: this.platform,
            kind: this.kind,
            company: this.company,
            stage: this.stage,
            design: this.estimate.design,
            manage: this.estimate.manage,
            program: this.estimate.program,
            total: this.totalScore()
        };
    }

    applyWork(work, worker, project, animation, focus_on, rad = false, creativity = false, pair = false, overtimed = false) {
        var learned = JSON.parse(JSON.stringify(skills));
        // let focus_on_id = project.id + project_bars[focus_on];
        Object.keys(work).forEach(stat => {
            if (this.needs(stat) > 0 && work[stat] > 0) {
                var support = this.supporter && this.supporter.id !== worker.id ? this.supporter.stats[stat] : 0;
                let all_work = _.random(1, work[stat] + support + (rad ? worker.getSideResource() : 0)) + this.stored_wisdom[stat];
                let complexity_penalty = Math.max(
                    0,
                    Math.floor(Math.sqrt(Math.max(0, this.complexity - _.random(0, this.bugs[stat])))) - Math.pow(this.iteration, 2) + 1
                );
                if (worker.effects["planing"] > 0) {
                    complexity_penalty *= 0.5;
                }

                let bugs = 0;
                let tasks = 0;
                if (complexity_penalty > all_work) {
                    bugs = all_work;
                } else {
                    tasks = all_work - complexity_penalty;
                    bugs = Math.min(complexity_penalty, all_work);
                }

                if (tasks > 0) {
                    tasks = Math.min(this.needs(stat), tasks); // а может пусть делают побольше с разбега?) убрать ли?
                    this.stored_wisdom[stat] = 0;
                    this.complexity += rad ? 4 : 1;
                    this.complexity_max += rad ? 4 : 1;
                    if (this.is_supported) this.is_supported = false;
                }

                /*const formName = () => {
                    return worker.name
                        + (overtimed ? ' in overtime' : '')
                        + (support ? ' with support of ' + this.supporter.name : '');
                };*/

                if (bugs > 0) {
                    this.stored_wisdom[stat] += bugs;
                    let prevented = this.runTests(bugs);
                    if (prevented) {
                        if (tasks !== 0) {
                            animation.addBubbleAnimation(focus_on, tasks, worker.id, project.id + `_${focus_on}`);
                        }
                        if (bugs !== 0) {
                            console.log("bug!");
                            animation.addBubbleAnimation(focus_on, bugs, worker.id, project.id + `_${focus_on}`, true);
                        }
                        //chatMessage(formName(), ' does '+tasks+' tasks and creates '+bugs+' bugs in '+stat+', but tests prevent '+prevented+' of them', 'warning');
                        bugs -= prevented;
                        tasks += prevented;
                        tasks = Math.min(this.needs(stat), tasks); // а может пусть делают побольше с разбега?) убрать ли?
                    } else {
                        if (tasks !== 0) {
                            animation.addBubbleAnimation(focus_on, tasks, worker.id, project.id + `_${focus_on}`);
                        }
                        if (bugs !== 0) {
                            animation.addBubbleAnimation(focus_on, bugs, worker.id, project.id + `_${focus_on}`, true);
                        }
                        //chatMessage(formName(), ' does '+tasks+' tasks and creates '+bugs+' bugs in '+stat, 'warning');
                    }
                } else {
                    if (tasks !== 0) {
                        animation.addBubbleAnimation(focus_on, tasks, worker.id, project.id + `_${focus_on}`);
                    }
                }

                if (support) this.supporter = null;

                if (this.type === "training") {
                    worker.facts.training_tasks_done += tasks;
                } else if (this.type === "hackathon") {
                    worker.facts.training_tasks_done += tasks * 2;
                }
                worker.facts.tasks_done += tasks;
                this.facts.tasks_done += tasks;
                this.done[stat] += tasks;

                worker.facts.bugs_passed += bugs;
                this.facts.bugs_passed += bugs;
                this.bugs[stat] += bugs;

                let boost_from_character = worker.character.name === "Gifted" ? 2 : worker.character.name === "Modest" ? 0.5 : 1;

                let learn = Math.floor((tasks + bugs * 2) * boost_from_character);
                learned[stat] +=
                    learn *
                    (pair ? 1.25 : 1) *
                    (creativity ? 1.5 : 1) *
                    (this.type === "training" ? 2 : 1) *
                    (this.type === "hackathon" ? 4 : 1);
                if (isNaN(learned[stat])) {
                    console.log([learn, creativity, this.type].map(e => e));
                }
            } else {
                console.log("That strange case");
                console.log(work);
            }
        });

        return learned;
    }

    /***
     * Take a chance to not to add error
     */
    runTests(bugs = null) {
        const roll = () => {
            let chance = (this.tests / this.planedTasksQuantity()) * 100;
            return _.random(1, 100) < chance;
        };

        if (bugs === null) {
            return roll();
        } else {
            let prevent = 0;
            for (let i = 0; i < bugs; i++) {
                if (roll()) prevent++;
            }
            return prevent;
        }
    }

    tasksQuantity() {
        return _.sum(_.values(this.needs()));
    }

    doneQuantity() {
        return _.sum(_.values(this.done));
    }

    planedTasksQuantity() {
        return _.sum(_.values(this.estimate));
    }

    originalyTasksQuantity() {
        return _.sum(_.values(this.original_estimate));
    }

    isFinished() {
        return this.tasksQuantity() === 0;
    }

    bugsQuantity() {
        return _.sum(_.values(this.bugs));
    }

    isFixed() {
        return this.bugsQuantity() === 0;
    }

    isNeed(roles) {
        let needed = false;
        Object.keys(this.needs()).forEach(skill => {
            if (this.needs(skill) > 0 && roles[skill]) {
                needed = true;
            }
        });
        return needed;
    }

    getNeeds(roles) {
        let needed = {};
        Object.keys(this.needs()).forEach(skill => {
            if (this.needs(skill) > 0 && roles[skill]) {
                needed[skill] = roles[skill];
            }
        });
        return needed;
    }

    getDeadlineText() {
        const { type, deadline } = this;
        return type === "own" ? "Release your project" : `${deadline} hours`;
    }

    fix() {
        this.iteration++;
        this.stage = "fixing";

        _.each(this.bugs, (count, skill) => {
            if (this.estimate[skill] === Number.POSITIVE_INFINITY) this.estimate[skill] = 0;
            this.estimate[skill] += count;
            this.bugs[skill] = 0;
        });

        // this.needs = JSON.parse(JSON.stringify(this.errors));
        //  this.estimate = JSON.parse(JSON.stringify(this.bugs));
        //  this.bugs = JSON.parse(JSON.stringify(skills));
        //this.errors = JSON.parse(JSON.stringify(skills));
        //this.complexity -= (_.sum(_.values(this.needs)));
    }

    getEstimatedReward() {
        if (this.type !== "own") return;

        const project = _.cloneDeep(this);
        let all_top_handler = ProjectsTop.getHandler(getData().simplified_reports);
        let platform_top_handler = all_top_handler.filter("platform", project.platform);
        let kind_top_handler = all_top_handler.filter("kind", project.kind);
        let platform_kind_top_handler = all_top_handler.filter("platform", project.platform).filter("kind", project.kind);

        const getBonus = handler => {
            const top = handler.getTopNumber(project.id);
            if (top === "out of top") {
                return 0;
            }

            const bonus = Math.max(0, 11 - top);
            return bonus;
        };

        let bonus_points =
            getBonus(all_top_handler) * 3 +
            getBonus(platform_top_handler) * 2 +
            getBonus(kind_top_handler) * 2 +
            getBonus(platform_kind_top_handler) * 1;

        bonus_points = Math.max(1, bonus_points);

        return (
            bonus_points * _.sum(_.values(bulkStyler.projectPlatform(bulkStyler.projectKind(project.done, project.kind), project.platform)))
        );
    }

    totalScore() {
        return this.planedTasksQuantity();
    }

    static generate(
        company = "other",
        quality = 1,
        size = 4,
        fit_mode = false,
        kind = _.sample(_.keys(project_kinds)),
        platform = _.sample(getData().projects_unlocked_platforms)
    ) {
        //console.log("gen quality="+quality+", size="+size);
        projects_generated++;

        let stats_bulk = {
            design: this.genStat(quality, size),
            program: this.genStat(quality, size),
            manage: this.genStat(quality, size)
        };

        stats_bulk = bulkStyler.speciality(stats_bulk);
        stats_bulk = bulkStyler.projectKind(stats_bulk, kind);
        stats_bulk = bulkStyler.projectPlatform(stats_bulk, platform);
        switch (fit_mode) {
            case false:
                break;
            case "player":
                stats_bulk = bulkStyler.projectPlayer(stats_bulk);
                break;
            case "team":
                stats_bulk = bulkStyler.projectTeam(stats_bulk);
                break;
            case "history":
                stats_bulk = bulkStyler.projectHistory(stats_bulk);
                break;
            default:
                console.log("Wrong fit mode?");
        }

        let stats = JSON.parse(JSON.stringify(skills));

        if (size !== 4) {
            let pairs = _.toPairs(stats_bulk);
            let sk = pairs.sort(function(a, b) {
                return b[1] - a[1];
            });
            sk = _.keys(_.fromPairs(sk));
            for (let i = 0; i < size; i++) {
                stats[sk[i]] = stats_bulk[sk[i]];
            }
        } else {
            stats = stats_bulk;
        }

        let s = _.values(stats);
        let reward = this.genReward(s, size);
        let penalty = (this.genPenaltyDole(size) * reward).toFixed(0);
        let deadline = this.genDeadline(s, size);

        return new ProjectModel(this.genName(), "project", kind, platform, company, reward, penalty, stats, size, deadline);
    }

    static generateOwnProject(project_name, team, project_platform, project_kind) {
        projects_generated++;

        let stats_bulk = {
            design: Number.POSITIVE_INFINITY,
            program: Number.POSITIVE_INFINITY,
            manage: Number.POSITIVE_INFINITY
        };

        let project = new ProjectModel(
            project_name,
            "own",
            project_kind,
            project_platform,
            "own",
            0,
            0,
            stats_bulk,
            3,
            Number.POSITIVE_INFINITY
        );

        return project;
    }

    static generateStorylineProject(quality, size, company = "other") {
        let bulk = this.generate(company, quality, size, "team");
        bulk.is_storyline = true;
        bulk.hot = true;
        return bulk;
    }

    static genReward(s, size) {
        return 1000 + Math.ceil((_.max(s) + _.sum(s)) * 5 * size);
    }

    static genPenaltyDole(size) {
        return [0, 0, 0.25, 0.5, 1, 0][size];
    }

    static genDeadline(s, size) {
        return (
            48 + Math.floor(((_.max(s) + _.sum(s)) * 3) / size) // constant for anti-weekend effect on small projects
        );
    }

    static generateTraining(worker, skill = null) {
        let level = Math.floor(worker.statsSum() / 4 + worker.stats[skill] * 3);

        let kind = _.sample(_.keys(project_kinds));
        let platform = _.sample(getData().projects_unlocked_platforms);
        let stats = JSON.parse(JSON.stringify(skills));
        stats[skill] = level * 2;
        let reward = 0;
        let penalty = 0;
        let deadline = 100 + level * 10;
        return new ProjectModel(this.genName(), "training", kind, platform, "training", reward, penalty, stats, 0, deadline);
    }

    static generateDraft() {
        let kind = _.sample(_.keys(project_kinds));
        let platform = _.sample(getData().projects_unlocked_platforms);
        let company = _.sample(companies);
        let stats = JSON.parse(JSON.stringify(skills));
        let reward = 0;
        let penalty = 0;
        let deadline = 0;
        return new ProjectModel(this.genName(), "draft", kind, platform, reward, penalty, stats, 0, deadline);
    }

    static generateTrainingHackathon(team) {
        let kind = _.sample(_.keys(project_kinds));
        let platform = _.sample(getData().projects_unlocked_platforms);
        let complexity_grows = 0;

        let stats = JSON.parse(JSON.stringify(skills));

        console.log(team);
        _.each(team, worker => {
            console.log(worker);
            _.each(worker.stats, (value, stat) => {
                stats[stat] += Math.floor(Math.pow(value, 1.5));
            });
        });
        _.each(stats, (val, stat) => {
            console.log(complexity_grows, stats[stat]);
            complexity_grows += stats[stat];
            stats[stat] = Math.floor(Math.pow(stats[stat], 1.5));
        });

        let reward = 0;
        let penalty = 0;
        let deadline = 24 * 5;
        console.log(team.length, complexity_grows);
        let complexity = 10 * team.length + Math.floor(complexity_grows * 0.1);
        return new ProjectModel(this.genName(), "hackathon", kind, platform, reward, penalty, stats, 6, deadline, complexity);
    }

    static generateHackathon(hackathons_generated) {
        let kind = _.sample(_.keys(project_kinds));
        let platform = _.sample(getData().projects_unlocked_platforms);

        let stats = _.mapValues(skills, () => {
            return _.random(0, 10 * hackathons_generated);
        });
        stats = JSON.parse(JSON.stringify(stats));

        let reward = hackathons_generated * 1000;
        let penalty = 0;
        let deadline = 24 * 5;
        let complexity = hackathons_generated * 5;
        return new ProjectModel(this.genName(), "hackathon", kind, platform, reward, penalty, stats, 6, deadline, complexity);
    }

    static generateAgency(agency_state) {
        const size = agency_state.size;

        //console.log(agency_state);
        let stats = _.mapValues(skills, (value, skill) => {
            let stat = _.random(agency_state.min_stats[skill], agency_state.max_stats[skill]);
            //console.log(skill, stat);
            return stat;
        });
        //console.log(stats);

        let kind = _.sample(_.keys(project_kinds));
        let platform = _.sample(getData().projects_unlocked_platforms);
        stats = JSON.parse(JSON.stringify(stats));
        let s = _.values(stats);
        let reward = this.genReward(s, size);
        let penalty = (this.genPenaltyDole(size) * reward).toFixed(0);
        let deadline = this.genDeadline(s, size);
        return new ProjectModel(this.genName(), "project", kind, platform, reward, penalty, stats, size, deadline);
    }

    static genName() {
        var a = ["Ra", "Rap", "Ko", "Si", "Ne", "A", "Q-"];
        var b = ["clo", "ko", "lo", "mo", "no", "tor", "de", "kon"];
        var c = ["pan", "tang", "riko", "nik", "ka", "ia", "lia", "ink"];

        var d = ["Art", "Team", "Sys", "Virt", "Cop"];
        var e = ["tro", "nik", "for", "link", "your"];
        var f = ["ka", "dev", "ops", "ink", "dream"];

        return _.random(0, 1)
            ? _.sample(a) + (_.random(0, 1) ? _.sample(b) : _.sample(c) + _.sample(b)) + (_.random(0, 1) ? _.sample(c) : _.sample(f))
            : _.sample(d) + (_.random(0, 1) ? _.sample(e) : _.sample(f) + _.sample(e)) + (_.random(0, 1) ? _.sample(c) : _.sample(f));
    }

    getName() {
        return project_sizes[this.size].name + " " + this.platform + " " + this.kind + " " + this.name;
    }

    static genStat(quality, size = 1) {
        //console.log(projects_generated);
        let q = Math.floor(quality * size * 0.1);
        let h = _.random(0, quality) * (0 + _.random(1, Math.pow(hired, 2)));
        let d = _.random(0, quality) * (0 + _.random(1, Math.floor(Math.sqrt(projects_done * 2))));
        let g = _.random(0, quality) * (0 + _.random(1, Math.floor(Math.sqrt(projects_generated * 0.1))));
        let r = _.random(1, 10);

        //console.log('gen_stats: q: '+q+' h: '+h+' d: '+d+' g: '+g+' r: '+r);
        return Math.floor(q + h + d + g + r);
    }
}

export default ProjectModel;
