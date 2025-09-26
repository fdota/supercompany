import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const handler = async (event) => {
  console.log("--- Funzione avviata ---");

  if (event.httpMethod !== 'POST') {
    console.log("Errore: Metodo non POST");
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    console.log("STEP 1: Controllo le variabili d'ambiente...");
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Credenziali di Google non trovate nelle variabili d'ambiente.");
    }
    console.log("-> Email del Service Account: Trovata.");
    console.log("-> Chiave Privata: Trovata.");

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const SPREADSHEET_ID = '1h-12BwHiS1JYh2UtFrytQXgA3UkGuTT8wnwc49kdg3g';
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

    console.log("STEP 2: Autenticazione con Google...");
    await doc.loadInfo();
    console.log("-> Autenticazione e caricamento info RIUSCITI.");

    const sheet = doc.sheetsByIndex[0];
    console.log(`-> Selezionato il foglio: "${sheet.title}"`);

    const data = JSON.parse(event.body);
    console.log("STEP 3: Dati ricevuti dal form:", data);

    console.log("STEP 4: Aggiunta riga al foglio...");
    await sheet.addRow({
      'Data': new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
      'Name': data.name || '',
      'Email': data.email || '',
      'Tipo': data.contributionType || '',
      'Investimento': data.amount || 0,
      'Ore': data.hours || 0,
      'Competenza': data.expertise || '',
      'Valore Ore': (parseInt(data.hours) || 0) * 10,
      'TOTALE': (parseInt(data.amount) || 0) + ((parseInt(data.hours) || 0) * 10)
    });
    console.log("-> Riga aggiunta con successo.");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Dati salvati con successo!' })
    };
  } catch (error) {
    console.error('--- ERRORE CATTURATO ---:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};