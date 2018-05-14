
export const animation_data = {
    creativity: {
        name: 'creativity',
        color: '#EA80FC'
    },
    agile: {
        name: 'agile',
        color: '#1DE9B6'
    },
    tdd: {
        name: 'tdd',
        color: '#1E90FF'
    },
    refactor: {
        name: 'refactor',
        color: '#FFAB40'
    },
    tasks: {
        name: 'tasks',
        color: '#64DD17'
    },
    bugs: {
        name: 'bugs',
        color: '#FF4500'
    }

}

export const genAnimationData = (name, from, to, count) => {
    let data = animation_data[name];

    return { size: `${30+Math.floor(Math.sqrt(count))}px`, color: data.color, from: from, to: to, count: count}
}