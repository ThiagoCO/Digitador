$("#troca-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);
function fraseAleatoria(){
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases",trocaFraseAleatoria).fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        },2000);
    }) .always(function(){ //sempre escondendo o spinner
        $("#spinner").toggle();
    });
    atualizaPlacar();
}
function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempo(data[numeroAleatorio].tempo);   
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();    
    var dados = {id : fraseId}; 
    $.get("http://localhost:3000/frases",dados ,localizaFrase).fail(function(){
        $(".erro").toggle();
        setTimeout(function(){
            $(".erro").toggle();
        },2000);
    }).always(function(){ //sempre escondendo o spinner
        $("#spinner").toggle();
    });
}

function localizaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempo(data.tempo);
}

function sincronizaPlacar(){
     
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        console.log(linhas);
        if(usuario == ""){
            return;
        }
        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score);

    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("teste");
    });
    console.log(placar);
 }

 function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            $("tbody").append(linha);
        });
    });
}