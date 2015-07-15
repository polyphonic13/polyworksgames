var containerEls = {};
var modalEl; 
var modalContentEl;
var modalOpen = false;
var navIds = ['about', 'contact', 'games'];
var gameModalContent = {
	doy: '<div id="doy_game" class="game_modal"><span class="close_x" onclick="hideShowModal(false)">X</span><div class="game_content"><h3 class="blue1">dreams of yesterday</h3><p>solve mysteries, explore the past and help save the future in a 3D adventure game for mac and windows.</p><p><b>coming in spring 2016</b></p></div><a href="" target="_blank"><div id="doy_ss" class="game_ss"></div></a></div>',
	farkle: '<div id="doy_game" class="game_modal"><span class="close_x" onclick="hideShowModal(false)">X</span><div class="game_content"><h3 class="blue1">farkle safari</h3><p>an html5 farkle tournament held against animals from around the world.</p><p><b>released january 2015</b></p></div><a href="http://www.polyworksgames.com/games/farkle" target="_blank"><div id="farkle_ss" class="game_ss"></div></a></div>',
	keke: '<div id="doy_game" class="game_modal"><span class="close_x" onclick="hideShowModal(false)">X</span><div class="game_content"><h3 class="blue1">keke and the grey expanse</h3><p>keke battles caterpillars and spiders searching for the color crystals in a grey land, in this html5 game for desktop and mobile.</p><p><b>released july 2014</b></p></div><a href="http://keke.tresensa.com/" target="_blank"><div id="keke_ss" class="game_ss"></div></a></div>'
};

function hideShowContainer(id) {
	console.log('hideShowContainer');
	var container;
	
	if(modalOpen) {
		hideShowModal(false);
	}
	
	for(var key in containerEls) {
		container = containerEls[key];
		console.log('\tcontainer['+key+'].id = ' + container.id + ', id = ' + id);
		if(container.id === id) {
			container.classList.add('show');
			container.classList.remove('hide');
		} else {
			container.classList.remove('show');
			container.classList.add('hide');
		}
	}
}

function hideShowModal(show) {
	if(show) {
		modalEl.classList.add('show');
		modalEl.classList.remove('hide');
	} else {
		modalEl.classList.add('hide');
		modalEl.classList.remove('show');
		modalContentEl.innerHTML = '';
	}
	modalOpen = show;
}

function openGameModal(gameId) {
	if(!gameModalContent.hasOwnProperty(gameId)) {
		return;
	}
	modalContentEl.innerHTML = gameModalContent[gameId];
	hideShowModal(true);
}

(function() {
	var id;
	var el;
	var containerId; 

	var pEl = document.getElementById('icon_p');
	pEl.addEventListener(
		'click',
		function(context) {
			return function(event) {
				hideShowContainer('');
			};
		}(pEl),
		false
	);
	
	modalEl = document.getElementById('modal');
	modalEl.addEventListener(
		'click',
		function(context) {
			return function(event) {
				hideShowModal(false);
			};
		}(modalEl),
		false
	);
	modalContentEl = document.createElement('div');
	modalEl.appendChild(modalContentEl);
	
	for(var i = 0, l = navIds.length; i < l; i++) {
		id = navIds[i];
		el = document.getElementById(id + '_nav');
		containerId = id + '_container';

		el.addEventListener(
			'click', 
			function(context, id) { 
				return function(event) {
					hideShowContainer(id);
				};
			}(el, containerId),
			false
		);
		// navBtns[id] = el;
		
		containerEls[id] = document.getElementById(containerId);
	}
})();