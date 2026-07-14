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
