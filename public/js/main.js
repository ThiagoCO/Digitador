
var tempoInicial = $(".tempo").text()
var campo = $(".campo-digitacao");;
$(document).ready(function(){
    atualizaTamanhoFrase();
    incializaContador();
    inializaCronometro();
    $("#reiniciar").on("click",function(){
        reiniciador();
    });  
   monstraplacar();
   trocaCorBorda();
   //usuarioPlacar();
  
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
    $(".tempo").text(tempoInicial);
    inializaCronometro();
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
   

}

function inserePlacar(){
    var tabela = $(".placar").find("tbody");
    var qtdPalavras = $(".Contador-palavras").text();
    var usuario = $(".nome-digitacao").val();
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
    $(".placar").slideDown(500);
    scrollPlacar();
   
    
}
function finalizaJogo(){
    campo.attr("disabled",true);            
    campo.addClass("campo-desabilitado");
    $(".inseriNome").addClass("insereNome-placar");
    usuarioPlacar();
    console.log("teste");
  
}


//function removerTabela(){   
//$(".remover").on("click",function(){
    //$(this).parent().parent().remove();
  //  console.log("teste");
//});
//}

function removerTabela(){           
    $(".remover").on("click",function(event){           
            $(this).parent().fadeOut(1000);
       setTimeout(function(){
        $(this).parent().remove();
       },1000);
    });   
}


function monstraplacar(){
    $("#placar").on("click", function(){
        var placar = $(".placar");
        placar.stop().slideToggle(1000);
    });
}
 
function scrollPlacar(){
    var posicaPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaPlacar+"px"
    },1000);
}

function atualizaTempo(tempo){
    $(".tempo").text(tempo);
    tempoInicial = tempo;
}
function trocaCorBorda(){
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}
function usuarioPlacar(){
   $(".botao-name").one("click",function(){
  
    $(".inseriNome").removeClass("insereNome-placar"); 
    inserePlacar();
     console.log("lopping estranho");
   });
}