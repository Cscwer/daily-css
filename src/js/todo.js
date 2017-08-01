// todo.js
var { drag, angle } = require('./makeItdraggable'); 

var ls = require('./ls'); 
var todo = {}; 

module.exports = todo; 

var W = 250, H = 250; 

var todosRender = function(todos){
	var res = todoTplRender({
		todos: todos, 
		W: W, 
		H: H
	}); 

	$('.todos-container').html(res); 

	$('.todos .todo').each((i, $todo) => {
		var temp = $($todo); 
		drag(temp, {
			newXy: xy => {
				todos[i].xy = xy; 
				ls.save('todos', todos); 
			}, 
			W: W, 
			H: H
		}); 

		setTimeout(_ => {
			temp.removeClass('todo-hidden')
		}, Math.random() * 800 + 400); 
	}); 

	$('.save-btn').click(function(){
		var todoIdx = this.getAttribute('todo-idx'); 
		var todoValue = $('.todo-input')[todoIdx].value; 

		todoValue = todoValue.replace(/(\n|\r\n)/g, '<br />'); 

		todos[todoIdx].content = todoValue; 
		setTimeout(_ => {
			ls.save('todos', todos); 
		}); 

		$('.to-edit')[todoIdx].checked = false; 

		// todosRender(todos); 
		console.log('itwork')
		$('.todo-content')[todoIdx].innerHTML = todos[todoIdx].content; 
	});

	$('.todo-angle').each((i, dom) => {
		angle($(dom), {
			W: W,
			H: H,
			newAngle: deg => {
				$('.to-angle')[i].checked = false; 
				
				$('.todo')[i].style.transform = `rotate(${deg}deg)`; 
				todos[i].angle = deg; 
				ls.save('todos', todos); 
			}
		}); 
	})
}

todo.init = function(){
	var todos = ls.get('todos') || []; 
	
	todosRender(todos); 

	$('.add-todo').click(e => {
		todos.push({
			xy: {
				left: '0%', 
				top: '0%'
			}, 
			angle: '0',
			content: "新便签纸"
		}); 
		ls.save('todos', todos); 
		todosRender(todos); 
	}); 

	
}
