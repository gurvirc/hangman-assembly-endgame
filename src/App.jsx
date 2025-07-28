import { languages } from "./Languages"
import React from "react"
import { getFarewellText, getRandomWord } from "./Utils"
import Confetti from "react-confetti"




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




  function renderGameStatus(){
    if(isGameWon){
      return(
        <>
            <h2>You win!</h2>
             <p>Well done! 🎉</p>
        </>

      )
    }

    if(isGameLost){
      return( 
      <>
          <h2 >Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
      </>
      )
    }
    if(!isGameOver && wrongGuessCount>0)
      return(
        <p>
          {getFarewellText(languages[wrongGuessCount-1].name)}
      </p>
      )
      else
        return null
  }
    const styles={backgroundColor:isGameLost?"#BA2A2A":"#10A95B"}
    const styles2={backgroundColor:wrongGuessCount==0?"#282726":"#7A5EA7"}






  return(
     <main>
      {isGameWon && <Confetti />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section  style={isGameOver?styles:styles2}className="game-status">
        {renderGameStatus()}
        </section>
      <section className="language-elements">{langaugeElements}</section>
      <section className="word-area">{wordElement}</section>
      <section className="keyboard">{keyboardElements}</section>
      <button onClick={resetGame}className="new-game">New Game</button>
      

    </main>
  )
}
