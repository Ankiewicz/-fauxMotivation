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
      if(!tweetMarkovPossibilties[tweet[i]]){
        tweetMarkovPossibilties[tweet[i]] = []
      }
      tweetMarkovPossibilties[tweet[i]].push(markovPairs)
    }
    this.printNewMarkov(tweetMarkovPossibilties)
  }
  
  printNewMarkov (tweetMarkovPossibilties) {
    console.log('tweetMarkovPossibilties ', tweetMarkovPossibilties)
    // get random place to start
    let randomPlaceInString = Math.random() * (this.state.originTweet.length - 0) // random number within the size of the originalTweet
    let startValueLetter = this.state.originTweet.substring(randomPlaceInString, randomPlaceInString - 1) // random letter from originTweet
    let printValue = tweetMarkovPossibilties[startValueLetter] // random value from tweetMarkovPossibilties
    
    console.log(startValueLetter, ' = ', printValue)
    console.log('first value', startValueLetter)
    // grab second value in print
    
    console.log('printValue.length', printValue.length)
    let randomPlaceInArray = Math.round(Math.random() * (printValue.length - 0) + 0)
    console.log('randomPlaceInArray', randomPlaceInArray)
    let randomSecondValueFromArray = printValue[randomPlaceInArray]
    let secondValueFromArrayValue = randomSecondValueFromArray.substring(1)
    console.log('randomSecondValueFromArray', randomSecondValueFromArray.substring(1))
    // if no second value return a space
    if(!secondValueFromArrayValue) {
      secondValueFromArrayValue = ' space '
    }
    let returningSecondValue = randomSecondValueFromArray.randomPlaceInArray.substring(1)
    console.log('returningSecondValue', returningSecondValue)
    // let nextValue = tweet
    
    // console.log('tweetMarkovPossibilties', startValueLetter, 'next value', nextValue)
      
      for (var i = 0; i < 10; i++) {
        // console.log(tweetMarkovPossibilties[startValueLetter])
      }
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