// Finance Control AI PRO
// Sistema financeiro inteligente


let salario = 1600;


let gastos = JSON.parse(localStorage.getItem("gastos")) || [];





// Parcelas fixas
const consorcio = 481.38;
const pc = 178.55;
const ssd = 298.67;




function moeda(valor){

return valor.toLocaleString("pt-BR",{

style:"currency",

currency:"BRL"

});

}






function atualizarFinanceiro(){


let totalParcelas = consorcio + pc + ssd;


let totalGastos = gastos.reduce((total,gasto)=>{

return total + gasto.valor;

},0);



let compromissos = totalParcelas + totalGastos;



let livre = salario - compromissos;



document.getElementById("compromissos").innerHTML =
moeda(compromissos);



document.getElementById("livre").innerHTML =
moeda(livre);





// IA financeira


let mensagem="";



if(livre > 800){

mensagem =
"Excelente! Você tem espaço para investir e acelerar suas metas 🚀";

}

else if(livre > 300){

mensagem =
"Boa organização. Continue controlando seus gastos 💰";

}

else{

mensagem =
"Atenção! Seus compromissos estão altos. Evite novas parcelas ⚠️";

}



document.getElementById("mensagemIA").innerHTML =
mensagem;



document.getElementById("analise").innerHTML =

`
Salário: ${moeda(salario)}<br><br>

Parcelas fixas: ${moeda(totalParcelas)}<br><br>

Gastos extras: ${moeda(totalGastos)}<br><br>

Dinheiro livre: ${moeda(livre)}

`;



mostrarGastos();


}




function adicionarGasto(){



let nome =
document.getElementById("nomeGasto").value;



let valor =
Number(document.getElementById("valorGasto").value);




if(nome === "" || valor <=0){

alert("Preencha o gasto corretamente");

return;

}




gastos.push({

nome:nome,

valor:valor

});



localStorage.setItem(

"gastos",

JSON.stringify(gastos)

);



document.getElementById("nomeGasto").value="";

document.getElementById("valorGasto").value="";



atualizarFinanceiro();



}







function mostrarGastos(){



let lista =
document.getElementById("listaGastos");



if(!lista)return;



lista.innerHTML="";



gastos.forEach((gasto,index)=>{


lista.innerHTML +=

`

<div>

<span>
${gasto.nome}
</span>


<strong>

${moeda(gasto.valor)}

</strong>

</div>

`;



});



}







function calcularInvestimento(){



let meta =
Number(document.getElementById("metaInvestimento").value);



let meses =
Number(document.getElementById("mesesInvestimento").value);




if(meta<=0 || meses<=0){

alert("Digite valores válidos");

return;

}




let mensal =
meta / meses;



document.getElementById("resultadoInvestimento").innerHTML =

`

Para alcançar ${moeda(meta)}
em ${meses} meses:

<br><br>

Você precisa investir:

<h2>

${moeda(mensal)}

por mês 🚀

</h2>

`;



}








function mostrarInvestimentos(){


alert(

"Área de investimentos carregada 📈"

);


}







// Meta CB300F

let metaMoto = 30000;

let guardado = 0;



function atualizarMeta(){



let porcentagem =

(guardado/metaMoto)*100;



if(porcentagem>100){

porcentagem=100;

}



let barra =
document.getElementById("barraMeta");



if(barra){

barra.style.width =
porcentagem+"%";

}




let texto =
document.getElementById("metaTexto");



if(texto){

texto.innerHTML =
porcentagem.toFixed(1)+"%";

}



}





// iniciar aplicativo

window.onload=function(){


atualizarFinanceiro();


atualizarMeta();


}
