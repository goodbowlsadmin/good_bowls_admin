const functions = require('firebase-functions');
const { TranslationServiceClient } = require('@google-cloud/translate');

const translateClient = new TranslationServiceClient();

exports.translateText = functions.https.onRequest(async (req, res) => {
  try {
    const { text } = req.body;
    const projectId = 'good-bowls-398419'; // Replace with your Firebase project ID
    const targetLanguage = 'es'; // Spanish

    const [translation] = await translateClient.translateText({
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      targetLanguage: targetLanguage,
    });

    const translatedText = translation.translations[0].translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});
