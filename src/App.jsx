import './App.css';
import axios from 'axios';
import { useState } from 'react';


function App() {
  const apiKey = import.meta.env.VITE_BACKEND_KEY;
  const [res, setRes] = useState('');
  const [textTranslate, setTextTranslate] = useState('');
  const [selectedOption, setSelectedOption] = useState('English');
  const [resRender, setResRender] = useState([]);

  const translateText = async () => {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-002/completions',
      {
        prompt: `Translate this into ${selectedOption} :\n\n${textTranslate}\n\n`,
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
    setResRender(prevState => [...prevState, translatedText]);
  };

  const handleSubimit = (e) => {
    e.preventDefault();
    setTextTranslate(e.target[0].value);
    myAsyncFunction();    
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



  return (
    <div className="flex flex-col justify-start items-center  min-h-screen overflow-hidden py-2 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <select  onChange={handleOptionChange} className=" border-t-4  w-12 md:w-96 "  >
        <option value="English">English (en)</option>
        <option value="Arabic"> Arabic (ar)</option>
        <option value="German">German (de)</option>
        <option value="Spanish">Spanish (es)</option>
        <option value="French">French (fr)</option>
        <option value="option1">Hindi (hi)</option>
        <option value="Italian"> Italian (it)</option>
        <option value="Japanese">Japanese (ja)</option>
        <option value="Korean">Korean (ko)</option>
        <option value="Portuguese">Portuguese (pt)</option>
        <option value="Russian"> Russian (ru)</option>
        <option value="Simplified Chinese">Simplified Chinese (zh)</option>
      </select>

      <form onSubmit={(e) => handleSubimit(e)}>
        <input type="text" maxLength="2000" onChange={(e) => setTextTranslate(e.target.value) } />
        <button type="submit" className='border border-slate-300 hover:border-slate-400'>Submit</button>
      </form>

      <button onClick={()=>setResRender([])}>Clean</button>

      <h2>{textTranslate.length}/2000</h2>

      
      {
        resRender.map((text,index)=><p key={index} className="text-3xl font-bold underline">{text}</p>)
      }
     
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
