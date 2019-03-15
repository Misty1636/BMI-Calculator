var btn = document.querySelector('.btn')
var list = document.querySelector('.list')
var back = document.querySelector('.loop-btn')
var clear = document.querySelector('.clearall')
var array = JSON.parse(localStorage.getItem('BMI-data')) || []
var BMIouter = document.querySelector('.BMI-outer')

function updatedata(data){
	var str = ''
	var num = ''
	var result = ''
	var allcolors = ''
	var BMInum = document.querySelector('.BMI-num')
	var BMIresult = document.querySelector('.BMI-result')
	for(var i=0; i<data.length; i++){
   
   switch(array[i].status){ //判斷使用的色碼
   	case '過輕':  
   	  allcolors = "#31BAF9"
   	  break;
    case '正常': 
   	  allcolors = "#86D73F"
   	  break;
   	case '過重': 
   	  allcolors = "#FF982D"
   	  break;
   	case '中度肥胖': 
   	  allcolors = "#FF6C03"
   	  break;
   	case '嚴重肥胖': 
   	  allcolors = "#FF1200"
   	  break;
   }

   str+= '<li style="border-color:'+allcolors+
   '"><span class="status">'+array[i].status+
   '</span><span><small>BMI</small>'+array[i].BMI+
   '</span><span><small>weight</small>'+array[i].Weight+'kg'+
   '</span><span><small>height</small>'+array[i].Height+'cm'+
   '</span><small>'+array[i].Time+
   '</small><a href="#" data-num='+i+'>刪除</a></li>'

   num = array[i].BMI
   result = array[i].status
	}
	list.innerHTML= str
	BMInum.textContent = num
	BMIresult.textContent = result
	BMIresult.style.color = allcolors
	back.style.backgroundColor = allcolors
	BMIouter.style.borderColor = allcolors
	BMIouter.style.color = allcolors
}

updatedata(array)

function Newdata(e){
	e.preventDefault()
	var kg = document.querySelector('.body-weight')
  var cm = document.querySelector('.body-height')

	if(kg.value == '' || cm.value == ''){
		alert('請檢查是否正確輸入!')
		return
	}
	var alldata ={
		Height: cm.value,
		Weight: kg.value,
		BMI: calc(),
		status: level(),
		Time: days()
	}
  

  function calc(){
		var Height = (cm.value)/100
	  bmi = (kg.value / (Height*Height)).toFixed(2)
		return bmi
	}

	function level(){
		if(calc() >= 35) return '嚴重肥胖'
    if(calc()<35 && calc()>=30) return '中度肥胖'
		if(calc()<30 && calc()>=25) return '過重'
		if(calc()<25 && calc()>=18.5) return '正常'
		return '過輕'
	}

	function days(){
		var Today = new Date();
		time = Today.getFullYear()+'/'+(Today.getMonth()+1)+'/'
		+Today.getDate()+' '+Today.getHours()+':'+Today.getMinutes()
		return time
	}
	 	 
	array.push(alldata)
	localStorage.setItem('BMI-data',JSON.stringify(array))
	updatedata(array)

	kg.value = '' 
	cm.value = '' 

	btn.style.display = 'none'
	document.querySelector('.BMI-outer').style.display = 'block'
	document.querySelector('.BMI-status').style.display = 'flex'
}

function detele(e){
	e.preventDefault()
	var num = e.target.dataset.num
	if(e.target.nodeName !== 'A'){return}
	array.splice(num,1)
  localStorage.setItem('BMI-data',JSON.stringify(array))
	updatedata(array)
  if(array.length <1){toggles()}
	
}

function clearall(e){
	e.preventDefault()
	array.splice(0,array.length)
	localStorage.setItem('BMI-data',JSON.stringify(array))
	updatedata(array)
	toggles()
}

function goback(e){
	e.preventDefault()
	toggles()
}

function toggles(){
  btn.style.display = 'block'
  BMIouter.style.display = 'none'
  document.querySelector('.BMI-status').style.display = 'none'
}

btn.addEventListener('click',Newdata)
list.addEventListener('click',detele)
clear.addEventListener('click',clearall)
back.addEventListener('click',goback)



