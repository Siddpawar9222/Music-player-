var id = 0;

window.onload = async () => {
  const play = document.querySelector(".play");
  const audio = document.querySelector("audio");
  const songname = document.querySelector(".songname");
  const singername = document.querySelector(".singername");
  const subimg = document.querySelector(".subimg");
  const faplay = document.querySelector(".fa-play");
  const forward = document.querySelector(".forward");
  const backward = document.querySelector(".backward");
  const elapsedtime = document.querySelector(".elapsedtime");
  const remainingtime = document.querySelector(".remainingtime");
  const progressBar = document.querySelector(".progress-bar");
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );
  const volume = document.querySelector(".volume");
  const volumeBar = document.querySelector(".volume-bar");
  const volumeBarContainer = document.querySelector(".volume-bar-container");

  const fabars = document.querySelector(".fa-bars");
  const faxmark = document.querySelector(".fa-xmark");
  const menu = document.querySelector(".menu");
  const songsname = document.querySelector(".songsname");


  let isplaying = false;
  audio.volume = 0.5;

  const musicFunction = async () => {
    let response = await fetch("data.json"); // "../" refers to the parent directory of the current directory
    return response.json();
  };

  let data = await musicFunction();

  //function to display data
  const display = (id) => {
    const html = `<source src="${data[id].url}" type="audio/ogg">`;
    audio.innerHTML = html;
    //--------------------------------------------------------------------------
    songname.innerHTML = `${data[id].title}`;
    singername.innerHTML = `${data[id].artist}`;
    //--------------------------------------------------------------------------

    const image = `<img src="${data[id].artwork}" alt="Server Problem">`;
    subimg.innerHTML = image;
  };

  const playMusic = () => {
    isplaying = true;
    audio.play();
    faplay.classList.replace("fa-play", "fa-pause");
  };

  const pauseMusic = () => {
    isplaying = false;
    audio.pause();
    faplay.classList.replace("fa-pause", "fa-play");
  };

  play.addEventListener("click", () => {
    isplaying ? pauseMusic() : playMusic();
    document.querySelectorAll(".title").forEach((title)=>{
      title.style.backgroundColor = "black";
    })
    document.querySelector(`#a${id}`).style.backgroundColor = "red";;
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      isplaying ? pauseMusic() : playMusic();
    }
  });

  forward.addEventListener("click", () => {
    id++;
    if (id >= data.length) {
      id = 0;
    }
    display(id);
    audio.load();
    isplaying ? playMusic() : pauseMusic();
    document.querySelectorAll(".title").forEach((title)=>{
      title.style.backgroundColor = "black";
    })
    document.querySelector(`#a${id}`).style.backgroundColor = "red";;
  });

  backward.addEventListener("click", () => {
    id--;
    if (id < 0) {
      id = data.length-1;
    }
    display(id);
    audio.load();
    isplaying ? playMusic() : pauseMusic();
    document.querySelectorAll(".title").forEach((title)=>{
      title.style.backgroundColor = "black";
    })
    document.querySelector(`#a${id}`).style.backgroundColor = "red";;
  });

  display(0);

  // to update elapsed and remaining time
  setInterval(() => {
    const elapsedMinutes = Math.floor(audio.currentTime / 60);
    const elapsedSeconds = Math.floor(audio.currentTime % 60);
    elapsedtime.innerHTML = `${elapsedMinutes}:${elapsedSeconds}`;
    //  ----------------------------------------------------------------------------
    const remainingMinutes = Math.floor(
      (audio.duration - audio.currentTime) / 60
    );
    const remainingSeconds = Math.floor(
      (audio.duration - audio.currentTime) % 60
    );

    if (Number.isNaN(remainingMinutes) || Number.isNaN(remainingSeconds)) {
      remainingtime.innerHTML = `${0}:${0}`;
    } else {
      remainingtime.innerHTML = `${remainingMinutes}:${remainingSeconds}`;
    }

    if (audio.duration - audio.currentTime == 0) {
      id++;
      if (id >= data.length) {
        id = 0;
      }
      display(id);
      audio.load();
      playMusic();
      document.querySelectorAll(".title").forEach((title)=>{
        title.style.backgroundColor = "black";
      })
      document.querySelector(`#a${id}`).style.backgroundColor = "red";;
             }
  }, 1000);

  //progess bar
  audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });
  //progess bar with seeking feature
  progressBarContainer.addEventListener("click", (event) => {
    const progressWidth = event.offsetX / progressBarContainer.offsetWidth;
    audio.currentTime = progressWidth * audio.duration;
  });

  //Volume control
  volumeBar.style.width = `${0.5 * 100}%`;

  volume.addEventListener("click", () => {
    if (volumeBarContainer.style.display == "block") {
      volumeBarContainer.style.display = "none";
    } else {
      volumeBarContainer.style.display = "block";
    }
  });

  //When i click outside volumeBarContainer should hide
  document.addEventListener("click", (event) => {
    const isClickedOutside =
      !volume.contains(event.target) &&
      !volumeBarContainer.contains(event.target);
    if (isClickedOutside) {
      volumeBarContainer.style.display = "none";
      
    }
  });

  //volume seek bar
  volumeBarContainer.addEventListener("click", (event) => {
    const volumnWidth = event.offsetX / volumeBarContainer.offsetWidth;
    audio.volume = volumnWidth;
    volumeBar.style.width = `${volumnWidth * 100}%`;
  });

  fabars.addEventListener("click", () => {
    menu.classList.toggle("slide-bar");
  });

  faxmark.addEventListener("click", () => {
    menu.classList.toggle("slide-bar");
  }); 

   document.addEventListener("click", (event)=>{
      if(!menu.contains(event.target)){
        menu.classList.remove("slide-bar");
      }
   })

  playSong = (id) => { 
    this.id=id ;
    //Here I didn't write data type of variable .If we don't write data type in JavaScriptJavaScript take it as globally and I want to declare this function globally.
    console.log("playSong called with id", id);
    display(id);
    audio.load();
    isplaying ? playMusic() : pauseMusic();

    document.querySelectorAll(".title").forEach((title)=>{
      title.style.backgroundColor = "black";
    })
    document.querySelector(`#a${id}`).style.backgroundColor = "red";;

};

  const title = data.map((element) => {
    return `<div class="title" id="a${element.id}" onclick="playSong(${element.id})">${element.title}</div>`;
  });

  songsname.innerHTML = title.join(" ");
};
