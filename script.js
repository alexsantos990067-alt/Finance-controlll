
// ==========================================
// FINANCE CONTROL AI PRO
// SCRIPT PRINCIPAL
// ==========================================

// Banco de dados local
let dados = JSON.parse(localStorage.getItem("financeAI")) || {
    salario: 1600,
    gastos: [],
    investimentos: [],
    metas: [],
    faturas: [],
    consorcio: {
        valor: 0,
        parcelas: 0,
        pago: 0
    }
};


// Salvar dados
function salvarDados(){
    localStorage.setItem("financeAI", JSON.stringify(dados));
}


// Formatação de dinheiro
function dinheiro(valor){
    return Number(valor).toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });
}


// Calcular total de gastos
function totalGastos(){

    let total = 0;

    dados.gastos.forEach(gasto=>{
        total += Number(gasto.valor);
    });

    return total;
}


// Calcular investimentos
function totalInvestimentos(){

    let total = 0;

    dados.investimentos.forEach(inv=>{
        total += Number(inv.valor);
    });

    return total;
}


// Saldo disponível
function saldoAtual(){

    return dados.salario - totalGastos();

}


// Atualizar painel principal
function atualizarDashboard(){

    let saldo = document.getElementById("saldo");

    if(saldo){
        saldo.innerHTML = dinheiro(saldoAtual());
    }


    let gastos = document.getElementById("totalGastos");

    if(gastos){
        gastos.innerHTML = dinheiro(totalGastos());
    }


    let investimentos = document.getElementById("totalInvestimentos");

    if(investimentos){
        investimentos.innerHTML = dinheiro(totalInvestimentos());
    }


    mostrarGastos();
    mostrarInvestimentos();
    mostrarMetas();

}



// Adicionar gasto
function adicionarGasto(){

    let nome = document.getElementById("nomeGasto").value;

    let valor = document.getElementById("valorGasto").value;


    if(nome==="" || valor===""){
        alert("Preencha os dados");
        return;
    }


    dados.gastos.push({

        nome:nome,
        valor:Number(valor),
        data:new Date().toLocaleDateString()

    });


    salvarDados();

    atualizarDashboard();


    document.getElementById("nomeGasto").value="";
    document.getElementById("valorGasto").value="";

}



// Mostrar gastos
function mostrarGastos(){

    let lista=document.getElementById("listaGastos");


    if(!lista)return;


    lista.innerHTML="";


    dados.gastos.forEach((gasto,index)=>{


        lista.innerHTML += `

        <div class="card-item">

        <span>
        ${gasto.nome}
        </span>

        <strong>
        ${dinheiro(gasto.valor)}
        </strong>


        <button onclick="removerGasto(${index})">
        ✕
        </button>


        </div>

        `;


    });


}



// Remover gasto
function removerGasto(index){

    dados.gastos.splice(index,1);

    salvarDados();

    atualizarDashboard();

}



// Adicionar investimento
function adicionarInvestimento(){

    let valor=document.getElementById("valorInvestimento").value;


    if(valor===""){
        alert("Digite um valor");
        return;
    }


    dados.investimentos.push({

        valor:Number(valor),
        data:new Date().toLocaleDateString()

    });


    salvarDados();

    atualizarDashboard();


}
// ==========================================
// INVESTIMENTOS
// ==========================================


function mostrarInvestimentos(){

    let lista = document.getElementById("listaInvestimentos");

    if(!lista)return;


    lista.innerHTML="";


    dados.investimentos.forEach((inv,index)=>{


        lista.innerHTML += `

        <div class="card-item">

        <span>
        Investimento
        </span>


        <strong>
        ${dinheiro(inv.valor)}
        </strong>


        <button onclick="removerInvestimento(${index})">
        ✕
        </button>


        </div>

        `;


    });

}



function removerInvestimento(index){

    dados.investimentos.splice(index,1);

    salvarDados();

    atualizarDashboard();

}



// ==========================================
// METAS FINANCEIRAS
// ==========================================


function criarMeta(){


    let nome=document.getElementById("nomeMeta").value;

    let valor=document.getElementById("valorMeta").value;



    if(nome==="" || valor===""){

        alert("Preencha a meta");

        return;

    }



    dados.metas.push({

        nome:nome,

        valor:Number(valor),

        atual:0

    });



    salvarDados();

    atualizarDashboard();



}




function mostrarMetas(){


    let area=document.getElementById("listaMetas");


    if(!area)return;



    area.innerHTML="";



    dados.metas.forEach((meta,index)=>{


        let porcentagem=(meta.atual/meta.valor)*100;


        if(porcentagem>100){
            porcentagem=100;
        }



        area.innerHTML += `


        <div class="meta-card">


        <h3>
        ${meta.nome}
        </h3>


        <p>
        ${dinheiro(meta.atual)}
        de ${dinheiro(meta.valor)}
        </p>


        <div class="barra">

            <div class="progresso"
            style="width:${porcentagem}%">
            </div>

        </div>



        <button onclick="adicionarNaMeta(${index})">

        Adicionar valor

        </button>


        </div>


        `;


    });



}




function adicionarNaMeta(index){


    let valor=prompt("Quanto adicionar?");


    if(valor){


        dados.metas[index].atual += Number(valor);


        salvarDados();

        atualizarDashboard();


    }


}



// ==========================================
// FATURA DO CARTÃO
// ==========================================


function adicionarFatura(){


    let nome=document.getElementById("nomeFatura").value;

    let valor=document.getElementById("valorFatura").value;

    let parcelas=document.getElementById("parcelasFatura").value;



    if(!valor || !parcelas){

        alert("Preencha a fatura");

        return;

    }



    dados.faturas.push({


        nome:nome,

        valor:Number(valor),

        parcelas:Number(parcelas),

        pago:0


    });



    salvarDados();

    atualizarFaturas();



}




function atualizarFaturas(){


    let lista=document.getElementById("listaFaturas");


    if(!lista)return;



    lista.innerHTML="";



    dados.faturas.forEach((fat,index)=>{


        let parcela=fat.valor/fat.parcelas;



        lista.innerHTML += `


        <div class="card-item">


        <span>

        ${fat.nome}

        <br>

        ${fat.pago}/${fat.parcelas} parcelas

        </span>



        <strong>

        ${dinheiro(parcela)}

        /mês

        </strong>



        <button onclick="pagarParcela(${index})">

        Pagar

        </button>



        </div>


        `;



    });



}




function pagarParcela(index){


    dados.faturas[index].pago++;



    if(dados.faturas[index].pago >= dados.faturas[index].parcelas){


        alert("🎉 Fatura finalizada! Valor liberado para investir.");


    }



    salvarDados();

    atualizarFaturas();



}
// ==========================================
// CONSÓRCIO
// ==========================================


function calcularConsorcio(){

    let valor = document.getElementById("valorConsorcio").value;
    let parcelas = document.getElementById("parcelasConsorcio").value;


    if(!valor || !parcelas){

        alert("Preencha os dados do consórcio");

        return;

    }


    dados.consorcio.valor = Number(valor);
    dados.consorcio.parcelas = Number(parcelas);


    let mensal = Number(valor) / Number(parcelas);


    let resultado = document.getElementById("resultadoConsorcio");


    if(resultado){

        resultado.innerHTML =
        "Parcela estimada: " + dinheiro(mensal);

    }


    salvarDados();

}



// ==========================================
// LIMPAR TODOS OS DADOS
// ==========================================


function limparDados(){


    let confirmar = confirm(
        "Deseja apagar todos os dados do aplicativo?"
    );


    if(confirmar){


        localStorage.removeItem("financeAI");


        location.reload();


    }


}



// ==========================================
// PREVISÃO FINANCEIRA
// ==========================================


function previsao6Meses(){


    let saldo = saldoAtual();


    let previsao = saldo * 6;



    let area=document.getElementById("previsao");


    if(area){

        area.innerHTML =
        "Previsão de saldo em 6 meses: "
        + dinheiro(previsao);

    }



}



// ==========================================
// CARREGAR APLICATIVO
// ==========================================


window.onload=function(){


    atualizarDashboard();


    atualizarFaturas();


    previsao6Meses();


};



// ==========================================
// SERVICE WORKER PWA
// ==========================================


if("serviceWorker" in navigator){


    navigator.serviceWorker.register("sw.js")

    .then(()=>{

        console.log(
        "Aplicativo funcionando offline"
        );

    })

    .catch(()=>{

        console.log(
        "Erro no Service Worker"
        );

    });


}
