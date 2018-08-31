import _ from "lodash";

import { getData } from "../App";

import { skills } from "../game/knowledge/skills";

class bulkStyler {
    static speciality(stats_bulk) {
        let speciality = ["none", "specialist", "dualist"][_.random(0, 2)];
        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats_bulk[b] - stats_bulk[a];
        });

        switch (speciality) {
            case "none":
                stats_bulk[order[0]] *= 0.7;
                stats_bulk[order[1]] *= 1;
                stats_bulk[order[2]] *= 1.3;
                break;
            case "specialist":
                stats_bulk[order[0]] *= 2;
                stats_bulk[order[1]] *= 0.5;
                stats_bulk[order[2]] *= 0.5;
                break;
            case "dualist":
                stats_bulk[order[0]] *= 1.5;
                stats_bulk[order[1]] *= 1.5;
                stats_bulk[order[2]] *= 0.5;
                break;
            default:
                console.log("error case: " + speciality);
        }
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }

    static playerBackground(stats_bulk, background) {
        // let order = Object.keys(stats_bulk).sort(function(a,b){return stats_bulk[b]-stats_bulk[a]});
        let order = _.shuffle(Object.keys(stats_bulk)); //.sort(function(a,b){return stats_bulk[b]-stats_bulk[a]});

        switch (background) {
            case "specialist": // med like 10
                stats_bulk[order[0]] += 2;
                stats_bulk[order[1]] += 2;
                stats_bulk[order[2]] += 2;
                break;
            case "coworker": // low like 7
                stats_bulk[order[0]] += 2;
                stats_bulk[order[1]] += 2;
                stats_bulk[order[2]] += 2;
                break;
            case "businessman": // low like 4
                stats_bulk[order[0]] += 2;
                stats_bulk[order[1]] += 2;
                stats_bulk[order[2]] += 2;
                break;
            default:
                console.log("error case: " + background);
        }
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }

    static playerSpeciality(stats_bulk, speciality) {
        switch (speciality) {
            case "design":
                stats_bulk["design"] += 3;
                break;
            case "manage":
                stats_bulk["manage"] += 3;
                break;
            case "program":
                stats_bulk["program"] += 3;
                break;
            default:
                console.log("error case: " + speciality);
        }
        return stats_bulk; //_.mapValues(stats_bulk, function (stat) { return Math.ceil(stat); });
    }

    static partnerSpeciality(stats_bulk, speciality) {
        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats_bulk[b] - stats_bulk[a];
        });
        //let order = _.shuffle(Object.keys(stats_bulk)); //.sort(function(a,b){return stats_bulk[b]-stats_bulk[a]});

        switch (speciality) {
            case "apprentice":
                stats_bulk[order[0]] += -1;
                stats_bulk[order[1]] += -1;
                stats_bulk[order[2]] += -1;
                break;
            case "partner":
                stats_bulk[order[0]] += -3;
                stats_bulk[order[1]] += -3;
                stats_bulk[order[2]] += 1;
                break;
            case "helper1":
                stats_bulk[order[0]] += -1;
                stats_bulk[order[1]] += -3;
                stats_bulk[order[2]] += -1;
                break;
            case "helper2":
                stats_bulk[order[0]] += -3;
                stats_bulk[order[1]] += -1;
                stats_bulk[order[2]] += -1;
                break;
            default:
                console.log("error case: " + speciality);
        }
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }

    static projectKind(stats_bulk, kind) {
        switch (kind) {
            case "application":
                return stats_bulk;
            case "game":
                stats_bulk["design"] *= 2;
                stats_bulk["manage"] *= 0.5;
                stats_bulk["program"] *= 1;
                break;
            case "site":
                stats_bulk["design"] *= 2;
                stats_bulk["manage"] *= 1;
                stats_bulk["program"] *= 0.5;
                break;
            case "editor":
                stats_bulk["design"] *= 1;
                stats_bulk["manage"] *= 0.5;
                stats_bulk["program"] *= 2;
                break;
            case "magazine":
                stats_bulk["design"] *= 1;
                stats_bulk["manage"] *= 2;
                stats_bulk["program"] *= 0.5;
                break;
            case "service":
                stats_bulk["design"] *= 0.5;
                stats_bulk["manage"] *= 2;
                stats_bulk["program"] *= 1;
                break;
            case "database":
                stats_bulk["design"] *= 0.5;
                stats_bulk["manage"] *= 1;
                stats_bulk["program"] *= 2;
                break;
            default:
                console.log("error case: " + kind);
        }
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }

    static projectPlatform(stats_bulk, platform) {
        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats_bulk[b] - stats_bulk[a];
        });

        switch (platform) {
            case "crossplatform":
                return stats_bulk;
            case "VR":
                return stats_bulk;
            case "mobile":
                stats_bulk[order[0]] *= 1.5;
                stats_bulk[order[1]] *= 2;
                stats_bulk[order[2]] *= 0.5;
                stats_bulk["design"] *= 2;
                break;
            case "browser":
                stats_bulk[order[0]] *= 0.5;
                stats_bulk[order[1]] *= 1.5;
                stats_bulk[order[2]] *= 2;
                stats_bulk["manage"] *= 2;
                break;
            case "desktop":
                stats_bulk[order[0]] *= 2;
                stats_bulk[order[1]] *= 0.5;
                stats_bulk[order[2]] *= 1.5;
                stats_bulk["program"] *= 2;
                break;
            default:
                console.log("error case: " + platform);
        }
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }

    static projectPlayer(stats_bulk) {
        // TO DO
        //let worker = _.find(data.workers, (id) => { return (worker_id === id); });
        //let player = _.find(getData().workers, (id) => { return ("player" === id); });
        //console.log(getData().workers, getData().workers[0], player);

        let player = getData().workers[0];
        let stats = player.stats;
        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats[b] - stats[a];
        });

        return this.styleBulk(stats_bulk, order);
    }

    static projectTeam(stats_bulk) {
        // TO DO
        let workers = getData().workers;
        let stats = JSON.parse(JSON.stringify(skills));

        _.each(workers, worker => {
            _.each(worker.stats, (val, stat) => {
                stats[stat] += val;
            });
        });

        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats[b] - stats[a];
        });

        return this.styleBulk(stats_bulk, order);
    }

    static projectHistory(stats_bulk) {
        // TO DO
        if (getData().projects_archive_reports.length === 0) {
            return stats_bulk;
        }

        let projects = getData().projects_archive_reports;
        let stats = JSON.parse(JSON.stringify(skills));

        _.each(projects, project => {
            if (project.stage === "finish") {
                _.each(project.original_estimate, (val, stat) => {
                    stats[stat] += val;
                });
            }
        });

        let order = Object.keys(stats_bulk).sort(function(a, b) {
            return stats[b] - stats[a];
        });

        return this.styleBulk(stats_bulk, order);
    }

    static styleBulk(stats_bulk, order) {
        //    console.log(stats_bulk, order);
        stats_bulk[order[0]] *= 2;
        stats_bulk[order[1]] *= 1;
        stats_bulk[order[3]] *= 0.5;
        //    console.log(stats_bulk);
        return _.mapValues(stats_bulk, function(stat) {
            return Math.ceil(stat);
        });
    }
}

export default bulkStyler;
