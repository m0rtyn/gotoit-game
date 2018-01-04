
import _ from 'lodash';

export const skills = {design: 0, manage: 0, program: 0, admin: 0};
export const skills_1 = _.mapValues(skills, () => { return 1; });
export const skills_true = _.mapValues(skills, () => { return true; });
export const skills_false = _.mapValues(skills, () => { return false; });
export const skills_names = _.keys(skills);


export const roles = {
    design: {name: 'Design', profession_name: 'Designer', description: 'Design'},
    program: {name: 'Programming', profession_name: 'Programmer', description: 'Programming'},
    manage: {name: 'Management', profession_name: 'Manager', description: 'Management'},
    admin: {name: 'Administrating', profession_name: 'Administrator', description: "Administrating"}
};


export const project_platforms = {
    crossplatform: {name: 'Cross-platform'},
    mobile: {name: 'Mobile'},
    browser: {name: 'Browser'},
    desktop: {name: 'Desktop'},
    embedded: {name: 'Embedded'}
};

export const project_kinds = {
    application: {name: 'Application'},
    game: {name: 'Game'},
    service: {name: 'Service'},
    system: {name: 'System'},
    database: {name: 'Database'}
};

export const project_sizes = {
    0: {name: 'Training', alone_name: 'Training', agency_min: 0,  agency_max: 0},
    1: {name: 'Parts for', alone_name: 'Part', agency_min: 0,  agency_max: 500},
    2: {name: 'Module for', alone_name: 'Module', agency_min: 50,  agency_max: 1000},
    3: {name: 'The', alone_name: 'Application', agency_min: 100,  agency_max: 2500},
    4: {name: 'Big', alone_name: 'Big Deal', agency_min: 1000,  agency_max: 10000},
    5: {name: 'Custom', alone_name: 'Custom', agency_min: 0,  agency_max: 0},
    6: {name: 'Hackathon', alone_name: 'Hackathon', agency_min: 0,  agency_max: 0},
};


export const technologies = {
    overtime: {name: 'Overtime Work', acronym: 'Over', price: 0, description: 'Overtime helps to finish project on time but exhausts team.'},

    rad: {name: 'Rapid Development', acronym: 'RAD', price: 10000, description: 'Faster Development at the cost of increasing complexity.'},
    creativity: {name: 'Creativity boost', acronym: 'Free', price: 10000, description: "Every fifth working hour is given to pet projects that boost experience."},
    tdd: {name: 'Test Driven Development', acronym: 'TDD', price: 10000, description: 'Developing tests that reduce the probability of errors.'},
    refactoring: {name: 'Non-stop refactoring', acronym: 'Ref', price: 10000, description: "The complexity of the code - it's just a task for refactoring."},

    pair: {name: 'Pair Programming', acronym: 'Pair', price: 25000, description: 'Working in tandem allows us to solve complex problems and sharing experience.'},
    micromanagement: {name: 'Micromanagement', acronym: 'Micro', price: 25000, description: 'Solid control is averaging performance and work visiting.'},
    agile: {name: 'Agile Development', acronym: 'Agile', price: 25000, description: 'Focus on priority and lower the cost of the project by cutting out unnecessary tasks.'}
};


export const education = {
    training: {name: 'Training Project', hide: false, description: ''},
    hackathon: {name: 'Hackathon', hide: true, description: ''},
    university: {name: 'University', hide: true, description: ''},
    workshop: {name: 'Workshop', hide: true, description: ''}
};

export const workers_bonus_items = {
    design: {
        exp: {name: 'Sketchbook', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Tablet', money: 2500, bonus: 10, description: 'add 10 to skill'},
        percent: {name: '4K Monitor', money: 10000, bonus: 10, description: 'add 10% to skill'}
    },
    program: {
        exp: {name: 'IDE', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Laptop', money: 2500, bonus: 10, description: 'add 10 to skill'},
        percent: {name: 'CI Server', money: 10000, bonus: 10, description: 'add 10% to skill'}
    },
    manage: {
        exp: {name: 'Phone', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Bug tracker', money: 2500, bonus: 10, description: 'add 10 to skill'},
        percent: {name: 'ERP System', money: 10000, bonus: 10, description: 'add 10% to skill'}
    },
    admin: {
        exp: {name: 'Virtual Server', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Netbook', money: 2500, bonus: 10, description: 'add 10 to skill'},
        percent: {name: 'Test Network', money: 10000, bonus: 10, description: 'add 10% to skill'}
    }
};

export const player_backgrounds = {
  //  autodidact: {name: 'Autodidact', money: 1000, start_tech: ['creativity'], text: 'Inspired researcher, looking own way. Eclectic stats.'},
  //  university: {name: 'Student', money: 5000, start_tech: ['tdd'], text: 'Fundamental education according to verified program. Flat stats.'},
    technologist: {name: 'Technologist', money: 5000, start_tech: ['rad', 'creativity', 'tdd', 'refactoring'], text: 'Has a wide range of start technology.'},
    specialist: {name: 'Specialist', money: 5000, start_tech: ['agile'], text: 'Raised their professional skills to enormous heights.'},
    coworker: {name: 'Teamplayer', money: 5000, start_tech: ['pair'], text: 'Works with the Partner, covering each other.'},
    businessman: {name: 'Businessman', money: 5000, start_tech: ['micromanagement'], text: 'Made a fortune doing business. Good credit story.'}
};

export const player_tech = {
    rad: {name: 'Rapid Development'},
    creativity: {name: 'Creativity boost'},
    tdd: {name: 'Test Driven Development'},
    refactoring: {name: 'Non-stop refactoring'}
};

export const player_specialities = {
    design: {name: 'Designer'},
    program: {name: 'Programmer'},
    manage: {name: 'Manager'},
    admin: {name: 'Administrator'}
};

export const player_teams = {
    apprentice: {name: 'Apprentice', description: 'Your partner is your follower and like you in skills.'},
    partner: {name: 'Partner', description: 'Your partner is your complete opposite and covers your weaknesses.'},
    helpers: {name: 'Two helpers', description: 'Your team is two reliable helpers that cover your weaknesses.'},
    full: {name: 'Full team', description: 'Your team is three random employees.'}
};


export const offices = {
    1: {size: 1, space: 1, price: 0,     name: 'Sweet Home', text: ''},
    2: {size: 2, space: 4, price: 500,   name: 'Garage Startup', text: ''},
    3: {size: 3, space: 7, price: 2500,  name: 'Busy Header', text: ''},
    4: {size: 4, space: 10, price: 10000, name: 'AAA Studio', text: ''}
};

export const loans = {
    1: {size: 1, money: 5000, interest: 40, time: 3, open_after_tick: 24*30, min_credit_score: 300, name: 'Small Credit', text: ''},
    2: {size: 2, money: 10000, interest: 30, time: 6, open_after_tick: 24*30*6, min_credit_score: 500, name: 'Medium Credit', text: ''},
    3: {size: 3, money: 25000, interest: 20, time: 12, open_after_tick: 24*30*12, min_credit_score: 700, name: 'Big Credit', text: ''},
};

export default {};
