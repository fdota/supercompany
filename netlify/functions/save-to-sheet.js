const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event) => {
  // Configura CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Gestisci preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    // Verifica che le variabili d'ambiente esistano
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Variabili d ambiente mancanti');
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // ✅ SPREADSHEET_ID CORRETTO (dal tuo screenshot)
    const SPREADSHEET_ID = '1h-12BwH5I1Yh2UtfrytQXgA3UkGuTT8wnwc49kdq3g';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const data = JSON.parse(event.body);

    const oreValue = parseInt(data.hours) || 0;
    const investimentoValue = parseInt(data.amount) || 0;
    const valoreOre = oreValue * 10;
    const totale = investimentoValue + valoreOre;

    await sheet.addRow({
      'Data': new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
      'Nome': data.name || '',
      'Email': data.email || '',
      'Tipo': data.contributionType || '',
      'Investimento': investimentoValue,
      'Ore': oreValue,
      'Competenza': data.expertise || '',
      'Valore Ore': valoreOre,
      'Totale': totale
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Dati salvati con successo!',
        data: {
          ore: oreValue,
          investimento: investimentoValue,
          totale: totale
        }
      })
    };
  } catch (error) {
    console.error('ERRORE:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};