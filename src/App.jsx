import { languages } from "./Languages"
import React from "react"



export default function App(){

  const [word, setWord]= React.useState("reactiree")
  const [guessedLetters, setGuessedLetters]=React.useState([])

  const wrongGuessCount= guessedLetters.filter(letter=> !word.includes(letter)).length  

  const keyboard="abcdefghijklmnopqrstuvwxyz"

  const keyboardElements= keyboard.split("").map(letter=>{
    const styles=(guessedLetters.includes(letter) && word.includes(letter))?{backgroundColor:"#10A95B"}:{backgroundColor:"#EC5D49"}

    return(
    <button style={guessedLetters.includes(letter)?styles: null} onClick={()=> keyboardClick(letter)} className="keyboard-button">{letter.toUpperCase()}</button>
    )
})

  
  const wordElement= word.split("").map(letter=>(
    <h1 className="letters">{guessedLetters.includes(letter)?letter.toUpperCase():""}</h1>
  ))


  const langaugeElements= languages.map((language, index)=>{
    const isLanguageLost=wrongGuessCount-1>=index
    const styles={
        backgroundColor: language.backgroundColor,
        color: language.color
    }

    return (
    <span style={styles} className={isLanguageLost?"lost-chips":"languages-chips"}>{language.name}</span>
    )
  })

  function keyboardClick(letter){
    setGuessedLetters(prev=> [...prev, letter])
  }











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
