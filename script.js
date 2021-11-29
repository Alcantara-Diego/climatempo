window.addEventListener("load", escolherFundo);

function escolherFundo(){ //Muda o fundo do body dependendo da hora do dia
    const hora = novaData("hora"); //pega a hora atual
    let cidadeBtn = document.getElementById("cidadeBtn");
    
    if(hora >= 19 || hora <= 5){// Se estiver de noite:
        // alterar para fundo escuro
        document.querySelector("body").style.backgroundImage="url(assets/alexander-andrews-yOIT88xWkbg-unsplash.jpg)"

        // alterar a cor do botão de pesquisar a cidade para combinar com o fundo
        cidadeBtn.classList.remove("btnDia");
        cidadeBtn.classList.add("btnNoite");
    } else{ //se estiver de dia:

        // alterar para fundo claro
        document.querySelector("body").style.backgroundImage="url(assets/ivana-cajina-HDd-NQ_AMNQ-unsplash.jpg)";
        document.querySelector("body").style.backgroundPosition="center";

        // alterar a cor do botão de pesquisar a cidade para combinar com o fundo
        cidadeBtn.classList.remove("btnNoite");
        cidadeBtn.classList.add("btnDia");
    }
}

function pesquisarCidade(){ //Pega as informações da API
    let cidadeInput = document.getElementById("cidadeInput").value;
    let objeto;
    const api ={
        key: "&APPID=51e675674aff185818c305f2d99978fa",
        base: "https://api.openweathermap.org/data/2.5/weather?q=",
        adicional: "&lang=PT&units=metric"
    };
    fetch(`${api.base}${cidadeInput}${api.key}${api.adicional}`).then(response=>{
        return response.json();
    }).then(response=>{
        objeto = response;

        //anima o conteúdo do container
        carregarAnimacoes();

        if(objeto.cod == 404){ //erro caso a cidade pesquisada não esteja listada na API
            cidadeInvalida();
        }else{
            atualizarContainer(objeto)
        }

        //zerar o input
        document.getElementById("cidadeInput").value="";
    });
};
function cidadeInvalida(){ //atualiza o container caso a cidade não conste na API(erro 404)
    let cidade = document.getElementsByClassName("cidade")[0];
    cidade.innerHTML = "Cidade inválida";

    let temperatura = document.getElementsByClassName("temperatura")[0];
     temperatura.innerHTML = "0°";

    let clima = document.getElementsByClassName("clima")[0];
    clima.innerHTML="Escolha uma cidade";

    let minMax = document.getElementsByClassName("min-max")[0];
     minMax.innerHTML="0°/0°";
}
function atualizarContainer(objeto){ //Se a cidade existir é passada as informações para o container 

     //mostrar o nome da cidade na tela
     let cidade = document.getElementsByClassName("cidade")[0];
     cidade.innerHTML = `${objeto.name}, ${objeto.sys.country}`;

     //mostrar a data
     const data = novaData("data");
     document.getElementsByClassName("data")[0].innerHTML=data;

     //mostrar a temperatura
     let temperatura = document.getElementsByClassName("temperatura")[0];
     temperatura.innerHTML = `${Math.round(objeto.main.temp)}°`;

     //mostrar o clima
     let clima = document.getElementsByClassName("clima")[0];
     clima.innerHTML=objeto.weather[0].description;

     //mostrar temperatura mínima e máxima
     let minMax = document.getElementsByClassName("min-max")[0];
     minMax.innerHTML=`${Math.round(objeto.main.temp_max)}°/${Math.round(objeto.main.temp_min)}°`
}

function novaData(tipo){ //pega data e a hora atual
    const d = new Date;
    switch(tipo){
        case "data":
            const ano = d.getFullYear();
            const mes = d.getMonth();
            const mesesExtenso = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
            const diaSemana = d.getDay();
            const diasExtenso = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
            const dia = d.getDate();
            return `${diasExtenso[diaSemana]}, ${dia} de ${mesesExtenso[mes]} ${ano}`;
        
        case "hora":
            const horas = d.getHours()
            return horas;
    }
}
function carregarAnimacoes(){
    document.querySelector("main").style.animation="surgir 500ms ease-in";
        setTimeout(()=>{
            document.querySelector("main").style.animation="none";
        },700)
}


// Pesquisar cidade ao apertar o botão "enviar"
document.getElementById("cidadeBtn").addEventListener("click", pesquisarCidade);
// Pesquisar ao apertar a tecla Enter
document.addEventListener("keydown", ()=>{
    if(event.key == "Enter"){
        pesquisarCidade();
    }
})
