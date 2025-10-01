(async () => {
    // Função para esperar um pouco entre downloads
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function processPage(pageNum) {
        let url;
        if (pageNum === 1) {
            url = "https://member.rafaelluracursos.com.br/buscador-de-fornecedores/";
        } else {
            url = `https://member.rafaelluracursos.com.br/buscador-de-fornecedores/?pagina=${pageNum}`;
        }

        console.log(`🔎 Extraindo página ${pageNum}...`);

        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const fornecedores = [...doc.querySelectorAll(".bl-resultados .bl-fornecedor")].map(div => {
            const nome = div.querySelector("strong")?.innerText.trim() || "";
            const regiao = div.querySelector("span")?.innerText.replace("—","").trim() || "";
            const categoria = div.querySelector("small")?.innerText.trim() || "";
            const site = div.querySelector("a")?.href || "";
            return `${nome}\n${regiao}\n${categoria}\n${site}\n`;
        });

        const conteudo = fornecedores.join("\n----------------\n");

        // Cria e dispara o download do arquivo TXT
        const blob = new Blob([conteudo], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `fornecedores-${pageNum}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);

        console.log(`✅ Página ${pageNum} salva!`);

        // Espera um pouco para garantir que o download seja confirmado
        await delay(2000);
    }

    for (let i = 46; i <= 46; i++) {
        await processPage(i);
    }

    console.log("🎉 Extração finalizada!");
})();
