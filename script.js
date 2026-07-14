
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
