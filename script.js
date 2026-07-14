// ======================================
// FINANCE CONTROL AI PRO v3
// SCRIPT PRINCIPAL
// ======================================


let dados =
JSON.parse(
localStorage.getItem("financeAI")
)
||
{

salario:1600,

gastos:[],

investimentos:[],

metas:[],

faturas:[],

consorcio:{}

};




let graficoFinanceiro;

let graficoEvolucao;






// ======================================
// SALVAR
// ======================================


function salvarDados(){


localStorage.setItem(

"financeAI",

JSON.stringify(dados)

);


}







// ======================================
// FORMATAÇÃO
// ======================================


function dinheiro(valor){


return Number(valor)

.toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

);


}








// ======================================
// CÁLCULOS
// ======================================


function totalGastos(){


return dados.gastos.reduce(

(total,item)=>

total + Number(item.valor),

0

);


}







function totalInvestimentos(){


return dados.investimentos.reduce(

(total,item)=>

total + Number(item.valor),

0

);


}







function totalFaturas(){


return dados.faturas.reduce(

(total,item)=>

total + Number(item.valor),

0

);


}







function saldoAtual(){


return dados.salario

-

totalGastos()

-

totalFaturas();


}







// ======================================
// ATUALIZAR DASHBOARD
// ======================================


function atualizarDashboard(){



let saldo =
document.getElementById("saldo");



if(saldo)

saldo.innerHTML =
dinheiro(saldoAtual());






let gastos =
document.getElementById("totalGastos");



if(gastos)

gastos.innerHTML =
dinheiro(totalGastos());







let investimentos =
document.getElementById("totalInvestimentos");



if(investimentos)

investimentos.innerHTML =
dinheiro(totalInvestimentos());







let faturas =
document.getElementById("totalFaturas");



if(faturas)

faturas.innerHTML =
dinheiro(totalFaturas());





atualizarIA();


criarGrafico();


criarGraficoEvolucao();


atualizarMeta();


previsao6Meses();



}






// ======================================
// MUDAR TELAS
// ======================================


function abrirTela(nome){



document
.querySelectorAll(".tela")
.forEach(

t=>t.style.display="none"

);




let tela =
document.getElementById(nome);



if(tela)

tela.style.display="block";



if(nome==="gastos")

mostrarGastos();



if(nome==="investimentos")

mostrarInvestimentos();



if(nome==="metas")

mostrarMetas();



if(nome==="fatura")

mostrarFaturas();



}
// ======================================
// GASTOS
// ======================================


function adicionarGasto(){


let nome =
document.getElementById("nomeGasto").value;



let valor =
document.getElementById("valorGasto").value;



let categoria =
document.getElementById("categoriaGasto").value;




if(!nome || !valor){

alert("Preencha os dados");

return;

}





dados.gastos.push({

nome:nome,

valor:Number(valor),

categoria:categoria,

data:new Date().toLocaleDateString()

});




salvarDados();


mostrarGastos();


atualizarDashboard();




document.getElementById("nomeGasto").value="";

document.getElementById("valorGasto").value="";


}








function mostrarGastos(){


let lista =
document.getElementById("listaGastos");



if(!lista)return;



lista.innerHTML="";




dados.gastos.forEach(

(gasto,index)=>{


lista.innerHTML += `


<div class="card-item">


<span>

${gasto.nome}

<br>

${gasto.categoria}

</span>



<strong>

${dinheiro(gasto.valor)}

</strong>




<button onclick="removerGasto(${index})">

X

</button>



</div>


`;


}


);



}








function removerGasto(index){



dados.gastos.splice(index,1);


salvarDados();


mostrarGastos();


atualizarDashboard();



}









// ======================================
// INVESTIMENTOS
// ======================================


function adicionarInvestimento(){


let valor =
document.getElementById(
"valorInvestimento"
).value;



if(!valor){

alert("Digite o valor");

return;

}





dados.investimentos.push({

valor:Number(valor),

data:new Date().toLocaleDateString()

});




salvarDados();


mostrarInvestimentos();


atualizarDashboard();



}







function mostrarInvestimentos(){



let lista =
document.getElementById(
"listaInvestimentos"
);



if(!lista)return;




lista.innerHTML="";



dados.investimentos.forEach(

(item,index)=>{



lista.innerHTML+=`


<div class="card-item">


<span>

Investimento

</span>



<strong>

${dinheiro(item.valor)}

</strong>



<button onclick="removerInvestimento(${index})">

X

</button>



</div>


`;



}


);



}







function removerInvestimento(index){


dados.investimentos.splice(index,1);


salvarDados();


mostrarInvestimentos();


atualizarDashboard();


}









// ======================================
// METAS
// ======================================


function criarMeta(){


let nome =
document.getElementById(
"nomeMeta"
).value;



let valor =
document.getElementById(
"valorMeta"
).value;




if(!nome || !valor){

alert("Preencha a meta");

return;

}





dados.metas.push({

nome:nome,

valor:Number(valor),

atual:0

});




salvarDados();


mostrarMetas();


atualizarDashboard();



}






function mostrarMetas(){


let lista =
document.getElementById(
"listaMetas"
);



if(!lista)return;




lista.innerHTML="";




dados.metas.forEach(

(meta,index)=>{


let porcentagem =
(meta.atual/meta.valor)*100;



if(porcentagem>100)

porcentagem=100;




lista.innerHTML+=`


<div class="meta-card">


<h3>

${meta.nome}

</h3>



<p>

${dinheiro(meta.atual)}

de

${dinheiro(meta.valor)}

</p>




<div class="barra">


<div class="progresso"

style="width:${porcentagem}%">

</div>



</div>



<button onclick="adicionarMeta(${index})">

Adicionar valor

</button>



</div>


`;



}


);



}







function adicionarMeta(index){


let valor =
prompt(
"Adicionar valor:"
);



if(valor){


dados.metas[index].atual += Number(valor);


salvarDados();


mostrarMetas();


atualizarDashboard();


}


}
// ======================================
// FATURAS
// ======================================


function adicionarFatura(){


let nome =
document.getElementById("nomeFatura").value;


let valor =
document.getElementById("valorFatura").value;


let parcelas =
document.getElementById("parcelasFatura").value;




if(!valor || !parcelas){

alert("Preencha os dados");

return;

}



dados.faturas.push({

nome:nome,

valor:Number(valor),

parcelas:Number(parcelas),

pago:0

});



salvarDados();


mostrarFaturas();


atualizarDashboard();



}






function mostrarFaturas(){


let lista =
document.getElementById("listaFaturas");



if(!lista)return;




lista.innerHTML="";



dados.faturas.forEach((fat,index)=>{


let mensal =
fat.valor / fat.parcelas;



lista.innerHTML += `


<div class="card-item">


<span>

${fat.nome}

<br>

Parcela ${fat.pago}/${fat.parcelas}

</span>




<strong>

${dinheiro(mensal)}

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



if(
dados.faturas[index].pago >=
dados.faturas[index].parcelas
){


alert(
"🎉 Parcela finalizada! Valor liberado."
);


}



salvarDados();


mostrarFaturas();


}









// ======================================
// CONSÓRCIO
// ======================================


function calcularConsorcio(){



let valor =
document.getElementById("valorConsorcio").value;



let parcelas =
document.getElementById("parcelasConsorcio").value;




if(!valor || !parcelas){

alert("Preencha os dados");

return;

}



let mensal =
Number(valor) / Number(parcelas);



document.getElementById(
"resultadoConsorcio"
).innerHTML =

"Parcela aproximada: "
+
dinheiro(mensal);




dados.consorcio={

valor:Number(valor),

parcelas:Number(parcelas),

mensal:mensal

};



salvarDados();



}








// ======================================
// SIMULADOR
// ======================================


function calcularInvestimento(){



let meta =
document.getElementById(
"metaInvestimento"
).value;



let meses =
document.getElementById(
"mesesInvestimento"
).value;




if(!meta || !meses){

alert("Preencha os dados");

return;

}




let mensal =
Number(meta) /
Number(meses);




document.getElementById(
"resultadoInvestimento"
).innerHTML =

"Investindo "
+
dinheiro(mensal)
+
" por mês você chega no objetivo.";





}









// ======================================
// GRÁFICO PRINCIPAL
// ======================================
function criarGrafico(){

let canvas = document.getElementById("graficoFinanceiro");

if(!canvas) return;


if(graficoFinanceiro){

graficoFinanceiro.destroy();

}


graficoFinanceiro = new Chart(canvas,{

type:"doughnut",

data:{

labels:[
"Gastos",
"Investimentos",
"Livre"
],

datasets:[{

data:[

totalGastos(),

totalInvestimentos(),

Math.max(saldoAtual(),0)

]

}]

},

options:{

responsive:true

}

});


}
// ======================================
// GRÁFICO 6 MESES
// ======================================
function criarGraficoEvolucao(){

let canvas = document.getElementById("graficoEvolucao");

if(!canvas){
return;
}


if(graficoEvolucao){
graficoEvolucao.destroy();
}



graficoEvolucao = new Chart(canvas, {

type:"line",

data:{

labels:[
"Agora",
"1 mês",
"2 meses",
"3 meses",
"4 meses",
"5 meses",
"6 meses"
],


datasets:[{

label:"Patrimônio",

data:[

saldoAtual(),

saldoAtual()+100,

saldoAtual()+200,

saldoAtual()+300,

saldoAtual()+400,

saldoAtual()+500,

saldoAtual()+600

],

tension:0.4

}]


},


options:{

responsive:true

}


});


}
// ======================================
// META E PREVISÃO
// ======================================


function atualizarMeta(){


let barra =
document.getElementById(
"barraMeta"
);


let texto =
document.getElementById(
"textoMeta"
);



if(!barra || !texto)return;



if(dados.metas.length===0){

texto.innerHTML =
"Nenhuma meta criada";

barra.style.width="0%";

return;

}




let meta=dados.metas[0];



let porcentagem =
(meta.atual/meta.valor)*100;



if(porcentagem>100)

porcentagem=100;



barra.style.width =
porcentagem+"%";



texto.innerHTML =
meta.nome+
" - "+
porcentagem.toFixed(0)
+
"%";



}





function previsao6Meses(){


let campo =
document.getElementById(
"previsao6Meses"
);



if(!campo)return;



let futuro =
saldoAtual() +
(totalInvestimentos()*6);



campo.innerHTML =

"Previsão em 6 meses: "
+
dinheiro(futuro);



}









// ======================================
// IA
// ======================================


function atualizarIA(){


let campo =
document.getElementById(
"mensagemIA"
);



if(!campo)return;



if(totalGastos()>dados.salario){


campo.innerHTML =
"⚠️ Seus gastos estão acima do salário.";


}else{


campo.innerHTML =
"✅ Boa organização. Continue investindo.";


}


}









// ======================================
// LIMPAR
// ======================================


function limparDados(){


if(confirm("Apagar todos os dados?")){


localStorage.removeItem(
"financeAI"
);



location.reload();



}


}









// ======================================
// INICIALIZAÇÃO
// ======================================


window.addEventListener(
"DOMContentLoaded",

()=>{


abrirTela("inicio");


atualizarDashboard();


mostrarGastos();


mostrarInvestimentos();


mostrarMetas();


mostrarFaturas();



}

);






// ======================================
// CORREÇÃO DE ATUALIZAÇÃO V3
// ======================================

window.addEventListener(
"DOMContentLoaded",

()=>{


abrirTela("inicio");


setTimeout(()=>{


atualizarDashboard();


criarGraficoEvolucao();


},800);



}
);
