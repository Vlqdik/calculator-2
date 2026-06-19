const input = document. querySelector('.input');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const dot = document.querySelector('.dot');
const clearAll = document.querySelector('.clear_all');
const backspace = document.querySelector('.backspace');
const clearLast = document.querySelector('.clear_last');
const equals = document.querySelector('.equals');
const openBracket = document.querySelector('.bracket_open');
const closeBracket = document.querySelector('.bracket_close');
const sqrt = document.querySelector('.sqrt');
const percent = document.querySelector('.percent');
const burger = document.querySelector('.burger');
const sideMenu = document.querySelector('.side_menu');
const scientific = document.querySelector('.scientific');
const buttonsContainer = document.querySelector('.buttons_container'); 
const standart = document.querySelector('.standard');
const modeButton = document.querySelectorAll('.mode');
const mButton = document.querySelector('.m_buttons');
const modeName = document.querySelector('.calc_version');


const numbersType = ['1','2','3','4','5','6','7','8','9','0'];
const operatorsType = ['+', '-', '*', '/', '^', '.'];

input.value = 0;

percent.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);

    
    });
    if (lastSym){
        input.value += '%';
    }
})




  openBracket.addEventListener('click', function() {

    if (input.value.endsWith('.')){
        input.value = input.value.slice(0, -1);
    }

    if (input.value.endsWith(')')){
        input.value += '*';
    }


    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    });

    if (lastSym){
        input.value += '*(';
    }
    else{
       input.value += '('; 
    }
    
    scrollInputToEnd();
  });

  closeBracket.addEventListener('click', function() {

    const lastOperator = operatorsType.find(function(op) {
    return input.value.endsWith(op);
    });


    const tokens = tokenize(input.value);

    if(!tokens.includes('('))return;

    let openCount = 0;
    let closeCount = 0;

    for(let char of tokens){
        if (char === '(') openCount++;
        if (char === ')') closeCount++;
    }
    


    if(closeCount === openCount)return;

    if (lastOperator){
        input.value = input.value.slice(0 , -1);
    }

    if(input.value.endsWith('(')){
        input.value += '0)'
    } else{
        input.value += ')';
    }
   scrollInputToEnd();
  });





numbers.forEach(function(button){
    button.addEventListener('click', function() {
    
    if (input.value.endsWith(')')){
        input.value += '*'
    }

    if (input.value === '0'){
        input.value = button.textContent;
    } else {
        input.value += button.textContent;
    }

    scrollInputToEnd();
})
});

operators.forEach(function(operator){
    operator.addEventListener('click', function(){
    const value = operator.dataset.value || operator.textContent.trim();
    
    const lastOperator = operatorsType.find(function(op) {
      return input.value.endsWith(op);
    });
    
    if(input.value.endsWith('(')){
        input.value += '0';
    };

    if(lastOperator){
        input.value = input.value.slice(0, -lastOperator.length);
    }

    input.value += value;
    scrollInputToEnd();
});
});


dot.addEventListener('click', function(){

    const lastOperator = operatorsType.find(function(op) {
      return input.value.endsWith(op);
    });

    const tokens = tokenize(input.value);

    let curentNum = tokens.at(-1);

    if(curentNum.includes('.'))return;

    if(input.value.endsWith('(')){
        input.value +=0
    }

    if(lastOperator){
        input.value += 0 + dot.textContent;
    }

    else {
        input.value += dot.textContent;
    }
    scrollInputToEnd();
})

sqrt.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);

    });
    if (lastSym){
        input.value += '*√(';
    }
    else{
       input.value += '√('; 
    }
    
})




clearAll.addEventListener('click', function(){
input.value = 0;
})


backspace.addEventListener('click', function(){
    input.value = input.value.slice(0 , -1);

    if (input.value === ''){
        input.value = '0';
    }
})



clearLast.addEventListener('click', function(){
  const tokens = tokenize(input.value);
  const lastToken = tokens.pop();
  
  if (!lastToken) {
    input.value = '0';
    return;
  }
    
    input.value = input.value.slice(0, -String(lastToken).length);
  
     if (input.value === '') {
      input.value = '0';
    }
});



function tokenize(expression){

   expression = expression.replaceAll(' ', '');
   expression = expression.replaceAll('×', '*');
   expression = expression.replaceAll('÷', '/');

    const tokens = [];
    let currentNumber = '';
    
    for(let char of expression){
        if ('0123456789.'.includes(char)){
            currentNumber += char;
        } else {
            if (currentNumber !== ''){
                tokens.push(currentNumber);
                currentNumber = '';
            }

            tokens.push(char);
        }
      }

      if(currentNumber !== ''){
        tokens.push(currentNumber);
      }
  return tokens
}



function calculate(expression){

    const tokens = tokenize(expression);
  
    return calculateTokens(tokens);

}



equals.addEventListener('click', function(){
    const fixedExpression = fixBrackets(input.value);
    const result = calculate(fixedExpression);
    input.value = result;
})



function fixBrackets(expression){

    //const lastOperator = operatorsType.find(function(op) {
    //return input.value.endsWith(op);
    //});

    //const tokens = tokenize(input.value)

    if(operatorsType.includes(expression.at(-1))){
        expression = expression.slice(0, -1);
    }


    let openCount = 0;
    let closeCount = 0;

    for(let char of expression){
        if (char === '(') openCount++;
        if (char === ')') closeCount++;
    }



    const missingClose = openCount - closeCount;

    for (let i = 0; i < missingClose; i++) {
        if (expression.endsWith('(')){
            expression += '0)';
        } else {
           expression += ')';
        }
    };





    return expression;
}



function calculateTokens(tokens){


    while (tokens.includes('(')) {
        const openIndex = tokens.lastIndexOf('(');
        const closeIndex = tokens.indexOf(')', openIndex);


        const inside = tokens.slice(openIndex + 1, closeIndex);

        
        const insideResult = calculateTokens(inside);


        tokens.splice(openIndex, closeIndex - openIndex + 1, insideResult);

        
    
    }
   
// цикл %

    for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === '%'){
            
            const percentNum = Number(tokens[i-1]);

            let percentResult = percentNum / 100;

            tokens.splice(i-1, 2, percentResult);
            i = Math.max(i -1, -1);
        }
      }




// цикл ^
      for (let i = 1; i < tokens.length; i +=2){

        const highPriorityOperators = tokens[i];
        
        const base = Number(tokens[i-1]);
        const degree = Number(tokens[i+1]);

        let powerResult = 1;
        if (highPriorityOperators === '^'){

            for (let d = 0; degree > d; d++){

               powerResult = powerResult*base;
            }            
            tokens.splice(i-1, 3, powerResult);
            i = Math.max(i - 2, -1);
        }
    }

        
// цикл √

      for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === '√'){
            const sqrtNum = Number(tokens[i+1]);
            let sqrtResult = Math.sqrt(sqrtNum);

            tokens.splice(i, 2, sqrtResult);
            i = Math.max(i -1, -1);
        }
      }





//цикл */ 
      for (let i = 1; i < tokens.length; i += 2){

        const middlePriorityOperators  = tokens[i];

        const firstNumber = Number(tokens[i-1]);
        const secondNumber = Number(tokens[i+1]);



            if(middlePriorityOperators  === '*') {
              let multiplyResult = firstNumber * secondNumber;
            
              tokens.splice(i-1, 3, multiplyResult);
              i = Math.max(i - 2, -1);
            } else if(middlePriorityOperators  === '/') {
              let divideResult = firstNumber / secondNumber;
            
              tokens.splice(i-1, 3, divideResult);
              i = Math.max(i - 2, -1);
            };
                
            }
      

    
        let result = Number(tokens[0]);

    

// цикл +-
    for(let i = 1; i < tokens.length; i+=2){

        const lowPriorityOperators  = tokens[i];

        const nextNumber = Number(tokens[i+1]);
        

        if(lowPriorityOperators  === '+') result = result + nextNumber; 
        if(lowPriorityOperators  === '-') result = result - nextNumber; 
    }

    return result;


}




burger.addEventListener('click', function(){
    sideMenu.classList.toggle('active_burger')

    setTimeout(()=>{
    document.addEventListener('click', closeBurgerClick);
    document.addEventListener('keydown', closeBurgerEsc);
}, 0);
    document.removeEventListener('click', closeBurgerClick);
})


function closeBurger(event){
    sideMenu.classList.remove('active_burger');
    document.removeEventListener('click', closeBurgerClick);
    document.removeEventListener('keydown', closeBurgerEsc);
}

function closeBurgerClick(event){
    const outsideClick = !sideMenu.contains(event.target);

    if(outsideClick){
        closeBurger();
    }
}

function closeBurgerEsc(event){
  if (event.key === 'Escape'){
    closeBurger();
  }
}



scientific.addEventListener('click', function(){
    if(document.querySelector('.scientific_mode'))return;

    buttonsContainer.classList.remove('standard_mode');
    buttonsContainer.classList.add('scientific_mode');
    mButton.classList.add('scientific_m'); 
    modeName.textContent = 'Scientific';
})

standart.addEventListener('click', function(){
    if (document.querySelector('.standard_mode'))return;
    
    buttonsContainer.classList.remove('scientific_mode');
    buttonsContainer.classList.add('standard_mode');
    mButton.classList.remove('scientific_m'); 
    modeName.textContent = 'Standard';
})


modeButton.forEach(function(mode){
    mode.addEventListener('click', function(){
    closeBurger();
})
})


function scrollInputToEnd() {
  setTimeout(function() {
    input.scrollLeft = input.scrollWidth;
  }, 0);
}
