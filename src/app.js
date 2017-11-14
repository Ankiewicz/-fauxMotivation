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
    for (var i = 0; i < tweet.length; i++) {
      let markovPairs = tweet.substring(i, i + 2)
      console.log('markovPairs', markovPairs)
      if(!tweetMarkovPossibilties[tweet[i]]){
        tweetMarkovPossibilties[tweet[i]] = []
      }
      tweetMarkovPossibilties[tweet[i]].push(markovPairs)
    }
    this.printNewMarkov(tweetMarkovPossibilties)
  }

  printNewMarkov (tweetMarkovPossibilties) {
    console.log('tweetMarkovPossibilties ', tweetMarkovPossibilties)
    let markovTweetToPrintOut
    // console.log('starting point originalTweet string key', startValueLetter )
    // get random place to start


    const getValue = () => {
      for (var i = 0; i < this.state.originTweet.length; i++) {
        // get last letter in markovTweetToPrintOut
        let arrayOfLetter = tweetMarkovPossibilties[markovTweetToPrintOut.substring(markovTweetToPrintOut.length - 1)]
        // if array only has one value
        let randomNumberFromArrayObj = arrayOfLetter.length === 1 ? 0 : Math.floor((Math.random() * arrayOfLetter.length) + 0)
        markovTweetToPrintOut += arrayOfLetter[randomNumberFromArrayObj]
      }
      console.log(markovTweetToPrintOut)
    }

    // starts markov string
    let randomPlaceInoriginTweetString = Math.floor((Math.random() * this.state.originTweet.length) + 1) // random number within the size of the originalTweet
    let startValueLetter = this.state.originTweet.substr(randomPlaceInoriginTweetString, 1) // random letter from originalTweet
    markovTweetToPrintOut = startValueLetter
    //get intial value
    getValue()

    console.log('===================')
    console.log('new tweet chain: ', markovTweetToPrintOut)
    console.log('===================')
  }

  render() {
    return (
    <div className="container">
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="twitter name"/>
        <input type="submit" value="Submit" />
      </form>
      <h3>Original Tweet</h3>
      <div className="originTweet"> {this.state.originTweet}</div>
      <h3>New Markov Tweet</h3>
      <div className="originTweet"> {this.state.newMarkovTweet}</div>
    </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
