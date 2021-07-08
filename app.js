const blocoStart = document.querySelector('.tela-start');
const blocoGame = document.querySelector('.tela-game');
const spanVitorias = document.querySelector('#vitorias');
const spanPartidas = document.querySelector('#partidas');
const spanDerrotas = document.querySelector('#derrotas');
const cartas = document.querySelector('.cartas');
const cartaCPU = document.querySelector('#cartaCPU');
const Papel = document.querySelector('#cartaPapel');
const Pedra = document.querySelector('#cartaPedra');
const Tesoura = document.querySelector('#cartaTesoura');
const blocoVs = document.querySelector('.BlocoVersus');
const blocoCPUCarta = document.querySelector('.BlocoCPU');
const botaoProximo = document.querySelector('#botaoProximo');
const tituloGame = document.querySelector('#tituloGame');
var vez = document.querySelector("#vez");
var  total = document.querySelector("#total");

var opcoes = ["pedra", "papel", "tesoura"];
var Naleatorio;
var escolhaCPU;
var escolhaJogador = -1;
var round = 1;
var contador = 1;
scoreMenu = {
    vitorias: 0,
    empates: 0,
    derrotas: 0,
}
var ListaSons = {
    botao: new Audio("./sons/BotaoSFX.mp3"),
    start:  new Audio("./sons/StartSFX.mp3"), 
    correct: new Audio("./sons/CorrectSFX.mp3"),
    error:  new Audio("./sons/ErrorSFX.mp3") 
};



function StartGame() {
    blocoStart.style.display = "none";
    blocoGame.style.display = "initial";
    round = document.querySelector('#rodadas').value;
    
    MudarTexto(vez, contador.toString());
    MudarTexto(total, round.toString());
    ListaSons.botao.play();
  
    setTimeout(() => {
        ListaSons.start.play();
    }, 300);
}


function MudarTexto(variavel, valor) {
    variavel.style.animation = "fadeInOut 1s 1";
    setTimeout(() => {
        variavel.innerText = valor;
    }, 500);
}


function ResetGame() {
    blocoStart.style.display = "initial";
    blocoGame.style.display = "none";
    botaoProximo.style.visibility = 'hidden';
    ResetPontos();
    ResetRodada();
}


function ResetPontos() {
    escolhaJogador = -1;
    round = 1;
    contador = 1;
    scoreMenu.empates = 0;
    scoreMenu.vitorias = 0;
    scoreMenu.derrotas = 0;
    AtualizaPontos();


}


function ResetRodada() {
    MudarTexto(tituloGame, "Vamos lá!");
    Pedra.style.filter = "grayscale(0%)";
    Papel.style.filter = "grayscale(0%)";
    Tesoura.style.filter = "grayscale(0%)";

    cartaCPU.setAttribute("src", "./Arte/incognita.png");
    escolhaJogador= -1;
    MudarTexto(vez, contador.toString());
}


function EscolhendoCarta(numeroCarta) {

    if(escolhaJogador < 0) {
        escolhaJogador =  opcoes[numeroCarta];

        setTimeout(() => {
            GerarCartaCPU();
            CalcularJogo();
        }, 300);
        AnimacaoGame();
    }

    ListaSons.botao.play();

}



function AtualizaPontos () {
    MudarTexto(spanVitorias, scoreMenu.vitorias);
    MudarTexto(spanDerrotas, scoreMenu.derrotas);
    MudarTexto(spanPartidas, scoreMenu.empates);
    
}

function GerarCartaCPU() {
    Naleatorio = Math.round(Math.random()*2);
    escolhaCPU = opcoes[Naleatorio];

    if(escolhaCPU == 'pedra') {
        cartaCPU.setAttribute("src", "./Arte/pedra.png");
    }
    if(escolhaCPU == "papel") {
        cartaCPU.setAttribute("src", "./Arte/papel.png");
    }
    if(escolhaCPU == "tesoura") {
        cartaCPU.setAttribute("src", "./Arte/tesoura.png");
    }
}

function CalcularJogo() {
    if (escolhaJogador == escolhaCPU) {
        scoreMenu.empates++;
        MudarTexto(tituloGame, "Empate.");
    } else {
        MudarTexto(tituloGame, "Derrota.");

        if(escolhaJogador == "papel" && escolhaCPU == "tesoura") {
            scoreMenu.derrotas++;
            ListaSons.error.play();
        } else if(escolhaJogador == "tesoura" && escolhaCPU == "pedra") {
            scoreMenu.derrotas++;
            ListaSons.error.play();
        } else if (escolhaJogador == "pedra" && escolhaCPU == "papel") {
            scoreMenu.derrotas++;
            ListaSons.error.play();
        } else {
            scoreMenu.vitorias++;
            MudarTexto(tituloGame, "Vitória.");
            ListaSons.correct.play();
        }
    }
    AtualizaPontos();
    round--;
    contador++;
}

function AnimacaoGame() {
    if(escolhaJogador == opcoes[0]) {
        Papel.style.filter = "grayscale(100%)";
        Tesoura.style.filter = "grayscale(100%)";
    }
    if(escolhaJogador == opcoes[1]) {
        Pedra.style.filter = "grayscale(100%)";
        Tesoura.style.filter = "grayscale(100%)";
        
    }
    if(escolhaJogador == opcoes[2]) {
        Papel.style.filter = "grayscale(100%)";
        Pedra.style.filter = "grayscale(100%)";

    }

    
    blocoVs.style.animation = "ScaleAnim 1s 1 ";
    blocoVs.style.display = "initial";

    setTimeout(() => {
        blocoCPUCarta.style.animation = "ScaleAnim 1s 1 ";
        blocoCPUCarta.style.display = "initial";
    }, 700);

    
    setTimeout(() => {
        if (round > 0) {
            botaoProximo.innerText = "Próximo";
            botaoProximo.style.animation = "ScaleAnim 0.2s 1";
        } else {

            botaoProximo.innerText = "Encerrar";
            botaoProximo.style.animation = "ScaleAnim 0.2s 1";
        }
        botaoProximo.style.visibility = "visible";
    }, 1000)

}


function RePlay() {
    if (round > 0) {
        ResetRodada();
        botaoProximo.style.visibility = "hidden";
    } else {
        blocoGame.style.display = "none";
        blocoStart.style.display = "initial";
        ResetGame();
    }
    ListaSons.botao.play();
}

ResetGame();


