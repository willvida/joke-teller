const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(jokeString) {
    VoiceRSS.speech({
        //Only a fun application with free api, thus api key is not protected.
        key: '74115776258d4e74ad0eed444a4136d9',
        src: jokeString,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let jokeString = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
        jokeString = `${data.setup} ... ${data.delivery}`
      } else {
        jokeString = data.joke;
      }
      // Text-to-Speech
      tellMe(jokeString);
      // Disable Button
      toggleButton();
    } catch (error) {
      //Catch Errors Here
      console.log('Whoops', error)  
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
// Enable button once the joke has ended
audioElement.addEventListener('ended', toggleButton);