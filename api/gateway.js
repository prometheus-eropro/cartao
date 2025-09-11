export default async function handler(req, res) {
  try {
    const tabela = req.query.tabela;

    // Coloque aqui o ID da base (app...) e o TOKEN (pat...)
    const BASE_ID = "appMQwMQMQz7dLISZ";
    const TOKEN = "patXmYwor3EFZGPte.628d2ecfcd251aab41181f5f8f0c601aa042c7195daad22f4178e2c5e0853c67"; // seu token completo

    // Aqui você pode usar os nomes das tabelas exatamente como aparecem no Airtable
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

    const url = `https://api.airtable.com/v0/${BASE_ID}/${tabelaNome}?view=Grid%20view`;

    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!r.ok) {
      const txt = await r.text();
      throw new Error(`Airtable erro ${r.status}: ${txt}`);
    }

    const json = await r.json();
    res.status(200).json(json);
  } catch (err) {
    console.error("Erro no gateway:", err.message);
    res.status(500).json({ error: err.message });
  }
}
