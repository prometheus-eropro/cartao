export default async function handler(req, res) {
  try {
    const tabela = req.query.tabela;

    // Mapear tabelas para seus IDs reais
    const mapTabelas = {
      parceiros: process.env.AIRTABLE_PARCEIROS,
      clientes: process.env.AIRTABLE_CLIENTES,
      promocoes: process.env.AIRTABLE_PROMOCOES,
      beneficios: process.env.AIRTABLE_BENEFICIOS,
    };

    const tabelaId = mapTabelas[tabela] || tabela;

    const r = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${tabelaId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        },
      }
    );

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
