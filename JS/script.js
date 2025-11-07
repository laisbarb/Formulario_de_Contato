/* O navegador vai "ouvir" até a página carregar */
window.addEventListener("DOMContentLoaded", function() {
    
    // DEBUG 1: O SCRIPT COMEÇOU
    console.log("Página carregada. Nosso script js/script.js está rodando!");

    // --- 1. ENCONTRANDO OS ELEMENTOS ---
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    // DEBUG 2: VERIFICAR SE ENCONTRAMOS OS ELEMENTOS
    if (!form) {
        console.error("ERRO GRAVE: Não achei o formulário! Verifique se o <form> tem id='contact-form'");
    }
    if (!status) {
        console.error("ERRO GRAVE: Não achei o status! Verifique se o <p> tem id='form-status'");
    }

    // --- 2. NOSSAS FUNÇÕES ---
    function sucesso() {
        console.log("Função SUCESSO foi chamada."); // DEBUG 3
        form.reset(); 
        status.innerHTML = "Obrigado! Sua mensagem foi enviada.";
        status.style.color = "#5a6a58"; 

        console.log("Iniciando 'setTimeout' para limpar a mensagem de sucesso...");
        setTimeout(function() {
            status.innerHTML = ""; 
        }, 5000); 
    }

    function erro() {
        console.log("Função ERRO foi chamada."); // DEBUG 4
        status.innerHTML = "Opa! Houve um problema ao enviar.";
        status.style.color = "#E74C3C";

        console.log("Iniciando 'setTimeout' para limpar a mensagem de erro...");
        setTimeout(function() {
            status.innerHTML = "";
        }, 5000); 
    }

    // --- 3. O "OUVINTE" PRINCIPAL ---
    
    // 'form' pode ser nulo se o ID estiver errado, então checamos
    if (form) {
        form.addEventListener("submit", function(event) {
            
            console.log("Botão 'submit' clicado. Impedindo recarregamento da página..."); // DEBUG 5
            event.preventDefault(); 
            
            var data = new FormData(form);
            
            console.log("Enviando dados para o Formspree..."); // DEBUG 6
            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                // O 'fetch' deu certo, vamos ver o que o Formspree respondeu
                if (response.ok) {
                    console.log("Formspree respondeu com 'OK' (200)."); // DEBUG 7a
                    sucesso(); 
                } else {
                    console.error("Formspree respondeu com um ERRO (response.ok foi 'false')."); // DEBUG 7b
                    erro(); 
                }
            }).catch(error => {
                // O 'fetch' falhou (ex: sem internet)
                console.error("Erro de REDE ao tentar 'fetch'. O usuário está sem internet?", error); // DEBUG 8
                erro();
            });
        });
    }
});