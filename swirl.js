window.onload = function(){
  var add_circle_button = document.getElementById("add_circle");
  var swirl = new Swirl()
  //var circle = new Circle(1,300,"#000000")
  //add_circle_button.addEventListener("click", function(){swirl.createCircle(1,300,"#000000")});
};

class Circle {
  id;
  diameter;
  color;
  element;
  info_element;
  constructor(id, diameter, color){
    this.id = id;
    this.diameter = diameter;
    this.color = color;

    this.element = document.createElement("div");
    this.element.setAttribute("class", "circle");
    this.element.setAttribute("style", "height:"+diameter+
                                       "px; width:"+diameter+
                                       "px; background-color:"+color+";");

    this.info_element = document.createElement("div");
    this.info_element.setAttribute("class", "circle_info")
    this.info_element.innerHTML = "Id: "+id+"</br>Diameter: "+diameter+"px</br>Color: "+color;
  }
}


class Swirl {
  add_circle_button;
  container;
  dashboard;
  circle_array = [];
  constructor(){
    this.add_circle_button = document.getElementById("add_circle");
    this.container = document.getElementById("swirl_container");
    this.dashboard = document.getElementById("dashboard");
    let $self = this;

    this.add_circle_button.addEventListener("click", function(){$self.addCircle()})
  }
  addCircle(){
    if(this.circle_array.length){
      var last_circle = this.circle_array[this.circle_array.length-1]
      var color = last_circle.color;
      if(color == "#cff6fe"){
        color = "#FFF";
      }
      else{
        color = "#cff6fe";
      }
      this.createCircle(this.circle_array.length+1,last_circle.diameter*0.9,color);
    }
    else{
      this.createCircle(1,500,"#cff6fe");
    }
  }
  createCircle(id, diameter, color){
    var circle = new Circle(id, diameter, color);
    if(this.circle_array.length){
      var last_circle = this.circle_array[this.circle_array.length-1];
      last_circle.element.appendChild(circle.element);
    }
    else{
      this.container.appendChild(circle.element);
    }
    this.dashboard.appendChild(circle.info_element);
    this.circle_array.push(circle);
  }
}
