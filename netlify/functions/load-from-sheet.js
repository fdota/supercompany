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
    
    // LEGGI TUTTI I DATI COME ARRAY SEMPLICE
    const data = await sheet.getRows();
    console.log(`📊 Trovate ${data.length} righe`);

    // MOSTRA TUTTE LE COLONNE DISPONIBILI
    if (data.length > 0) {
      console.log('🏷️ COLONNE DISPONIBILI:', Object.keys(data[0]));
    }

    // FILTRA RIGHE VUOTE (dove c'è un nome)
    const righeValide = data.filter(row => {
      const nome = row.get('Nome');
      return nome && nome !== '' && nome !== 'Nome';
    });

    console.log(`👥 Righe valide: ${righeValide.length}`);

    const totali = {
      investimenti: 0,
      oreLavoro: 0,
      persone: righeValide.length,
      valoreOre: 0,
      totaleComplessivo: 0
    };

    // CALCOLA I TOTALI
    righeValide.forEach((row, index) => {
      // LEGGI I VALORI DIRETTAMENTE
      const investimento = parseFloat(row.get('Investimento')) || 0;
      const ore = parseFloat(row.get('Ore')) || 0;
      
      console.log(`🔢 Riga ${index + 1}:`, {
        nome: row.get('Nome'),
        investimentoRaw: row.get('Investimento'),
        investimentoParsed: investimento,
        oreRaw: row.get('Ore'),
        oreParsed: ore
      });

      // CALCOLA
      const valoreOre = ore * 10; // 50 ore × 10€ = 500€
      const totale = investimento + valoreOre; // 5000€ + 500€ = 5500€

      totali.investimenti += investimento;
      totali.oreLavoro += ore;
      totali.valoreOre += valoreOre;
      totali.totaleComplessivo += totale;
    });

    console.log('💰 TOTALI CALCOLATI:', totali);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: righeValide.map(row => {
          const investimento = parseFloat(row.get('Investimento')) || 0;
          const ore = parseFloat(row.get('Ore')) || 0;
          const valoreOre = ore * 10;
          const totale = investimento + valoreOre;
          
          return {
            data: row.get('Data'),
            nome: row.get('Nome'),
            email: row.get('Email'),
            tipo: row.get('Tipo'),
            investimento: investimento,
            ore: ore,
            competenza: row.get('Competenza'),
            valoreOre: valoreOre,
            totale: totale
          }
        }),
        totali: totali
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