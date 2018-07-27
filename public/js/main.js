var campo = $(".campo-digitacao");
$(document).ready(function(){
    atualizaTamanhoFrase();
    incializaContador();
    inializaCronometro();
    $("#reiniciar").on("click",function(){
        reiniciador();
    });  
   
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numeroPalavaras = frase.split(" ").length;
    var tamanhoFrase = $(".tamanhoFrase");
    tamanhoFrase.text(numeroPalavaras);
    
}
function incializaContador(){
    campo.on("input",function(){       
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length -1;
        var contadorPalavras = $(".Contador-palavras");
        contadorPalavras.text(qtdPalavras);
        var contadorCaracteres = $(".Contador-caracteres");
        contadorCaracteres.text(conteudo.length);
    });
    
}
function inializaCronometro(){
    campo.one("focus",function(){
        var tempo = $(".tempo").text();
        var cronometroId = setInterval(function(){
            $(".tempo").text(tempo);
           
            
            if(tempo == 0){
                clearInterval(cronometroId);      
                finalizaJogo();        
            }
           tempo--;
        }, 1000);
    
    });
}

function reiniciador(){
    campo.removeClass("campo-desabilitado");        
    campo.attr("disabled",false);
    campo.val("");
    $(".Contador-palavras").text("0");
    $(".Contador-caracteres").text("0");
    $(".tempo").text("10");
    inializaCronometro();

}

function inserePlacar(){
    var tabela = $(".placar").find("tbody");
    var qtdPalavras = $(".Contador-palavras").text();
    var usuario = "thiago";
    var qtdCaracteres = $(".Contador-caracteres").text();
    var botaoRemover = "<a href='#'> <i class='small material-icons'>delete</i> </a>"; 
    var linha = "<tr>"+
                     "<td>"+ usuario +"</td>"+
                     "<td>"+ qtdPalavras +"</td>"+
                     "<td>"+ qtdCaracteres +"</td>"+
                     "<td class='remover'>"+ botaoRemover + "</td>"+
                "<tr>";
    tabela.append(linha);
    removerTabela();
    
}
function finalizaJogo(){
    campo.attr("disabled",true);            
    campo.addClass("campo-desabilitado");
    inserePlacar();
}


//function removerTabela(){   
//$(".remover").on("click",function(){
    //$(this).parent().parent().remove();
  //  console.log("teste");
//});
//}

function removerTabela(){   
            $(".remover").on("click",function(event){           
            $(this).parent().remove();
       
    });   
}

 
