
export const achievements = {
  bronze_money: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Almost rich',
    rule: (state) => {return state.data.money < 4500}
  },
  silver_meney: {
    rank: 'silver',
    type: 'breakthrough',
    name: 'Almost rich',
    rule: (state) => {return state.data.money < 4000}
  },
  gold_money: {
    rank: 'gold',
    type: 'breakthrough',
    name: 'Almost rich',
    rule: (state) => {return state.data.money < 2000}
  },
  bronze_hired_worker: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Need help',
    rule: (state) => {return state.data.workers.length > 1}
  },
  silver_hired_worker: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Need help',
    rule: (state) => {return state.data.workers.length > 2}
  },
  gold_hired_worker: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Need help',
    rule: (state) => {return state.data.workers.length > 3}
  },
  bronze_project: {
    rank: 'bronze',
    type: 'breakthrough',
    name: 'Work hard',
    rule: (state) => {return state.data.projects.length > 1}
  },
  silver_project: {
    rank: 'silver',
    type: 'breakthrough',
    name: 'Work hard',
    rule: (state) => {return state.data.projects.length > 2}
  },
  gold_project: {
    rank: 'gold',
    type: 'breakthrough',
    name: 'Work hard',
    rule: (state) => {return state.data.projects.length > 3}
  },



  template1: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Example1',
    rule: (state) => {return state.data.money >= 1e5 && state.data.workers.length === 1}
  },
  template2: {
    rank: 'silver',
    type: 'conquest',
    name: 'Example1',
    rule: (state) => {return state.data.money >= 15e4 && state.data.workers.length === 1}
  },
  template3: {
    rank: 'gold',
    type: 'conquest',
    name: 'Example1',
    rule: (state) => {return state.data.money >= 2e5 && state.data.workers.length === 1}
  },
  template4: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Example2',
    rule: (state) => {return state.data.workers.length > 100}
  },
  template5: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Example2',
    rule: (state) => {return state.data.workers.length > 200}
  },
  template6: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Example2',
    rule: (state) => {return state.data.workers.length > 300}
  },
  template7: {
    rank: 'bronze',
    type: 'conquest',
    name: 'Example3',
    rule: (state) => {return state.data.projects.length > 100}
  },
  template8: {
    rank: 'silver',
    type: 'conquesth',
    name: 'Example3',
    rule: (state) => {return state.data.projects.length > 200}
  },
  template9: {
    rank: 'gold',
    type: 'conquest',
    name: 'Example3',
    rule: (state) => {return state.data.projects.length > 300}
  },


  template10: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Example4',
    rule: (state) => {return state.data.money >= 1e5 && state.data.workers.length === 1}
  },
  template11: {
    rank: 'silver',
    type: 'challenge',
    name: 'Example4',
    rule: (state) => {return state.data.money >= 15e4 && state.data.workers.length === 1}
  },
  template12: {
    rank: 'gold',
    type: 'challenge',
    name: 'Example4',
    rule: (state) => {return state.data.money >= 2e5 && state.data.workers.length === 1}
  },
  template13: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Example5',
    rule: (state) => {return state.data.workers.length > 100}
  },
  template14: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Example5',
    rule: (state) => {return state.data.workers.length > 200}
  },
  template15: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Example5',
    rule: (state) => {return state.data.workers.length > 300}
  },
  template16: {
    rank: 'bronze',
    type: 'challenge',
    name: 'Example6',
    rule: (state) => {return state.data.projects.length > 100}
  },
  template17: {
    rank: 'silver',
    type: 'challenge',
    name: 'Example6',
    rule: (state) => {return state.data.projects.length > 200}
  },
  template18: {
    rank: 'gold',
    type: 'challenge',
    name: 'Example6',
    rule: (state) => {return state.data.projects.length > 300}
  }
}

//types: breakthrough :: conquest :: challenge