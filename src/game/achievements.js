
export const achievements = {

  // achievements types: breakthrough :: conquest :: challenge

  // Breakthrough

  bronze_team_player: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Need help',
    text: 'Hire 3 employees to your team at the same time.',
    rule: (state) => {return state.data.workers.length === 4}
  },
  silver_team_player: {
    rank: 'silver',
    type: 'breakthrough',
    name: 'Need help',
    text: 'Hire 6 employees to your team at the same time.',
    rule: (state) => {return state.data.workers.length === 7}
  },
  gold_team_palyer: {
    rank: 'gold',
    type: 'breakthrough',
    name: 'Need help',
    text: 'Hire 9 employees to your team at the same time.',
    rule: (state) => {return state.data.workers.length === 10}
  },
  bronze_money_maker: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Money maker',
    text: 'All you need is just to earn 20 thousand.',
    rule: (state) => {return state.data.money >= 2e4}
  },
  silver_money_maker: {
    rank: 'silver',
    type: 'breakthrough',
    name: 'Money maker',
    text: 'All you need is just to earn 50 thousand.',
    rule: (state) => {return state.data.money >= 5e4}
  },
  gold_money_maker: {
    rank: 'gold',
    type: 'breakthrough',
    name: 'Money maker',
    text: 'All you need is just to earn 100 thousand.',
    rule: (state) => {return state.data.money >= 1e5}
  },
  bronze_small_credit: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Diligent payer',
    text: 'Problems with money? Just take a small loan and pay it on time.',
    rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Small Credit"})}
  },
  silver_medium_credit: {
    rank: 'silver',
    type: 'breakthrough',
    name: 'Diligent payer',
    text: 'Problems with money? Just take a medium loan and pay it on time.',
    rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Medium Credit"})}
  },
  gold_big_credit: {
    rank: 'gold',
    type: 'breakthrough',
    name: 'Diligent payer',
    text: 'Problems with money? Just take a big loan and pay it on time.',
    rule: (state) => {return state.data.old_loans.some((credit) => {return credit.name === "Big Credit"})}
  },

  // Conquest

  bronze_project_destroyer: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Project destroyer',
    text: 'Accomplish 100 small projects.',
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
    text: 'Accomplish 100 medium projects.',
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
    text: 'Accomplish 100 big projects.',
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
    text: 'You will need to use all your financial skills and earn 200 thousand.',
    rule: (state) => {return state.data.money >= 2e5}
  },
  silver_almost_rich: {
    rank: 'silver',
    type: 'conquest',
    name: 'Almost rich',
    text: 'You will need to use all your financial skills and earn 500 thousand.',
    rule: (state) => {return state.data.money >= 5e5}
  },
  gold_almost_rich: {
    rank: 'gold',
    type: 'conquest',
    name: 'Almost rich',
    text: 'You will need to use all your financial skills and earn 1 million.',
    rule: (state) => {return state.data.money >= 1e6}
  },
  bronze_user_quests: {
    rank: 'bronze',
    type: 'conquest',
    name: 'T.B.D. user quests',
    text: 'Perform quests - get achievements.',
    rule: (state) => {return false}
  },
  silver_user_quests: {
    rank: 'silver',
    type: 'conquesth',
    name: 'T.B.D. user quests',
    text: 'Perform quests - get achievements.',
    rule: (state) => {return false}
  },
  gold_user_quests: {
    rank: 'gold',
    type: 'conquest',
    name: 'T.B.D. user quests',
    text: 'Perform quests - get achievements.',
    rule: (state) => {return false}
  },

  // Challanges

  bronze_solo_player: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Solo player',
    text: 'Do you like to work alone? Then just earn 200 thousands without hiring employees.',
    rule: (state) => {return state.data.money >= 2e5 && state.data.workers.length === 1}
  },
  silver_solo_player: {
    rank: 'silver',
    type: 'challenge',
    name: 'Solo player',
    text: 'Do you like to work alone? Then just earn 500 thousands without hiring employees.',
    rule: (state) => {return state.data.money >= 5e5 && state.data.workers.length === 1}
  },
  gold_solo_player: {
    rank: 'gold',
    type: 'challenge',
    name: 'Solo player',
    text: 'Do you like to work alone? Then just earn 1 million without hiring employees.',
    rule: (state) => {return state.data.money >= 1e6 && state.data.workers.length === 1}
  },
  bronze_customers_hater: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Customers hater',
    text: 'Earn 200 thousands by doing only your own projects.',
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
    rank: 'silver',
    type: 'challenge',
    name: 'Customers hater',
    text: 'Earn 500 thousands by doing only your own projects.',
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
    rank: 'gold',
    type: 'challenge',
    name: 'Customers hater',
    text: 'Earn 1 million by doing only your own projects.',
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
    text: 'Earn 200 thousand shifting all work to your employees.',
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
    text: 'Earn 500 thousand shifting all work to your employees.',
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
    text: 'Earn 1 million shifting all work to your employees.',
    rule: (state) => {
      if (state.data.money >= 1e6) {
        return state.data.workers[0].facts.tasks_done === 0
      }
    }
  }
};