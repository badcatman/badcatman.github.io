const ENTER_CODE = 13;
const ESC_CODE = 27;

class TodoList {
	constructor () {
		this.main = document.querySelector('main');
		this.header = document.createElement('div');
		this.input = document.createElement('input');
		this.add = document.createElement('span');
		this.divList= document.createElement('div');
		this.ulList= document.createElement('ul');

		this.header.classList.add('header');
		this.input.classList.add('input');
		this.input.id = 'task';
		this.input.setAttribute('placeholder', 'Write here');
		this.add.classList.add('button');
		this.add.innerText = 'Add';
		this.divList.classList.add('list');
		this.ulList.classList.add('listUl');

		this.main.appendChild(this.header);
		this.header.appendChild(this.input);
		this.header.appendChild(this.add);
		this.main.appendChild(this.divList);
		this.divList.appendChild(this.ulList);

		// this.add = document.querySelector('.button');
 	// 	this.input = document.querySelector('#task');

 		this.items = [];
		this.addHandler();
		this.saveChanges();
		this.createList();
	}
	addHandler () {
		const that = this;
		this.add.addEventListener('click', function(event) {
 			that.addTodo();
 		});
	}
	addTodo() {
		if (this.input.value) {
			this.items.push(new Todo(this.input.value));
	    	this.input.value = '';
	    	localStorage.setItem("items", JSON.stringify(this.items));
	    	console.log(this.items);
		} else {
			this.input.setAttribute('placeholder', 'Write something please');
		}
	}
	saveChanges() {
		if (!localStorage.getItem("items")) {
			localStorage.setItem("items", JSON.stringify(this.items));
		} else {
			this.items = JSON.parse(localStorage.getItem("items"));
		}
		// localStorage.clear();
		console.log(this.items);
	}
	createList() {
		for (let key of this.items) {
			new Todo(key.title, key.done, key.date, key.id);
		}
	}
}

class Todo {
	constructor (title, done = false, date = new Date(), id = Math.random()) {
		this.id = id;
	  	this.title = title;
	  	this.done = done;
	  	this.date = date;
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
		if (this.done) {
			this.liDom.classList.add('checked');
		} else {
			this.liDom.classList.remove('checked');
		}
		this.liDom.addEventListener('click', function(event) {
			if (event.target.tagName === 'LI' || event.target === that.liDom.firstChild) {
				that.toggle();
			}
 		});
	}
	toggle() {
		this.done = !this.done;
		this.liDom.classList.toggle('checked');

		this.items = JSON.parse(localStorage.getItem("items"));
		for (let key of this.items) {
				if (key.id === this.id) {
					key.done = !key.done;
				} 
		}
		localStorage.setItem("items", JSON.stringify(this.items));
	}

	addCloseHandler () {
		const that = this;
		this.close.addEventListener('click', function(event) {
 			that.removeTodo();
 		});
	}
	removeTodo() {
		this.wrapper.removeChild(this.close.parentElement);

		this.items = JSON.parse(localStorage.getItem("items"));
		for (let i =0; i<this.items.length; i++){
			if (this.items[i].id === this.id) {
					this.items.splice(i, 1);
					console.log(this.items);
				} 
		}
		localStorage.setItem("items", JSON.stringify(this.items));
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
		this.textNode.innerText = this.editInput.value;
		this.items = JSON.parse(localStorage.getItem("items"));
		for (let key of this.items) {
				if (key.id === this.id) {
					key.title = this.editInput.value;
					console.log(this.items);
				} 
		}
		localStorage.setItem("items", JSON.stringify(this.items));
		this.close.hidden = false;
		this.edit.hidden = false;
		

		this.removeEdit();
	}
	removeEdit() {
		this.editInput.parentElement.removeChild(this.editInput);
		this.editButton.parentElement.removeChild(this.editButton);
	}
}
const todolist = new TodoList();
console.log(4);
console.log(4);