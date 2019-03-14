window.onload = function(){
  var swirl = new Swirl()
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
    let $self = this;
    var circle = new Circle(id, diameter, color, parent);
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
    var info_element = document.createElement("div");
    info_element.setAttribute("class", "circle_info");

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
    diameter_label.innerHTML = "Diameter:&nbsp;&nbsp;";

    return diameter_label;
  }

  createDiameterInput(){
    let $self = this;
    var diameter_input = document.createElement("input");

    diameter_input.setAttribute("name", "Diameter");
    diameter_input.setAttribute("value", $self.diameter);
    diameter_input.setAttribute("size", 16);
    diameter_input.addEventListener("keyup",function(){$self.setDiameter()});

    return diameter_input;
  }

  createColorLabel(){
    var color_label = document.createElement("label");

    color_label.setAttribute("for","Color");
    color_label.innerHTML = "Color:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    return color_label;
  }

  createColorInput(){
    let $self = this;
    var color_input = document.createElement("input");

    color_input.setAttribute("name", "Color");
    color_input.setAttribute("value", $self.color);
    color_input.setAttribute("type", "color");
    color_input.setAttribute("size", 16);
    color_input.addEventListener("keyup",function(){$self.setColor()});

    return color_input;
  }

  createXButton(){
    let $self = this;
    var x_button = document.createElement("div");

    x_button.setAttribute("class", "x_button");
    x_button.innerHTML = "X";
    x_button.addEventListener("click",function(){$self.deleteSelf()});

    return x_button;
  }

  deleteSelf(){
    this.parent.deleteCircle(this.id);
  }

  setDiameter(){
    this.diameter = this.info_element.children[0].children[1].value;
    this.element.style["height"] = this.diameter + "px";
    this.element.style["width"] = this.diameter + "px";
  }

  setColor(){
    this.color = this.info_element.children[1].children[1].value;
    this.element.style["background-color"] = this.color;
  }
}
