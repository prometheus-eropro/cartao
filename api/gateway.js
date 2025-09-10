// api/gateway.js
export default async function handler(req, res) {
  const { tabela } = req.query;

  if (!tabela) {
    return res.status(400).json({ erro: 'Tabela não especificada' });
  }

  // Exemplo usando Airtable
  const AIRTABLE_KEY = process.env.AIRTABLE_KEY;
  const BASE_ID = process.env.AIRTABLE_BASE_ID;

  const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tabela}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`
    }
  });

  const data = await response.json();
  return res.status(200).json(data);
}
