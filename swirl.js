window.onload = function(){
  var add_circle_button = document.getElementById("add_circle");
  var swirl = new Swirl()
  var circle = new Circle(1,300,"#000000")
  add_circle_button.addEventListener("click", function(){swirl.addCircle(circle)});
};

class Circle {
  id;
  diameter;
  color;
  element;
  constructor(id, diameter, color){
    this.id = id;
    this.diameter = diameter;
    this.color = color;
    this.element = document.createElement("div");
    this.element.setAttribute("class", "circle");
    this.element.setAttribute("style", "height:"+diameter+
                                       "px; width:"+diameter+
                                       "px; background-color:"+color+";");
  }
  get id() {
    return this.id;
  }
  get diameter() {
    return this.diameter;
  }
  get color() {
    return this.color;
  }
  get element() {
    return this.element;
  }
  get HTML() {
    return "<div class='circle" +
           "' style='height: " + this.diameter +
           "px; width: " + this.diameter +
           "px; background-color: " + this.color + ";'></div>";
  }
}

class Swirl {
  add_circle_button;
  container;
  dashboard;
  constructor(){
    this.add_circle_button = document.getElementById("add_circle");
    this.container = document.getElementById("swirl_container");
    this.dashboard = document.getElementById("dashboard");
  }
  addCircle(circle){
    //this.container.innerHTML = circle.HTML;
    this.container.appendChild(circle.element);
    var circle_info = document.createElement("div");
    circle_info.setAttribute("class", "circle_info");
    this.dashboard.appendChild(circle_info);
  }
}
