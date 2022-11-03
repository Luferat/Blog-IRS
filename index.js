/**
 * JavaScript do aplicativo.
 * Depende de "jQuery" (https://jquery.com/).
 *
 * OBS 1: Este é o aplicativo principal, para que o tema (template) do site
 * opere. Posteriormente, quando necessário, cada página (conteúdo) terá seu
 * próprio JavaScript, assim, somente o JavaScript necessário será carregado.
 *
 * OBS 2: Todas as instruções que iniciam com um cifrão ($) são da biblioteca
 * jQuery, ou seja, não são JavaScript "puro" (JavaScript Vanilla).
 *
 * Para saber mais:
 *   • https://www.w3schools.com/js/
 *   • https://www.w3schools.com/jsref/
 *   • https://www.w3schools.com/jquery/
 **/

// Executa aplicativo "runApp" quando o documento estiver pronto.
$(document).ready(runApp);

function runApp() {

  /**
   * Obtém nome da página que está sendo acessada, do 'localStorage'.
   * Estude '/404.html' para mais detalhes.
   **/
  let path = localStorage.getItem('path');
  if (path) {                         // Se cliente está acessando uma página específica...
    localStorage.removeItem('path');  // Limpa o 'localStorage'.
    loadPage(path);                   // Acessa a página solicitada.
  } else {                            // Se não solicitou uma página específica...
    loadPage('home');                 // Carrega a página inicial.
  }

  /**
   * Monitora cliques em todos os links (tags <a>).
   * Caso ocorra, executa a função 'routerLink()'.
   **/
  $(document).on('click', 'a', routeLink);

}

// Função que processa cliques nos links.
function routeLink() {

  // Captura o valor do atributo 'href' do link clicado.
  let href = $(this).attr('href');

  if (                                  // Se o link clicado...
    href.substr(0, 7) === 'http://' ||  // ... inicia com 'http://' OU
    href.substr(0, 8) === 'https://' || // ... inicia com 'https://' OU
    href.substr(0, 1) === '#'           // ... inicia com '#'
  ) return true;                        // Retorna o controle para o HTML.

  // Carrega a página solicitada pela rota.
  loadPage(href);

  // Encerra a função, sem fazer mais nada e tirando o controle do HTML.
  return false;
}

// Função que carrega todos os componentes da rota.
function loadPage(route) {

  let page = { // Armazena endereços dos componentes da rota atual:
    html: '/pages/' + route + '/index.html', // Componente HTML.
    css: '/pages/' + route + '/style.css',   // Componente CSS.
    js: '/pages/' + route + '/script.js'     // Componente JavaScript.
  }

  $.get(page.html)                          // Obtém o componente HTML.
    .done(function (data) {                 // Quando pronto, armazena em 'data'.
      $('#pageCSS').attr('href', page.css); // Faz o link do componente CSS.
      $('main').html(data);                 // Exibe o arquivo HTML na tag <main>.
      $.getScript(page.js);                 // Carrega e executa o componente JavaScript.
    });

  // Rola a tela para o início, útil para links no final da página:
  window.scrollTo(0, 0);

  // Atualiza URL da página:
  window.history.pushState({}, "", route);

}