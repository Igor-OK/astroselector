function profile_map() {

	$('.mapper').show(); 

	$('#map').height(500).hide();
	var myMap = new ymaps.Map('map', {
		center: [52.763575,37.826074],
		zoom: 5
	});
	myMap.controls
		// Кнопка изменения масштаба
		.add('zoomControl')
		// Список типов карты
		.add('typeSelector')
		// Кнопка изменения масштаба - компактный вариант
		// Расположим её справа
		.add('smallZoomControl', { right: 5, top: 75 })
		// Стандартный набор кнопок
		.add('mapTools');

	// Также в метод add можно передать экземпляр класса, реализующего определенный элемент управления.
	// Например, линейка масштаба ('scaleLine')
	myMap.controls
		.add(new ymaps.control.ScaleLine())
		// В конструкторе элемента управления можно задавать расширенные
		// параметры, например, тип карты в обзорной карте
		.add(new ymaps.control.MiniMap({
			type: 'yandex#publicMap'
		}));
	
	var header = '<div style="margin-bottom:5px">Выбор места <span>рождения</span></div>';
	var link = '<p><a href="#" class="finish-map">Да, это место рождения</a></p>';
	
	myMap.events.add('click', function (e) {
		var coords = e.get('coordPosition');
		// Отправим запрос на геокодирование
		ymaps.geocode(coords).then(function (res) {
			var names = [];
			// Переберём все найденные результаты и
			// запишем имена найденный объектов в массив names
			res.geoObjects.each(function (obj) {
				names.push(obj.properties.get('name'));
			});
			content = names.join(', '); 
			myMap.balloon.open(coords, {
				contentHeader: header,
				contentBody:
					'<p>Координаты: ' + [coords[0].toPrecision(6),coords[1].toPrecision(6)].join(', ') + '<br/>'+ 
					'Название: ' + content + '</p>'+ 
					link
			});
			if($('#map').data('mode') == 'city_name'){
				$('#Profile_city_id').val( '0' );
				$('#Profile_city_id').val( '0' );
				$('#Profile_city_timezone').val( '' );
				$('#Profile_city_latitude').val( coords[0].toPrecision(6) );
				$('#Profile_city_longitude').val( coords[1].toPrecision(6) );
			}
			if($('#map').data('mode') == 'place_name'){
				$('#Profile_place_id').val( '0' );
				$('#Profile_place_timezone').val( '' );
				$('#Profile_place_latitude').val( coords[0].toPrecision(6) );
				$('#Profile_place_longitude').val( coords[1].toPrecision(6) );
			}
		});
	});
	
	// Обработка события, возникающего при щелчке
	// правой кнопки мыши в любой точке карты.
	// При возникновении такого события покажем всплывающую подсказку.
	/*myMap.events.add('contextmenu', function (e) {
		myMap.hint.show(e.get('coordPosition'), 'Кто-то щелкнул правой кнопкой');
	});	*/
	
	$('.map-pointing').click(function(){
		$('#map').data('mode',$(this).data('point'));
		myMap.balloon.close();
		if($(this).data('point') == 'city_name'){
			header = '<div style="margin-bottom:5px" class="h-city">Выбор места <span>рождения</span></div>';
			link = '<p><a href="#" class="finish-map">Да, это место рождения</a></p>';
		}
		if($(this).data('point') == 'place_name'){
			header = '<div style="margin-bottom:5px" class="h-place">Выбор места <span>проживания</span></div>';
			link = '<p><a href="#" class="finish-map">Да, это место проживания</a></p>';
		}
		$('#map').slideDown(300,function(){
			myMap.container.fitToViewport();
		});
		return false;
	});

	$('body').on('click', '.finish-map', function(){
		if($('#map').data('mode') == 'city_name'){
			$('#Profile_city_name').val( content );
		}
		if($('#map').data('mode') == 'place_name'){
			$('#Profile_place_name').val( content );
		}
		myMap.balloon.close();
		$('#map').slideUp();
		return false; 
	});

}

var content = '';
