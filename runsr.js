(function() {
    var divAlvo = document.querySelector('div.page-product__content');
    if (!divAlvo) {
        alert('Div alvo não encontrada!');
        return;
    }
    var sections = divAlvo.querySelectorAll('section.I_DV_3');
    if (sections.length < 2) {
        alert('Menos de duas sections encontradas!');
        return;
    }
    var texto = Array.from(sections).slice(0,2).map(s => s.innerText.trim()).join('\\n\\n');
    var blob = new Blob([texto], {type: 'text/plain'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'shopee_sections.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert('Arquivo baixado!');
})();
