let root = document.getElementById("root");


class todoList{
    constructor(place, title){
        this.place = place;
        this.title = title;
        this.cardArray = [];

        this.render();
    }

    addToDo(){
        let text = this.input.value;
        this.cardArray.push(new Card(text, this.div, this));
    }

    render(){
        this.createToDoListElement();
        this.place.append(this.todoListElement);

    }

    createToDoListElement(){
        //Create elements
        this.h2 = document.createElement('h2');
        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";
        this.deleteButton.classList.add('btn-delete');
        this.input = document.createElement('input');
        this.input.classList.add("inputStyle");
        this.addButton = document.createElement('button');
        this.addButton.innerText = 'Add';
        this.addButton.classList.add("btn-save");
        this.addButton.classList.add("btn");
        this.addButton.id = "to-do-list-button";
        this.deleteButton.addEventListener('click', ()=>{
            this.todoListElement.remove();
        });
        this.div = document.createElement('div');
        this.todoListElement = document.createElement('div');

        //Add Event listener
        this.addButton.addEventListener('click', ()=>{
            if(this.input.value != ""){
                this.addToDo.call(this);
                this.input.value = "";
            }
        });

        //Append elements to the to-do list element
        this.todoListElement.append(this.h2);
        this.todoListElement.append(this.deleteButton);
        this.todoListElement.append(this.input);
        this.todoListElement.append(this.addButton);
        this.todoListElement.append(this.div);
        this.todoListElement.classList.add("todoList");

        this.titleEditable = new EditableText(this.title, this.h2,"input");

        
    }



    
}


class Card{
    constructor(text, place, todoList){

        this.place = place;
        this.todoList = todoList;
        this.text = text;
        this.render();
    }

    render(){
        this.card = document.createElement('div');
        this.card.classList.add("card");
        this.card.draggable = true;
        this.card.id = Date.now();

        this.p = document.createElement('p');

        this.textEditable = new EditableText(this.text, this.p,"input");

        this.deleteButton = document.createElement('button');
        this.deleteButton.innerText = "X";
        this.deleteButton.addEventListener('click', ()=>{
            this.deleteCard.call(this);
        });

        //append elements to card
        this.card.append(this.p);
        this.card.append(this.deleteButton);
        this.place.append(this.card);
       
        this.moveCard();
    }

    deleteCard(){
        this.card.remove();
        let i = this.todoList.cardArray.indexOf(this);
        this.todoList.cardArray.splice(i,1);
    }


    moveCard(){
        let dragableCards = document.getElementsByClassName('card');
        for(let i = 0 ; i < dragableCards.length ; i++){
            dragableCards[i].addEventListener('dragstart', (e)=>{
                e.dataTransfer.setData("text/plain", e.target.id);
            })
        }

        for(const dropZone of document.querySelectorAll('.todoList')){
            dropZone.addEventListener('dragover', (e)=>{
                e.preventDefault();
                dropZone.classList.add('drop-zone--over')
            })

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drop-zone--over');
            })

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                const droppedCardId = e.dataTransfer.getData("text/plain");
                const droppedElement = document.getElementById(droppedCardId);
                dropZone.appendChild(droppedElement);
                dropZone.classList.remove('drop-zone--over');              
            })
        }
    }

    
}
 

class EditableText{
    constructor(text, place,typeOfInput){
        this.text = text;
        this.place = place;
        this.typeOfInput = typeOfInput;
        this.render();
    }

    render(){
        this.div = document.createElement("div");
        this.p = document.createElement("p");

        this.p.innerText = this.text;

        this.p.addEventListener('click', ()=>{
            this.showEditableTextArea.call(this);
        });

        //append elements to editable text
        this.div.append(this.p);
        this.place.append(this.div);
    }

    showEditableTextArea(){
        let oldText = this.text;

        this.input = document.createElement(this.typeOfInput);
        this.saveButton = document.createElement("button");

        this.p.remove();
        this.input.value = oldText;
        this.saveButton.innerText = "Save";
        this.saveButton.classList.add("btn");
        this.saveButton.classList.add("btn-save");
        this.input.classList.add("inputStyle");

        this.saveButton.addEventListener('click', ()=>{
            this.text = this.input.value;
            this.div.remove();
            this.render();
        });


        this.div.append(this.input);
        this.div.append(this.saveButton);

        this.input.select();
    }

}



//-------------main------------

let addTodoListInput = document.getElementById("addTodoListInput");
let addTodoListButton = document.getElementById("addTodoListButton");

addTodoListButton.addEventListener('click',()=>{
   if ( addTodoListInput.value.trim() != ""){
    new todoList(root, addTodoListInput.value);
    addTodoListInput.value = "";
   }
});



let todoList1 = new todoList(root, 'To Do');
let todoList2 = new todoList(root, 'In Progress');
let todoList3 = new todoList(root, 'Done');



// todoList1.input.value = "Hello";
// todoList1.addToDo();
// todoList1.input.value = "";



