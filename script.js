// =====================================
// FINANCE CONTROL AI PRO
// SCRIPT PRINCIPAL
// =====================================


let dados = JSON.parse(localStorage.getItem("financeAI")) || {

    salario:1600,

    gastos:[],

    investimentos:[],

    metas:[],

    faturas:[],

    consorcio:{
        valor:0,
        parcelas:0
    }

};





function salvarDados(){

    localStorage.setItem(
        "financeAI",
        JSON.stringify(dados)
    );

}






function dinheiro(valor){

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}






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







function saldoAtual(){

    return dados.salario - totalGastos();

}








// =====================================
// DASHBOARD
// =====================================


function atualizarDashboard(){



let saldo=document.getElementById("saldo");


if(saldo){

saldo.innerHTML=dinheiro(saldoAtual());

}




let gastos=document.getElementById("totalGastos");


if(gastos){

gastos.innerHTML=dinheiro(totalGastos());

}




let investimentos=document.getElementById("totalInvestimentos");


if(investimentos){

investimentos.innerHTML=dinheiro(totalInvestimentos());

}




atualizarIA();


}







// =====================================
// SISTEMA DE TELAS
// =====================================


function abrirTela(nome){


let telas=document.querySelectorAll(".tela");


telas.forEach(t=>{

t.style.display="none";

});



let tela=document.getElementById(nome);



if(tela){

tela.style.display="block";

}



if(nome==="gastos"){

mostrarGastos();

}


if(nome==="investimentos"){

mostrarInvestimentos();

}


if(nome==="metas"){

mostrarMetas();

}


}








// =====================================
// GASTOS
// =====================================


function adicionarGasto(){



let nome=document.getElementById("nomeGasto").value;


let valor=document.getElementById("valorGasto").value;



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


mostrarGastos();


atualizarDashboard();





document.getElementById("nomeGasto").value="";

document.getElementById("valorGasto").value="";



}







function mostrarGastos(){



let lista=document.getElementById("listaGastos");


if(!lista)return;




lista.innerHTML="";



dados.gastos.forEach((gasto,index)=>{


lista.innerHTML+=`


<div class="card-item">


<span>
${gasto.nome}
</span>



<strong>
${dinheiro(gasto.valor)}
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







// =====================================
// INVESTIMENTOS
// =====================================


function adicionarInvestimento(){


let valor=document.getElementById("valorInvestimento").value;



if(valor===""){

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


let lista=document.getElementById("listaInvestimentos");


if(!lista)return;



lista.innerHTML="";



dados.investimentos.forEach((item,index)=>{


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



});



}





function removerInvestimento(index){


dados.investimentos.splice(index,1);


salvarDados();


mostrarInvestimentos();


atualizarDashboard();


}
// =====================================
// METAS
// =====================================


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


mostrarMetas();


}



function mostrarMetas(){



let lista=document.getElementById("listaMetas");


if(!lista)return;



lista.innerHTML="";



dados.metas.forEach((meta,index)=>{



let porcentagem=
(meta.atual/meta.valor)*100;



if(porcentagem>100){

porcentagem=100;

}





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



});



}




function adicionarMeta(index){


let valor=prompt(
"Valor para adicionar:"
);



if(valor){


dados.metas[index].atual += Number(valor);


salvarDados();


mostrarMetas();


}


}







// =====================================
// FATURA CARTÃO
// =====================================


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


mostrarFaturas();


}







function mostrarFaturas(){


let lista=document.getElementById("listaFaturas");


if(!lista)return;



lista.innerHTML="";



dados.faturas.forEach((fat,index)=>{



let mensal=
fat.valor/fat.parcelas;



lista.innerHTML+=`


<div class="card-item">


<span>

${fat.nome}

<br>

${fat.pago}/${fat.parcelas}

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







// =====================================
// CONSÓRCIO
// =====================================


function calcularConsorcio(){



let valor=document.getElementById("valorConsorcio").value;


let parcelas=document.getElementById("parcelasConsorcio").value;



if(!valor || !parcelas){

alert("Preencha os dados");

return;

}




let mensal =
Number(valor)/Number(parcelas);



document.getElementById(
"resultadoConsorcio"
).innerHTML =

"Parcela aproximada: "
+
dinheiro(mensal);





dados.consorcio.valor=
Number(valor);


dados.consorcio.parcelas=
Number(parcelas);



salvarDados();



}







// =====================================
// CALCULADORA INVESTIMENTO
// =====================================


function calcularInvestimento(){



let meta=
document.getElementById(
"metaInvestimento"
).value;



let meses=
document.getElementById(
"mesesInvestimento"
).value;




if(!meta || !meses){

alert("Preencha os dados");

return;

}




let mensal=
Number(meta)/Number(meses);




document.getElementById(
"resultadoInvestimento"
).innerHTML=

"Você precisa investir "
+
dinheiro(mensal)
+
" por mês.";






}







// =====================================
// IA FINANCEIRA
// =====================================


function atualizarIA(){


let campo=
document.getElementById(
"mensagemIA"
);



if(!campo)return;




if(totalGastos()>dados.salario){


campo.innerHTML=
"⚠️ Atenção: seus gastos ultrapassam seu salário.";


}

else{


campo.innerHTML=
"✅ Sua situação financeira está saudável.";


}



}







// =====================================
// LIMPAR DADOS
// =====================================


function limparDados(){



if(confirm(
"Deseja apagar todos os dados?"
)){


localStorage.removeItem(
"financeAI"
);


location.reload();


}



}







// =====================================
// INICIAR APLICATIVO CORRIGIDO
// =====================================

window.addEventListener("DOMContentLoaded",()=>{

    // mostra a tela inicial
    let inicio = document.getElementById("inicio");

    if(inicio){
        inicio.style.display="block";
    }


    // esconde as outras telas
    let telas = document.querySelectorAll(".tela");

    telas.forEach(tela=>{

        if(tela.id !== "inicio"){

            tela.style.display="none";

        }

    });


    atualizarDashboard();

    mostrarFaturas();

    mostrarMetas();


});
