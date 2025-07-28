import { languages } from "./Languages"
import React from "react"
import { getFarewellText, getRandomWord } from "./Utils"




export default function App(){

  const [word, setWord]= React.useState(getRandomWord())
  const [guessedLetters, setGuessedLetters]=React.useState([])

  const wrongGuessCount= guessedLetters.filter(letter=> !word.includes(letter)).length  
  const isGameWon= word.split("").every(letter=> guessedLetters.includes(letter))
  const isGameLost= wrongGuessCount>=languages.length-1
  const isGameOver= isGameWon || isGameLost
  

  const keyboard="abcdefghijklmnopqrstuvwxyz"

  const keyboardElements= keyboard.split("").map(letter=>{
    const styles=(guessedLetters.includes(letter) && word.includes(letter))?{backgroundColor:"#10A95B"}:{backgroundColor:"#EC5D49"}

    return(
    <button disabled={isGameOver?true:false}style={guessedLetters.includes(letter)?styles: null} onClick={()=> keyboardClick(letter)} className="keyboard-button">{letter.toUpperCase()}</button>
    )
})

  
  const wordElement= word.split("").map(letter=>{
    const styles={color:"red"}
    return(
    <h1 style={isGameOver&&!guessedLetters.includes(letter)?styles:null}className="letters">{guessedLetters.includes(letter)||(isGameOver&&word.includes(letter))?letter.toUpperCase():""}</h1>
    )
})


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

  function resetGame(){
    setGuessedLetters([])
    setWord(getRandomWord())

  }











  return(
     <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      {isGameWon && <section className="game-status">
        <h1>You win!</h1>
        <h2>Well done! 🎉</h2>
      </section>}
      <section className="language-elements">{langaugeElements}</section>
      <section className="word-area">{wordElement}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button onClick={resetGame}className="new-game">New Game</button>
      

    </main>
  )
}
