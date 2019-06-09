function doFirst() {
   barSize = 600;
   myVid = document.getElementById('bgvid');
   toggleButton = document.getElementById('playButton');
   bar = document.getElementById('defaultBar');
   progressBar = document.getElementById('progressBar');
   fullScreenButton = document.getElementById('fullscr');
   mutent = document.getElementById('mute');

   toggleButton.addEventListener('click', playOrPause, false);
   bar.addEventListener('click', clickedBar, false);
   mute.addEventListener('click',mutedOrNot, false);

   fullScreenButton.addEventListener("click", function() {
    if (myVid.requestFullscreen) {
      myVid.requestFullscreen();
    } else if (myVid.mozRequestFullScreen) {
      myVid.mozRequestFullScreen(); // Firefox
    } else if (myVid.webkitRequestFullscreen) {
      myVid.webkitRequestFullscreen(); // Chrome and Safari
    }
  });

  if(myVid.muted) {
    mutent.setAttribute('src','icons/png/mute.png');
  } else {
    mutent.setAttribute('src','icons/png/speaker.png');
  }

  if(myVid.paused && myVid.ended ) {
    toggleButton.setAttribute('src','icons/png/play-button.png');
  } else {
    myVid.play();
    toggleButton.setAttribute('src','icons/png/pause.png');
  }

}

function playOrPause() {
   if(!myVid.paused && !myVid.ended ) {
     myVid.pause();
     toggleButton.setAttribute('src','icons/png/play-button.png');
     window.clearInterval(updateBar);
   } else {
     myVid.play();
     toggleButton.setAttribute('src','icons/png/pause.png');
     updateBar = setInterval(update, 100);
   }
}

function mutedOrNot() {
  if(!myVid.muted) {
    myVid.muted = true;
    mutent.setAttribute('src','icons/png/mute.png');
  } else {
    myVid.muted = false;
    mutent.setAttribute('src','icons/png/speaker.png');
  }
}

function update() {
  if(!myVid.ended) {
    var size = parseInt( myVid.currentTime*968/myVid.duration  );
    progressBar.style.width = size+'px';
  } else {
    progressBar.style.width = '0px';
    toggleButton.setAttribute('src','icons/png/play-button.png');
    window.clearInterval(updateBar);
  }
}

function clickedBar(e) {
  if( !myVid.paused && !myVid.ended ) {
    var mouseX = e.pageX-bar.offsetLeft;
    var newtime = mouseX*myVid.duration/968;
    myVid.currentTime = newtime;
    var size = parseInt( newtime*100/myVid.duration  );
    progressBar.style.width = size+'%';
  }
}

window.addEventListener('load',doFirst,false);
