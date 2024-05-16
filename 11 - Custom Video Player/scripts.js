const video = document.querySelector(".viewer");
const toggleBtn = document.querySelector(".toggle");
const sliders = document.querySelectorAll(".player__slider");
const progressPercent = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress")
const skipBtns = document.querySelectorAll("[data-skip]");
const resizeBtn = document.querySelector(".screen__resize")


function pausePlayVideo(){
 if(video.paused){
       video.play();
   }else{
       video.pause();
   }
  
}

function updatetoggleBtn(){
 const icon  = this.paused ? "►" : "||";
 toggleBtn.textContent = icon;

}


function handleRange(){
   if(this.name === "volume"){
       video.volume = this.value;
   }else if(this.name === "playbackRate"){
       video.playbackRate = this.value;
   }

}


function handleSkips(){
    let newTime = parseFloat(this.dataset.skip) + video.currentTime;
    newTime = Math.max(0, newTime);
    video.currentTime = newTime;
    
}

function handleProgress(){
     let percentage = Math.floor((video.currentTime / video.duration) * 100);
     progressPercent.style.flexBasis = `${percentage}%`;

}


function scrub(e){
  const scrubTime = Math.floor((e.offsetX / progress.offsetWidth) * video.duration);
  video.currentTime = scrubTime;

}


function handleFullScreen(){

    if (video.requestFullscreen) {
       video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }else{
        alert("your browser doesn't support video fullscreen");
      }

}




video.addEventListener("click", pausePlayVideo);
video.addEventListener('play', updatetoggleBtn);
video.addEventListener('pause', updatetoggleBtn);
video.addEventListener('timeupdate', handleProgress);


resizeBtn.addEventListener("click", handleFullScreen)
toggleBtn.addEventListener("click", pausePlayVideo);
skipBtns.forEach(btn => btn.addEventListener("click", handleSkips));
sliders.forEach(range => {
 range.addEventListener("change", handleRange)
 range.addEventListener("mousemove", handleRange)
});

let mousedown = false;
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e)) //runs scrub if mousedown is true;
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
