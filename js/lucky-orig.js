'use strict'
//  http://localhost:3000/php/astroselector/for-lucky-person.html?name=Александра&s=0&y0=1995&m0=6&d0=15&y1=1982&m1=10&d1=23&ys1=1980&ye1=1990&p1=100&p2=95&p3=100&p4=80&p5=90&p6=70&p7=95

// between start and end should be 10 years!

// string params

const urlParams = new URLSearchParams(window.location.search);
const searchDay = parseInt(urlParams.get('d1'));
const searchMonth = parseInt(urlParams.get('m1'));
const searchYear = parseInt(urlParams.get('y1'));
const searchYearStart = parseInt(urlParams.get('ys1'));
const searchYearEnd = parseInt(urlParams.get('ye1'));
const activeDay = parseInt(urlParams.get('d0'));
const activeMonth = parseInt(urlParams.get('m0'));
const activeYear = parseInt(urlParams.get('y0'));
const activeName = urlParams.get('name');
const sex = parseInt(urlParams.get('s'));// 0-female; 1-male


// dom nodes
const scene = document.getElementById('scene');
const activeNameBlock = document.getElementById('name');
const activeBirthdayBlock = document.getElementById('birthday');
const statusBlock = document.getElementById('status-block');
const runningDaysBlock = document.getElementById('days');
const runningMonthsBlock = document.getElementById('month');
const runningYearsBlock = document.getElementById('years');
const yearsTicksBlock = document.getElementById('years-ticks');
const zoomer = document.getElementById('zoomer');
const sMap = document.getElementById('s-natal-map');
const aAvatar = document.getElementById('a-avatar');
const sAvatar = document.getElementById('s-avatar');
const restart = document.getElementById('restart');

const rusMonths = [null, 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

// сюда нужно передавать данные по  совместимости
const searchColumns = [220, 200, 250, 230, 250, 170, 140]; 
searchColumns[0] = Math.floor( parseInt(urlParams.get('p1')) * 2.5 );
searchColumns[1] = Math.floor( parseInt(urlParams.get('p2')) * 2.5 );
searchColumns[2] = Math.floor( parseInt(urlParams.get('p3')) * 2.5 );
searchColumns[3] = Math.floor( parseInt(urlParams.get('p4')) * 2.5 );
searchColumns[4] = Math.floor( parseInt(urlParams.get('p5')) * 2.5 );
searchColumns[5] = Math.floor( parseInt(urlParams.get('p6')) * 2.5 );
searchColumns[6] = Math.floor( parseInt(urlParams.get('p7')) * 2.5 );


// наносим разметку на шкалу
let yearsTicksBlockInnerHtml = ``;
for (let i = searchYearStart; i <= searchYearEnd; i++) yearsTicksBlockInnerHtml += `<span class="year-tick" data-year="${i}">- ${i}</span>`;
yearsTicksBlock.innerHTML = yearsTicksBlockInnerHtml;


// заполняем данные натива
activeNameBlock.innerText = activeName;
activeBirthdayBlock.innerHTML = `<span class="birthday-item">${activeDay}</span>
								 <span class="birthday-item month">${rusMonths[activeMonth]}</span>
								 <span class="birthday-item">${activeYear}</span>`;


//формируем первый абзац
const aboutFemaleWords = ['дала девушка', 'которая', 'ней', 'девушку'];
const aboutMaleWords = ['дал молодой человек', 'который', 'ним', 'молодого человека'];
const currentWords = sex ? aboutMaleWords : aboutFemaleWords;
const startInfo = 		
   `<h1>Если вы родились <strong>${searchDay}&nbsp;${rusMonths[searchMonth]}&nbsp;${searchYear}</strong>,</br> для Вас есть прекрасная новость!</h1>
	<p>Раз уж именно Вам посчастливилось оказаться на этой странице, знайте - ссылку на неё Вам ${currentWords[0]} <strong>${activeName}</strong>, ${currentWords[1]} настолько хорошо Вам подходит, что после встречи с ${currentWords[2]} Вы гарантированно потеряете покой в ожидании новой встречи. Шанс повстречать такого человека (на промежутке 10 лет) - всего 1/3650.</p>
	<p>Потенциальная совместимость может содержать лишь незначитеьное количество нехороших моментов, но ОБЯЗАТЕЛЬНО содержит сильное взаимное притяжение, небывалое понимание, уважение и обоюдную радость. </p>
	<p>Внимание! Если Вы уже в отношениях или в браке - закройте страницу, поблагодарите ${currentWords[3]} за внимание и попрощайтесь.</p>`;
document.getElementById('pre-story').innerHTML = startInfo;



const setSearcBlockValues = (d, m, y) => {
	runningDaysBlock.innerHTML = d;
	runningMonthsBlock.innerHTML = m;
	runningYearsBlock.innerHTML = y;
};


// ======== START ANIMATION ============

let inProcess = true;
let timerId1, timerId2, timerId3, monthsTimerId, yearsTimerId;


const startAnimation = () => {
	// инициализируем таймер, который перебирает даты, начальными значениями
	setSearcBlockValues('01', rusMonths[0], searchYearStart);


	const activeManClasses = ['m-active-1', 'm-active-2', 'w-search-1', 'w-search-2'];
	const activeWomanClasses = ['w-active-1', 'w-active-2', 'm-search-1', 'm-search-2'];
	// добавляем начальные классы для аватаров
	const currentClasses = sex ? activeManClasses : activeWomanClasses;

	aAvatar.classList.remove(currentClasses[1]);
	aAvatar.classList.add(currentClasses[0]);
	sAvatar.classList.remove(currentClasses[3]);
	sAvatar.classList.add(currentClasses[2]);


	// блок анимации дней
	const convertValueToTwoDigitsString = (number) => {
		if (number < 10) return '0' + number;
		else return number;
	};
	let currentDeciDayNumber = 0;
	let currentDayNumber = 0;
	const toAnimateMinutes = (node) => {
		if(!inProcess) return;
		node.innerHTML = '' + currentDeciDayNumber + currentDayNumber;
		currentDeciDayNumber++
		currentDayNumber++;
		if (currentDeciDayNumber > 3) currentDeciDayNumber = 0
		if (currentDayNumber > 9) currentDayNumber = 0

		setTimeout(toAnimateMinutes, 50, node);	
	};


	// блок анимации месяцев
	let currentMonthsNumber = 1;
	const toAnimateMonths = (node, arr) => {
		if(!inProcess) return;
		node.innerHTML = arr[currentMonthsNumber];
		currentMonthsNumber++;
		if (currentMonthsNumber > 12) currentMonthsNumber = 1

		monthsTimerId = setTimeout(toAnimateMonths, 100, node, arr);	
	};


	// блок анимации лет
	const animationTime = 10;// in sec
	const animationYearsSteps = animationTime * 1000 / (Math.abs(searchYearEnd - searchYearStart));
	let currentYearNumber = searchYearStart;
	const toAnimateYears = (node) => {
		if(!inProcess) return;
		node.innerHTML = currentYearNumber;
		currentYearNumber++
		if (currentYearNumber > searchYearEnd ){
			inProcess = false;
			return;
		}
		yearsTimerId = setTimeout(toAnimateYears, animationYearsSteps, node);
	};

	//включаем gif c анимацией карты
	sMap.classList.add('s-natal-map');

	// задаём анимацию для лупы
	setTimeout(()=>{zoomer.classList.add('run')}, 50);


	//=======Analyzer===========================
	const minHeight = 20;
	const maxHeight = 250; 
	const maxHeightForIteration = 200;// не выше этого значения при переборе
	const indicator = [100, 70, 25, 40, 30, 35, 60];

	const colorFromRedToGreenDependsOnValues = ( minValue, maxValue, currentValue ) => {
		const middleValue = ( maxValue + minValue ) / 2;
		const blue = 0;
		const red = (currentValue <= middleValue) ? 255 : parseInt(255 - 255 * Math.abs(middleValue - currentValue) / Math.abs(maxValue - middleValue));
		const green = ( currentValue >= middleValue ) ? 255 : parseInt(255 - 255 * Math.abs(currentValue - middleValue) / Math.abs(middleValue - minValue));
		
		const darkRed = (red - 70 < 0) ? 0 : red - 70;
		const darkGreen = (green - 70 < 0) ? 0 : green - 70;

		return [`rgb(${red}, ${green}, ${blue})`, `rgb(${darkRed}, ${darkGreen}, ${blue})` ]  ;
	};

	const randomNumber = (min, max) => {
		let number =  Math.floor((Math.random()*(max-min))+ min);
		return number;
	};

	const changeColumn = (heightArray, index, column, maxHeightForIteration) => {
		heightArray[index] += randomNumber(-50, 50);
		if (heightArray[index] > maxHeightForIteration) heightArray[index] = maxHeightForIteration;
		if (heightArray[index] < minHeight) heightArray[index] = minHeight;

		const color = colorFromRedToGreenDependsOnValues(minHeight, maxHeight, heightArray[index]);
		const head = document.querySelector('.head-' + (index + 1) );

		column.style.height = heightArray[index] + "px";
		column.style.background = `linear-gradient(90deg, ${color[1]}, ${color[0]})`;
		head.style.backgroundColor = color[0];
		head.style.borderColor = color[1];
	};

	const animate = (heightArray) => {
		if (!inProcess) return false;
			for (let i = 0; i < heightArray.length; i++){
				changeColumn(heightArray, i, document.getElementById( "indicator-" + (i+1) ), maxHeightForIteration);
			}
			//Repeat this function every 50 ms
			setTimeout(animate, 50, heightArray);
	};
	//=======Analyzer===========================

	toAnimateMinutes(runningDaysBlock);
	toAnimateMonths(runningMonthsBlock, rusMonths);
	toAnimateYears(runningYearsBlock);
	animate(indicator);

	const getTopValueForSearchYear = (year, month, startYear, endYear) => {
		const pxInYear = 475 / Math.abs(endYear - startYear); 
		const yearToPx = ( year - startYear ) * pxInYear;
		const monthsToPx = pxInYear * month / 12;
		const wayInPx = yearToPx + monthsToPx;
		return wayInPx;
	};


	timerId1 = setTimeout(() => {
		setSearcBlockValues('', '', '');
		sMap.classList.add('loading');
		statusBlock.innerHTML = '';
	}, 10200)

	timerId2 = setTimeout(() => {
		zoomer.classList.add('winner');
		zoomer.style.top = ( getTopValueForSearchYear (searchYear, searchMonth, searchYearStart, searchYearEnd) - 25 ) + 'px';
		const columns = document.getElementsByClassName('column');
		for (let i = 0; i < columns.length; i++){
			const head = document.querySelector('.head-' + (i + 1) );
			const color = colorFromRedToGreenDependsOnValues(minHeight, maxHeight, searchColumns[i]);

			columns[i].classList.add('column-winner');
			head.classList.add('head-winner');
			
			columns[i].style.height = searchColumns[i] + 'px';
			columns[i].style.background =  `linear-gradient(90deg, ${color[1]}, ${color[0]})`;
			head.style.backgroundColor = color[0];
			head.style.borderColor = color[1];
		}
	}, 11000);

	timerId3 = setTimeout(() => {
		setSearcBlockValues(searchDay, rusMonths[searchMonth], searchYear);
		sMap.classList.add('finish');
		statusBlock.innerHTML = 'Самая лучшая совместимость:';
		aAvatar.classList.remove(currentClasses[0]);
		aAvatar.classList.add(currentClasses[1]);
		sAvatar.classList.remove(currentClasses[2]);
		sAvatar.classList.add(currentClasses[3]);
	}, 12000)
};


startAnimation();

const restartAnimation = () => {
	inProcess = false;
	clearTimeout(timerId1);
	clearTimeout(timerId2);
	clearTimeout(timerId3);
	clearTimeout(monthsTimerId);
	clearTimeout(yearsTimerId);

	zoomer.removeAttribute('style');
	zoomer.classList.remove('run');
	zoomer.classList.remove('winner');

	sMap.classList.remove('finish');
	sMap.classList.remove('loading');

	statusBlock.innerHTML = 'Идёт поиск <br/> и анализ ...'

	const columns = document.getElementsByClassName('column');
	for (let i = 0; i < columns.length; i++){
		const head = document.querySelector('.head-' + (i + 1) );
		columns[i].classList.remove('column-winner');
		head.classList.remove('head-winner');
		columns[i].removeAttribute('style');
		head.removeAttribute('style');
	}

	setTimeout(() => { 
		inProcess = true;
		startAnimation();
	}, 100)
};

restart.addEventListener('click', restartAnimation);



//https://jscompress.com/