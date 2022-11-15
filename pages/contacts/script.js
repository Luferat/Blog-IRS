// Define o título desta rota:
changeTitle('Faça contato');

// Atualiza o campo 'sendfrom' com o endereço correto do site:
$('#sendfrom').val(location.origin + '/');

// Se o formulário foi enviado, executa 'runContacts':
$('#contacts').submit(runContacts);

// Processa formulário enviado:
function runContacts() {

    // Inicializa variável que receberá os dados dos campos como um objeto → {}:
    let form = {};

    // Extrai cada campo do formulário e...
    $(this).find(':input').each(
        function () { // Executa a função para cada campo.
            fieldName = $(this).attr('name'); // Obtém o nome do campo → atributo 'name=""'.
            fieldData = $(this).val().trim(); // Obtém o valor preenchido no campo → val().
            form[fieldName] = fieldData; // Adiciona na lista de campos → form[nomeCampo] = valorCampo.
            $('#' + fieldName).val(fieldData); // Atualiza o campo no próprio formulário.
        }
    );

    $.post($(this).attr('action'), form) // Envia dados para o back-end usando o método "POST".
        .done(function (data) { // Quando concluir o envio (done), recebe a resposta, armazena em 'data' e executa a função.
            if (data.status == 'error') { // Se a resposta foi um erro → status = 'error'...
                $('#error').html(listError(data.return)); // Formata e exibe a mensagem de erro dentro do formulário.
                $('#error').slideDown('fast'); // Exibe a caixa de erro que é oculta por padrão.
                setTimeout(function () { // Inicializa um temporizador.
                    $('#error').slideUp('fast'); // Quando o temporizador terminar, oculta a caixa de erro.
                }, 10000); // O timer dura 10 segundos → 10000 milissegundos.
            } else { // Se a resposta não foi um erro...
                let firstName = data.return.name.split(' ')[0]; // Obtém o primeiro nome do remetente.
                // Formata e exime a mensagem de confirmação no lugar do formulário.
                $('#contacts').html(`
<h3>Olá ${firstName}!</h3>
<blockquote>Seu contato foi enviado com sucesso.</blockquote>
<em>Obrigado...</em>
                `);
                $(window).scrollTop(0); // Rola a página para o topo:
            }
        });

    // Tarmina a função sem fazer mais nada, inclusive, bloqueando o envio 'normal' do formulário:
    return false;
}

// Monta a lista HTML de erros e formata a mensagem de erro:
function listError(errorArray) {
    let output = `
<div class="error">
    <h3>Oooops!</h3>
    <p>Ocorreram erros que impediram o envio do seu contato:</p>
    <ul>
    `;
    errorArray.forEach(function (data) {
        output += `<li>${data};</li>`;
    })
    output += `
    </ul>
    <p>Por favor, verifique os erros e tente novamente.</p>
</div>
    `;
    return output;
}
