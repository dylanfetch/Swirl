window.onload = function(){
  var swirl = new Swirl();
};


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

    this.add_circle_button.addEventListener("click", function(){$self.addCircle()});
  }

  addCircle(){
    var key_array = Object.keys(this.circle_array);
    if(key_array.length){
      var max_key = key_array[key_array.length-1];
      var last_circle = this.circle_array[max_key];
      var color = last_circle.color;
      if(color == "#cff6fe"){
        color = "#FFFFFF";
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
    let $self = this;
    var circle = new Circle(id, diameter, color, parent);
    var key_array = Object.keys(this.circle_array);

    if(key_array.length){
      var max_key = key_array[key_array.length-1];
      var last_circle = this.circle_array[max_key];
      last_circle.circle_element.appendChild(circle.circle_element);
    }
    else{
      this.container.appendChild(circle.circle_element);
    }
    this.dashboard.appendChild(circle.info_element);
    this.circle_array[circle.id.toString()] = circle;
  }

  deleteCircle(id){
    var string_id = id.toString();
    var circle_element = this.circle_array[string_id].circle_element;
    var info_element = this.circle_array[string_id].info_element;
    var children = circle_element.firstChild;

    if(children){
      circle_element.parentNode.appendChild(children);
    }
    circle_element.parentNode.removeChild(circle_element);
    info_element.parentNode.removeChild(info_element);
    delete this.circle_array[string_id];
  }
}


class Circle {
  id;
  diameter;
  color;
  circle_element;
  info_element;
  parent;

  constructor(id, diameter, color, parent){
    this.id = id;
    this.diameter = diameter;
    this.color = color;
    this.parent = parent;
    this.circle_element = this.createCircleElement();
    this.info_element = this.createInfoElement();
  }

  createCircleElement(){
    var circle_element = document.createElement("div");
    circle_element.className = "circle";
    circle_element.style["height"] = this.diameterString;
    circle_element.style["width"] = this.diameterString;
    circle_element.style["background-color"] = this.color;
    return circle_element;
  }

  createInfoElement(){
    var info_element = document.createElement("div");
    info_element.className = "circle_info";

    var diameter_container = this.createDiameterContainer();
    var color_container = this.createColorContainer();
    var x_button = this.createXButton();

    info_element.appendChild(diameter_container);
    info_element.appendChild(color_container);
    info_element.appendChild(x_button);

    return info_element;
  }

  createDiameterContainer(){
    var diameter_container = document.createElement("div");

    var diameter_label = this.createDiameterLabel();
    var diameter_input = this.createDiameterInput();

    diameter_container.appendChild(diameter_label);
    diameter_container.appendChild(diameter_input);

    return diameter_container;
  }

  createColorContainer(){
    var color_container = document.createElement("div");

    var color_label = this.createColorLabel();
    var color_input = this.createColorInput();

    color_container.appendChild(color_label);
    color_container.appendChild(color_input);

    return color_container;
  }

  createDiameterLabel(){
    var diameter_label = document.createElement("label");

    diameter_label.setAttribute("for","Diameter");
    diameter_label.innerHTML = "Diameter:";

    return diameter_label;
  }

  createDiameterInput(){
    let $self = this;
    var diameter_input = document.createElement("input");

    diameter_input.name = "Diameter";
    diameter_input.value = $self.diameter;
    diameter_input.addEventListener("keyup",function(){$self.setDiameter()});

    return diameter_input;
  }

  createColorLabel(){
    var color_label = document.createElement("label");

    color_label.setAttribute("for","Color");
    color_label.innerHTML = "Color:";

    return color_label;
  }

  createColorInput(){
    let $self = this;
    var color_input = document.createElement("input");

    color_input.name = "Color";
    color_input.value = $self.color;
    color_input.type = "color";
    color_input.addEventListener("input",function(){$self.setColor()});

    return color_input;
  }

  createXButton(){
    let $self = this;
    var x_button = document.createElement("div");

    x_button.className = "x_button";
    x_button.innerHTML = "X";
    x_button.addEventListener("click",function(){$self.deleteSelf()});

    return x_button;
  }

  deleteSelf(){
    this.parent.deleteCircle(this.id);
  }

  setDiameter(){
    this.diameter = this.info_element.children[0].children[1].value;
    this.circle_element.style["height"] = this.diameterString;
    this.circle_element.style["width"] = this.diameterString;
  }

  setColor(){
    this.color = this.info_element.children[1].children[1].value;
    this.circle_element.style["background-color"] = this.color;
  }

  get diameterString(){
    return this.diameter + "px";
  }
}
