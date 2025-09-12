export default async function handler(req, res) {
  try {
    const tabela = req.query.tabela;

    const BASE_ID = "appMQwMQMQz7dLISZ";
    const TOKEN = "patXmYwor3EFZGPte.628d2ecfcd251aab41181f5f8f0c601aa042c7195daad22f4178e2c5e0853c67";

    const mapTabelas = {
      parceiros: "parceiros",
      clientes: "clientes",
      promocoes: "promocoes",
      beneficios: "beneficios",
      faq: "faq",
      depoimentos: "depoimentos",
      log: "log",
    };

    const tabelaNome = mapTabelas[tabela];
    if (!tabelaNome) {
      return res.status(400).json({ error: `Tabela não mapeada: ${tabela}` });
    }

    const urlBase = `https://api.airtable.com/v0/${BASE_ID}/${tabelaNome}`;

    if (req.method === "GET") {
      const url = `${urlBase}?view=Grid%20view`;
      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!r.ok) throw new Error(await r.text());
      const json = await r.json();
      return res.status(200).json(json);
    }
console.log("🔎 Dados recebidos no POST:", body);

    if (req.method === "POST") {
      const body = req.body;

      if (!body || typeof body !== "object") {
        return res.status(400).json({ error: "Dados inválidos." });
      }

      const salvar = await fetch(urlBase, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: body }),
      });

      const resultado = await salvar.json();
      if (!salvar.ok) {
        return res.status(500).json({ error: resultado });
      }

      return res.status(200).json(resultado);
    }

    res.status(405).json({ error: "Método não permitido." });
  } catch (err) {
    console.error("Erro no gateway:", err.message);
    res.status(500).json({ error: err.message });
  }
}









const salvar = await fetch(urlBase, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fields: {
      nome: "Teste Edgar",
      cpf: "12345678900",
      dataNascimento: "1980-01-01",
      celular: "28999887766",
      grupo: "INDIVIDUAL",
      cidade: "Guaçuí/ES",
      ativo: "NÃO",
      idPublico: "APV-TESTE"
    }
  }),
});
