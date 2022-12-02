Object.prototype.forEach = Array.prototype.forEach
var note = 0;

window.addEventListener("load", () => {

  
  var delay = 0;

  var display = document.getElementById("display");
  var minuto = document.getElementById("minuto");
  var duracao = document.getElementById("duracao");
  var power = document.getElementById("power");
  var btnState = localStorage.getItem("btnstate") || false;
  var noteInput = document.getElementById("note");
  var delayInput = document.getElementById("delay");

  if (btnState === "true") {
    power.classList.add("on");
  }

  minuto.value = localStorage.getItem("minuto") || 0;
  duracao.value = localStorage.getItem("duracao") || 10;

  console.log(note, delay)
  note = localStorage.getItem("note") || 3000;
  delay = localStorage.getItem("delay") || 1000;
  noteInput.value = note;
  delayInput.value = delay;

  console.log(note, delay)

  minuto.addEventListener("change", (e) => {
    if (e.currentTarget.value > 59) {
      e.currentTarget.value = 59;
    }
    localStorage.setItem("minuto", e.currentTarget.value);
  });

  duracao.addEventListener("change", (e) => {
    if (e.currentTarget.value > 59) {
      e.currentTarget.value = 59;
    }
    localStorage.setItem("duracao", e.currentTarget.value);
  });
  var timer = {};
  var setTimer = (ms) => {
    timer = setInterval(() => {
    let date = new Date();

    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };

    var formatedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);

    if (
      minutes == parseInt(minuto.value) &&
      seconds < parseInt(duracao.value) &&
      btnState === "true"
    ) {
      playNote(note, "sine", 1);
    }

    display.innerHTML = formatedDate;
  }, ms)};

  setTimer(delay);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var context = new AudioContext();
  var o = null;
  var g = null;

  function playNote(freq, type, duration) {
    o = context.createOscillator();
    g = context.createGain();
    o.connect(g);
    o.type = type;
    o.frequency.value = freq;
    g.connect(context.destination);
    o.start(0);

    g.gain.exponentialRampToValueAtTime(
      0.00001,
      context.currentTime + duration
    );
  }

  function stop(decreaseTime) {
    g.gain.exponentialRampToValueAtTime(
      0.00001,
      context.currentTime + decreaseTime
    );
  }

  power.addEventListener("click", (e) => {
    if (btnState === "true") {
      e.currentTarget.classList.remove("on");
      btnState = "false";
      localStorage.setItem("btnstate", btnState);
      controls.style.display = "none";
      return;
    }
    e.currentTarget.classList.add("on");
    btnState = "true";
    localStorage.setItem("btnstate", btnState);
    
  });



  var footer = document.getElementById("footer");
  var controls = document.getElementById("controls");


  var opencounter = 0;
  footer.addEventListener('click', ()=>{
    if(opencounter == 3){
      controls.style.display = "flex"
      opencounter = 0;
    }
    opencounter++
  })


  var buttons = document.getElementsByTagName("button");
  buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      var name = e.target.dataset.from;
      var direction = e.target.name;
      var input = document.getElementById(name);
      console.log(name, input.value)
      direction == "up" ? input.stepUp() : input.stepDown();
      this[name] = parseInt(input.value);
      localStorage.setItem(name, input.value);
      if(name=="delay") {
        clearInterval(timer);
        setTimer(parseInt(input.value));
      };
    })
  })
  

}); 
