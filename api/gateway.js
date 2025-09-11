export default async function handler(req, res) {
  const tabela = req.query.tabela;

  const r = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${tabela}`, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, // ⚠️ Token seguro
    },
  });

  const json = await r.json();
  res.status(200).json(json);
}
export default async function handler(req, res) {
  const tabela = req.query.tabela;

  // Se for "parceiros", troca pelo ID real da tabela
  const tableId = (tabela === "parceiros") 
    ? process.env.AIRTABLE_PARCEIROS 
    : tabela;

  const r = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${tableId}`, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
    },
  });

  const json = await r.json();
  if (json.error) {
    res.status(400).json(json);
  } else {
    res.status(200).json(json);
  }
}
