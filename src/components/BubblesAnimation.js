import React from 'react';
import BubbleAnimated from './animation_content/BubbleAnimated';
import { genAnimationData } from '../game/knowledge';
import _ from 'lodash';

//var timeoutID = null;

class BubblesAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      length: 0,
    };

    this.addBubbleAnimation = this.addBubbleAnimation.bind(this);
    this.trueAddBubbleAnimation = this.trueAddBubbleAnimation.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  trueAddBubbleAnimation(animation_data) {
    let items = this.state.items.concat({
      id: this.state.length,
      item: animation_data,
    });
    this.setState({ items: items, length: this.state.length + 1 });
  }

  addBubbleAnimation(name, count, workerId, projectId, isBug = false) {
    let animation_data = genAnimationData(
      name,
      workerId,
      projectId,
      count,
      isBug
    );
    if (this.state.items.length === 0) {
      this.trueAddBubbleAnimation(animation_data);
    } else {
      this.trueAddBubbleAnimation(animation_data);
      setTimeout(() => {}, 1000 / this.state.items.length);
    }
  }

  removeItem = id => {
    let newItems = this.state.items.filter(i => i.id !== id);

    this.setState({ items: newItems });
  };

  renderItem = ({ id, item }) => {
    return (
      <BubbleAnimated
        key={id}
        size={item.size}
        color={item.color}
        count={item.count}
        from={item.from}
        to={item.to}
        handleTransitionEnd={() => this.removeItem(id)}
      />
    );
  };
  render() {
    const items = _.map(this.state.items, this.renderItem);
    return <div>{items}</div>;
  }
}

export default BubblesAnimation;
