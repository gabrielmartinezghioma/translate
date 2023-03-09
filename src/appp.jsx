import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [textTranslate, setTextTranslate] = useState('');
  const [translations, setTranslations] = useState([]);

  const apiKey = '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';
  const languages = {
    1: 'ar', // Arabic
    2: 'es', // Spanish
    3: 'en', // English
  };

  const translateText = async (languageCode) => {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Translate this into ${languageCode}:\n\n ${textTranslate} \n\n.`,
      temperature: 0.3,
      max_tokens: 2048,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.data.choices[0].text;
  };

  const translateAll = async () => {
    const promises = Object.values(languages).map(translateText);
    const translations = await Promise.all(promises);
    setTranslations(translations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTextTranslate(e.target[0].value);
    translateAll();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Translate</button>
      </form>
      {translations.map((translation, index) => (
        <div key={index}>
          <h3>{Object.keys(languages)[index]}. {Object.values(languages)[index]}</h3>
          <p>{translation}</p>
        </div>
      ))}
    </div>
  );
};

export default App;