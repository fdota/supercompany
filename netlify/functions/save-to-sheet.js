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
  console.log('📨 Raw body received:', event.body);
  console.log('📨 HTTP Method:', event.httpMethod);

  try {
    console.log('📧 Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 'PRESENTE' : 'MANCANTE');
    console.log('🔑 Private Key:', process.env.GOOGLE_PRIVATE_KEY ? 'PRESENTE' : 'MANCANTE');

    // PARSING ROBUSTO DEL JSON
    let data = {};
    try {
      if (event.body) {
        data = JSON.parse(event.body);
      }
      console.log('📨 Dati ricevuti:', data);
    } catch (parseError) {
      console.error('❌ Errore parsing JSON:', parseError);
      console.log('📨 Raw body:', event.body);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Dati non validi: ' + parseError.message 
        })
      };
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const SPREADSHEET_ID = '1h-12BwHiS1JYh2UtFrytQXgA3UkGuTT8wnwc49kdg3g';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    console.log('🔗 Connessione al documento...');
    await doc.loadInfo();
    console.log('✅ Documento caricato:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log('📊 Foglio selezionato:', sheet.title);

    // CONTROLLO PER GESTIRE SHEET CON TANTE RIGHE
    const rows = await sheet.getRows();
    console.log('📊 Righe totali nel sheet:', rows.length);

    const oreValue = parseInt(data.hours) || 0;
    const investimentoValue = parseInt(data.amount) || 0;
    const valoreOre = oreValue * 10;
    const totale = investimentoValue + valoreOre;

    console.log('✍️ Scrittura riga...');
    
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

    // Verifica che la riga sia stata scritta
    const updatedRows = await sheet.getRows();
    console.log('✅ Righe dopo scrittura:', updatedRows.length);
    console.log('✅ Riga scritta con successo!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Dati salvati con successo!'
      })
    };

  } catch (error) {
    console.error('❌ ERRORE COMPLETO:', error);
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