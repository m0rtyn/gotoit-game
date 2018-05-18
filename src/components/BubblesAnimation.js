import React from 'react'
import BubbleAnimated from "./animation_content/BubbleAnimated";
import {genAnimationData} from "../game/animation_data";
import _ from 'lodash'

let isFreshed = false;
let timeoutID = null;

class BubblesAnimation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            length: 0
        }

        this.addBubbleAnimation = this.addBubbleAnimation.bind(this);
        this.trueAddBubbleAnimation = this.trueAddBubbleAnimation.bind(this);

    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    trueAddBubbleAnimation(animation_data) {
        let items = this.state.items.concat({id: this.state.length, item: animation_data})
        this.setState({ items: items, length: this.state.length + 1  });
    }

    addBubbleAnimation(name, count, workerId, projectId ){
        let animation_data = genAnimationData(name, workerId, projectId, count);

        if (isFreshed){
            timeoutID = setTimeout( () => {
                this.trueAddBubbleAnimation(animation_data)
            }, 400)
        }
        else {
            isFreshed = true;
            this.trueAddBubbleAnimation(animation_data)
            timeoutID = setTimeout( () => {
                isFreshed = false;
            }, 400)
        }
    }
    removeItem = (id) => {
        console.log(id)
        let newItems = this.state.items.filter( i => i.id !== id)
        // или delete this.state.items[id]
        this.setState({items: newItems })
    }

    renderItem = ({id, item}) => {

        return (
            <BubbleAnimated key={id} size={item.size}
                            color={item.color} count={item.count}
                            from={item.from} to={item.to}
                            handleTransitionEnd={() => this.removeItem(id)}/>
        )
    }
    render() {
        const items = _.map(this.state.items, this.renderItem);
        console.log(items)
        return (
            <div>
                {items}
            </div>
        )
    }
}


export default BubblesAnimation;