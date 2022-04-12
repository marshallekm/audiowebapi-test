// let audio1 = new Audio();
// audio1.src = 'french-rap.wav';
// const audioContext = new AudioContext();

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
let audioSource;
let analyser;
//analyser is timing and frequency

container.addEventListener('click', () => {
// let audio1 = new Audio();
const audio1 = document.getElementById('audio1');
audio1.src = 'french-rap.wav';
const audioContext = new AudioContext();
  audio1.play();
  audio1.crossOrigin = "anonymous";
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
  const bufferLength = analyser.frequencyBinCount;
  //bufferlength will be half of the fftsize
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width/bufferLength;
  let barHeight;
  let x = 0;

  const animate = () => {
    x = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    //clear rectangle, 4 values of what canvas, start with coordinates 0,0 to clear the canvas
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++){
      barHeight = dataArray[i];
      //sound will affect height
      context.fillStyle = 'white';
      context.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
      x += barWidth;
    }
    requestAnimationFrame(animate);
  }
  animate();
  //width of single bar
});

// file.addEventListener('change', () => {
// // console.log(this.files);
// const files = this.files;
// const audio1 = document.getElementById('audio1');
// audio1.src = URL.createObjectURL(files[0]);
// audio1.load();
// audio1.play();

// audioSource = audioContext.createMediaElementSource(audio1);
//   analyser = audioContext.createAnalyser();
//   audioSource.connect(analyser);
//   analyser.connect(audioContext.destination);
//   analyser.fftSize = 64;
//   const bufferLength = analyser.frequencyBinCount;
//   //bufferlength will be half of the fftsize
//   const dataArray = new Uint8Array(bufferLength);

//   const barWidth = canvas.width/bufferLength;
//   let barHeight;
//   let x = 0;

//   const animate = () => {
//     x = 0;
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     //clear rectangle, 4 values of what canvas, start with coordinates 0,0 to clear the canvas
//     analyser.getByteFrequencyData(dataArray);
//     for (let i = 0; i < bufferLength; i++){
//       barHeight = dataArray[i];
//       //sound will affect height
//       context.fillStyle = 'white';
//       context.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
//       x += barWidth;
//     }
//     requestAnimationFrame(animate);
//   }
//   animate();
// });
