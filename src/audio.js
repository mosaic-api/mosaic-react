const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
let oscillatorNodes = [];

const hexArray = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]


const audioStart = () => {
    audioCtx.resume();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.setValueAtTime(.5, audioCtx.currentTime);    
    // oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz   
};

export const playAudio = (randomColor) => {
    const oscillator = audioCtx.createOscillator();
    const addNode = oscillatorNodes.push(oscillator);
    oscillatorNodes[addNode - 1].connect(gainNode);
    oscillatorNodes[addNode - 1].type = 'triangle';
    oscillatorNodes[addNode - 1].start(); 
    oscillatorNodes[addNode - 1].frequency.setValueAtTime(hexArray[randomColor], audioCtx.currentTime);
    // gainNode.gain.setValueAtTime(.5, audioCtx.currentTime)
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime + .5)
    oscillatorNodes[addNode - 1].stop(audioCtx.currentTime + .5)
}

export const stopAudio = () => {
    audioCtx.suspend();   
}

export default audioStart;