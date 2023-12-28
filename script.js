const html = document.querySelector('html');
const btnLista = document.querySelectorAll('.app__card-button');
const appMode = ['foco', 'descanso-curto', 'descanso-longo'];

//BANNER Start
const bannerText1 = ['Otimize sua produtividade,', 'Que tal dar uma respirada?', 'Hora de voltar à superfície.'];
const bannerText2 = ['mergulhe no que importa', 'Faça uma pausa curta!', 'Faça uma pausa longa.'];
let imagem = document.querySelector('.app__image');
let primeiroTexto = document.querySelector('.app__title').childNodes[0];
let segundoTexto = document.querySelector('.app__title-strong');

for(let i = 0; i < btnLista.length; i++){
    btnLista[i].addEventListener('click', ()=>{
        html.setAttribute('data-contexto', appMode[i]);
        imagem.setAttribute('src', `/imagens/${appMode[i]}.png`);
        
        primeiroTexto.textContent = bannerText1[i]; //Troca os bannerText de acordo com o appMode
        segundoTexto.textContent = bannerText2[i];
        
        contador = atualizarMaxTime(i) //Atualiza o tempo Maximodo modo o mostra na tela
        displayTime();
        if(temporizador){ // Executa ao Pausar
            zerar();
            startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""/> <span id="start-pause__text">Começar</span>`;
            pauseSound.play();
        }
    })

    btnLista[i].addEventListener('focus', () => { //Aplica efeito focus
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
const telaDeTempo = document.querySelector('#timer');
let temporizador = null;
let contador = 5;

startPause.addEventListener('click', start); // Executa função Start ao clicar

const contagemRegresiva = ()=>{
    if(contador <= 0){ // Executa ao final da contagem
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }
        alarmSound.play();
        zerar();
        displayTime()
        startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""/> <span id="start-pause__text">Começar</span>`;
        return
    }

    contador -= 1; // Loop do temporizador
    displayTime()
}

function start(){
    if(temporizador){ // Executa ao Pausar
        zerar();
        startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""/> <span id="start-pause__text">Começar</span>`;
        pauseSound.play();
        return
    }

    temporizador = setInterval(contagemRegresiva, 1000); // Executa ao iniciar
    startPause.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""/> <span id="start-pause__text">Pausar</span>`;
    playSound.play();
}

function zerar(){ // Para o temporizado porem mantem o valor do contador
    clearInterval(temporizador);
    temporizador = null;
}

function atualizarMaxTime(indice){ // Define o contador de acordo com o appMode
    switch (appMode[indice]) {
        case 'foco':
            return 1500
        case 'descanso-curto':
            return 300
        case 'descanso-longo':
            return 900
        default:
            break;
    }
}

function displayTime(){ // Mostra o contador na tela
    let tempo = new Date(contador * 1000);
    let tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    telaDeTempo.innerHTML = `${tempoFormatado}`;
}

displayTime() // Mantem o contador sempre exibido na tela

//TEMPORIZADOR End
