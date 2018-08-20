export const meetings = {
  fire: {
    name: 'Firefighting',
    deadline: 1,
    max_bonus: 4,
    description:
      'Urgent overtime for several hours to solve a critical problem.'
  },
  test: {
    name: 'Mass Test',
    deadline: 8,
    max_bonus: 168,
    description: 'Mass testing will help to write tests twice often.'
  },
  review: {
    name: 'Code Review',
    deadline: 8,
    max_bonus: 168,
    description: 'Code Review will help to refactor twice often.'
  },
  backlog: {
    name: 'Backlog Grooming',
    deadline: 8,
    max_bonus: 168,
    description: 'Backlog grooming will help to retrospective twice often.'
  },

  training: {
    name: 'Internal Hakaton',
    deadline: 0,
    max_bonus: 0,
    description:
      "An interesting educational project, tailored specifically for the development of your team's skills."
  },
  planing: {
    name: 'Planing',
    deadline: 8,
    max_bonus: 168 * 2,
    description: 'Deep planning improves the tasks/bugs ratio.'
  },
  teambuilding: {
    name: 'Team Building',
    deadline: 8,
    max_bonus: 168 * 4,
    description:
      'Team Building fills with the belief in the common cause and increases the motivation.'
  },
  status: {
    name: 'Status',
    deadline: 1,
    max_bonus: 12,
    description: 'Strict discipline and status meetings extend the working day.'
  }
};
