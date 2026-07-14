// ======================================
// FINANCE CONTROL AI PRO v4
// ======================================


let dados = JSON.parse(
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



let graficoFinanceiro = null;

let graficoEvolucao = null;







// ===============================
// SALVAR
// ===============================


function salvarDados(){

localStorage.setItem(
"financeAI",
JSON.stringify(dados)
);

}







// ===============================
// FORMATAÇÃO
// ===============================


function dinheiro(valor){

return Number(valor).toLocaleString(
"pt-BR",
{
style:"currency",
currency:"BRL"
}
);

}







// ===============================
// CÁLCULOS
// ===============================


function totalGastos(){

return dados.gastos.reduce(
(a,b)=>a+Number(b.valor),
0
);

}



function totalInvestimentos(){

return dados.investimentos.reduce(
(a,b)=>a+Number(b.valor),
0
);

}




function totalFaturas(){

return dados.faturas.reduce(
(a,b)=>a+Number(b.valor),
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








// ===============================
// DASHBOARD
// ===============================


function atualizarDashboard(){


document.getElementById("saldo").innerHTML =
dinheiro(saldoAtual());



document.getElementById("totalGastos").innerHTML =
dinheiro(totalGastos());



document.getElementById("totalInvestimentos").innerHTML =
dinheiro(totalInvestimentos());



document.getElementById("totalFaturas").innerHTML =
dinheiro(totalFaturas());



criarGrafico();

criarGraficoEvolucao();

atualizarMeta();

previsao6Meses();

atualizarIA();


}









// ===============================
// MENU
// ===============================


function abrirTela(nome){


document
.querySelectorAll(".tela")
.forEach(
(t)=>t.style.display="none"
);



document.getElementById(nome)
.style.display="block";


}








// ===============================
// GRÁFICO PRINCIPAL
// ===============================


function criarGrafico(){



let canvas =
document.getElementById(
"graficoFinanceiro"
);



if(!canvas)return;



if(graficoFinanceiro){

graficoFinanceiro.destroy();

}




graficoFinanceiro =
new Chart(canvas,{


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








// ===============================
// GRÁFICO 6 MESES
// ===============================


function criarGraficoEvolucao(){



let canvas =
document.getElementById(
"graficoEvolucao"
);



if(!canvas)return;




if(graficoEvolucao){

graficoEvolucao.destroy();

}



let base =
saldoAtual();



let valores=[

base,

base+100,

base+200,

base+300,

base+400,

base+500,

base+600

];




graficoEvolucao =
new Chart(canvas,{


type:"line",



data:{


labels:[

"Hoje",

"1 mês",

"2 meses",

"3 meses",

"4 meses",

"5 meses",

"6 meses"

],



datasets:[{

label:"Evolução financeira",

data:valores

}]


},



options:{

responsive:true

}



});


}
// ===============================
// GASTOS
// ===============================


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



}



function mostrarGastos(){


let lista =
document.getElementById("listaGastos");


if(!lista)return;


lista.innerHTML="";



dados.gastos.forEach((item,index)=>{


lista.innerHTML += `


<div class="card-item">


<span>

${item.nome}

<br>

${item.categoria}

</span>



<strong>

${dinheiro(item.valor)}

</strong>



<button onclick="removerGasto(${index})">

X

</button>



</div>

`;



});


}




function removerGasto(index){


dados.gastos.splice(index,1);


salvarDados();


mostrarGastos();


atualizarDashboard();


}








// ===============================
// INVESTIMENTOS
// ===============================



function adicionarInvestimento(){


let valor =
document.getElementById("valorInvestimento").value;



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
document.getElementById("listaInvestimentos");



if(!lista)return;



lista.innerHTML="";



dados.investimentos.forEach((item,index)=>{


lista.innerHTML += `


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


});



}






function removerInvestimento(index){


dados.investimentos.splice(index,1);


salvarDados();


mostrarInvestimentos();


atualizarDashboard();


}








// ===============================
// METAS
// ===============================


function criarMeta(){


let nome =
document.getElementById("nomeMeta").value;



let valor =
document.getElementById("valorMeta").value;



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
document.getElementById("listaMetas");



if(!lista)return;



lista.innerHTML="";



dados.metas.forEach((meta,index)=>{



let porcentagem =
(meta.atual/meta.valor)*100;



if(porcentagem>100)

porcentagem=100;



lista.innerHTML += `


<div class="meta-card">


<h3>

${meta.nome}

</h3>



<p>

${dinheiro(meta.atual)}

/
${dinheiro(meta.valor)}

</p>



<div class="barra">


<div class="progresso"

style="width:${porcentagem}%">

</div>


</div>



<button onclick="adicionarMeta(${index})">

Adicionar dinheiro

</button>



</div>


`;



});



}





function adicionarMeta(index){


let valor =
prompt("Valor para adicionar");


if(valor){


dados.metas[index].atual += Number(valor);


salvarDados();


mostrarMetas();


atualizarDashboard();


}


}
// ===============================
// FATURAS
// ===============================


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



dados.faturas.forEach((item,index)=>{


let mensal =
item.valor / item.parcelas;



lista.innerHTML += `


<div class="card-item">


<span>

${item.nome}

<br>

${item.pago}/${item.parcelas}

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
"🎉 Parcela finalizada!"
);


}



salvarDados();


mostrarFaturas();


}








// ===============================
// CONSÓRCIO
// ===============================


function calcularConsorcio(){


let valor =
document.getElementById("valorConsorcio").value;



let meses =
document.getElementById("parcelasConsorcio").value;



if(!valor || !meses){

alert("Preencha os dados");

return;

}



let parcela =
Number(valor)/Number(meses);



document.getElementById(
"resultadoConsorcio"
).innerHTML =

"Parcela: "
+
dinheiro(parcela);



dados.consorcio={

valor:Number(valor),

meses:Number(meses),

parcela:parcela

};



salvarDados();


}








// ===============================
// SIMULADOR
// ===============================


function calcularInvestimento(){


let meta =
document.getElementById("metaInvestimento").value;


let meses =
document.getElementById("mesesInvestimento").value;



if(!meta || !meses){

alert("Preencha os campos");

return;

}



let mensal =
Number(meta)/Number(meses);



document.getElementById(
"resultadoInvestimento"
).innerHTML =

"Invista "
+
dinheiro(mensal)
+
" por mês.";





}








// ===============================
// IA
// ===============================


function atualizarIA(){


let campo =
document.getElementById(
"mensagemIA"
);



if(!campo)return;



if(totalGastos()>dados.salario){


campo.innerHTML =
"⚠️ Seus gastos ultrapassaram seu salário.";


}else{


campo.innerHTML =
"✅ Suas finanças estão sob controle.";


}



}








// ===============================
// META HOME
// ===============================


function atualizarMeta(){


let barra =
document.getElementById("barraMeta");


let texto =
document.getElementById("textoMeta");



if(!barra || !texto)return;



if(dados.metas.length===0){


texto.innerHTML =
"Nenhuma meta criada";


barra.style.width="0%";


return;

}



let meta =
dados.metas[0];



let porcentagem =
(meta.atual/meta.valor)*100;



if(porcentagem>100)

porcentagem=100;



barra.style.width =
porcentagem+"%";



texto.innerHTML =

meta.nome+
" - "
+
porcentagem.toFixed(0)
+
"%";


}









// ===============================
// PREVISÃO
// ===============================


function previsao6Meses(){


let campo =
document.getElementById(
"previsao6Meses"
);



if(!campo)return;



let futuro =

saldoAtual()
+
(totalInvestimentos()*6);



campo.innerHTML =

"🔮 Previsão em 6 meses: "
+
dinheiro(futuro);



}









// ===============================
// LIMPAR
// ===============================


function limparDados(){


if(confirm("Apagar todos os dados?")){


localStorage.removeItem(
"financeAI"
);


location.reload();


}


}









// ===============================
// INICIAR APP
// ===============================


window.addEventListener(
"DOMContentLoaded",

()=>{


let inicio =
document.getElementById("inicio");


if(inicio){

inicio.style.display="block";

}



mostrarGastos();

mostrarInvestimentos();

mostrarMetas();

mostrarFaturas();


setTimeout(()=>{

atualizarDashboard();

},500);



});
// ===============================
// PWA
// ===============================


if(
"serviceWorker" in navigator
){


navigator.serviceWorker.register(
"sw.js"
);


}
