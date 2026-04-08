import { use, useEffect, useState } from 'react'
import Die from '../components/Die'
import {nanoid} from "nanoid"
import ReactConfetti from 'react-confetti';

export default function App() {

  const [dices,setDices] = useState(generateAllNewDice());
  const [buttonText,setButtonText]=useState("Roll");

  const gameWon = (dices.every(die => die.isHeld) && dices.every(die => die.value===dices[0].value));

  function diceHeld(id) {
    setDices(oldDice => {
        return oldDice.map(die => {
          return die.id === id ? {...die, isHeld: !die.isHeld} : die
        })
      })
  }

  function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false,
          }))
  }

  function reRoll(){
    if(gameWon)
      setDices(generateAllNewDice());

    else{
      setDices(oldDices => {
        return oldDices.map(die=>{
          return die.isHeld ? die : ({
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false,
          })
        })
      })
    }
  }

  const diceElemens = dices.map( die => {
    return (<Die id={die.id} hold={diceHeld} value={die.value} key={die.id} isHeld={die.isHeld}/>)
  })

  return (
    <>
      <main>
        {gameWon && <ReactConfetti />}
        <h1>Tenzies</h1>
        <div id="dice-div">
          {diceElemens}
        </div>
        <button onClick={reRoll} id="roll-button">{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}