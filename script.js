const html = document.querySelector('html');
const btnLista = document.querySelectorAll('.app__card-button');
const appMode = ['foco', 'descanso-curto', 'descanso-longo'];
const bannerText1 = ['Otimize sua produtividade,', 'Que tal dar uma respirada?', 'Hora de voltar à superfície.'];
const bannerText2 = ['mergulhe no que importa', 'Faça uma pausa curta!', 'Faça uma pausa longa.'];
const musicaCheckBox = document.getElementById('alternar-musica');
const musica = new Audio('/sons/Luna Rise, Part One.mp3');
musica.loop = true;
musica.volume = 0.5;

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

musicaCheckBox.addEventListener('change', function() {
    if (this.checked) {
        musica.play()
    } else {
        musica.pause()
    }
});
