import React from "react";
import { sounds } from "../../game/knowledge/sounds";

export const makeSoundOnClick = (Component, sound_name) => {
    class HOC extends React.Component {
        makeAudio = () => {
            let audio = new Audio(sounds[sound_name]);
            audio.play();
        };

        render() {
            let props = this.props;
            return (
                <Component
                    {...props}
                    onClick={() => {
                        this.makeAudio();
                        this.props.onClick();
                    }}
                />
            );
        }
    }

    return HOC;
};
