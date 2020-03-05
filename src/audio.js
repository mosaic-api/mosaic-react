const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioCtx.createGain();
const oscillator = audioCtx.createOscillator();
const hexArray = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]
oscillator.start(); 

const audioStart = () => {
    audioCtx.resume();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);    

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz   
};

export const playAudio = (randomColor) => {
    oscillator.frequency.setValueAtTime(hexArray[randomColor], audioCtx.currentTime);
    gainNode.gain.setValueAtTime(.5, audioCtx.currentTime)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + .5)
}

export const stopAudio = () => {
    audioCtx.suspend();   
}

export default audioStart;