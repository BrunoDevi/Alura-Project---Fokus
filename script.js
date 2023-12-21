const html = document.querySelector('html');
const btnLista = document.querySelectorAll('.app__card-button');
const appMode = ['foco', 'descanso-curto', 'descanso-longo'];
const bannerText1 = ['Otimize sua produtividade,', 'Que tal dar uma respirada?', 'Hora de voltar à superfície.'];
const bannerText2 = ['mergulhe no que importa', 'Faça uma pausa curta!', 'Faça uma pausa longa.'];

//BANNER Start
let imagem = document.querySelector('.app__image');
let primeiroTexto = document.querySelector('.app__title').childNodes[0];
let segundoTexto = document.querySelector('.app__title-strong');

for(let i = 0; i < btnLista.length; i++){
    btnLista[i].addEventListener('click', ()=>{
        html.setAttribute('data-contexto', appMode[i]);
        imagem.setAttribute('src', `/imagens/${appMode[i]}.png`);
        
        primeiroTexto.textContent = bannerText1[i];
        segundoTexto.textContent = bannerText2[i];
    })
    
    btnLista[i].addEventListener('focus', () => {
        for (let j = 0; j < btnLista.length; j++) {
            btnLista[j].classList.remove('active');
        }
        btnLista[i].classList.add('active');
    })
    
}
//BANNER End

//MUSIC Start
const musicaCheckBox = document.getElementById('alternar-musica');
const musica = new Audio('/sons/Luna Rise, Part One.mp3');
musica.loop = true;
musica.volume = 0.5;

musicaCheckBox.addEventListener('change', function() {
    if (this.checked) {
        musica.play()
    } else {
        musica.pause()
    }
});
//MUSIC End

//TEMPORIZADOR Start
const startPause = document.querySelector('#start-pause');
const playSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');
const alarmSound = new Audio ('/sons/beep.mp3');
let maxTime = 10
let contador = maxTime;
let temporizador = null;

startPause.addEventListener('click', start);

const contagemRegresiva = ()=>{
    if(contador <= 0){ //Executa ao final da contagem
        alarmSound.play();
        zerar();
        contador = maxTime;
        startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""/> <span id="start-pause__text">Começar</span>`;
        console.log('tempo encerrado');
        return
    }

    console.log(contador); // Contador Diminuindo
    contador -= 1;
}

function start(){
    if(temporizador){ //executa ao Pausar
        zerar();
        startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""/> <span id="start-pause__text">Começar</span>`;
        pauseSound.play();
        console.log('tempo pausado em: ' + contador);
        return
    }

    temporizador = setInterval(contagemRegresiva, 1000); //Executa ao iniciar
    startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""/> <span id="start-pause__text">Pausar</span>`;
    playSound.play();
}

function zerar(){ //Para o temporizado porem mantem o valor do contador
    clearInterval(temporizador);
    temporizador = null;
}
//TEMPORIZADOR End
