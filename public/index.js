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

const selectButton = document.getElementById('select-button');
const startButton = document.getElementById('start-button');

const THUMBSTICK_SETTINGS = {
    internalFillColor: 'rgb(255, 255, 255)',
    internalLineWidth: 2,
    internalStrokeColor: 'rgb(200, 200, 200)',
    externalLineWidth: 2,
    externalStrokeColor: 'rgb(255, 255, 255)',
    autoReturnToCenter: true
};

const leftStick = new JoyStick('left-stick', THUMBSTICK_SETTINGS);
const rightStick = new JoyStick('right-stick', THUMBSTICK_SETTINGS);
console.log(leftStick);

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

function registerSelectButton(button) {
    function onPress() {
        fetch('/press/select');
    }
    function onRelease() {
        fetch('/release/select');
    }

    registerMouseEvents(button, onPress, onRelease);
}

function registerStartButton(button) {
    function onPress() {
        fetch('/press/start');
    }
    function onRelease() {
        fetch('/release/start');
    }

    registerMouseEvents(button, onPress, onRelease);
}

registerLetterButton(aButton, 'a');
registerLetterButton(bButton, 'b');
registerLetterButton(xButton, 'x');
registerLetterButton(yButton, 'y');

registerBumperButton(leftBumper, 'left');
registerBumperButton(rightBumper, 'right');

registerTriggerButton(leftTrigger, 'left');
registerTriggerButton(rightTrigger, 'right');

registerSelectButton(selectButton);
registerStartButton(startButton);

setInterval(() => {
    {
        const floatX = leftStick.GetX() / 100;
        const floatY = leftStick.GetY() / 100;
        fetch(`/move/stick/left/${floatX}/${floatY}`);
    }

    {
        const floatX = rightStick.GetX() / 100;
        const floatY = rightStick.GetY() / 100;
        fetch(`/move/stick/right/${floatX}/${floatY}`);
    }
}, 20);
