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

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }) 
    };
  }

  console.log('💾 FUNZIONE SALVATAGGIO CHIAMATA!');

  try {
    const data = JSON.parse(event.body);
    console.log('📝 Dati ricevuti:', data);

    // Validazione dati obbligatori
    if (!data.name || !data.email || !data.contributionType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Nome, email e tipo di contributo sono obbligatori' 
        })
      };
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '1ePEDA2-0JN7DHJadP2565bFk4xSCDrbWhuXjgH3GGHw';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    console.log('🔗 Connessione al documento...');
    await doc.loadInfo();
    console.log('✅ Documento caricato:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    
    // Prepara i dati per il sheet
    const rowData = {
      Data: new Date().toLocaleString('it-IT'),
      Nome: data.name,
      Email: data.email,
      Tipo: data.contributionType,
      Investimento: data.amount || '',
      Ore: data.hours || '',
      Competenza: data.expertise || ''
    };

    console.log('📊 Dati da salvare:', rowData);

    // Aggiungi la riga al sheet
    await sheet.addRow(rowData);
    console.log('✅ Dati salvati correttamente!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Dati salvati correttamente sul Google Sheet'
      })
    };

  } catch (error) {
    console.error('❌ ERRORE SALVATAGGIO:', error);
    
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