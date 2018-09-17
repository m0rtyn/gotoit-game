import bronze_team_player from "../../assets/images/achievements/bronze_team_player.png";
import silver_team_player from "../../assets/images/achievements/silver_team_player.png";
import gold_team_player from "../../assets/images/achievements/gold_team_player.png";
import bronze_money_maker from "../../assets/images/achievements/bronze_money_maker.png";
import silver_money_maker from "../../assets/images/achievements/silver_money_maker.png";
import gold_money_maker from "../../assets/images/achievements/gold_money_maker.png";
import bronze_need_help from "../../assets/images/achievements/bronze_need_help.png";
import silver_need_help from "../../assets/images/achievements/silver_need_help.png";
import gold_need_help from "../../assets/images/achievements/gold_need_help.png";

import bronze_things_done from "../../assets/images/achievements/bronze_things_done.png";
import silver_things_done from "../../assets/images/achievements/silver_things_done.png";
import gold_things_done from "../../assets/images/achievements/gold_things_done.png";
import bronze_almost_rich from "../../assets/images/achievements/bronze_almost_rich.png";
import silver_almost_rich from "../../assets/images/achievements/silver_almost_rich.png";
import gold_almost_rich from "../../assets/images/achievements/gold_almost_rich.png";
import bronze_dreams from "../../assets/images/achievements/bronze_dreams.png";
import silver_dreams from "../../assets/images/achievements/silver_dreams.png";
import gold_dreams from "../../assets/images/achievements/gold_dreams.png";

import bronze_solo_player from "../../assets/images/achievements/bronze_solo_player.png";
import silver_solo_player from "../../assets/images/achievements/silver_solo_player.png";
import gold_solo_player from "../../assets/images/achievements/gold_solo_player.png";
import bronze_bicycle from "../../assets/images/achievements/bronze_bicycle.png";
import silver_bicycle from "../../assets/images/achievements/silver_bicycle.png";
import gold_bicycle from "../../assets/images/achievements/gold_bicycle.png";
import bronze_top_projects from "../../assets/images/achievements/bronze_top_projects.png";
import silver_top_projects from "../../assets/images/achievements/silver_top_projects.png";
import gold_top_projects from "../../assets/images/achievements/gold_top_projects.png";

import _ from "lodash";

export const achievements = {
    // achievements types: breakthrough :: conquest :: challenge

    // Breakthrough

    bronze_team_player: {
        rank: "bronze",
        type: "breakthrough",
        name: "Team player",
        text: "Hire 3 employees to your team at the same time.",
        icon: bronze_team_player,
        rule: state => {
            return state.data.workers.length === 4;
        }
    },
    silver_team_player: {
        rank: "silver",
        type: "breakthrough",
        name: "Team player",
        text: "Hire 6 employees to your team at the same time.",
        icon: silver_team_player,
        rule: state => {
            return state.data.workers.length === 7;
        }
    },
    gold_team_palyer: {
        rank: "gold",
        type: "breakthrough",
        name: "Team player",
        text: "Hire 9 employees to your team at the same time.",
        icon: gold_team_player,
        rule: state => {
            return state.data.workers.length === 10;
        }
    },
    bronze_money_maker: {
        rank: "bronze",
        type: "breakthrough",
        name: "Money maker",
        text: "All you need is just to earn 20 thousand.",
        icon: bronze_money_maker,
        rule: state => {
            return state.data.money >= 2e4;
        }
    },
    silver_money_maker: {
        rank: "silver",
        type: "breakthrough",
        name: "Money maker",
        text: "All you need is just to earn 50 thousand.",
        icon: silver_money_maker,
        rule: state => {
            return state.data.money >= 5e4;
        }
    },
    gold_money_maker: {
        rank: "gold",
        type: "breakthrough",
        name: "Money maker",
        text: "All you need is just to earn 100 thousand.",
        icon: gold_money_maker,
        rule: state => {
            return state.data.money >= 1e5;
        }
    },
    bronze_need_help: {
        rank: "bronze",
        type: "breakthrough",
        name: "Need help",
        text: "Problems with money? Just take a small loan and pay it on time.",
        icon: bronze_need_help,
        rule: state => {
            return state.data.old_loans.some(credit => {
                return credit.name === "Small Credit";
            });
        }
    },
    silver_need_help: {
        rank: "silver",
        type: "breakthrough",
        name: "Need help",
        text: "Problems with money? Just take a medium loan and pay it on time.",
        icon: silver_need_help,
        rule: state => {
            return state.data.old_loans.some(credit => {
                return credit.name === "Medium Credit";
            });
        }
    },
    gold_need_help: {
        rank: "gold",
        type: "breakthrough",
        name: "Need help",
        text: "Problems with money? Just take a big loan and pay it on time.",
        icon: gold_need_help,
        rule: state => {
            return state.data.old_loans.some(credit => {
                return credit.name === "Big Credit";
            });
        }
    },

    // Conquest

    bronze_things_done: {
        rank: "bronze",
        type: "conquest",
        name: "Things done",
        text: "Accomplish 100 small projects.",
        icon: bronze_things_done,
        rule: state => {
            let projects_counter = 0;
            state.data.projects_archive_reports.forEach(project => {
                if (project.stage === "finish" && project.size === 1) projects_counter++;
            });
            return projects_counter >= 100;
        }
    },
    silver_things_done: {
        rank: "silver",
        type: "conquest",
        name: "Things done",
        text: "Accomplish 100 medium projects.",
        icon: silver_things_done,
        rule: state => {
            let projects_counter = 0;
            state.data.projects_archive_reports.forEach(project => {
                if (project.stage === "finish" && project.size === 2) projects_counter++;
            });
            return projects_counter >= 100;
        }
    },
    gold_things_done: {
        rank: "gold",
        type: "conquest",
        name: "Things done",
        text: "Accomplish 100 big projects.",
        icon: gold_things_done,
        rule: state => {
            let projects_counter = 0;
            state.data.projects_archive_reports.forEach(project => {
                if (project.stage === "finish" && (project.size === 3 || project.size === 4)) projects_counter++;
            });
            return projects_counter >= 100;
        }
    },
    bronze_almost_rich: {
        rank: "bronze",
        type: "conquest",
        name: "Almost rich",
        text: "You will need to use all your financial skills and earn 200 thousand.",
        icon: bronze_almost_rich,
        rule: state => {
            return state.data.money >= 2e5;
        }
    },
    silver_almost_rich: {
        rank: "silver",
        type: "conquest",
        name: "Almost rich",
        text: "You will need to use all your financial skills and earn 500 thousand.",
        icon: silver_almost_rich,
        rule: state => {
            return state.data.money >= 5e5;
        }
    },
    gold_almost_rich: {
        rank: "gold",
        type: "conquest",
        name: "Almost rich",
        text: "You will need to use all your financial skills and earn 1 million.",
        icon: gold_almost_rich,
        rule: state => {
            return state.data.money >= 1e6;
        }
    },
    bronze_dreams: {
        rank: "bronze",
        type: "conquest",
        name: "Benefactor",
        text: "Fulfiil the dreams of your employees.",
        icon: bronze_dreams,
        rule: state => {
            const data = state.data;
            const fulfilled_dreams_list = data.workers.map(worker => {
                return worker.dreams_come_true;
            });

            return _.sum(fulfilled_dreams_list) >= 10;
        }
    },
    silver_dreams: {
        rank: "silver",
        type: "conquesth",
        name: "Benefactor",
        text: "Fulfiil the dreams of your employees.",
        icon: silver_dreams,
        rule: state => {
            const data = state.data;
            const fulfilled_dreams_list = data.workers.map(worker => {
                return worker.dreams_come_true;
            });

            return _.sum(fulfilled_dreams_list) >= 25;
        }
    },
    gold_dreams: {
        rank: "gold",
        type: "conquest",
        name: "Benefactor",
        text: "Fulfiil the dreams of your employees.",
        icon: gold_dreams,
        rule: state => {
            const data = state.data;
            const fulfilled_dreams_list = data.workers.map(worker => {
                return worker.dreams_come_true;
            });

            return _.sum(fulfilled_dreams_list) >= 100;
        }
    },

    // Challanges

    bronze_solo_player: {
        rank: "bronze",
        type: "challenge",
        name: "Solo player",
        text: "Do you like to work alone? Then just earn 200 thousands without hiring employees.",
        icon: bronze_solo_player,
        rule: state => {
            return state.data.money >= 2e5 && state.data.workers.length === 1;
        }
    },
    silver_solo_player: {
        rank: "silver",
        type: "challenge",
        name: "Solo player",
        text: "Do you like to work alone? Then just earn 500 thousands without hiring employees.",
        icon: silver_solo_player,
        rule: state => {
            return state.data.money >= 5e5 && state.data.workers.length === 1;
        }
    },
    gold_solo_player: {
        rank: "gold",
        type: "challenge",
        name: "Solo player",
        text: "Do you like to work alone? Then just earn 1 million without hiring employees.",
        icon: gold_solo_player,
        rule: state => {
            return state.data.money >= 1e6 && state.data.workers.length === 1;
        }
    },
    bronze_bicycle: {
        rank: "bronze",
        type: "challenge",
        name: "Build a bicycle",
        text: "Earn 200 thousands by doing only your own projects.",
        icon: bronze_bicycle,
        rule: state => {
            if (state.data.money >= 2e5) {
                return state.data.projects_archive_reports.every(project => {
                    return project.type === "own" && project.stage === "finish";
                });
            } else {
                return false;
            }
        }
    },
    silver_bicycle: {
        rank: "silver",
        type: "challenge",
        name: "Build a bicycle",
        text: "Earn 500 thousands by doing only your own projects.",
        icon: silver_bicycle,
        rule: state => {
            if (state.data.money >= 5e5) {
                return state.data.projects_archive_reports.every(project => {
                    return project.type === "own" && project.stage === "finish";
                });
            } else {
                return false;
            }
        }
    },
    gold_bicycle: {
        rank: "gold",
        type: "challenge",
        name: "Build a bicycle",
        text: "Earn 1 million by doing only your own projects.",
        icon: gold_bicycle,
        rule: state => {
            if (state.data.money >= 1e6) {
                return state.data.projects_archive_reports.every(project => {
                    return project.type === "own" && project.stage === "finish";
                });
            } else {
                return false;
            }
        }
    },
    bronze_top_projects: {
        rank: "bronze",
        type: "challenge",
        name: "Top quality",
        text: "Create 1 project that will take the top place in the market.",
        icon: bronze_top_projects,
        rule: state => {
            return state.data.top_projects_finished >= 1;
        }
    },
    silver_top_projects: {
        rank: "silver",
        type: "challenge",
        name: "Top quality",
        text: "Create 10 projects that will take the top place in the market.",
        icon: silver_top_projects,
        rule: state => {
            return state.data.top_projects_finished >= 10;
        }
    },
    gold_top_projects: {
        rank: "gold",
        type: "challenge",
        name: "Top quality",
        text: "Create 100 projects that will take the top place in the market.",
        icon: gold_top_projects,
        rule: state => {
            return state.data.top_projects_finished >= 100;
        }
    }
};
