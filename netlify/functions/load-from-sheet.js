import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  console.log('📖 FUNZIONE LETTURA CHIAMATA!');

  try {
    // AUTENTICAZIONE (usa le stesse variabili d'ambiente di save-to-sheet)
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const SPREADSHEET_ID = '1ePEDA2-0JN7DHJadP2565bFk4xSCDrbWhuXjgH3GGHw';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    console.log('🔗 Connessione al documento...');
    await doc.loadInfo();
    console.log('✅ Documento caricato:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    
    // LEGGI TUTTE LE RIGHE (escludi l'header)
    const rows = await sheet.getRows();
    console.log(`📊 Trovate ${rows.length} righe di dati`);

    // FILTRA RIGHE VUOTE E CALCOLA TOTALI
    const righeValide = rows.filter(row => row.get('Data') && row.get('Data') !== '');
    
    const totali = {
      investimenti: 0,
      oreLavoro: 0,
      persone: righeValide.length,
      valoreOre: 0,
      totaleComplessivo: 0
    };

    // CALCOLA I TOTALI
    righeValide.forEach(row => {
      const investimento = parseFloat(row.get('Investimento')) || 0;
      const ore = parseFloat(row.get('Ore')) || 0;
      const valoreOre = parseFloat(row.get('Valore Ore')) || 0;
      const totale = parseFloat(row.get('Totale')) || 0;

      totali.investimenti += investimento;
      totali.oreLavoro += ore;
      totali.valoreOre += valoreOre;
      totali.totaleComplessivo += totale;
    });

    console.log('💰 Totali calcolati:', totali);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: righeValide.map(row => ({
          data: row.get('Data'),
          nome: row.get('Nome'),
          email: row.get('Email'),
          tipo: row.get('Tipo'),
          investimento: parseFloat(row.get('Investimento')) || 0,
          ore: parseFloat(row.get('Ore')) || 0,
          competenza: row.get('Competenza'),
          valoreOre: parseFloat(row.get('Valore Ore')) || 0,
          totale: parseFloat(row.get('Totale')) || 0
        })),
        totali: totali
      })
    };

  } catch (error) {
    console.error('❌ ERRORE LETTURA:', error);
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