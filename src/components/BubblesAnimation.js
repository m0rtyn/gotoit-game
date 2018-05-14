import React from 'react'
import BubbleAnimated from "./animation_content/BubbleAnimated";
import {genAnimationData} from "../data/animation_data";

let isFreshed = false;
let timeoutID = null;

class BubblesAnimation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            count: 0
        }

        this.addBubbleAnimation = this.addBubbleAnimation.bind(this);
        this.trueAddBubbleAnimation = this.trueAddBubbleAnimation.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    trueAddBubbleAnimation(animation_data) {
        let items = this.state.items.concat(animation_data)
        this.setState({ items: items, count: this.state.count++ });
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

    clear(){
        this.setState( { items: []} );
    }
    render() {
        const items = this.state.items.map((item) =>
            <BubbleAnimated
                size={item.size}
                color={item.color}
                count={item.count}
                from={item.from}
                to={item.to}
            >
            </BubbleAnimated>
        )

        return (
            <div>
                {items}
            </div>
        )
    }
}


export default BubblesAnimation;