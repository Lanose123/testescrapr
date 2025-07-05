(function() {
    var resultado = [];
    
    // 1. Coleta informações de preço
    var divPreco = document.querySelector('div.jRlVo0');
    if (divPreco) {
        resultado.push('=== PREÇOS ===');
        resultado.push(divPreco.innerText.trim());
        resultado.push('');
    }
    
    // 2. Coleta avaliações e vendas
    var divAvaliacoes = document.querySelector('div.flex.asFzUa');
    if (divAvaliacoes) {
        resultado.push('=== AVALIAÇÕES E VENDAS ===');
        resultado.push(divAvaliacoes.innerText.trim());
        resultado.push('');
    }
    
    // 3. Coleta URL da imagem principal
    var divImagem = document.querySelector('div.UdI7e2 img');
    if (divImagem) {
        resultado.push('=== IMAGEM PRINCIPAL ===');
        resultado.push('URL: ' + (divImagem.src || divImagem.getAttribute('src')));
        resultado.push('Alt: ' + (divImagem.alt || 'Sem descrição'));
        resultado.push('');
    }
    
    // 4. Coleta sections originais (detalhes do produto)
    var divAlvo = document.querySelector('div.page-product__content');
    if (divAlvo) {
        var sections = divAlvo.querySelectorAll('section.I_DV_3');
        if (sections.length >= 2) {
            resultado.push('=== DETALHES DO PRODUTO ===');
            resultado.push(Array.from(sections).slice(0,2).map(s => s.innerText.trim()).join('\\n\\n'));
        }
    }
    
    // Verifica se coletou alguma informação
    if (resultado.length === 0) {
        alert('Nenhuma informação encontrada!');
        return;
    }
    
    // Gera o arquivo
    var texto = resultado.join('\\n');
    var blob = new Blob([texto], {type: 'text/plain'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'shopee_produto_completo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('Arquivo completo baixado!');
})();
