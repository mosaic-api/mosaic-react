const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
let oscillatorNodes = [];

const hexArray = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

let convolverTime = .5;
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
    return convolver;
})();

const audioStart = () => {
    audioCtx.resume();
    gainNode.connect(convolverEffect);
    convolverEffect.connect(audioCtx.destination);
    gainNode.gain.setValueAtTime(.9, audioCtx.currentTime);     
};

export const playAudio = (randomColor) => {
    const oscillator = audioCtx.createOscillator();
    const addNode = oscillatorNodes.push(oscillator);
    oscillatorNodes[addNode - 1].connect(gainNode);
    oscillatorNodes[addNode - 1].type = 'sine';
    oscillatorNodes[addNode - 1].start(); 
    oscillatorNodes[addNode - 1].frequency.setValueAtTime(hexArray[randomColor], audioCtx.currentTime);
    oscillatorNodes[addNode - 1].stop(audioCtx.currentTime + 1)
}

export const stopAudio = () => {
    audioCtx.suspend();   
}

export default audioStart;