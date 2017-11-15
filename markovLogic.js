let tweet = 'I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.'
let tweetMarkovPossibilties = {}
let numChar = 3

for (var i = 0; i <= tweet.length - numChar; i++) {
  let markovPairs = tweet.substring(i, i + numChar)
  if(!tweetMarkovPossibilties[markovPairs]){
    tweetMarkovPossibilties[markovPairs] = []
  }
  tweetMarkovPossibilties[markovPairs].push(tweet.charAt( i +  numChar))
  // console.log(tweetMarkovPossibilties)
}
// console.log(tweetMarkovPossibilties)

//
// // console.log('starting point originalTweet string key', startValueLetter )
// // get random place to start
//
//
const getValue = () => {
  let currentGram = 'her'
  let markovTweetToPrintOut = currentGram

  for (var i = 0; i < 10; i++) {
    let randomNumberFromArrayObj = currentGram.length === 1 ?  Math.floor((Math.random() * currentGram.length) + 0) : 0
    let nextArr = tweetMarkovPossibilties[currentGram]
    console.log('nextArr', nextArr, randomNumberFromArrayObj)
    let next = nextArr[randomNumberFromArrayObj]
    let poss = next
    markovTweetToPrintOut += poss

    currentGram = markovTweetToPrintOut.substring(markovTweetToPrintOut.length - numChar, markovTweetToPrintOut.length)
  }

console.log(markovTweetToPrintOut)
}
  getValue()
//   console.log(markovTweetToPrintOut)
