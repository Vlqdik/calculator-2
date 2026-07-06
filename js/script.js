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
const date = document.querySelector('.date');
const calcButtons = document.querySelectorAll('.calc_but')
const memhisWrapper = document.querySelector('.memhis_wrapper');
const inputDiv = document.querySelector('.input_div');
const dateFrom = document.querySelector('.date_from');
const dateTo = document.querySelector('.date_to');
const differenceResult = document.querySelector('.difference_result');
const calculationWrapper = document.querySelector('.calculation_wrapper');
const mainArea = document.querySelector('.main-area');
const wrapper = document.querySelector('.wrapper');
const timeConverter = document.querySelector('.time_converter');
const converterFromUnit = document.querySelector('.converter_from_unit');
const converterToUnit = document.querySelector('.converter_to_unit');
const converterModeButtons = document.querySelectorAll('.converter_mode');
const converterFromValue = document.querySelector('.converter_from_value');
const converterToValue = document.querySelector('.converter_to_value');
const convertersButtons = document.querySelector('.converters_buttons');
const apiBy = document.querySelector('.api_by');


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

//Калькулятор дат

function getDatePartsDifference(fromValue, toValue){

    let start = new Date(fromValue);
    let end = new Date(toValue);

    if (start > end){
        const temp = start;
        start = end;
        end = temp;
    }
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if(days < 0){
        months--

        const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += previousMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

     return { years, months, days };

}

function calculateDateDifference() {
    if (!dateFrom.value || !dateTo.value) {
        differenceResult.textContent = '';
        return;
    }

    const from = new Date(dateFrom.value);
    const to = new Date(dateTo.value);

    const diffMs = Math.abs(to - from);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const diff = getDatePartsDifference(dateFrom.value, dateTo.value);

differenceResult.textContent = `${dateVisualization(diff.years, diff.months, diff.days)} (${totalDays} days total)`;
}
dateFrom.addEventListener('change', calculateDateDifference);
dateTo.addEventListener('change', calculateDateDifference);

function dateVisualization(years, months, days) {
    const dateDiff = [];

    if (years > 0) {
        dateDiff.push(`${years} years`);
    }

    if (months > 0) {
        dateDiff.push(`${months} months`);
    }

    if (days > 0) {
        dateDiff.push(`${days} days`);
    }

    if (dateDiff.length === 0) {
        return '0 days';
    }

    return dateDiff.join(', ');
}


//конвертеры

convertersButtons.addEventListener('click', function(event){
    const button = event.target.closest('.conv_but');

     if (!button) return;

    if(button.classList.contains('clear_all_c')){
        activeConverterInput.value = '0';
        convertValue();
        return;
    }

    if(button.classList.contains('clear_last_c')){
        activeConverterInput.value = activeConverterInput.value.slice(0, -1);

        if(activeConverterInput.value === ''){
            activeConverterInput.value = '0';
        }
         convertValue();
        return;
    }

    const value = button.dataset.value;

    if (!value) return;

if (value === '.' && activeConverterInput.value.includes('.')) return;

 if (activeConverterInput.value === '0' && value !== '.') {
        activeConverterInput.value = value;
    } else {
        activeConverterInput.value += value;
    };

convertValue();
})


function convertValue(){

     const converter = converters[currentConverter];

    const fromUnit = converter.units.find(function(unit) {
    return unit.value === converterFromUnit.value;
    });    

    const toUnit = converter.units.find(function(unit) {
    return unit.value === converterToUnit.value;
    });    


    const value = Number(activeConverterInput.value)

    if (Number.isNaN(value)) return;

    if (activeConverterInput === converterFromValue){
        const baseValue = fromUnit.toBase(value);
        const result = toUnit.fromBase(baseValue);

        converterToValue.value = formatConverterNumber(result);
    } else {
        const baseValue = toUnit.toBase(value);
        const result = fromUnit.fromBase(baseValue);

        converterFromValue.value = formatConverterNumber(result);
    }
}

function formatConverterNumber(number) {
    if (!Number.isFinite(number)) {
        return 'Error';
    }

    if (number === 0) {
        return '0';
    }

    const absNumber = Math.abs(number);

    if (absNumber < 0.000001 || absNumber >= 1000000000000) {
        return number.toExponential(8);
    }

    if (Number.isInteger(number)) {
        return String(number);
    }

    return String(Number(number.toFixed(10)));
}
converterFromUnit.addEventListener('change', convertValue);
converterToUnit.addEventListener('change', convertValue);





async function loadCurrencyRates() {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');




    if(!response.ok){
        throw new Error('Failed to load currency rates');
    }

    const data = await response.json();
    const rates = data.rates;

    function createCurrencyUnit(code, label) {
        
    const apiCode = code.toUpperCase();
    const unitValue = code.toLowerCase();

    return createLinearUnit(unitValue, label, 1 / rates[apiCode]);
}
    

        converters.currency = {
        title: 'Currency converter',
        defaultFrom: 'usd',
        defaultTo: 'eur',
        units: [
            createLinearUnit('usd', 'US Dollar', 1),

            createCurrencyUnit('eur', 'Euro'),
            createCurrencyUnit('pln', 'Polish złoty'),
            createCurrencyUnit('uah', 'Ukrainian hryvnia'),
            createCurrencyUnit('gbp', 'British pound'),

            createCurrencyUnit('chf', 'Swiss franc'),
            createCurrencyUnit('cad', 'Canadian dollar'),
            createCurrencyUnit('aud', 'Australian dollar'),
            createCurrencyUnit('nzd', 'New Zealand dollar'),

            createCurrencyUnit('jpy', 'Japanese yen'),
            createCurrencyUnit('cny', 'Chinese yuan'),
            createCurrencyUnit('krw', 'South Korean won'),
            createCurrencyUnit('inr', 'Indian rupee'),

            createCurrencyUnit('czk', 'Czech koruna'),
            createCurrencyUnit('huf', 'Hungarian forint'),
            createCurrencyUnit('ron', 'Romanian leu'),
            createCurrencyUnit('bgn', 'Bulgarian lev'),
            createCurrencyUnit('try', 'Turkish lira'),

            createCurrencyUnit('gel', 'Georgian lari'),
            createCurrencyUnit('mdl', 'Moldovan leu'),
            createCurrencyUnit('kzt', 'Kazakhstani tenge'),

            createCurrencyUnit('brl', 'Brazilian real'),
            createCurrencyUnit('mxn', 'Mexican peso'),
            createCurrencyUnit('zar', 'South African rand'),
            createCurrencyUnit('ils', 'Israeli new shekel'),
            createCurrencyUnit('aed', 'UAE dirham')
        ]
    };


}




//переключетали режимов

function openConverterMode() {
    wrapper.classList.add('converter_mode_active');
    memhisWrapper.classList.add('invisibility');

    buttonsContainer.classList.remove('standard_mode');
    buttonsContainer.classList.remove('scientific_mode');
    buttonsContainer.classList.remove('date_mode');
    calcButtons.forEach(function(buttons){
    buttons.classList.remove('date_mod_but');
    })


}


function closeConverterMode() {
    wrapper.classList.remove('converter_mode_active');
    memhisWrapper.classList.remove('invisibility');
    apiBy.classList.remove('active');
}



standart.addEventListener('click', function(){
    if (document.querySelector('.standard_mode'))return;
    
    buttonsContainer.classList.remove('scientific_mode');
    buttonsContainer.classList.remove('date_mode');
    closeConverterMode()

    buttonsContainer.classList.add('standard_mode');

    input.classList.remove('scientific_input');
    inputDiv.classList.remove('non_memory');
    memhisWrapper.classList.remove('invisibility')
    input.classList.remove('non_memory');
    mButton.classList.remove('non_memory');

    calcButtons.forEach(function(buttons){
    buttons.classList.remove('date_mod_but');
    })

    mButton.classList.remove('scientific_m'); 
    modeName.textContent = 'Standard';
})

scientific.addEventListener('click', function(){
    if(document.querySelector('.scientific_mode'))return;

    buttonsContainer.classList.remove('standard_mode');
    buttonsContainer.classList.remove('date_mode');
    closeConverterMode();


    buttonsContainer.classList.add('scientific_mode');
    input.classList.remove('non_memory');
    inputDiv.classList.remove('non_memory');
    calcButtons.forEach(function(buttons){
    buttons.classList.remove('date_mod_but');
    })
    memhisWrapper.classList.remove('invisibility')
    mButton.classList.remove('non_memory'); 
    input.classList.add('scientific_input');

    
    mButton.classList.add('scientific_m'); 
    modeName.textContent = 'Scientific';
})

date.addEventListener('click', function(){
    if(document.querySelector('.date_mode'))return;

    buttonsContainer.classList.remove('standard_mode');
    buttonsContainer.classList.remove('scientific_mode');
    closeConverterMode();
    
    calcButtons.forEach(function(buttons){
    buttons.classList.add('date_mod_but');
    })
    memhisWrapper.classList.add('invisibility')

    buttonsContainer.classList.add('date_mode');
    input.classList.add('non_memory');
    inputDiv.classList.add('non_memory');
    mButton.classList.remove('scientific_m'); 
    mButton.classList.add('non_memory'); 
    modeName.textContent = 'Date';
})

//режимы конвертера

converterModeButtons.forEach(function(button) {
    button.addEventListener('click', async function() {
        const type = button.dataset.converter;
        openConverterMode();

        try {
            if(type === 'currency'){
                modeName.textContent = 'Loading currencies...';
                await loadCurrencyRates();
                apiBy.classList.add('active');
            } else {
                apiBy.classList.remove('active');
            }
            
            
            renderConverter(type);
        } catch (error) {
            modeName.textContent = 'Currency error';
            converterFromValue.value = '0';
            converterToValue.value = 'Failed to load';
            console.error(error);
        }


        
        closeBurger();
    });
});



const converters = {
//время    
    time: {
        title: 'Time converter',
        defaultFrom: 'seconds',
        defaultTo: 'minutes',
        units: [
            createLinearUnit('milliseconds', 'Milliseconds', 0.001),
            createLinearUnit('seconds', 'Seconds', 1),
            createLinearUnit('minutes', 'Minutes', 60),
            createLinearUnit('hours', 'Hours', 3600),
            createLinearUnit('days', 'Days', 86400),
            createLinearUnit('weeks', 'Weeks', 604800)
        ]
    },

// растояние 

    distance: {
    title: 'Distance converter',
    defaultFrom: 'meters',
    defaultTo: 'kilometers',
    units: [
        createLinearUnit('millimeters', 'Millimeters', 0.001),
        createLinearUnit('centimeters', 'Centimeters', 0.01),
        createLinearUnit('meters', 'Meters', 1),
        createLinearUnit('kilometers', 'Kilometers', 1000),

        createLinearUnit('inches', 'Inches', 0.0254),
        createLinearUnit('feet', 'Feet', 0.3048),
        createLinearUnit('yards', 'Yards', 0.9144),
        createLinearUnit('miles', 'Miles', 1609.344),
        createLinearUnit('nautical_miles', 'Nautical miles', 1852)
    ]
},  

// данные 

    data: {
        title: 'Data converter',
        defaultFrom: 'megabytes',
        defaultTo: 'gigabytes',
        units: [
            createLinearUnit('bits', 'Bits', 0.125),
            createLinearUnit('bytes', 'Bytes', 1),

            createLinearUnit('kilobytes', 'Kilobytes', 1024),
            createLinearUnit('megabytes', 'Megabytes', 1024 ** 2),
            createLinearUnit('gigabytes', 'Gigabytes', 1024 ** 3),
            createLinearUnit('terabytes', 'Terabytes', 1024 ** 4),
            createLinearUnit('petabytes', 'Petabytes', 1024 ** 5)
        ]
    },

// обьем

    volume: {
    title: 'Volume converter',
    defaultFrom: 'liters',
    defaultTo: 'milliliters',
    units: [
        createLinearUnit('milliliters', 'Milliliters', 0.001),
        createLinearUnit('liters', 'Liters', 1),
        createLinearUnit('cubic_centimeters', 'Cubic centimeters', 0.001),
        createLinearUnit('cubic_meters', 'Cubic meters', 1000),

        createLinearUnit('teaspoons_us', 'Teaspoons US', 0.00492892159375),
        createLinearUnit('tablespoons_us', 'Tablespoons US', 0.01478676478125),
        createLinearUnit('fluid_ounces_us', 'Fluid ounces US', 0.0295735295625),
        createLinearUnit('cups_us', 'Cups US', 0.2365882365),
        createLinearUnit('pints_us', 'Pints US', 0.473176473),
        createLinearUnit('quarts_us', 'Quarts US', 0.946352946),
        createLinearUnit('gallons_us', 'Gallons US', 3.785411784)
    ]
},

// масса 

mass: {
    title: 'Mass converter',
    defaultFrom: 'kilograms',
    defaultTo: 'grams',
    units: [
        createLinearUnit('milligrams', 'Milligrams', 0.000001),
        createLinearUnit('grams', 'Grams', 0.001),
        createLinearUnit('kilograms', 'Kilograms', 1),
        createLinearUnit('metric_tons', 'Metric tons', 1000),

        createLinearUnit('ounces', 'Ounces', 0.028349523125),
        createLinearUnit('pounds', 'Pounds', 0.45359237),
        createLinearUnit('stones', 'Stones', 6.35029318)
    ]
},

// площадь

area: {
    title: 'Area converter',
    defaultFrom: 'square_meters',
    defaultTo: 'square_centimeters',
    units: [
        createLinearUnit('square_millimeters', 'Square millimeters', 0.000001),
        createLinearUnit('square_centimeters', 'Square centimeters', 0.0001),
        createLinearUnit('square_meters', 'Square meters', 1),
        createLinearUnit('square_kilometers', 'Square kilometers', 1000000),

        createLinearUnit('square_inches', 'Square inches', 0.00064516),
        createLinearUnit('square_feet', 'Square feet', 0.09290304),
        createLinearUnit('square_yards', 'Square yards', 0.83612736),
        createLinearUnit('acres', 'Acres', 4046.8564224),
        createLinearUnit('hectares', 'Hectares', 10000),
        createLinearUnit('square_miles', 'Square miles', 2589988.110336)
    ]
},
// скорость
speed: {
    title: 'Speed converter',
    defaultFrom: 'meters_per_second',
    defaultTo: 'kilometers_per_hour',
    units: [
        createLinearUnit('meters_per_second', 'Meters per second', 1),
        createLinearUnit('kilometers_per_hour', 'Kilometers per hour', 1 / 3.6),
        createLinearUnit('miles_per_hour', 'Miles per hour', 0.44704),
        createLinearUnit('feet_per_second', 'Feet per second', 0.3048),
        createLinearUnit('knots', 'Knots', 0.514444444)
    ]
},

//давление

pressure: {
    title: 'Pressure converter',
    defaultFrom: 'pascals',
    defaultTo: 'bar',
    units: [
        createLinearUnit('pascals', 'Pascals', 1),
        createLinearUnit('kilopascals', 'Kilopascals', 1000),
        createLinearUnit('megapascals', 'Megapascals', 1000000),

        createLinearUnit('bar', 'Bar', 100000),
        createLinearUnit('millibar', 'Millibar', 100),
        createLinearUnit('atmospheres', 'Atmospheres', 101325),
        createLinearUnit('psi', 'PSI', 6894.757293168),
        createLinearUnit('torr', 'Torr', 133.3223684211),
        createLinearUnit('millimeters_of_mercury', 'Millimeters of mercury', 133.322387415)
    ]
},

//угол

angle: {
    title: 'Angle converter',
    defaultFrom: 'degrees',
    defaultTo: 'radians',
    units: [
        createLinearUnit('degrees', 'Degrees', Math.PI / 180),
        createLinearUnit('radians', 'Radians', 1),
        createLinearUnit('gradians', 'Gradians', Math.PI / 200),
        createLinearUnit('turns', 'Turns', Math.PI * 2),
        createLinearUnit('arcminutes', 'Arcminutes', Math.PI / 10800),
        createLinearUnit('arcseconds', 'Arcseconds', Math.PI / 648000)
    ]
},

// энергия 

energy: {
    title: 'Energy converter',
    defaultFrom: 'joules',
    defaultTo: 'kilojoules',
    units: [
        createLinearUnit('joules', 'Joules', 1),
        createLinearUnit('kilojoules', 'Kilojoules', 1000),

        createLinearUnit('calories', 'Calories', 4.184),
        createLinearUnit('kilocalories', 'Kilocalories', 4184),

        createLinearUnit('watt_hours', 'Watt-hours', 3600),
        createLinearUnit('kilowatt_hours', 'Kilowatt-hours', 3600000),

        createLinearUnit('electronvolts', 'Electronvolts', 1.602176634e-19),
        createLinearUnit('british_thermal_units', 'British thermal units', 1055.05585262)
    ]
},

temperature: {
    title: 'Temperature converter',
    defaultFrom: 'celsius',
    defaultTo: 'fahrenheit',
    units: [
        {
            value: 'celsius',
            label: 'Celsius',
            toBase: function(number) {
                return number;
            },
            fromBase: function(number) {
                return number;
            }
        },
        {
            value: 'fahrenheit',
            label: 'Fahrenheit',
            toBase: function(number) {
                return (number - 32) * 5 / 9;
            },
            fromBase: function(number) {
                return number * 9 / 5 + 32;
            }
        },
        {
            value: 'kelvin',
            label: 'Kelvin',
            toBase: function(number) {
                return number - 273.15;
            },
            fromBase: function(number) {
                return number + 273.15;
            }
        }
    ]
},


};

function createLinearUnit(value, label, factor) {
    return {
        value: value,
        label: label,
        toBase: function(number) {
            return number * factor;
        },
        fromBase: function(number) {
            return number / factor;
        }
    };
}


function fillSelect(select, units, selectedValue){
    select.innerHTML = '';
    
    units.forEach(function(unit){
        const option = document.createElement('option');

        option.value = unit.value;
        option.textContent = unit.label;

        select.append(option);
    })
    select.value = selectedValue;
    
}

let activeConverterInput = converterFromValue;

converterFromValue.addEventListener('click', function() {
    activeConverterInput = converterFromValue;
});

converterToValue.addEventListener('click', function() {
    activeConverterInput = converterToValue;
});


let currentConverter = null;

function renderConverter(type) {
    currentConverter = type;

    const converter = converters[type];

    modeName.textContent = converter.title;

    fillSelect(converterFromUnit, converter.units, converter.defaultFrom);
    fillSelect(converterToUnit, converter.units, converter.defaultTo);

    converterFromValue.value = '0';
    converterToValue.value = '0';

    activeConverterInput = converterFromValue;
    convertValue();
}








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
