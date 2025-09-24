const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event) => {
  // Solo permettere richieste POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const doc = new GoogleSpreadsheet('1h-12BwHiS1JYh2UtFrytQXgA3UkGuTT8wnwc49kdg3g');
    
    // Usa l'API key pubblica (sicura per solo lettura/scrittura sul tuo sheet)
    await doc.useApiKey('AIzaSyD5dJjgHvVkADh3dp0t7g5sW_9dQnLwJ7c');
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const data = JSON.parse(event.body);
    
    // Aggiungi la riga al sheet
    await sheet.addRow({
      'Data': new Date().toLocaleString('it-IT'),
      'Name': data.name || '',
      'Email': data.email || '',
      'Tipo': data.contributionType || '',
      'Investimento': data.amount || '0',
      'Ore': data.hours || '0',
      'Competenza': data.expertise || '',
      'Valore Ore': (parseInt(data.hours) || 0) * 10,
      'TOTALE': (parseInt(data.amount) || 0) + ((parseInt(data.hours) || 0) * 10)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Dati salvati con successo!'
      })
    };
  } catch (error) {
    console.error('Errore:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: error.message 
      })
    };
  }
};