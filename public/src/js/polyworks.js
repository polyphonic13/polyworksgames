var containerEls = {};
var navIds = ['info', 'contact', 'games'];

function hideShowContainer(id) {
	console.log('hideShowContainer');
	var container;
	
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

(function() {
	var id;
	var el;
	var containerId; 
	
	var pEl = document.getElementById('icon_p');
	pEl.addEventListener(
		'click',
		function(context, id) {
			return function(event) {
				hideShowContainer(id);
			};
		}(pEl, ''),
		false
	);
	
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