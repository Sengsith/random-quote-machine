import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const QUOTE_DB_URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote, setQuote] = useState("What the bruh.")
  const [author, setAuthor] = useState("You")
  const [quotesArray, setQuotesArray] = useState()
  const [accentColor, setAccentColor] = useState('#B71C1C')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(QUOTE_DB_URL)
  }, [QUOTE_DB_URL])
  
  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor, color: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text"><FontAwesomeIcon style={{fontSize: "3rem"}}icon={faQuoteLeft} />"{quote}"</p>
          <p id="author">-{author}</p>
          <div className="button">
            <a id="tweet-quote" target="_blank" style={{backgroundColor: accentColor}} href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote}-${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" onClick={getRandomQuote} style= {{backgroundColor: accentColor}}>Change Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
