var todos = (function() {
	
	var
		todos = [],
		id = 1,
		o = {
			add: add,
			remove: remove,
			size: size,
			setCompleted: setCompleted,
			getArray: getArray
		}
	;
	
	return o;
	
	function size() {
		return todos.length;
	}

	function add(title) {
		var todo = {
			id: getId(),
			title: title,
			completed: false
		};
		
		todos.push(todo);
		
		Object.getNotifier(o).notify({
			type: 'new-todo',
			'todo': todo
		});
	}
	
	function remove(id) {
		for (var i = 0; i < todos.length; i++)
			if (todos[i].id === id) {
				todos.splice(i, 1);
				
				Object.getNotifier(o).notify({
					type: 'remove',
					'id': id
				});
		
				break;
			}
	}
	
	function setCompleted(id, status) {
		for (var i = 0; i < todos.length; i++)
			if (todos[i].id === id) {
				if (todos[i].completed != status) {
					todos[i].completed = status;
					
					Object.getNotifier(o).notify({
						type: 'status-updated',
						'id': id,
						'status': status
					});
				}
		
				break;
			}
	}
	
	function getArray() {
		return todos;
	}
	
	function getId() {
		return id++;
	}

})();
