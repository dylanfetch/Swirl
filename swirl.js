window.onload = function(){
  var add_circle_button = document.getElementById("add_circle");
  var swirl = new Swirl()
  var circle = new Circle(1,300,"#000000")
  //add_circle_button.addEventListener("click", function(){add_circle()});
  add_circle_button.addEventListener("click", function(){swirl.addCircle(circle)});
};

function add_circle(){
  var container = document.getElementById("swirl_container");
  container.innerHTML = "<div class='circle' style='height: 300px; width: 300px; background-color: #000000;'></div>";
  var dashboard = document.getElementById("dashboard");
  var circle_info = document.createElement("div");
  circle_info.setAttribute("class", "circle_info");
  dashboard.appendChild(circle_info);
}

class Circle {
  id;
  diameter;
  color;
  constructor(id, diameter, color){
    this.id = id;
    this.diameter = diameter;
    this.color = color;
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
    this.container.innerHTML = circle.HTML;
    var circle_info = document.createElement("div");
    circle_info.setAttribute("class", "circle_info");
    this.dashboard.appendChild(circle_info);
  }
}
