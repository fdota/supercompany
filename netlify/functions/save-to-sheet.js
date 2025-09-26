import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  console.log('🎯 FUNZIONE CHIAMATA!');

  try {
    // PARSING DATI
    let data = {};
    if (event.body) {
      data = JSON.parse(event.body);
    }
    console.log('📨 Dati ricevuti:', data);

    // AUTENTICAZIONE
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // ✅ SPREADSHEET_ID CORRETTO
    const SPREADSHEET_ID = '1ePEDA2-0JN7DHJadP2565bFk4xSCDrbWhuXjgH3GGHw';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    console.log('🔗 Connessione al documento...');
    await doc.loadInfo();
    console.log('✅ Documento caricato:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log('📊 Foglio selezionato:', sheet.title);

    // CALCOLI NEL CODICE
    const oreValue = parseInt(data.hours) || 0;
    const investimentoValue = parseInt(data.amount) || 0;
    const valoreOre = oreValue * 10;
    const totale = investimentoValue + valoreOre;

    console.log('💰 Calcoli:', {
      oreValue,
      investimentoValue,
      valoreOre,
      totale
    });

    // SCRITTURA NEL SHEET
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

    console.log('✅ Dati salvati con successo!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Grazie! Il tuo contributo ci avvicina al milione! 🚀'
      })
    };

  } catch (error) {
    console.error('❌ ERRORE:', error);
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