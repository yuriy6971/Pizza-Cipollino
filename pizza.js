window.addEventListener("DOMContentLoaded",() =>{
    // кнопки выбора основы пиццы:
    let selectBase = document.querySelector(".select-base");
    // изображение основы пиццы:
    let pizzaPictures = document.querySelector(".base-pizza");
    // Элемент в котором хранится это изображение и изображение ингридиетов:
    let tablePizzaWrapp = document.querySelector(".wrapp-pizzapics");
    // отображение состава пиццы:
    let showIngrids = document.querySelector(".show-ingrid");
    // отображение цены пиццы
    let screenCost = document.querySelector(".cost-screen");
    
    let toppings = document.querySelectorAll(".topping .pics");
    //console.log(toppings);
    // коллекция элементов "ингридиент"
    let selectIngidients = document.querySelector(".ingridients");
    // элемент кнопки сброса:
    let buttonOff = document.querySelector(".off");
    // элемент кнопки заказа:
    let orderButton = document.querySelector(".order button");
    // текущий элемент ингредиента:
    let currentIngrid;
    // клонированный элемент ингридиента.
    let cloneIngrid;
    // Коллекция элементов -соус:
    let collectionSause = document.querySelectorAll(".sause img");
    // коллекция топпингов:
    let collectionTopping = document.querySelectorAll(".topping img");
    // элемент модального окна:
    let modalBody = document.querySelector(".modal-body");
    // элемент текстового поля:
    let elemTextarea = document.querySelector(".modal-body textarea")
    // Знак закрытия модального окна:
    let modalClose = document.querySelector(".modal-close");
    // коллекция элементов формы с ее названием;
    let labaelElem = document.querySelectorAll("form label");
    //элемент надписи баннера:
    let push = document.querySelector(".banner .push");
    
    // коэффициенты увеличения/уменьшения стоимости, в зависимости от размера:
    let magnificatFactor = 1.3;
    let reductionFactor = 0.7;
    let standartFactor = 1;
    
    selectBase.addEventListener("click",baseSelection);
    
    //функция выбора основы пиццы и отбражения ее на экране,в зависимости от выбранного размера.
    function baseSelection(event){
       let pizzaSize = event.target;
    
       if(pizzaSize.classList.contains("small")){
          tablePizzaWrapp.style.width = "65%";
          pizzaPictures.hidden = false; 
        
        adaptivPics();
        changeCostIngred(reductionFactor);
       }
       if(pizzaSize.classList.contains("standart")){
           tablePizzaWrapp.style.width = "80%";
           pizzaPictures.hidden = false;
         
         adaptivPics();
         changeCostIngred(standartFactor);
       }
       if(pizzaSize.classList.contains("big")){
           tablePizzaWrapp.style.width = "100%";
           pizzaPictures.hidden = false;
         
        adaptivPics();
        changeCostIngred(magnificatFactor);
       }
       showBasePizza(pizzaSize);
       // подсчет стоимости:
       calcCostPizza();
       
    }
    
    // функция для отображения информации по основе пиццы
    function showBasePizza(elemPizza){
     if(showIngrids.firstElementChild != null){
         showIngrids.firstElementChild.remove();
     }
      let textName = elemPizza.getAttribute("base");
      let textCost = elemPizza.getAttribute("cost");
    
      let paragraf = document.createElement("p");
      paragraf.className = "parag";
      paragraf.innerHTML = textName + ": " + textCost + " грн."
      showIngrids.prepend(paragraf);
    
     
      
    }
    
    
      // функция для адаптации изображения модернизированная.
      function adaptivPics(){
          const tableElements = Array.from(tablePizzaWrapp.children);
          let computedStyleTable = getComputedStyle(tablePizzaWrapp);
        
         for(let i = 0; i < tableElements.length - 1;i++){
             tableElements[i].style.width = computedStyleTable.width;
             tableElements[i].style.height = computedStyleTable.height;
         }
      }
       setInterval(adaptivPics,200);
      
      
    // функция для отображения очередности слоев пиццы:
    function layerOrder(element){
        if(element.classList.contains("tomato")){
            element.style.zIndex = "200";
        }
        if (element.classList.contains("ricotta")){
            element.style.zIndex = "300"
        }
        if(element.classList.contains("corn")){
            element.style.zIndex = "1500";
        }
        if(element.classList.contains("golland-chees")){
            element.style.zIndex = "1300";
        }
        if(element.classList.contains("mozarella")){
        element.style.zIndex = "1400";
    }
        if(element.classList.contains("ham")){
        element.style.zIndex = "1100";
    }
        if(element.classList.contains("salyami") || element.classList.contains("mushrooms")){
            element.style.zIndex = "1200";
        }
    
    }
    
    
    // функция для смены стоимости ингредиентов при смене размера основы:
    function changeCostIngred(factor){
        const collectIngrid = document.querySelectorAll(".ingrids");
        for(let elem of collectIngrid){
            elem.innerHTML = elem.getAttribute("name") + ": " + Math.round(elem.getAttribute("cost") * factor) + " грн.";
        }
    }
    
    // начало перетаскивания ингридиента:
     selectIngidients.addEventListener("dragstart",function(event){
            currentIngrid = event.target;
            cloneIngrid = currentIngrid.cloneNode(true);
             
            cloneIngrid.setAttribute("name",currentIngrid.parentElement.getAttribute("name"));
             
          layerOrder(cloneIngrid);
    
          let computedStyleTable = getComputedStyle(tablePizzaWrapp);
          cloneIngrid.style.position = "absolute";
          cloneIngrid.style.width = computedStyleTable.width;
          cloneIngrid.style.height = computedStyleTable.height;
          cloneIngrid.style.margin = "0px";
     });
            
      //функция вывода информации о добавленных ингридиентах.
      function addIngredInfo(element){
        let textName = element.parentElement.getAttribute("name");
        let textCost = element.parentElement.getAttribute("cost");
       
        
        let adaptivCost = calcAtributCost(textCost);
        
        let ingrid = document.createElement("p");
        ingrid.className = "ingrids";
        ingrid.setAttribute("name",element.parentElement.getAttribute("name"));
        ingrid.setAttribute("cost",element.parentElement.getAttribute("cost"));
        ingrid.innerHTML = textName + ": " + adaptivCost+ " грн.";
      
        if(element.matches(".sause img")){
            showIngrids.firstElementChild.after(ingrid);
        }
        if(element.matches(".topping img")){
            showIngrids.append(ingrid);
        }
      }
    
      // функция подсчета стоимости пиццы.
       function calcCostPizza(){
       let arrStrCost = showIngrids.textContent.match(/\d{1,}/g);
       let arrNum = arrStrCost.map(item => Number(item));
    
       let sum = 0;
       arrNum.forEach(item => sum = sum +item);
    
       screenCost.innerHTML = sum;
    }
    
        // отображение информации по соусам:
      collectionSause.forEach(function(item){
          item.addEventListener("dragend",function(event){
              currentIngrid = this;
            tablePizzaWrapp.prepend(cloneIngrid);
            
              addIngredInfo(currentIngrid);
              calcCostPizza();
              sauseCountControll();  
    
          });
      }); 
    
      // отбражение информации по ингридиентам пиццы:
      collectionTopping.forEach(function(item) {
          item.addEventListener("dragend",function(event){
           currentIngrid = this;
           tablePizzaWrapp.prepend(cloneIngrid);
    
           addIngredInfo(currentIngrid);
           calcCostPizza();
           toppingCountControll(currentIngrid);
          });
      });
    // активация кнопки очистки данных.
     buttonOff.addEventListener("click",clearData);
           
     //функция очистки данных.
     function clearData (){
        let elemarr = Array.from(tablePizzaWrapp.children);
        
    
        for (let i = 0; i < elemarr.length - 1;i ++){
        
            elemarr[i].remove();
        }
        pizzaPictures.hidden = true;
        let elemIngred = Array.from(showIngrids.children);
        
        for(let i = 0; i < elemIngred.length; i++){
        
            elemIngred[i].remove();
        }
    
            screenCost.innerHTML = "";
          //  countPizzaSause = 0;
        
          modalWindowHidden();
    
    }
      
     // функция пересчета цены ингридиента ,в зависимости от размера основы:
     function calcAtributCost(element){
         let strBase = showIngrids.firstElementChild.innerHTML;
         let regexpBig = /большая/i;
         let regexpStandart = /стандарт/i;
         let regexpSmall = /малая/i;
    
         if(regexpBig.test(strBase)){
             return Math.round(element * magnificatFactor);
         }
         if (regexpStandart.test(strBase)){
             return element;
         }
         if(regexpSmall.test(strBase)){
             return Math.round(element * reductionFactor);
         }
     }
    // контроль количества соусов:
    function sauseCountControll(){
        let strIngred = showIngrids.textContent;
      
        if(strIngred.match(/соус/g).length >= 4){
            alert("Достаточно соусов!");
            showIngrids.firstElementChild.nextElementSibling.remove();
            cloneIngrid.remove();
        }
    }
    
    //контроль количества начинки одного типа:
    function toppingCountControll(element){
        let strIngred = showIngrids.textContent;
        let strToppingName = element.parentElement.getAttribute("name");
       
        regexp = new RegExp(`${strToppingName}`,"g");
     
        if(strIngred.match(regexp).length >= 4){
         alert(`Топпинга ${strToppingName} уже достаточно!`);
            showIngrids.lastElementChild.remove();
            cloneIngrid.remove();
        }
    
    }
    // удаление выбранных ранее элементов;
    
    function removeElementPizza(event){
        let elemPizza = event.target;
         
         deletePicsIngrid(elemPizza);
    
        if(!elemPizza.classList.contains("show-ingrid") & !elemPizza.classList.contains("parag")){
        
            elemPizza.remove();
        }
        calcCostPizza();
    
    }
    showIngrids.addEventListener("click",removeElementPizza);
    
    // удаление рисунка ингридиента с изображения основы"
    function deletePicsIngrid(element){
        let elemarr = Array.from(tablePizzaWrapp.children);
    
        for (let i = 0; i < elemarr.length -1;i ++){
            if(elemarr[i].getAttribute("name") === element.getAttribute("name")){
                elemarr[i].remove();
                break;            
            }
        }    
    
        }
    
        //функция для отображения элементов формы:
        function modalWindowVisible() {
            modalBody.hidden = false;
    
            let orderContent = showIngrids.textContent;
            let costContent = screenCost.textContent;
            
            let costContentSale = Math.round(costContent * 0.9);
    ;        
            let bannerComputedStyle = getComputedStyle(banner);
    
            if(bannerComputedStyle.backgroundColor == "rgb(246, 107, 0)"){
                elemTextarea.innerHTML = orderContent + "Цена со скидкой:" + costContentSale + " грн."
            }
            else{
            elemTextarea.innerHTML = orderContent + " Цена: " + costContent + " грн.";
        }
        }
      
        orderButton.addEventListener("click",modalWindowVisible);
    
        function modalWindowHidden(){
            elemTextarea.innerHTML = ""
            modalBody.hidden = true;
        }
    
        modalClose.addEventListener("click",modalWindowHidden);
    
        // Убегающий баннер:
    
      
        // функции для получения размеров экрана:
        function getScreenWidth(){
            return document.documentElement.clientWidth;
        }
    
        function getScreenHeight(){
            return document.documentElement.clientHeight;
        }
    
        let banner = document.querySelector(".banner");
    
        function movieBanner(event){
            
            let randTop = numrand(0,getScreenHeight() );
            let randLeft = numrand(0, getScreenWidth());
          this.style.left  = randLeft + "px";
          this.style.top = randTop + "px";
        }
    
    
        banner.addEventListener("mouseover",movieBanner);
         
        function numrand(min,max){
            return min + Math.floor((max - min) * Math.random());
        }
    
        function saleUp(){
            banner.removeEventListener("mouseover",movieBanner);
            this.style.backgroundColor = "#f66b00";
            this.style.left = "40%";
            this.style.top = "0.2rem";
            push.innerHTML = "Вы ее получили!";
            push.style.color = "green";
        
        }
    
        banner.addEventListener("click",saleUp, once = true);
    
        // код для раскрывающегося меню:
    
        //переменная для левого элемента menu:
        let constructor = document.querySelector(".nav-menu :first-child");
      
        let yourPizza = document.querySelector(".content > h3");
       
        // переменная картофельного меню:
        let potatoMenu = document.querySelector(".nav-menu .potato");
        // переменая экранов:
         let screens = document.querySelector(".screens")
         //коллекция элементов дополнительного меню:
         const elemsFood = document.querySelectorAll(".food");
         // элемет отображения цены пиццы:
         let costScreen = document.querySelector(".cost-pizza");
         //элемент заказа пиццы:
         let order = document.querySelector(".order");
         // элемент гривна:
         let grnElem = document.querySelector(".grn");
        
    
        constructor.addEventListener("mouseover",function(){
            yourPizza.style.opacity = "0";
        });
    
        constructor.addEventListener("mouseout",function(){
            yourPizza.style.opacity = "1";
    
        });
        potatoMenu.addEventListener("mouseover",function(){
            yourPizza.style.opacity = "0";
            screens.style.opacity = "0";
            order.style.opacity = "0";
        });
        potatoMenu.addEventListener("mouseout",function(){
            yourPizza.style.opacity = "1";
            screens.style.opacity = "1";
            order.style.opacity = "1";
            
        })
        elemsFood.forEach(item =>{
            item.addEventListener("mouseover",function(){
                costScreen.style.opacity = "0";
                order.style.opacity = "0";
                grnElem.style.opacity = "0";
                if(getScreenWidth() < 1000){
                    yourPizza.style.opacity = "0";
                    screens.style.opacity = "0";
                }
    
            });
        });
    
        elemsFood.forEach(item => {
            item.addEventListener("mouseout",function(){
                costScreen.style.opacity = "1";
                order.style.opacity = "1";
                grnElem.style.opacity = "1";
                if(getScreenWidth() < 1000){
                    yourPizza.style.opacity = "1";
                    screens.style.opacity = "1";
                }
    
            });
        });
    
    
    
    
    
    });