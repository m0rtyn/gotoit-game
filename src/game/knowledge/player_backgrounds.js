import { technologies } from './technologies';
import { workers_bonus_items } from './workers';

export const player_backgrounds = {
  //  autodidact: {name: 'Autodidact', money: 1000, start_tech: ['creativity'], text: 'Inspired researcher, looking own way. Eclectic stats.'},
  //  university: {name: 'Student', money: 5000, start_tech: ['tdd'], text: 'Fundamental education according to verified program. Flat stats.'},
  specialist: {
    name: 'Specialist',
    money: 10000,
    might: 'skill',
    start_tech: ['rad'],
    text:
      'Raised their professional skills to enormous heights and buy some professional stuff.',
    spices: {
      design: {
        name: 'Designer',
        description:
          'Start items: ' +
          workers_bonus_items.design.exp.name +
          ' and ' +
          workers_bonus_items.design.flat.name
      },
      program: {
        name: 'Programmer',
        description:
          'Start items: ' +
          workers_bonus_items.program.exp.name +
          ' and ' +
          workers_bonus_items.program.flat.name
      },
      manage: {
        name: 'Manager',
        description:
          'Start items: ' +
          workers_bonus_items.manage.exp.name +
          ' and ' +
          workers_bonus_items.manage.flat.name
      }
    }
  },
  coworker: {
    name: 'Teamplayer',
    money: 10000,
    might: 'team',
    start_tech: ['pair'],
    text: 'An experienced team player.',
    spices: {
      apprentice: {
        name: 'Apprentice',
        description: 'Your partner is your follower and like you in skills.'
      },
      helpers: {
        name: 'Two helpers',
        description:
          'Your team is two reliable helpers that support your skills.'
      },
      full: {
        name: 'Full team',
        description: 'Your team is three random employees.'
      }
    }
  },
  businessman: {
    name: 'Businessman',
    money: 10000,
    might: 'investment',
    start_tech: ['micromanagement'],
    text: 'Made a fortune doing business.',
    spices: {
      credit: {
        name: 'Credit Rating',
        description:
          'Good credit story increase your credit rating and allow to take addition credit.'
      },
      btc: {
        name: 'BTC savings',
        description: 'Once you bought some bitcoins. Now they are worth a lot.'
      },
      office: {
        name: 'Dream office',
        description:
          "You rented a spacious office and bought a coffeemaker. What's next?"
      }
    }
  }
};
