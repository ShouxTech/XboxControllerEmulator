const aButton = document.getElementById('a-button');
const bButton = document.getElementById('b-button');
const xButton = document.getElementById('x-button');
const yButton = document.getElementById('y-button');

const leftBumper = document.getElementById('left-bumper');
const rightBumper = document.getElementById('right-bumper');

const leftTrigger = document.getElementById('left-trigger');
const rightTrigger = document.getElementById('right-trigger');

const leftStickLeft = document.getElementById('left-stick-left');
const leftStickRight = document.getElementById('left-stick-right');
const leftStickUp = document.getElementById('left-stick-up');
const leftStickDown = document.getElementById('left-stick-down');

const rightStickLeft = document.getElementById('right-stick-left');
const rightStickRight = document.getElementById('right-stick-right');
const rightStickUp = document.getElementById('right-stick-up');
const rightStickDown = document.getElementById('right-stick-down');

function registerMouseEvents(button, onPress, onRelease) {
    button.onmousedown = onPress;
    button.onmouseup = onRelease;
    button.ontouchstart = (e) => {
        onPress();
        e.preventDefault();
    }
    button.ontouchend = (e) => {
        onRelease();
        e.preventDefault();
    }
}

function registerLetterButton(button, letter) {
    function onPress() {
        fetch(`/press/letter/${letter}`);
    }
    function onRelease() {
        fetch(`/release/letter/${letter}`);
    }

    registerMouseEvents(button, onPress, onRelease);
}

function registerStickButton(button, side, direction) {
    function onPress() {
        fetch(`/press/stick/${side}/${direction}`);
    }
    function onRelease() {
        fetch(`/release/stick/${side}/${direction}`);
    }

    registerMouseEvents(button, onPress, onRelease);
}

function registerBumperButton(button, side) {
    function onPress() {
        fetch(`/press/bumper/${side}`);
    }
    function onRelease() {
        fetch(`/release/bumper/${side}`);
    }

    registerMouseEvents(button, onPress, onRelease);
}

function registerTriggerButton(button, side) {
    function onPress() {
        fetch(`/press/trigger/${side}`);
    }
    function onRelease() {
        fetch(`/release/trigger/${side}`);
    }

    registerMouseEvents(button, onPress, onRelease);
}

registerLetterButton(aButton, 'a');
registerLetterButton(bButton, 'b');
registerLetterButton(xButton, 'x');
registerLetterButton(yButton, 'y');

registerStickButton(leftStickLeft, 'left', 'left');
registerStickButton(leftStickRight, 'left', 'right');
registerStickButton(leftStickUp, 'left', 'up');
registerStickButton(leftStickDown, 'left', 'down');

registerStickButton(rightStickLeft, 'right', 'left');
registerStickButton(rightStickRight, 'right', 'right');
registerStickButton(rightStickUp, 'right', 'up');
registerStickButton(rightStickDown, 'right', 'down');

registerBumperButton(leftBumper, 'left');
registerBumperButton(rightBumper, 'right');

registerTriggerButton(leftTrigger, 'left');
registerTriggerButton(rightTrigger, 'right');