import './App.css'
import axios from 'axios';
import { useState } from 'react';

function App() {

  const apiKey = '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';

  const text = 'Esta es una API que permite crear peliculas, actores y directores con sus respectivos generos'
  
  const translateText = async () => {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      prompt: `Translate this into 1. French, 2. Spanish and 3. English:\n\n ${text} \n\n1.`,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.data.choices[0].text
  }

  const myAsyncFunction = async () => {
    const translatedText = await translateText();
    console.log(translatedText);
  }

  myAsyncFunction();

  return (
    <div className="App">

    </div>
  )
}

export default App


// English (en)
// Arabic (ar)
// German (de)
// Spanish (es)
// French (fr)
// Hindi (hi)
// Italian (it)
// Japanese (ja)
// Korean (ko)
// Portuguese (pt)
// Russian (ru)
// Simplified Chinese (zh)
