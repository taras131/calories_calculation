`use strict`

const result = document.querySelector(`.calculating__result span`),
      container = document.querySelector(`.container`);
let height,weight,age,total,sex,ratio;

if(localStorage.getItem(`sex`)){
    sex = localStorage.getItem(`sex`);
}else{
    sex="famale";
    localStorage.setItem(`sex`,`famale`);
}

if(localStorage.getItem(`ratio`)){
    ratio = localStorage.getItem(`ratio`);
}else{
    ratio = 1.375;
    localStorage.setItem(`ratio`, 1.375);
}

function initLocalSetting(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item =>{
        item.classList.remove(`active`);
        if(item.getAttribute(`id`) === localStorage.getItem(`sex`)){
            item.classList.add(`active`);
        }
        if(item.getAttribute(`data-ratio`) === localStorage.getItem(`ratio`)){
            item.classList.add(`active`);
        }
    });
}

initLocalSetting(`#gender div`);
initLocalSetting(`.physicalactivi div`);

function staticChoise(parrent) {
    const elementchoice = document.querySelectorAll(`${parrent } div`);
    elementchoice.forEach(item =>{
        item.addEventListener(`click`,(e)=>{
            if(e.target.getAttribute(`data-ratio`)){
                ratio = +e.target.getAttribute(`data-ratio`);
                localStorage.setItem(`ratio`, +e.target.getAttribute(`data-ratio`));
            }else{
                sex = e.target.getAttribute(`id`);
                localStorage.setItem(`sex`, e.target.getAttribute(`id`));
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
    const food = document.querySelector(`.food`);
    if (food) {
        food.remove();
    }
    
    if(!height || !weight || !age){
        total = `____`;
        result.textContent = total;
        return;
    }
    if (sex === "famale"){
        total = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        result.textContent = total;
    }else{
        total = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        result.textContent = total;
    }
    if(height <40 || height >220 || weight<25 || weight >150 || age < 1 || age > 150 ){
        total = `Проверьте данные , Вы где-то врёте  !!!  `;
        result.textContent = total;
    }else{
        if(total != `____`){
            const element = document.createElement('div');
            element.innerHTML =` 
                <h3>Итак, за сутки вы можете употребить на выбор:</h3>
                <div class="food_item">Картофель - ${(total/820).toFixed(2)} кг.</div>
                <div class="food_item">Кефир - ${(total/500).toFixed(2)} л.</div>
                <div class="food_item">Комбикорм - ${(total/2500).toFixed(2)} кг.</div>
                <div class="food_item">Клевер - ${(total/200).toFixed(2)} кг.</div>
                <div class="food_item">Морковь - ${(total/350).toFixed(2)} кг.</div>
                <div class="food_item">Мороженное - ${(total/2600).toFixed(2)} кг.</div>   
                <div class="food_item">Свинина - ${(total/3.8).toFixed(2)} гр.</div>                                
                <div class="food_item">Пиво - ${(total/420).toFixed(2)} л.</div> 
                <div class="food_item">Водка - ${(total/2.35).toFixed(2)} гр.</div>
                <div class="food_item">Яблоки - ${(total/520).toFixed(2)} кг.</div>                                
		        `;
		        element.classList.add("food");
                container.append(element);
        }
    }
}

caloryCalculation();

//food
const food = document.querySelector(`.food`);
