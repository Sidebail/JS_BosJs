/*
    Code is taken from
    https://codepen.io/Huskie/pen/wKphk
*/
var twitterShare = document.querySelector('[data-js="twitter-share"]');
var name = document.getElementById('name');
var level = document.getElementById('level');
var text = encodeURIComponent(
`Hey! My hero ${name.textContent} had beaten up ${level.textContent} enemies in #BosJS!
Think you can do better? Try yourself out - https://bosjs.herokuapp.com

Beat my score if you dare! See ya on the leaderboards`)
var vkText = encodeURIComponent(`My ${name.textContent} defeated ${level.textContent} enemies! Can you beat my score?`);

var shareUrltwitter = 'https://twitter.com/intent/tweet?url=' + '&text=' + text;

twitterShare.onclick = function(e) {
  e.preventDefault();
  var twitterWindow = window.open(shareUrltwitter, 'ShareOnTwitter', 'height=350,width=600');
  if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;
  }

var facebookShare = document.querySelector('[data-js="facebook-share"]');

facebookShare.onclick = function(e) {
  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + text, 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
}

var vkontakteShare = document.getElementById('vkShare');

vkontakteShare.onclick = function(e) {
    e.preventDefault();
    var vkontakteWindow = window.open(`
    http://vkontakte.ru/share.php?url=${encodeURIComponent(`https://bosjs.herokuapp.com/?
    `)}
    &title=${vkText}`, 'ShareOnVk', 'height=350,width=600');
    if(vkontakteWindow.focus) { vkontakteWindow.focus(); }
      return false;

    /*
    //&description=${encodeURIComponent(`norm takoe opisanie`)}
    //&image=${encodeURIComponent(`https://data.junkee.com/wp-content/uploads/2017/04/static1.squarespace.jpg`)}
     */
  }