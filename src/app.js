import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

  class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '@FauxMotivation',
      originTweet: 'loading...',
      newMarkovTweet: 'waiting...'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeTweetsInLocalStorage = this.storeTweetsInLocalStorage.bind(this);
    this.printAllStoredLocalStorageTweets = this.printAllStoredLocalStorageTweets.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    axios.get('/getUserTweets',{
    params: {
      user_tweet_name: this.state.value
    }})
      .then( (response) => {
        this.setState({originTweet: response.data[0].text})
        this.markovThis()
      })
      .catch( (error) => {
        console.log(error);
        if(error) {this.setState({originTweet: 'failed getting the tweet'})}
      })
    event.preventDefault();
  }

  markovThis () {
    let tweet = this.state.originTweet
    let tweetMarkovPossibilties = {}
    let numChar = 3

    for (var i = 0; i <= tweet.length - numChar; i++) {
      let markovPairs = tweet.substring(i, i + numChar)
      if(!tweetMarkovPossibilties[markovPairs]){
        tweetMarkovPossibilties[markovPairs] = []
      }
      tweetMarkovPossibilties[markovPairs].push(tweet.charAt( i +  numChar))
    }
    this.printNewMarkov(tweetMarkovPossibilties, numChar)
  }

  printNewMarkov (tweetMarkovPossibilties, numChar) {
    console.log('Here is the possible markov chain options')
    console.log(tweetMarkovPossibilties)
    const getValue = () => {
      let randomPlaceInOriginTweetString = Math.floor((Math.random() * this.state.originTweet.length) + 1)
      let startValueLetter = this.state.originTweet.substring(randomPlaceInOriginTweetString, randomPlaceInOriginTweetString + numChar)
      let startingString = startValueLetter
      let markovTweetToPrintOut = startingString

      for (var i = 0; i < this.state.originTweet.length; i++) {
        let randomNumberFromArrayObj = startingString.length === 1 ?  Math.floor((Math.random() * startingString.length) + 0) : 0
        let nextArr = tweetMarkovPossibilties[startingString]
        let next = nextArr[randomNumberFromArrayObj]
        let poss = next

        markovTweetToPrintOut += poss
        startingString = markovTweetToPrintOut.substring(markovTweetToPrintOut.length - numChar, markovTweetToPrintOut.length)
      }
      this.setState({newMarkovTweet: markovTweetToPrintOut})
    }
      getValue()
  }

  storeTweetsInLocalStorage () {
    let privateMode = true
    // Testing if browser is in private mode
    if (typeof localStorage === "object") {
      try {
        localStorage.setItem('localStorageTest', 'true');
        localStorage.removeItem("localStorageTest");
      } catch (e) {
        privateMode = false;
        alert("This broswer is currently in Private mode. Please use a browser that is not in Private mode in order to join everyone");
      }
    }
    if(privateMode) {
      let moreKeys = 0
      let key = this.state.value
      let valueT = this.state.newMarkovTweet
      let canIPrintNow = true

      function addMultiKeys() {
        let keys = Object.keys(localStorage)
        let i = keys.length

        while ( i-- ) {
            if(keys[i] === key){
              canIPrintNow = false
              printNow()
              return
            }
            canIPrintNow = true
            printNow()
        }
      }
      function printNow () {
          if(canIPrintNow){
            localStorage.setItem(key, valueT)
          } else {
            moreKeys++
      // TODO: better naming,
      // remove numbers after _,
      // convert to number,
      // add 1,
      // convert to string and concat back to name
            key = key + '_' + moreKeys
            addMultiKeys()
          }
      }
      addMultiKeys()
    }
  }

  printAllStoredLocalStorageTweets () {
    let keys = Object.keys(localStorage)
    let i = keys.length
     while ( i-- ) {
         console.log(keys[i] + ' = ' + localStorage.getItem(keys[i]))
     }
  }
  render() {
    return (
    <div className="container">
      <h1> <span className="h1Tiny">Turn Your Tweet into a </span><br/> Markov Chain Tweet</h1>
      <p> We will grab the latest tweet from a twitter user of your choice. We will work some magic and output a new tweet created by processing the original tweet through a Markov Chain Generator. <br/>
      You can find a great explaination of what a Markov Chain is here <a href="http://setosa.io/ev/markov-chains/">etosa.io/ev/markov-chains/</a></p>
      <form onSubmit={this.handleSubmit}>
          <input className="input"  type="text" value={this.state.value} onChange={this.handleChange} placeholder="twitter name"/> <br/>
          <span className="footNote">
            This form defaults to user <a href="https://twitter.com/FauxMotivation">@FauxMotivation</a>
          </span>
          <br/>
        <input className="button"  type="submit" value="Submit" />
      </form>
      <h2>Original Tweet</h2>
        <p className="originTweet"> {this.state.originTweet}</p>
      <h2>New Markov Tweet</h2>
        <p className="originTweet"> {this.state.newMarkovTweet}</p>
        <p>
          <span className="saveTweet" onClick={this.storeTweetsInLocalStorage}> save new tweet</span>
        </p>
        <p>
          <span className="saveTweet" onClick={this.printAllStoredLocalStorageTweets}> Print All saved tweets to Console Log</span>
        </p>
    </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
