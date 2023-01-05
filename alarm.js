window.addEventListener("load", () => {
  var display = document.getElementById("display");
  var minuto = document.getElementById("minuto");
  var duracao = document.getElementById("duracao");
  var power = document.getElementById("power");
  var btnState = localStorage.getItem("btnstate") || false;

  if (btnState === "true") {
    power.classList.add("on");
  }

  minuto.value = localStorage.getItem("minuto") || 0;
  duracao.value = localStorage.getItem("duracao") || 10;

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

  setInterval(() => {
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
      playNote("3000", "sine", 1);
    }

    display.innerHTML = formatedDate;
  }, 1000);

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
      return;
    }
    e.currentTarget.classList.add("on");
    btnState = "true";
    localStorage.setItem("btnstate", btnState);
  });
});
