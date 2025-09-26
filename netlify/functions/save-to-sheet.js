import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SPREADSHEET_ID = '1h-12BwHiS1JYh2UtFrytQXgA3UkGuTT8wnwc49kdg3g';
const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const data = JSON.parse(event.body);
    await sheet.addRow({
      'Data': new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
      'Name': data.name || '', 'Email': data.email || '', 'Tipo': data.contributionType || '',
      'Investimento': data.amount || 0, 'Ore': data.hours || 0, 'Competenza': data.expertise || '',
      'Valore Ore': (parseInt(data.hours) || 0) * 10,
      'TOTALE': (parseInt(data.amount) || 0) + ((parseInt(data.hours) || 0) * 10)
    });
    return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Dati salvati con successo!' }) };
  } catch (error) {
    console.error('ERRORE NELLA FUNZIONE NETLIFY:', error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};