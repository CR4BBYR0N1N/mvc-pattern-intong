// Model
class Model {
  constructor() {
    // Initialize the brand and name of the model
    this.brand = "";
    this.name = "";
    // Initialize the observers of the model
    this.observers = [];
  }

  // Set the brand and name of the model
  setBrandAndName(brandAndName) {
    [this.brand, this.name] = brandAndName.split(" ");
    // Notify all observers of the model
    this.notifyObservers();
  }

  // Add an observer to the model
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Notify all observers of the model
  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

// View
class View {
  constructor() {
    // Initialize the model of the view
    this.model = null;
    // Get the brand and name input element of the view
    this.brandAndNameInput = document.getElementById("brandAndName");
    // Get the add button element of the view
    this.button = document.getElementById("add");
    // Get the list element of the view
    this.list = document.getElementById("list");
  }

  // Set the model of the view
  setModel(model) {
    this.model = model;
  }

  // Update the view
  update() {
    // Update the list element of the view
    this.list.innerHTML = `<li>${this.model.brand}</li><li style="margin-left: 20px;">${this.model.name}</li>` + this.list.innerHTML;
  }

  // Bind the add button to a handler
  bindAddButton(handler) {
    this.button.addEventListener("click", event => {
      handler(this.brandAndNameInput.value);
    });
  }
}

// Controller
class Controller {
  constructor(model, view) {
    // Initialize the model and view of the controller
    this.model = model;
    this.view = view;

    // Set the model of the view
    this.view.setModel(this.model);
    // Bind the add button of the view to the handleAddButton method of the controller
    this.view.bindAddButton(this.handleAddButton.bind(this));
    // Add the view as an observer of the model
    this.model.addObserver(this.view);
  }

  // Handle the add button
  handleAddButton(brandAndName) {
    this.model.setBrandAndName(brandAndName);
  }
}

// Intantiate the Model, View and Controller
const app = new Controller(new Model(), new View());