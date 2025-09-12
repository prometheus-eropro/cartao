// /api/enviar.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const BASE_ID = "appMQwMQMQz7dLISZ";
    const TOKEN = "patXmYwor3EFZGPte.628d2ecfcd251aab41181f5f8f0c601aa042c7195daad22f4178e2c5e0853c67";
    const TABELA = "clientes";

    const data = req.body;

    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABELA}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields: data })
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    res.status(200).json({ success: true, record: json });
  } catch (error) {
    console.error("Erro ao enviar:", error);
    res.status(500).json({ error: error.message });
  }
}
