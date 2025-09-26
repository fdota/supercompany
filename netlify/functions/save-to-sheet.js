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

    // CONNESSIONE AL SHEET
    const SPREADSHEET_ID = 'INSERISCI_IL_NUOVO_ID_QUI'; // ⚠️ IMPORTANTE!
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // CALCOLI NEL CODICE
    const oreValue = parseInt(data.hours) || 0;
    const investimentoValue = parseInt(data.amount) || 0;
    const valoreOre = oreValue * 10;  // Calcolato nel codice
    const totale = investimentoValue + valoreOre;  // Calcolato nel codice

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
      'Valore Ore': valoreOre,  // Calcolato dal codice
      'Totale': totale          // Calcolato dal codice
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