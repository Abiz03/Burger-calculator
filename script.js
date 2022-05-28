const products = {
  plainBurger: {
    name: 'Гамбургер простой',
    amount: 0,
    price: 10000,
    kcall: 700,
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    amount: 0,
    price: 20500,
    kcall: 960,
  },
  freshCombo: {
    name: 'FRESH COMBO',
    amount: 0,
    price: 31900,
    kcall: 1370,
  },
}
const extraproducts = {
  doubleMayonnaise: {
    name: 'Двойной майонез',
    price: 200,
    kcall: 100,
  },
  lettuce: {
    name: 'Салатный лист',
    price: 400,
    kcall: 30,
  },
  cheese: {
    name: 'Сыр',
    price: 700,
    kcall: 130,
  },
}
function summ(){return this.amount * this.price}
function kcall(){return this.amount * this.kcall}
for(const key in products){
  products[key]['CalcSumm'] = summ
  products[key]['CalcKall'] = kcall
}
const mainProducts = document.querySelectorAll('.main__product')
const view = document.querySelector('.view')
const viewClose = document.querySelector('.view__close')

mainProducts.forEach(function(card, key){
  const cardBtns = card.querySelectorAll('.main__product-btn')
  const exrtaCheks = card.querySelectorAll('.main__product-checkbox')
  const cardId = card.getAttribute('id')
  const mainProductAmount = card.querySelector('.main__product-num')
  const mainProductPrice = card.querySelector('.main__product-price span')
  const mainProductKcall = card.querySelector('.main__product-kcall span')
  const mainProductInfo = card.querySelector('.main__product-info')
  
  mainProductInfo.addEventListener('dblclick', function(){
    view.classList.add('active')
    const viewImg = view.querySelector('img')
    const mainImgSrc = mainProductInfo.querySelector('img').getAttribute('src')
    viewImg.setAttribute('src', mainImgSrc)
  })
  viewClose.addEventListener('click', function(){
    view.classList.remove('active')
  })
  
  cardBtns.forEach(function(btn, keyBtn){
    btn.addEventListener('click', function(){
      const symbol = btn.getAttribute('data-symbol')
      
      if(symbol == '+' && products[cardId].amount < 30){
        products[cardId].amount++
      }else if(symbol == '-' && products[cardId].amount > 0){
        products[cardId].amount--
      }
      mainProductAmount.innerHTML = products[cardId].amount;
      mainProductPrice.innerHTML = products[cardId].CalcSumm();
      mainProductKcall.innerHTML = products[cardId].CalcKall();
    })
  })
  exrtaCheks.forEach(function(chek, key){
    chek.addEventListener('click', function(){
      const attrChek = chek.getAttribute('data-extra')
      products[cardId][attrChek] = chek.checked
      
      if(products[cardId][attrChek] == true){
        products[cardId].price += extraproducts[attrChek].price
        products[cardId].kcall += extraproducts[attrChek].kcall
      }else{
        products[cardId].price -= extraproducts[attrChek].price
        products[cardId].kcall -= extraproducts[attrChek].kcall
      }
      mainProductPrice.innerHTML = products[cardId].CalcSumm();
      mainProductKcall.innerHTML = products[cardId].CalcKall();
    })
  })
})

// оформление заказа
const addCart = document.querySelector('.addCart')
const receipt = document.querySelector('.receipt')
const receiptWindow = document.querySelector('.receipt__window')
const receiptOut = document.querySelector('.receipt__window-out')
const receiptBtn = document.querySelector('.receipt__window-btn')

let arrProducts = []
let totalName = ''
let totalPrice = 0
let totalKcall = 0

addCart.addEventListener('click', function(){
  for(const key in products){
    const pObj = products[key]
    
    if(pObj.amount > 0){
      arrProducts.push(pObj)
      pObj.name = `<span style="font-size: 20px; font-weight: 700">${pObj.name}</span>`
      pObj.name += `: <span style="color: red; font-size: 30px">${pObj.amount}</span>`
      for(const info in pObj){
        if(pObj[info] === true){
          pObj.name += `\n${extraproducts[info].name}`
        }
      }
    }
    pObj.name += `\nСтоимость: ${pObj.price}/${pObj.CalcSumm()}\nКаллорий: ${pObj.kcall}/${pObj.CalcKall()}\n\n`
  }
  console.log(arrProducts);
  for(const key in arrProducts){
    totalName += `${arrProducts[key].name}`
    totalPrice += arrProducts[key].CalcSumm()
    totalKcall += arrProducts[key].CalcKall()
  }
  receiptOut.innerHTML = `Ваш заказ:\n${totalName}Общая стоимость с доставкой: ${totalPrice + 9000}\nОбщая каллорийность: ${totalKcall}`
  
  
  
  receipt.style.display = 'flex'
  setTimeout(function(){
    receipt.style.opacity = '1'
  }, 100)
  setTimeout(function(){
    receiptWindow.style.top = '10%'
  },400)
})

receiptBtn.addEventListener('click', function(){
  // window.location.reload();
  window.close()
})

const lvl = document.querySelector('.header__timer-extra')

function move(i){
  i++
  lvl.innerHTML = i
  if(i < 100){
    setTimeout(function(){
      move(i)
    }, i+i+i+i)
  }
}
move(0)