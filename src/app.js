import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

  class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      originTweet: 'loading...',
      newMarkovTweet: 'waiting...'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    const getValue = () => {
      let randomPlaceInOriginTweetString = Math.floor((Math.random() * this.state.originTweet.length) + 1)
      let startValueLetter = this.state.originTweet.substring(randomPlaceInOriginTweetString, randomPlaceInOriginTweetString + numChar)
      let startingString = startValueLetter
      let markovTweetToPrintOut = startingString

      for (var i = 0; i < this.state.originTweet.length; i++) {
        let randomNumberFromArrayObj = startingString.length === 1 ?  Math.floor((Math.random() * startingString.length) + 0) : 0
        let nextArr = tweetMarkovPossibilties[startingString]
        console.log('nextArr', nextArr)
        let next = nextArr[randomNumberFromArrayObj]
        let poss = next

        markovTweetToPrintOut += poss
        startingString = markovTweetToPrintOut.substring(markovTweetToPrintOut.length - numChar, markovTweetToPrintOut.length)
      }
      this.setState({newMarkovTweet: markovTweetToPrintOut})
    }
      getValue()

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
<<<<<<< Updated upstream
      <div className="originTweet"> {this.state.originTweet}</div>
      <h2>New Markov Tweet</h2>
      <div className="originTweet"> {this.state.newMarkovTweet}</div>
=======
      <p className="originTweet"> {this.state.originTweet}</p>
      <h2>New Markov Tweet</h2>
      <p className="originTweet"> {this.state.newMarkovTweet}</p>
>>>>>>> Stashed changes
    </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
