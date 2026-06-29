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
const pi = document.querySelector('.π');
const euler = document.querySelector('.e');
const factorial = document.querySelector('.factorial');
const mod = document.querySelector('.mod');
const openModule = document.querySelector('.open_module');
const closeModule = document.querySelector('.close_module');
const log10 = document.querySelector('.log10');
const logE = document.querySelector('.loge');
const logx = document.querySelector('.logx');


const numbersType = ['1','2','3','4','5','6','7','8','9','0', 'π', 'e'];
const operatorsType = ['+', '-', '*', '/', '^', '.', 'm'];
const specialOpType = ['!', '%'];

input.value = 0;



openModule.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    });

    

    if(input.value === '0'){
        input.value = '|'
    }
    else if(lastSym || input.value.endsWith('\\') || input.value.endsWith(')') || input.value.endsWith('%') || input.value.endsWith('!')){
    input.value += '*|';
    }else if(input.value.endsWith('.')){
        input.value = input.value.slice(0, -1);
        input.value += '*|'
    } 
    else {
        input.value += '|';
    }
    scrollInputToEnd();
    actOpModule();
})

function actOpModule(){
    openModule.classList.add('close_active');
    closeModule.classList.add('close_active');
}

function actCloseModule(){
    openModule.classList.remove('close_active');
    closeModule.classList.remove('close_active');
}

closeModule.addEventListener('click', function(){
       const lastOperator = operatorsType.find(function(op) {
      return input.value.endsWith(op);
    });

    const tokens = tokenize(input.value);

    let curentOpen = tokens.lastIndexOf('|');
    let curentAfter = tokens.slice(curentOpen + 1);
    
    if (curentAfter.includes('(') && !curentAfter.includes(')')){
        return;
    }
    
    if(input.value.endsWith('|')){
        input.value += '0';
    };

    if(lastOperator){
        input.value = input.value.slice(0, -lastOperator.length);
    }

    input.value += '\\';
    scrollInputToEnd();
    actCloseModule();
})

log10.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    }); 
    
    if(input.value === '0'){
        input.value = 't(';
    }
    else if (input.value.endsWith('(')){
        input.value += '0+t('
    }
    else if(lastSym || input.value.endsWith(')') || input.value.endsWith('\\') || input.value.endsWith('%') || input.value.endsWith('!')){ 
        input.value += '*t('
    }
    else{
        input.value += 't('
    }
    scrollInputToEnd();
})

logE.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    }); 
    
    if(input.value === '0'){
        input.value = 'n(';
    }
    else if (input.value.endsWith('(')){
        input.value += '0+n('
    }
    else if(lastSym || input.value.endsWith(')') || input.value.endsWith('\\') || input.value.endsWith('%') || input.value.endsWith('!')){ 
        input.value += '*n('
    }
    else{
        input.value += 'n('
    }
    scrollInputToEnd();
})

logx.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    }); 
    
    if(input.value === '0'){
        input.value = 'ea(';
    }
    else if (input.value.endsWith('(')){
        input.value += 'ea('
    }
    else if(input.value.endsWith(')')){ 
        input.value += '*ea('
    }
    else{
        input.value += 'a('
    }
    scrollInputToEnd();
})



percent.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    });

    const hasSpecialOperator = specialOpType.some(function(operator) {
        return input.value.endsWith(operator);
    });


    if(hasSpecialOperator)return;

    if (lastSym){
        input.value += '%';
    }
    scrollInputToEnd();
})


factorial.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    });

    const hasSpecialOperator = specialOpType.some(function(operator) {
    return input.value.endsWith(operator);
    });
    if(hasSpecialOperator)return;

    if(lastSym){
        input.value += '!';
    }    
scrollInputToEnd();
})


pi.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    });

    if (input.value.endsWith('%') || input.value.endsWith('!'))return;

    if(input.value.endsWith('.')){
        input.value = input.value.slice(0, -1);
        input.value += '*'
    }

    if (input.value.endsWith(')') || input.value.endsWith('\\')){
        input.value += '*'
    }
    if(input.value === '0'){
        input.value = input.value.slice(0, -1);
        input.value += 'π'
    }
    else if(lastSym){
        input.value += '*π';
    } else{
        input.value += 'π';
    }
    scrollInputToEnd();
})

euler.addEventListener('click', function(){
    const lastSym = numbersType.find(function(op) {
    return input.value.endsWith(op);
    }); 

    if (input.value.endsWith('%') || input.value.endsWith('!'))return;

    if(input.value.endsWith('.')){
        input.value = input.value.slice(0, -1);
        input.value += '*'
    }

    if (input.value.endsWith(')') || input.value.endsWith('\\')){
        input.value += '*'
    }
    if(input.value === '0'){
        input.value = input.value.slice(0, -1);
        input.value += 'e'
    }
    else if(lastSym){
        input.value += '*e';
    } else{
        input.value += 'e';
    }
    scrollInputToEnd();
})





  openBracket.addEventListener('click', function() {


    if (input.value.endsWith('.')){
        input.value = input.value.slice(0, -1);
    }
    

    if (input.value.endsWith(')') || input.value.endsWith('!') || input.value.endsWith('%') || input.value.endsWith('\\')){
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


    let curentOpen = tokens.lastIndexOf('(');
    let curentAfter = tokens.slice(curentOpen + 1);
    
    if (curentAfter.includes('|') && !curentAfter.includes('\\')){
        return;
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



function makeNumberPrettier(numberString){
    const parts = numberString.split('.');

  const firstPart = parts[0];
  const secondPart = parts[1];

  let result = '';
  let count = 0;

  for (let i = firstPart.length - 1; i >= 0; i--){
        result = firstPart[i] + result;
        count++

        if(count === 3 && i !== 0){
            result = ',' + result;
            count = 0;
        }
        }

        if(secondPart !== undefined){
            result += '.'  + secondPart;
        }
    
    return result;
}


function formatLastNumber(){
    const originalExpression = input.value;
    const cleanExpression = originalExpression.replaceAll(',', '');
    
    const tokens = tokenize(cleanExpression);  
    const currentNumber = tokens.at(-1);

    if (!currentNumber) return;

    let displayNumberLength = 0;

    for (let i = originalExpression.length - 1; i >= 0; i--){
        const char = originalExpression[i];

        if ('0123456789.,'.includes(char)){
            displayNumberLength++;
        }else{
            break
        }
    }

    const expressionWithoutLastNumber = originalExpression.slice(0, -displayNumberLength);
    
    input.value = expressionWithoutLastNumber + makeNumberPrettier(currentNumber);
}




numbers.forEach(function(button){
    button.addEventListener('click', function() {

        if (input.value.endsWith('%') || input.value.endsWith('!'))return;
  
    
    if (input.value.endsWith(')') || input.value.endsWith('π') || input.value.endsWith('e') || input.value.endsWith('\\')){
        input.value += '*'
    }

    if (input.value === '0'){
        input.value = button.textContent;
    } else {
        input.value += button.textContent;
    }
    scrollInputToEnd();
    formatLastNumber();
})
});

operators.forEach(function(operator){
    operator.addEventListener('click', function(){
    const value = operator.dataset.value || operator.textContent.trim();
    
    const lastOperator = operatorsType.find(function(op) {
      return input.value.endsWith(op);
    });
    
    if(input.value.endsWith('(')|| input.value.endsWith('|')){
        input.value += '0';
    };

    if(lastOperator){
        input.value = input.value.slice(0, -lastOperator.length);
    }

    if(input.value.endsWith('t') || input.value.endsWith('n')|| input.value.endsWith('a')){
        input.value = input.value.slice(0, -2);
    }

    input.value += value;
    scrollInputToEnd();
});
});


dot.addEventListener('click', function(){

    const lastOperator = operatorsType.find(function(op) {
      return input.value.endsWith(op);
    });

    if (input.value.endsWith('%') || input.value.endsWith('!'))return;

    const tokens = tokenize(input.value);

    let curentNum = tokens.at(-1);

    if(curentNum.includes('.'))return;

    if(input.value.endsWith('(') || input.value.endsWith('|')){
        input.value +=0
    }

    if(input.value.endsWith('e') || input.value.endsWith('π') || input.value.endsWith('\\') || input.value.endsWith(')')){
        input.value += '*0';
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
    if (lastSym || input.value.endsWith('!') || input.value.endsWith('%') || input.value.endsWith('\\')){
        input.value += '*√(';
    }
    else{
       input.value += '√('; 
    }
    
})




clearAll.addEventListener('click', function(){
input.value = 0;
actCloseModule();
})


backspace.addEventListener('click', function(){
    
    input.value = input.value.slice(0 , -1);

    if (input.value === ''){
        input.value = '0';
    }

    const tokens = tokenize(input.value);

    let openCount = 0;
    let closeCount = 0;

    for(let char of tokens){
        if (char === '|') openCount++;
        if (char === '\\') closeCount++;
    }


    if(openCount > closeCount){
        actOpModule()
    } else if (openCount === closeCount){
        actCloseModule();
    }
})



clearLast.addEventListener('click', function(){
  const tokens = tokenize(input.value);
  const lastToken = tokens.pop();
  
  if (!lastToken) {
    input.value = '0';
    actCloseModule();
    return;
  }

    let openCount = 0;
    let closeCount = 0;

    for(let char of tokens){
        if (char === '|') openCount++;
        if (char === '\\') closeCount++;
    }


    if(openCount > closeCount){
        actOpModule()
    } else if (openCount === closeCount){
        actCloseModule();
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
   expression = expression.replaceAll(',', '');   
   
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
    const fixedExpression = fixBracketsAndAbs(input.value);
    const result = calculate(fixedExpression);
    input.value = result;
    actCloseModule();
})



function fixBracketsAndAbs(expression) {
    if (operatorsType.includes(expression.at(-1))) {
        expression = expression.slice(0, -1);
    }

    const stack = [];

    for (let char of expression) {
        if (char === '(' || char === '|') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.at(-1) === '(') {
                stack.pop();
            }
        } else if (char === '\\') {
            if (stack.at(-1) === '|') {
                stack.pop();
            }
        }
    }

    while (stack.length > 0) {
        const lastOpen = stack.pop();

        if (lastOpen === '(') {
            if (expression.endsWith('(')) {
                expression += '0';
            }

            expression += ')';
        } else if (lastOpen === '|') {
            if (expression.endsWith('|')) {
                expression += '0';
            }

            expression += '\\';
        }
    }

    return expression;
}



function calculateTokens(tokens){

        while (tokens.includes('|')) {
        const openIndex = tokens.indexOf('|');

        const closeIndex = tokens.indexOf('\\', openIndex);


        const inside = tokens.slice(openIndex + 1, closeIndex);

        
        const insideResult = calculateTokens(inside);

        if (typeof insideResult === 'string') {
            return insideResult;
        }

        let absResult = Math.abs(insideResult);
    
        tokens.splice(openIndex, closeIndex - openIndex + 1, absResult);
    }


    while (tokens.includes('(')) {
        const openIndex = tokens.lastIndexOf('(');
        const closeIndex = tokens.indexOf(')', openIndex);


        const inside = tokens.slice(openIndex + 1, closeIndex);

        
        const insideResult = calculateTokens(inside);

        if (typeof insideResult === 'string') {
            return insideResult;
        }
        
        tokens.splice(openIndex, closeIndex - openIndex + 1, insideResult);
    }
   
//цикл пи е

      for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === 'π') {
        tokens[i] = Math.PI;
    }
}

 for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === 'e') {
        tokens[i] = Math.E;
    }
}

//цикл логе и лог10

    for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === 't'){
            
            const Log10Num = Number(tokens[i+1]);

            if(Log10Num <= 0){
                return 'invalid log10 Input';
            }

            let Log10Result = Math.log10(Log10Num);

            tokens.splice(i, 2, Log10Result);
            i = Math.max(i -1, -1);
        }
      }

          for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === 'n'){
            
            const LogENum = Number(tokens[i+1]);

            if(LogENum <= 0){
                return 'invalid logE Input';
            }

            let LogEResult = Math.log(LogENum);

            tokens.splice(i, 2, LogEResult);
            i = Math.max(i -1, -1);
        }
      }

  
// цикл %!

    for(let i = 1; i < tokens.length; i++){
    if(tokens[i] === '!'){
        const argument = Number(tokens[i-1]);

        let factorialResult = 1;
            for(let number = 1; number <= argument; number++){
                factorialResult *= number;
            }
            
            tokens.splice(i-1, 2, factorialResult);
            i = Math.max(i -1, -1);
        }
    }

    for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === '%'){
            
            const percentNum = Number(tokens[i-1]);

            let percentResult = percentNum / 100;

            tokens.splice(i-1, 2, percentResult);
            i = Math.max(i -1, -1);
        }
      }

//цикл логх

          for (let i = 0; i < tokens.length; i++){
        if (tokens[i] === 'a'){
            
            const LogBaseNum = Number(tokens[i-1]);
            const logArgumentNum = Number(tokens[i+1])

            if(LogBaseNum <= 0){
                return 'invalid log base Input';
            }

            if(logArgumentNum <= 0){
                return 'invalid log argument Input';
            }

            let LogXResult = Math.log(logArgumentNum) / Math.log(LogBaseNum);

            tokens.splice(i-1, 3, LogXResult);
            i = Math.max(i -2, -1);
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





//цикл */m


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
            } else if (middlePriorityOperators === 'm'){
                if(secondNumber === 0){
                return "Cannot divide by zero";
                }
                else {
                let modResult = firstNumber % secondNumber;
                tokens.splice(i-1, 3, modResult);
                }
              i = Math.max(i - 2, -1);
            }
                
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
