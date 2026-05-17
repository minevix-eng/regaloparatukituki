let noClickStage = 0;    
let noScaleFactor = 1.0; 
let chestClickCount = 0; 
let candlesLit = 3;

// --- TEXTOS DE LA CARTA ---
const textosCarta = [
    "Hoy es un día muy especial para ti, cumples un día mas de vida o quizá menos quien sabe eso siempre me pregunto cada cumple :v",
    "Pero hoy e venido a hablar de ti a desearte q en este dia tan especial la pases bonito y quizá rodeado de naturaleza como te gusta :D",
    "Espero te valla bien sabes, te deseo lo mejor, eres una persona maravillosa q nadie te haga dudar de eso nisiquiera tu misma >:v no tengo mucho q decir mmmm... es mi primera vez haciendo algo asi y agradezco q sea para una persona como TÚ(pequeño consejo creo q esto se ve mejor en laptop o pc)."
];
let indiceCarta = 0; 

// --- TEXTOS DEL CORAZÓN (ZELDA) ---
const textosCorazon = [
    "Te extraño mucho, todos los días, te veo en todos lados, es raro sentirse así, pero ante todo te sigo queriendo",
    "Quisa debí expresarme mas quizá ser mas cariñoso, pero en fin no te odio nunca lo haría, me sigues gustando igual q la primera vez que te conocí.",
    "Me gusta todo de ti, tus ocurrencias, tus locuras, tus anécdotas, tus mensajes, extraño verte, tocarte, abrazarte, pero sobre todo te extraño a TÍ.",
    "No me importar si como dijiste no sabias como querer, me basta con que seas feliz aunque no sea conmigo, decir q nos encontraremos en un futuro me suena muy cliché, sin emabargo hay una parte de mi q desea q sea así, q en algún momento podamos retomar lo q dejamos pendiente. TQM L❤️"
];
let indiceCorazon = 0; 

let pokeDialogueTimeout;

// --- TRANSICIÓN INICIAL ---
function aceptarRegalo() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('giftsScreen').style.display = 'flex';
}

// --- SELECCIONAR REGALO (MENÚ) ---
function verRegalo(tipoRegalo) {
    document.getElementById('giftsScreen').style.display = 'none';

    if (tipoRegalo === 'carta') {
        document.getElementById('letterScreen').style.display = 'flex';
        indiceCarta = 0;
        document.getElementById('letterText').innerText = textosCarta[indiceCarta];
    } 
   else if (tipoRegalo === 'pastel') {
        document.getElementById('cakeScreen').style.display = 'flex';
        document.getElementById('birthdayOverlay').style.display = 'none';
        document.getElementById('candle1').classList.remove('off');
        document.getElementById('candle2').classList.remove('off');
        document.getElementById('candle3').classList.remove('off');
        candlesLit = 3;
        triggerConfetti();
    }
    else if (tipoRegalo === 'corazon') {
        document.getElementById('heartScreen').style.display = 'flex';
        indiceCorazon = 0;
        // Esta línea es la que mete el texto dentro de la caja de Zelda:
        document.getElementById('heartText').innerText = textosCorazon[indiceCorazon];
        document.getElementById('heartTriangle').style.display = 'block';
    }
    else if (tipoRegalo === 'pokebola') {
        setupPokeballGame();
    }
    else if (tipoRegalo === 'notas') {
        document.getElementById('musicScreen').style.display = 'flex';
        document.getElementById('chestContainer').style.display = 'flex';
        document.getElementById('musicBox').style.display = 'none';
        chestClickCount = 0;
    }
    else {
        alert("¡Has seleccionado el cuadro de: " + tipoRegalo.toUpperCase() + "!");
        document.getElementById('giftsScreen').style.display = 'flex';
    }
}

function avanzarCarta() {
    indiceCarta++;
    if (indiceCarta < textosCarta.length) {
        document.getElementById('letterText').innerText = textosCarta[indiceCarta];
    } else {
        document.getElementById('letterScreen').style.display = 'none';
        document.getElementById('giftsScreen').style.display = 'flex';
    }
}

function avanzarCorazon() {
    indiceCorazon++;
    if (indiceCorazon < textosCorazon.length) {
        document.getElementById('heartText').innerText = textosCorazon[indiceCorazon];
        if (indiceCorazon === textosCorazon.length - 1) {
            document.getElementById('heartTriangle').style.display = 'none';
        }
    } else {
        document.getElementById('heartScreen').style.display = 'none';
        document.getElementById('giftsScreen').style.display = 'flex';
    }
}
// --- MINIJUEGO POKÉBOLA ---
function setupPokeballGame() {
    const area = document.getElementById('pokeballGameArea');
    const screen = document.getElementById('pokeballGameScreen');
    const dialogue = document.getElementById('pokeDialogue');
    
    area.innerHTML = '';
    dialogue.style.display = 'none';
    screen.style.display = 'block';

    const numPokebolasTotal = 16; 

    for (let i = 0; i < numPokebolasTotal; i++) {
        const ballDiv = document.createElement('div');
        ballDiv.className = 'poke-game-wrapper';
        ballDiv.innerHTML = '<div class="pokeball"></div>'; 

        let isCorrect = false;
        if (i === 0) isCorrect = true; 

        let top = Math.random() * 50 + 15; 
        let left = Math.random() * 75 + 10; 

        ballDiv.style.top = top + '%';
        ballDiv.style.left = left + '%';

        if (isCorrect) {
            ballDiv.onclick = clickCorrectPokeball;
        } else {
            ballDiv.onclick = function(e) { clickIncorrectPokeball(e); };
        }

        area.appendChild(ballDiv);
    }
}

function clickIncorrectPokeball(event) {
    const clickedBall = event.currentTarget; 
    clickedBall.classList.add('incorrect-clicked'); 

    const dialogue = document.getElementById('pokeDialogue');
    clearTimeout(pokeDialogueTimeout);
    dialogue.style.display = 'block';
    
    pokeDialogueTimeout = setTimeout(() => {
        dialogue.style.display = 'none';
    }, 2500);
}

function clickCorrectPokeball() {
    clearTimeout(pokeDialogueTimeout);
    document.getElementById('pokeDialogue').style.display = 'none';
    document.getElementById('pokeballGameScreen').style.none;
    document.getElementById('pokeballGameScreen').style.display = 'none';
    
    const rewardScreen = document.getElementById('rewardScreen');
    const rewardPokeball = document.getElementById('rewardPokeball');
    const pokemonCardWrapper = document.getElementById('pokemonCardWrapper');
    
    rewardPokeball.style.animation = 'none';
    pokemonCardWrapper.style.animation = 'none';
    void rewardPokeball.offsetWidth; 
    
    rewardPokeball.style.animation = 'pokeApertura 1.4s ease-in-out forwards';
    pokemonCardWrapper.style.animation = 'tarjetaEmerge 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.25) 1.4s forwards';
    
    rewardScreen.style.display = 'flex';
}

function regresarMenuGifts() {
    document.getElementById('rewardScreen').style.display = 'none';
    document.getElementById('giftsScreen').style.display = 'flex';
}

// --- LÓGICA DEL COFRE BÁSICO ---
function clickChest() {
    const chest = document.getElementById('retroChest');
    chestClickCount++;
    
    if (chestClickCount < 3) {
        chest.classList.add('shake');
        setTimeout(() => {
            chest.classList.remove('shake');
        }, 200);
    } else {
        document.getElementById('chestContainer').style.display = 'none';
        document.getElementById('musicBox').style.display = 'block';
    }
}

function regresarMenuDesdeMusica() {
    document.getElementById('musicScreen').style.display = 'none';
    document.getElementById('giftsScreen').style.display = 'flex';
}

// --- LÓGICA DEL BOTÓN NO ---
function rechazarRegalo() {
    const btnNo = document.getElementById('btnNo');
    const btnSi = document.getElementById('btnYes');
    noClickStage++;

    noScaleFactor -= 0.20; 
    if (noScaleFactor < 0.2) noScaleFactor = 0.2; 
    btnNo.style.transform = `scale(${noScaleFactor})`;

    if (noClickStage === 1) { 
        btnNo.innerText = '¿XQ NO?'; 
    } 
    else if (noClickStage === 2) { 
        btnNo.innerText = '¿NO?'; 
    } 
    else if (noClickStage === 3) { 
        btnNo.innerText = '¿XQ?'; 
    } 
    else if (noClickStage === 4) { 
        btnNo.innerText = 'Te dare chocolates'; 
        btnNo.style.transform = `scale(0.55)`; 
        btnNo.style.opacity = '0.9'; 
    } 
    else { 
        btnNo.style.display = 'none'; 
    }

    let textoSi = 'SÍ'; let tamanoLetra = '18px'; let espacioPadding = '15px 30px';
    if (noClickStage === 1) { textoSi = 'SÍIIII'; tamanoLetra = '30px'; espacioPadding = '20px 40px'; }
    else if (noClickStage === 2) { textoSi = 'SÍIIIIIIII'; tamanoLetra = '45px'; espacioPadding = '25px 50px'; }
    else if (noClickStage === 3) { textoSi = 'SÍIIIIIIIIIIII'; tamanoLetra = '55px'; espacioPadding = '28px 56px'; }
    else { textoSi = 'SÍIIIIIIIIIIIIIIIIII'; tamanoLetra = '65px'; espacioPadding = '32px 64px'; }

    btnSi.innerText = textoSi;
    btnSi.style.fontSize = tamanoLetra;
    btnSi.style.padding = espacioPadding;
}

// Funciones del Pastel de Cumpleaños
function triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    container.innerHTML = ''; 
    const colors = ['#ff007f', '#00ff41', '#ffd700', '#00e5ff', '#ff5722'];
    for (let i = 0; i < 65; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'pixel-confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 1.5 + 's';
        confetti.style.animation = 'fallConfetti 3.5s linear forwards';
        const size = Math.floor(Math.random() * 6) + 8; 
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        container.appendChild(confetti);
    }
}

function blowCandle() {
    if (candlesLit > 0) {
        // Apaga la vela correspondiente al conteo actual (candle3, luego candle2, luego candle1)
        let velaActual = document.getElementById('candle' + candlesLit);
        if (velaActual) {
            velaActual.classList.add('off');
        }
        
        candlesLit--;
        
        // Cuando se apagan las 3 velas, aparece el mensaje en medio de la pantalla
        if (candlesLit === 0) {
            setTimeout(() => {
                document.getElementById('birthdayOverlay').style.display = 'flex';
            }, 400); 
        }
    }
}

function regresarMenuDesdePastel() {
    document.getElementById('cakeScreen').style.display = 'none';
    document.getElementById('giftsScreen').style.display = 'flex';
}