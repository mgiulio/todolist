var
	slice = Array.prototype.slice,
	domNodes = {},
	tmpl = {}
;

function toArray(o, n) { 
	return slice.call(o, n || 0); 
}

bootstrap();

function bootstrap() {
	domNodes.app = document.querySelector('.app');
	domNodes.addNew = domNodes.app.querySelector('.add-new');
	domNodes.todos = domNodes.app.querySelector('.todos');
	domNodes.counter = domNodes.app.querySelector('.counter');
	
	setupTemplating();
	
	domNodes.addNew.addEventListener('submit', addNewAction, false);
	domNodes.todos.addEventListener('click', onTodosClick, false);
	domNodes.todos.addEventListener('change', onTodosChange, false);
	
	Object.observe(todos, function(changes) { addTodo(changes[0].todo); }, ['new-todo']);
	Object.observe(todos, function(changes) { removeTodo(changes[0].id); }, ['remove']);
	Object.observe(todos, function(changes) { statusUpdated(changes[0].id, changes[0].status); }, ['status-updated']);
}

function addNewAction(e) {
	e.preventDefault();
	e.stopPropagation();
	
	var input = e.target.firstElementChild;
	
	var title = input.value;
	title = title.trim();
	input.value = '';
	
	if (title.length === 0)
		return;
	
	todos.add(title);
}

function onTodosClick(e) {
	e.stopPropagation();
	
	if (e.target.tagName !== 'BUTTON')
		return;
	
	todos.remove(getModelId(getTarget(e, '.item')));
}

function onTodosChange(e) {
	e.stopPropagation();
	//e.preventDefault();
	
	todos.setCompleted(getModelId(getTarget(e, '.item')), e.target.checked);
}

function setupTemplating() {
	Handlebars.registerHelper('toLowerCase', function(str) {
		return str.toLowerCase();
	});
	
	Handlebars.registerHelper('date', function(str) {
		var d = new Date(str);
		
		var day = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();
		
		month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][month];
		year = String(year).substr(-2);
		
		return day + ' ' + month + ' ' + year;
	});
	
	var templateNodes = document.querySelectorAll('[type="text/x-handlebars-template"]');
	toArray(templateNodes).forEach(function(domNode) {
		var tmplName = domNode.id.slice(5);
		tmpl[tmplName] = Handlebars.compile(domNode.innerHTML);
	});
}

/*
 * These are the  handlers for the custom vents fired by the todo model
 */
 
 function addTodo(todo) {
	addDomNode(todo);
	updateCounter(todos.size());
 }
 
 function removeTodo(id) {
	domNodes.todos.removeChild(document.getElementById(getElId(id)));
	
	updateCounter(todos.size());
 }
 
 function addDomNode(todo) {
	var html = tmpl['todo'](todo);
	
	var div = document.createElement('div');
	div.innerHTML = html;
	
	domNodes.todos.appendChild(div.firstElementChild);
 }
 
 function statusUpdated(id, status) {
	var itemEl = domNodes.todos.querySelector(`#${getElId(id)}`);
	var checkbox = itemEl.querySelector('.item-status-toggle input[type="checkbox"]');
	 
	if (status) {
		itemEl.classList.add('completed');
		checkbox.checked = true;
	}
	else {
		itemEl.classList.remove('completed');
		checkbox.checked = false;
	}
 }
 
 function updateCounter(newValue) {
	var text;
	
	switch (newValue) {
		case 0:
			text = 'no items';
			break;
		case 1:
			text = '1 item';
			break;
		default:
			text = `${newValue} items`;
	}
	
	domNodes.counter.innerHTML = text;
 }
 
 function getModelId(el) {
	 return parseInt(el.id.slice(3));
 }
 
 function getElId(modelId) {
	 return `id-${modelId}`;
 }
 
 function getTarget(e, selector) {
	var 
		el = e.target, 
		root = e.currentTarget,
		matches = false
	;
	
	while (el != root && !(matches = el.matches(selector)))
		el = el.parentNode;
	
	return matches ? el : null;
}
