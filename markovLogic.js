let tweet = 'the there fun funcky them fun their'
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
console.log(tweetMarkovPossibilties)

//
// // console.log('starting point originalTweet string key', startValueLetter )
// // get random place to start
//
//
const getValue = () => {
  let currentGram = 'her'
  let markovTweetToPrintOut = currentGram

  for (var i = 0; i < 30; i++) {
    let randomNumberFromArrayObj = currentGram.length === 1 ?  Math.floor((Math.random() * currentGram.length) + 0) : 0
    let nextArr = tweetMarkovPossibilties[currentGram]
    let next = nextArr[randomNumberFromArrayObj]
    let poss = next
    markovTweetToPrintOut += poss

    currentGram = markovTweetToPrintOut.substring(markovTweetToPrintOut.length - numChar, markovTweetToPrintOut.length)
  }

console.log(markovTweetToPrintOut)
}
  getValue()
//   console.log(markovTweetToPrintOut)
