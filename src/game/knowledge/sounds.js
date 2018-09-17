import default_click from "../../assets/sounds/button_click.wav";
import fast_flat_click from "../../assets/sounds/fast-flat-click.wav";
import click2 from "../../assets/sounds/click2.wav";
import bell from "../../assets/sounds/bell.wav";
import pop_reverse from "../../assets/sounds/pop-reverse.wav";
import pop from "../../assets/sounds/pop.wav";
import alarm1 from "../../assets/sounds/alarm1.wav";
import fx_coins from "../../assets/sounds/fx-coins.wav";
import coins_slide from "../../assets/sounds/coins_slide.wav";
import success from "../../assets/sounds/success2.wav";
import fail from "../../assets/sounds/fail.wav";
import steps_and_door from "../../assets/sounds/steps-and-door.wav";
import React from "react";

export const sounds = {
    default_click: default_click, //кнопки
    click: fast_flat_click, //Клик по иконке (изменение скорости, закрытия, навыка и пр.)
    tab_click: click2,
    new_message: bell,
    bubble_appear: pop_reverse,
    bubble_burst: pop,
    new_day_alarm: alarm1,
    charge_money: fx_coins,
    earn_money: coins_slide,
    finish_project: success,
    fail_project: fail,
    dismissal: steps_and_door
};

const makeSoundOnClick = (Component, sound_name) => {
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

const just_button = props => (
    <button className={props.className} onClick={props.onClick}>
        {props.children}
    </button>
);
const just_a_link = props => (
    <a className={props.className} onClick={props.onClick}>
        {props.children}
    </a>
);

export const DefaultClickSoundButton = makeSoundOnClick(just_button, "default_click");
export const TabClickSoundButton = makeSoundOnClick(just_a_link, "tab_click");
