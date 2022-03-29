//SPEECH SYNTHESIS
var theVoice = new p5.Speech('Yuri');
theVoice.setPitch(0.1);
theVoice.setRate(0.2);

//SPEECH RECOGNITION
//Fix to the system stopping recon: https://github.com/IDMNYU/p5.js-speech/issues/21
var speechRecon = new p5.SpeechRec('en-US', parseResult);
speechRecon.continuous = false;
speechRecon.interimResults = false;
speechRecon.onEnd = restart;

//BOT
let bot = new RiveScript();

function preload()
{
  bot.loadFile('botBrain.rive').then(botLoaded).catch(botError);
}

function botLoaded()
{
  console.log("bot has loaded");
  bot.sortReplies();
}

function botError()
{
  console.log(error);
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  background(0);
  drawUI("Speak", "And I will listen");

  speechRecon.start(); // start speech recognition engine

  //Bot here
}

function draw() 
{
  //background(220);
}

/* SPEECH RECOGNITION GOES HERE */
function parseResult()
{
  if(speechRecon.resultValue == true)
  {
    console.log(speechRecon.resultString);
    drawUI(speechRecon.resultString, "");
    let input = speechRecon.resultString;
    let reply = bot.reply("local-user", input).then(function(reply) {
      console.log(reply);
      theVoice.speak(reply);
    });
    
  }
}

function restart()
{
  speechRecon.start();
}

/* SPEECH SYNTHESIS GOES HERE */
function botSpeak(utterance)
{
  speechRecon.stop();
  theVoice.speak(utterance);
  speechRecon.start();
}


function mouseClicked()
{
  botSpeak("in the beginning there was nothing");
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}

function drawUI(lbl, instr)
{
  //UI
  background(0);
  //ONLY RELEVANT WITH STATIC IMAGES
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(lbl, windowWidth / 2, windowHeight / 2);
  
  if(instr === instr)
  {
    fill(128, 128, 128);
    rect(windowWidth / 2 - 175, windowHeight / 2 + 50, 350, 100);
    fill(255);
    text(instr, windowWidth / 2, windowHeight / 2 + 100);
  }
  if(instr === "")
  {
    fill(0);
    rect(windowWidth / 2 - 175, windowHeight / 2 + 50, 350, 100);
  }
  noLoop();
}