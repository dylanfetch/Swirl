window.onload = function(){
  var swirl = new Swirl()
};

class Circle {
  id;
  diameter;
  color;
  element;
  info_element;
  parent;

  constructor(id, diameter, color, parent){
    this.id = id;
    this.diameter = diameter;
    this.color = color;
    this.parent = parent;
    this.element = this.createCircleElement(diameter, color);
    this.info_element = this.createInfoElement(id, diameter, color);
  }

  createCircleElement(diameter, color){
    var element = document.createElement("div");
    element.setAttribute("class", "circle");
    element.setAttribute("style", "height:"+diameter+
                                  "px; width:"+diameter+
                                  "px; background-color:"+color+";");
    return element;
  }

  createInfoElement(id, diameter, color){
    let $self = this;
    var info_element = document.createElement("div");
    info_element.setAttribute("class", "circle_info")
    info_element.innerHTML = "Id: "+id+"</br>Diameter: "+diameter+"px</br>Color: "+color;
    var x_button = document.createElement("div");
    x_button.setAttribute("class", "x_button");
    x_button.innerHTML = "X";
    x_button.addEventListener("click",function(){$self.deleteSelf()});
    info_element.appendChild(x_button);
    return info_element;
  }

  deleteSelf(){
    this.parent.deleteCircle(this.id);
  }
}


class Swirl {
  add_circle_button;
  container;
  dashboard;
  circle_array = {};

  constructor(){
    this.add_circle_button = document.getElementById("add_circle");
    this.container = document.getElementById("swirl_container");
    this.dashboard = document.getElementById("dashboard");
    let $self = this;

    this.add_circle_button.addEventListener("click", function(){$self.addCircle()})
  }

  addCircle(){
    var key_array = Object.keys(this.circle_array);
    if(key_array.length){
      var max_key = key_array[key_array.length-1]
      var last_circle = this.circle_array[max_key]
      var color = last_circle.color;
      if(color == "#cff6fe"){
        color = "#FFF";
      }
      else{
        color = "#cff6fe";
      }
      this.createCircle(parseInt(max_key)+1,last_circle.diameter*0.9,color, this);
    }
    else{
      this.createCircle(1,500,"#cff6fe", this);
    }
  }

  createCircle(id, diameter, color, parent){
    var circle = new Circle(id, diameter, color, parent);
    let $self = this;
    var key_array = Object.keys(this.circle_array);
    if(key_array.length){
      var max_key = key_array[key_array.length-1]
      var last_circle = this.circle_array[max_key];
      last_circle.element.appendChild(circle.element);
    }
    else{
      this.container.appendChild(circle.element);
    }
    this.dashboard.appendChild(circle.info_element);
    this.circle_array[circle.id.toString()] = circle;
  }

  deleteCircle(id){
    var string_id = id.toString()
    var element = this.circle_array[string_id].element;
    var info_element = this.circle_array[string_id].info_element;
    var children = element.firstChild;
    if(children){
      element.parentNode.appendChild(children);
    }
    element.parentNode.removeChild(element);
    info_element.parentNode.removeChild(info_element);
    delete this.circle_array[string_id];
  }
}
