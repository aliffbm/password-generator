
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
  'A-Z',
  'a-z',
  '0-9'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
/**
 *  Logic to display char choices
 */

 // create tags for char choices
 function choicesTags() {
   let choicesContainer = document.querySelector("#choicesContainer");
   let charContainer = document.createElement('div')
   charContainer.setAttribute('id', 'specialCharacters');
   charContainer.classList.add('charContainer')
   for(let i = 0; i < specialCharacters.length; i++) {
     let char  = specialCharacters[i];
     let choice = document.createElement('span')
     choice.setAttribute("value", char);
     choice.classList.add('choice')
     choice.textContent = char;
     choice.addEventListener('click', handleChoiceClick)
     charContainer.appendChild(choice)
   }

   choicesContainer.appendChild(charContainer)
 }

 function handleChoiceClick() {
   this.classList.toggle('chosen')
 }

 choicesTags();


 let button = document.querySelector('#password-generator > button')
button.addEventListener('click', generatePassword)
 function generatePassword() {
  
  let length = document.querySelector('#length').value

  let chosen = document.querySelectorAll('.chosen');
  if(chosen.length <= 2) {
    let pw_display = document.querySelector("#password-display #text");
    pw_display.textContent = "Must select atleast two symbols"; 
    setTimeout(function(){
      pw_display.textContent = "";
    },2000)
    return;
    
  }
  if(length.length == 0 || parseInt(length) <= 4) {
    let pw_display = document.querySelector("#password-display #text");
    pw_display.textContent = "Character must be greater than length 4"; 
    setTimeout(function(){
      pw_display.textContent = "";
    },2000)
    return; 
  }
  
  let chars = []
  let pw = "";
  let one = false;
  for(let i = 0; i < chosen.length; i++) {
    let ch = chosen[i]
    let val = ch.getAttribute('value')
    if(val === 'A-Z') {
      pw += upperCasedCharacters[Math.floor(Math.random()*100) % upperCasedCharacters.length]
      chars = [...chars, ...upperCasedCharacters]
    }else if(val === 'a-z') {
      pw += lowerCasedCharacters[Math.floor(Math.random()*100) % lowerCasedCharacters.length]
      chars = [...chars, ...lowerCasedCharacters]
    }else if (val === '0-9') {
      pw += numericCharacters[Math.floor(Math.random()*100) % numericCharacters.length]
      chars = [...chars, ...numericCharacters]
    } else {
      if(!one) {
        pw += val;
        chars.push(val)
        one = true;
      } else {
        chars.push(val)
      }
    }
  }
  let diff = parseInt(length) - pw.length;
  for (let i = 0; i < diff; i++) {
    pw += chars[Math.floor(Math.random()*100) % chars.length]
  }

  let pw_display = document.querySelector("#password-display #text");
  pw_display.textContent = pw; 
 }
