import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'




  
  class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tweetErrorMessage: null,
      originTweet: 'loading...'
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
    console.log('markov this stuff right here')
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
      
    </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);