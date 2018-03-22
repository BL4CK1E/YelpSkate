// Limit Chars for ShortOverview
let i;
let divs = document.getElementsByClassName("shortOverview");

for (i = 0; i < divs.length; i++) {
  let desLen = divs[i].innerHTML.length;
  if (desLen > 100) {
    divs[i].innerHTML = divs[i].innerHTML.substring(0, 100) + "...";
  } else {
  }
}

// Randomise the event cards for the details page
let randomNumArr = [];

function randomNum() {
  for (let i = 0; i < 4; i++) {
    let rand = Math.floor(Math.random() * 6 + 1);
    if (rand === randomNumArr[i - 1]) {
      randomNumArr.push(rand - 1);
    } else {
      randomNumArr.push(rand);
    }
  }
  return randomNumArr;
}

randomNum();
