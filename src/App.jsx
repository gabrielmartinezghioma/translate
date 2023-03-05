import './App.css';
import axios from 'axios';
import {useState } from 'react';

function App() {
  const apiKey = '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';
  const [res, setRes] = useState('');
  const [textTranslate, setTextTranslate] = useState('');
  const [isChange, setIsChange] = useState(true)

  const translateText = async () => {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: `Translate this into ${isChange ? 'Spanish' : 'English'} :\n\n${textTranslate}\n\n`,
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].text;
  };
  
  const myAsyncFunction = async () => {
    const translatedText = await translateText();
    setRes(translatedText);
  };

  const handleSubimit = (e) => {
    e.preventDefault();
    setTextTranslate(e.target[0].value);
    myAsyncFunction();
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleSubimit(e)}>
        <input type="text" onChange={(e) => setTextTranslate(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h2>{res}</h2>
      <button onClick={() => { setIsChange(!isChange) }}>change</button>
      <h1>{isChange === true ? 'espanol' : 'ingles'}</h1>
    </div>
  );
}

export default App;



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
