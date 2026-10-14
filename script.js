// ====== Tilt 3D ===================================================
const card = document.getElementById('card');
let rect = null;

function updateTilt(e){
  if(!rect) rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;
  const dx = (e.clientX - cx) / (rect.width/2);
  const dy = (e.clientY - cy) / (rect.height/2);
  const max = 10;
  card.style.setProperty('--ry', `${dx * max}deg`);
  card.style.setProperty('--rx', `${-dy * max}deg`);
}
function resetTilt(){
  card.style.setProperty('--ry', `0deg`);
  card.style.setProperty('--rx', `0deg`);
  rect = null;
}
card.addEventListener('pointermove', updateTilt);
card.addEventListener('pointerleave', resetTilt);

// ====== Cambio de página (foto) ===================================
const photoPage = document.getElementById('photoPage');
const btnSurprise = document.getElementById('btnSurprise');
const btnBack = document.getElementById('btnBack');

function rand(min, max){ return Math.random() * (max - min) + min; }

function switchPage(from, to){
  from.classList.add('page-out');
  setTimeout(()=>{
    from.style.display = 'none';
    from.classList.remove('page-out');
    to.style.display = 'block';
    to.classList.add('page-in');
    to.addEventListener('animationend', ()=> to.classList.remove('page-in'), { once:true });
  }, 400);
}

btnSurprise.addEventListener('click', ()=> switchPage(card, photoPage));
btnBack.addEventListener('click', ()=> switchPage(photoPage, card));

// ====== Música ====================================================
const btnMusic = document.getElementById('btnMusic');
const audioPlayer = document.getElementById('audioPlayer');
const startTime = 1; // segundo donde empieza
const endTime = 80;   // segundo donde termina

if(btnMusic){
  btnMusic.addEventListener('click', ()=>{
    if(audioPlayer.paused){
      audioPlayer.currentTime = startTime;
      audioPlayer.play();
      btnMusic.textContent = "⏸️ ";
    } else {
      audioPlayer.pause();
      btnMusic.textContent = "🎵 ";
    }
  });

  audioPlayer.addEventListener("timeupdate", ()=>{
    if(audioPlayer.currentTime >= endTime){
      audioPlayer.pause();
      audioPlayer.currentTime = startTime;
      btnMusic.textContent = "🎵 ";
    }
  });
}

// ====== Cambio de tema ==================================
const btnTheme = document.getElementById('btnTheme');
const themeIcon = document.getElementById('themeIcon');

btnTheme.addEventListener('click', ()=>{
  const root = document.documentElement;
  const isLight = root.classList.toggle('light');
  btnTheme.setAttribute('aria-pressed', String(isLight));
  themeIcon.textContent = isLight ? "☀️" : "🌙";
});

// ====== Lock Screen ====================================
const lockScreen = document.getElementById('lock-screen');
const wrapper = document.querySelector('.wrapper');
const unlockBtn = document.getElementById('unlockBtn');
const inputs = document.querySelectorAll('.pin-inputs input');
const errorMsg = document.getElementById('errorMsg');
const correctPin = "0909";

inputs.forEach((input, i)=>{
  input.addEventListener('input', ()=>{
    if(input.value && i < inputs.length-1) inputs[i+1].focus();
  });
});

unlockBtn.addEventListener('click', ()=>{
  const entered = Array.from(inputs).map(i=>i.value).join('');
  if(entered === correctPin){
    lockScreen.style.display = "none";
    wrapper.style.display = "grid";
    createTulipField();
  } else {
    errorMsg.textContent = "Contraseña incorrecta";
    inputs.forEach(i=> i.value="");
    inputs[0].focus();
  }
});

// ====== Tulipanes distribuidos ===========================
function createTulipField(){
  const tulipField = document.querySelector('.tulip-field');
  const totalTulips = 150;
  for(let i=0;i<totalTulips;i++){
    const tulip = document.createElement('div');
    tulip.className = 'tulip-static';
    tulip.style.left = `${rand(0, 100)}vw`;
    tulip.style.top = `${rand(0, 100)}vh`;
    tulip.style.setProperty('--color', `hsl(${rand(320,360)},70%,80%)`);
    tulip.style.animationDelay = `${i * 0.2}s`;
    tulip.innerHTML = `
      <div class="stem"></div>
      <div class="leaf left"></div>
      <div class="leaf right"></div>
      <div class="flower">
        <div class="petal back-left"></div>
        <div class="petal back-right"></div>
        <div class="petal left"></div>
        <div class="petal right"></div>
        <div class="petal center"></div>
      </div>
    `;
    tulipField.appendChild(tulip);
  }
}
