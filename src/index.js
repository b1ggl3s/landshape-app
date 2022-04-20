import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Help from './Modals/help'
import useHelp from './Modals/useHelp'
import Settings from './Modals/settings'
import useSettings from './Modals/useSettings'
import countryCodesWithImage from './codeSelect';
import countries from './countries-positions'

// const contrycodes = countryCodesWithImage;
// const countrylist = countries;
// for (let i=0; i < countrylist.length; i++) {
//     let cn = countrylist[i].code.toLowerCase()
//     if (!countryCodesWithImage.includes(cn)) {
//         console.log(cn)
//     };
// }

// console.log(countries.length, countryCodesWithImage.length)

const seed = Math.floor(Math.random()*(countries.length));

function App() {
  const [guess, setGuess] = useState(' ')
  return (
      <div>
          <TitleRow />
          <LandBox />
          <GuessBox setGuess={setGuess} guess={guess}/>
          <SubmitButton />
      </div>
  );

}


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
  console.log(Math.floor(Math.random()*(countries.length)), countries.length);
  let countrycode = country.code;
  let cc = countrycode.toLowerCase();
  var img = require('./images/countries/'+cc+'/vector.svg');
  return (
      <div className='parent'>
        <div className='landBox'>
          <img className='country' src={img}/>
          
        </div>
      </div>
  );
}

function GuessBox(props) {
  return (
    <form className='parent'>
        <input className='guessBox' type='guess'
        placeholder='Guess country...' onChange={e => props.setGuess(e.target.value)}/>
    </form>
  );
}

function SubmitButton() {
  return (
    <div className='parent'>
        <button className='submitButton'>
            Submit
        </button>
    </div>
  );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);