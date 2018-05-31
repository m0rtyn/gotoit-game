
export const achievements = {

    // achievements types: breakthrough :: conquest :: challenge

    // Breakthrough

    bronze_team_player: {
        rank: 'bronze',
        type: 'breakthrough',
        name: 'Need help',
        rule: (state) => {return state.data.workers.length === 4}
    },
    silver_team_player: {
        rank: 'silver',
        type: 'breakthrough',
        name: 'Need help',
        rule: (state) => {return state.data.workers.length === 7}
    },
    gold_team_palyer: {
        rank: 'gold',
        type: 'breakthrough',
        name: 'Need help',
        rule: (state) => {return state.data.workers.length === 10}
    },
    bronze_money_maker: {
        rank: 'bronze',
        type: 'breakthrough',
        name: 'Money maker',
        rule: (state) => {return state.data.money >= 2e4}
    },
    silver_money_maker: {
        rank: 'bronze',
        type: 'breakthrough',
        name: 'Money maker',
        rule: (state) => {return state.data.money >= 5e4}
    },
    gold_money_maker: {
        rank: 'bronze',
        type: 'breakthrough',
        name: 'Money maker',
        rule: (state) => {return state.data.money >= 1e5}
    },
    bronze_small_credit: {
        rank: 'bronze',
        type: 'breakthrough',
        name: 'Diligent payer',
        rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Small Credit"})}
    },
    silver_medium_credit: {
        rank: 'silver',
        type: 'breakthrough',
        name: 'Diligent payer',
        rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Medium Credit"})}
    },
    gold_big_credit: {
        rank: 'gold',
        type: 'breakthrough',
        name: 'Diligent payer',
        rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Big Credit"})}
    },

    // Conquest

    bronze_project_destroyer: {
        rank: 'bronze',
        type: 'conquest',
        name: 'Project destroyer',
        rule: (state) => {
            let projects_counter = 0
            state.data.projects_archive_reports.map((project) => {
                if (project.stage === 'finish' && project.size === 1) projects_counter++
            });
            return projects_counter >= 100
        }
    },
    silver_project_destroyer: {
        rank: 'silver',
        type: 'conquest',
        name: 'Project destroyer',
        rule: (state) => {
            let projects_counter = 0
            state.data.projects_archive_reports.map((project) => {
                if (project.stage === 'finish' && project.size === 2) projects_counter++
            });
            return projects_counter >= 100
        }
    },
    gold_project_destroyer: {
        rank: 'gold',
        type: 'conquest',
        name: 'Project destroyer',
        rule: (state) => {
          let projects_counter = 0
          state.data.projects_archive_reports.map((project) => {
              if (project.stage === 'finish' && (project.size === 3 || project.size === 4)) projects_counter++
          });
          return projects_counter >= 100
        }
    },
    bronze_almost_rich: {
        rank: 'bronze',
        type: 'conquest',
        name: 'Almost rich',
        rule: (state) => {return state.data.money >= 2e5}
    },
    silver_almost_rich: {
        rank: 'silver',
        type: 'conquest',
        name: 'Almost rich',
        rule: (state) => {return state.data.money >= 5e5}
    },
    gold_almost_rich: {
        rank: 'gold',
        type: 'conquest',
        name: 'Almost rich',
        rule: (state) => {return state.data.money >= 1e6}
    },
    bronze_user_quests: {
        rank: 'bronze',
        type: 'conquest',
        name: 'T.B.D. user quests',
        rule: (state) => {return false}
    },
    silver_user_quests: {
        rank: 'silver',
        type: 'conquesth',
        name: 'T.B.D. user quests',
        rule: (state) => {return false}
    },
    gold_user_quests: {
        rank: 'gold',
        type: 'conquest',
        name: 'T.B.D. user quests',
        rule: (state) => {return false}
    },

    // Challanges

    bronze_solo_player: {
        rank: 'bronze',
        type: 'challenge',
        name: 'Solo player',
        rule: (state) => {return state.data.money >= 2e5 && state.data.workers.length === 1}
    },
    silver_solo_player: {
        rank: 'silver',
        type: 'challenge',
        name: 'Solo player',
        rule: (state) => {return state.data.money >= 5e5 && state.data.workers.length === 1}
    },
    gold_solo_player: {
        rank: 'gold',
        type: 'challenge',
        name: 'Solo player',
        rule: (state) => {return state.data.money >= 1e6 && state.data.workers.length === 1}
    },
    bronze_customers_hater: {
        rank: 'bronze',
        type: 'challenge',
        name: 'Customers hater',
        rule: (state) => {
            if (state.data.money >= 2e5) {
                return state.data.projects_archive_reports.every((project) => {
                    return project.type === 'own' && project.stage === 'finish'
                });
            } else {
                return false
            }
        }
    },
    silver_customers_hater: {
        rank: 'bronze',
        type: 'challenge',
        name: 'Customers hater',
        rule: (state) => {
            if (state.data.money >= 5e5) {
                return state.data.projects_archive_reports.every((project) => {
                    return project.type === 'own' && project.stage === 'finish'
                });
            } else {
                return false
            }
        }
    },
    gold_customers_hater: {
        rank: 'bronze',
        type: 'challenge',
        name: 'Customers hater',
        rule: (state) => {
            if (state.data.money >= 1e6) {
                return state.data.projects_archive_reports.every((project) => {
                    return project.type === 'own' && project.stage === 'finish'
                });
            } else {
                return false
            }
        }
    },
    bronze_lazy_one: {
        rank: 'bronze',
        type: 'challenge',
        name: 'Lazy one',
        rule: (state) => {
            if (state.data.money >= 2e5) {
                return state.data.workers[0].facts.tasks_done === 0
            }
        }
    },
    silver_lazy_one: {
        rank: 'silver',
        type: 'challenge',
        name: 'Lazy one',
        rule: (state) => {
            if (state.data.money >= 5e5) {
                return state.data.workers[0].facts.tasks_done === 0
            }
        }
    },
    gold_lazy_one: {
        rank: 'gold',
        type: 'challenge',
        name: 'Lazy one',
        rule: (state) => {
            if (state.data.money >= 1e6) {
                return state.data.workers[0].facts.tasks_done === 0
            }
        }
    }
};