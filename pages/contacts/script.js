// Define o título desta rota.
changeTitle('Faça contato');

// Se o formulário foi enviado, executa 'runContacts':
$('#contacts').submit(runContacts);

// Processa formulário enviado:
function runContacts() {

    // Inicializa variável que receberá os dados dos campos:
    let form = {};

    // Extrai cada campo do formulário e...
    $(this).find(':input').each(
        function () { // Executa a função:
            fieldName = $(this).attr('name'); // Obtém o nome do campo → atributo 'name=""':
            fieldData = $(this).val().trim(); // Obtém o valor preenchido no campo:
            form[fieldName] = fieldData; // Adiciona na lista de campos:
            $('#' + fieldName).val(fieldData); // Atualiza o campo no próprio formulário:
        }
    );

    $.post(site.apicontacts, form) // Envia dados para o back-end usando o método "POST":
        .done(function (data) { // Quando concluir o envio, recebe a resposta e armazena em 'data':
            if (data.status == 'error') { // Se a resposta foi um erro...
                $('#error').html(listError(data.return)); // Formata e exibe a mensagem de erro dentro do formulário:
                $('#error').slideDown('fast'); // Exibe a caixa de erro:
                setTimeout(function () { // Inicializa um timer:
                    $('#error').slideUp('fast'); // Quando o timer terminar, oculta a caixa de erro:
                }, 10000); // O timer fura 10 segundos:
            } else { // Se a resposta não foi um erro...
                let firstName = data.return.name.split(' ')[0]; // Obtém o primeiro nome do remetente:
                // Formata e exime a mensagem de confirmação no lugar do formulário:
                $('#contacts').html(`
<h3>Olá ${firstName}!</h3>
<blockquote>Seu contato foi enviado com sucesso.</blockquote>
<em>Obrigado...</em>
                `);

                // Rola a página para o topo:
                $(window).scrollTop(0);
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
