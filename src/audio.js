// set initial state
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillatorNodes = [];
let oscillatorGainNodes = [];
let muteBool = true;
const hexArray = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

// const hexArray = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00];

// lowpass filter
const LPFilter = audioCtx.createBiquadFilter();
LPFilter.type = "lowpass";
LPFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
LPFilter.gain.setValueAtTime(40, audioCtx.currentTime);

// hipass filter
const HPFilter = audioCtx.createBiquadFilter();
HPFilter.type = "highpass";
HPFilter.frequency.setValueAtTime(250, audioCtx.currentTime);
HPFilter.gain.setValueAtTime(40, audioCtx.currentTime);

let convolverTime = .1;
let convolverEffect = (function() {
    let convolver = audioCtx.createConvolver(),
        noiseBuffer = audioCtx.createBuffer(2, convolverTime * audioCtx.sampleRate, audioCtx.sampleRate),
        left = noiseBuffer.getChannelData(0),
        right = noiseBuffer.getChannelData(1);
    for (let i = 0; i < noiseBuffer.length; i++) {
        left[i] = Math.random() * 2 - 1;
        right[i] = Math.random() * 2 - 1;
    }
    convolver.buffer = noiseBuffer;
    convolver.normalize = true;
    return convolver;
})();

// initialize audio on componentDidMount
const audioStart = () => {
    audioCtx.resume();
};

// create new oscilatorNode
export const playAudio = (randomColor) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const addNode = oscillatorNodes.push(oscillator);
    const addGain = oscillatorGainNodes.push(gainNode);
    oscillatorNodes[addNode - 1].connect(gainNode);
    oscillatorGainNodes[addGain - 1].connect(convolverEffect);
    convolverEffect.connect(HPFilter);
    HPFilter.connect(LPFilter)
    LPFilter.connect(audioCtx.destination);

    // set start of note
    muteBool ? oscillatorGainNodes[addGain - 1].gain.linearRampToValueAtTime(.9, audioCtx.currentTime) : oscillatorGainNodes[addGain - 1].gain.setValueAtTime(0, audioCtx.currentTime);
    oscillatorNodes[addNode - 1].type = 'triangle';
    oscillatorNodes[addNode - 1].start(); 
    oscillatorNodes[addNode - 1].frequency.setValueAtTime(hexArray[randomColor], audioCtx.currentTime);
    
    // set end of note
    muteBool ? oscillatorGainNodes[addGain - 1].gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 1) : oscillatorGainNodes[addGain - 1].gain.setValueAtTime(0, audioCtx.currentTime + 1);
    oscillatorNodes[addNode - 1].stop(audioCtx.currentTime + 1);
}

// suspend audio on componentWillUnmount
export const stopAudio = () => {
    audioCtx.suspend();   
}

// bool for muting audio
export const muteAudio = (muteFromGame) => {
    muteBool = muteFromGame;
}

export default audioStart;