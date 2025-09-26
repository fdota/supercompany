const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // ✅ SPREADSHEET ID CORRETTO (dal tuo link)
    const SPREADSHEET_ID = '1h-12BwHiS1JYh2UtFrytQXgA3UkGuTT8wnwc49kdg3g';
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
        message: 'Dati salvati con successo!'
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