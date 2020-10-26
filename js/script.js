`use strict`

const result = document.querySelector(`.calculating__result span`);
let sex = `woman`;
let ratio = 1.375;
let height,weight,age;

function staticChoise(parrent) {
    const elementchoice = document.querySelectorAll(`${parrent } div`);
    elementchoice.forEach(item =>{
        item.addEventListener(`click`,(e)=>{
            if(e.target.getAttribute(`data-ratio`)){
                ratio = e.target.getAttribute(`data-ratio`);
            }else{
                sex = e.target.getAttribute(`id`);
            }
            elementchoice.forEach(element =>{
                element.classList.remove(`active`);
            });
            item.classList.add(`active`);
            caloryCalculation();
        });
    });
}
staticChoise(`.sex`);
staticChoise(`.physicalactivi`);

function dinamicChoise(selector){
    const input = document.querySelector(selector);

    input.addEventListener(`input`,()=>{
        switch(input.getAttribute(`id`)){
            case "height":
            height = +input.value;
            break;
            case "weight":
            weight = +input.value;
            break;
            case "age":
            age = +input.value;
            break;
        }
        caloryCalculation();
    });
}
dinamicChoise(`#height`);
dinamicChoise(`#weight`);
dinamicChoise(`#age`);

function caloryCalculation(){
    if(!height || !weight || !age){
        result.textContent = `____`;
        return;
    }
    if (sex === `woman`){
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }else{
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
    if(height <40 || height >220 || weight<25 || weight >150 || age < 1 || age > 150 ){
        result.textContent = `Проверьте данные , Вы где-то врёте  !!!  `;
    }
}

caloryCalculation();