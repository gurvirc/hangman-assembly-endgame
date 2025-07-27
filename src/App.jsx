import { languages } from "./Languages"
import React from "react"
export default function App(){
  const [word, setWord]= React.useState("reactiree")
  const [guessedLetters, setGuessedLetters]=React.useState([])

  const keyboard="abcdefghijklmnopqrstuvwxyz"

  const keyboardElements= keyboard.split("").map(letter=>(
    <button className="keyboard-button">{letter.toUpperCase()}</button>

  ))

  
  const wordElement= word.split("").map(letter=>(
    <h1 className="letters">{guessedLetters.includes(letter)?letter.toUpperCase():""}</h1>
  ))


  const langaugeElements= languages.map(language=>{
    const styles={
        backgroundColor: language.backgroundColor,
        color: language.color
    }

    return (
    <span style={styles} className="languages-chips">{language.name}</span>
    )
  })











  return(
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h1>You win!</h1>
        <h2>Well done! 🎉</h2>
      </section>
      <section className="language-elements">{langaugeElements}</section>
      <section className="word-area">{wordElement}</section>
      <section className="keyboard">{keyboardElements}</section>
      

    </main>
  )
}
