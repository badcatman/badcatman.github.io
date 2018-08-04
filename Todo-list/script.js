const ENTER_CODE = 13;
const ESC_CODE = 27;

class TodoList {
	constructor () {
		this.add = document.querySelector('.button');
 		this.input = document.querySelector('#task');
 		this.items = [{title: '123123', done: false, date: new Date()}];
		this.addHandler();
	}
	addHandler () {
		const that = this;
		this.add.addEventListener('click', function(event) {
 			that.addTodo();
 		});
	}
	addTodo() {
	    this.items.push(new Todo(this.input.value));
	    this.input.value = '';
	}


}

class Todo {
	constructor (title) {
	  this.title = title;
	  this.done = false;
	  this.date = new Date();
	  this.create();
	  this.addChoiceHandler();
	}

	create() {
		this.wrapper = document.querySelector('.listUl');
		this.liDom = document.createElement('li');
		this.textNode = document.createElement('span');
		this.textNode.innerText = this.title;
		this.liDom.insertBefore(this.textNode, this.liDom.firstChild);
		this.wrapper.appendChild(this.liDom);
		this.createEditButon();
		this.createCloseButon();
	}
	createCloseButon () {
		this.close = document.createElement('span');
		this.closeIcon = document.createElement('i');

		this.close.classList.add('close');
		this.closeIcon.classList.add('fas');
		this.closeIcon.classList.add('fa-window-close');

		this.liDom.appendChild(this.close);
		this.close.appendChild(this.closeIcon);

		this.addCloseHandler();

	}
	createEditButon () {
		this.edit = document.createElement('span');
		this.editIcon = document.createElement('i');

		this.edit.classList.add('edit');
		this.editIcon.classList.add('fas');
		this.editIcon.classList.add('fa-edit');

		this.liDom.appendChild(this.edit);
		this.edit.appendChild(this.editIcon);

		this.addEditHandler();
	}

	addChoiceHandler () {
		const that = this;
		this.liDom.addEventListener('click', function(event) {
			if (event.target.tagName != 'LI') return;
 			that.toggle();
 		});
	}
	toggle() {
		// if(!this.done) {
		// 	this.liDom.classList.add('checked');
		// 	this.done = true;
		// } else {
		// 	this.liDom.classList.remove('checked');
		// 	this.done = false;
		// }
		this.done = !this.done;
		this.liDom.classList.toggle('checked');
	}

	addCloseHandler () {
		const that = this;
		this.close.addEventListener('click', function(event) {
 			that.removeTodo();
 		});
	}
	removeTodo() {
		this.wrapper.removeChild(this.close.parentElement);
	}

	addEditHandler () {
		const that = this;
		this.edit.addEventListener('click', function(event) {
 			that.editTodo();
 			event.stopPropagation();
 		});
	}
	editTodo() {
		this.text = this.liDom.innerText;
		this.editInput = document.createElement('input');
		this.editButton = document.createElement('span');
		this.editInput.classList.add('input');
		this.editButton.classList.add('button');
		this.editInput.value = this.text;
		this.editButton.innerText = 'Edit';
		this.textNode.innerText = '';
		this.liDom.appendChild(this.editInput);
		this.liDom.appendChild(this.editButton);

		this.addEditButtonHandler();

	}
	addEditButtonHandler () {
		const that = this;
		this.close.hidden = true;
		this.edit.hidden = true;
		this.editButton.addEventListener('click', function(event) {
			that.confirmEdit();
		});
		this.editInput.addEventListener('keydown', function(event) {
			that.keyPressCheck(event.keyCode);
		});

		this.liDom.addEventListener('click', function(event) {
			event.preventDefault();
		});
	}

	keyPressCheck(keyCode) {
		if (keyCode == ENTER_CODE) {
			this.confirmEdit();	
		}

		if (keyCode == ESC_CODE) {
			this.textNode.innerText = this.text;
			this.close.hidden = false;
			this.edit.hidden = false;
			this.removeEdit();
		}

	}
	confirmEdit() {
		// let textNode = document.createTextNode(this.editInput.value);
		// this.liDom.insertBefore(t, this.liDom.firstChild);
		this.textNode.innerText = this.editInput.value;
		this.close.hidden = false;
		this.edit.hidden = false;
		console.log(this.close.hidden);

		this.removeEdit();
	}
	removeEdit() {
		this.editInput.parentElement.removeChild(this.editInput);
		this.editButton.parentElement.removeChild(this.editButton);
	}
}
const todolist = new TodoList();
// const bunny = new Todo('bunny');
