import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Help from './Modals/help'
import useHelp from './Modals/useHelp'
import Settings from './Modals/settings'
import useSettings from './Modals/useSettings'
import countryCodesWithImage from './codeSelect';
import countries from './countries-positions';
import AutoSuggest from 'react-autosuggest';

// const contrycodes = countryCodesWithImage;
// const countrylist = countries;
// for (let i=0; i < countrylist.length; i++) {
//     let cn = countrylist[i].code.toLowerCase()
//     if (!countryCodesWithImage.includes(cn)) {
//         console.log(cn)
//     };
// }

// console.log(countries.length, countryCodesWithImage.length)


// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : countries.filter(c =>
//     c.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// const getSuggestionValue = suggestion => suggestion.name;

// const renderSuggestion = suggestion => (
//   <div>
//     {suggestion.name}
//   </div>
// );

let seed = Math.floor(Math.random()*(countries.length));
let answer = countries[seed].name;
console.log(seed, countries.length);
var streak = 0
var highScore = 0

function App() {
  const [guess, setGuess] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : countries.filter(c =>
      c.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  function handleClick() {
    if (!submitted) {
      if (value.toLowerCase().trim() == answer.toLowerCase()) {
        setValue(value.trim() + ' is correct')
        streak += 1
        if(streak > highScore) {
          highScore += 1
        };
      } else {
        setValue(value.trim() + ' is wrong. It is ' + answer)
        streak = 0
      };
    };
    console.log(streak, highScore);
    if (submitted) {
      setValue('')
      seed = Math.floor(Math.random()*(countries.length))
      answer = countries[seed].name

    };
    setSubmitted(!submitted)
  };


  return (
      <div>
          <TitleRow />
          <LandBox />
          <AutoSuggest
            style={{ display: "flex", justifyContent: 'flex-end' }}
            suggestions={suggestions}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionsFetchRequested={({ value }) => {
              console.log(value);
              setValue(value);
              setSuggestions(getSuggestions(value));
            }}
            onSuggestionSelected={(_, { suggestionValue }) =>
              console.log("Selected: " + suggestionValue)
            }
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={suggestion => <span>{suggestion.name}</span>}
            inputProps={{
              disabled: submitted,
              placeholder: "Guess country...",
              value: value,
              onChange: (_, { newValue, method }) => {
                setValue(newValue);
              }
            }}
            highlightFirstSuggestion={true}
          />
          {/* <GuessBox 
          disabled = {submitted} 
          setGuess={setGuess} 
          guess={guess}
          submitted={submitted}
          message={message}/> */}
          <SubmitButton onClick={handleClick} submitted={submitted}/>
      </div>
  );

};

// function handleClick(guess) {
//   if (guess === answer.toLowerCase()) {
//     console.log(guess, "correct")
//   } else {
//     console.log(guess, "wrong")
//   };
// };



function TitleRow() {
  const {isShowingHelp, toggleHelp} = useHelp();
  const {isShowingSettings, toggleSettings} = useSettings();
  return (
      <div className='titleRow'>
        <button className='button-default' onClick={toggleSettings}>Settings</button>
        <Settings
        isShowing={isShowingSettings}
        hide={toggleSettings}
      />
        <button className="button-default" onClick={toggleHelp}>?</button>
        <Help
        isShowing={isShowingHelp}
        hide={toggleHelp}
      />
        <text className='title'>LANDSHAPE</text>
        <button className='button'></button>
        <button className='button'></button>
      </div>
  );
}

function LandBox() {
  let country = countries[seed];
  let countrycode = country.code;
  let cc = countrycode.toLowerCase();
  var img = require('./images/countries/'+cc+'/vector.svg');
  return (
      <div className='parent'>
        <span className='align'>High Score: {highScore}</span>
        <div className='landBox'>
          <img className='country' src={img}/>
          
        </div>
        <span className='align'>Current Streak: {streak}</span>
      </div>
  );
}

// Option to turn off/on suggestions.

function GuessBox(props) {
  let dispText = ''
  if (props.submitted) {
    dispText = props.message
  } else {
    dispText = props.guess
  }
  return (
    <form className='parent' >
        <input className='guessBox' type='guess'
        placeholder='Guess country...' onChange={e => props.setGuess(e.target.value)}
        value={dispText} disabled = {props.disabled || !props.disabled}/>
    </form>
  );
}

function SubmitButton(props) {
  let buttonText = ''
  if (props.submitted) {
    buttonText = 'NEXT'
  } else {
    buttonText = 'SUBMIT'
  };
  return (
    <div className='parent'>
        <button className='submitButton' onClick={props.onClick}>
            {buttonText}
        </button>
    </div>
  );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);