document.getElementById("campo-chave").style.display = 'none';
funcao = 0;

function enviar(a){
    var tipo = document.getElementById("select-tipo").value;
    var acao = funcao;

    var texto = document.getElementById("texto").value;
    var k = document.getElementById("k").value;
    var valor = "";

    if(texto.trim()){
        if(acao == '0'){ // criptografar

            if(tipo == '0'){ // base 64
                var valor = encodeBase64(texto.trim());
                document.getElementById("resultado").innerHTML = valor;
            } else { // cifra de cesar

                if(k.trim()){
                    var valor = encodeCesar(texto.trim(), k);
                    document.getElementById("resultado").innerHTML = valor;
                } else {
                    alert("A chave deve ser informada!");
                }
                
            }

        } else { // descriptografar
            if(tipo == '0'){ // base 64
                var valor = decodeBase64(texto.trim());
                document.getElementById("resultado").innerHTML = valor;
            } else { // cifra de cesar

                if(k.trim()){
                    var valor = decodeCesar(texto.trim(), k);
                    document.getElementById("resultado").innerHTML = valor;
                } else {
                    alert("A chave deve ser informada!");
                }

            }
        }
    } else {
        alert("O texto precisa ser informado!");
    }

    

    return false;
}

function onChange(){
    var tipo = document.getElementById("select-tipo").value;

    switch(tipo){
        case '0':
            document.getElementById("campo-chave").style.display = 'none';
            break;
        case '1':
            document.getElementById("campo-chave").style.display = 'block';
            break;
    }

    
}

function onCheck(el){
    funcao = el.value;
    var el = document.getElementById('btn-enviar');

    switch(funcao){
        case '0':
            el.value = "Codificar Mensagem!";
            break;
        case '1':
            el.value = "Decodificar Mensagem!";
            break;
    }
}

function caesarCipher(word, next){
    next = next % 26;
    let res = "";

    for (const letter of word){
        let letterCode = letter.charCodeAt(0);
        if (letterCode >= 65 && letterCode <= 90) {
            letterCode = letterCode + next;
            if (letterCode > 90) {
                letterCode = letterCode - 26;
            } else if (letterCode < 65) {
                letterCode = letterCode + 26;
            }
        } else if (letterCode >= 97 && letterCode <= 122) {
            letterCode = letterCode + next;

            if (letterCode > 122) {
                letterCode = letterCode - 26;
            } else if (letterCode < 97) {
                letterCode = letterCode + 26;
            }
        }

        res = res + String.fromCharCode(letterCode);
    }

    return res;
}

function encodeBase64(text){
    return btoa(text);
}

function decodeBase64(text){
    return atob(text);
}

function encodeCesar(text, k){
    return caesarCipher(text, k);
}

function decodeCesar(text, k){
    return caesarCipher(text, -k);
}