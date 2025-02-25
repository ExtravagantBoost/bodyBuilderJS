# bodyBuilderJS
An Easier way of Coding without JSX and minimizing the amount of Javascript you write
this module can be used in a static html site as well as node js environments
** Client side ONLY
## purpose
The purpose of this library is to mimimize the amount of code you have to write in order to dynamically change/create HTML elements

before bodyBuilder
```javascript
let main = document.querySelector("div.main");
main.style.color = "red";
main.style.fontWeight = "bold";
main.style.textDecoration = "underline";
main.addEventListener("click", () => {
  //some code to do more things!
  main.style.color = "blue";
  main.innerHTML = "reeeee so much things!!";
  let box = document.createElement("div");
  box.style.color = "green";
  box.appendChild(document.createTextNode("im not blue da be daa"));
  main.appendChild(box);
});
```
After:
```javascript
let main = l("div.main");
main.setattr({
  style: {
    color:"red",
    fontWeight:"bold",
    textDecoration:"underline"
  }
  on:{
     click() {
        //some code to do more things!
        main.setattr({
          style:{
            color:"blue",
            
          }
        });
        main.inHTML = "reeeee so much things!!";
        let box = l.CE("div");
        box.setattr({
          style:{
            color:"green"
          }
        })
        box.apCh(
          "im not blue da be daa"
          
        );
        main.apCh(box,"some extra text to show how efficient bodyBuilderJS is!");
     }
  }
});
```
as you can see there, you can minimize so many functions and extra commands with BodyBuilderJS!





# DOCS

### `l(query)`:
 | main command for bodyBuilder<br>
 | a shortcut for using `document.querySelector(foo)`<br>
 | the argument 'query' only accepts strings<br>
### `l.CE(elename)`
 | main command for creating Elements<br>
 | shortcut for `document.createElement(foo)`<br>
 | argument `elename` only accepts strings<br>

**both of these commands add special attributes to elements even not made by bodybuilder**

some of these attributes are commands are:

### `ele.apCh(...children)`
 || secondary command after creating element or selecting element from document<br>
 || apch is short for `document.appendChild`<br>
 || apch accepts <br>
* More than 1 argument of 
* documentElement
* string
* functions -> string/documentElement/number
* numbers
* **object**
  * note: Objects are special in these cases because they represent elements in BodyBuilder,
  * Example
    ```javascript
      element.apCh(
        {
          div:[/*other things that Apch accepts*/],
          style:{},
          on:{},
          class:{}
        }
      );
    ```
    element name has to go first because without this BodyBuilder will throw an error due to there not being a viable documentElement to process this. the rest can go in any order as you like.
### `ele.setattr(obj)`;
   || almost like Apch when using object except element name is not required and will not thow an error when not passing an element name <br>
   || setattr obviously accepts object, WILL NOT ACCEPT **strings numbers or functions**<br>
   || however this will accept strings inside of an Object
   
   <hr>
   
# Structuring Objects within apCh and setattr.
so lets start of with a basic Object within apch:
```javascript
let body = l("body");
body.apCh({
  /*empty element WILL CAUSE AN ERROR!!*/
}/*other elements you might want to add*/)
```
passing objects through this function are dynamic, which means you can pass as many keys there are chickens in the world **(heavily advised not to do that)**.
so lets just focus on the object and see some basic stuff you can do with it.
```javascript
{
  elementname:[],
  class:[],
  style:{},
  on:{},
}
```
these properties that i have passed into this object have special properties that are given to them, as you might've figured by the `class` and `style` attributes, so heres some basic rules to this
* Elementname is the tag Name: e.g. passing `div` will create `<div></div>` when outputted   **THIS IS REQUIRED**
  * on value side of this object, there is a list, this is sort of an InnerHTML/ChildList zone, so passing `"hello"` through this list would produce `<div>hello</div>` of course this is an extension of the apCh function which means you can put as many elements as you want to it, **THERE IS NO LIMIT**,
* class, of course is the classList of the Element, this attribute accepts Classes in list form or string form, in string form classes are seperated by spaces, just like how you'd write it in HTML. Again you can pass as many as you want no limit. **OPTIONAL**
* Style, unlike how youd write it in HTML, cannot accept Strings or lists, only Objects, because this is kind of your own little element specific Ruleset.     **OPTIONAL**
  * so you can pass any property through this object just like how you would when writing CSS (you can pass CSS vars through it too!)
  * so passing a couple properties like:
  ```javascript
  {
    div:["hello"],
    class:[],
    style:{
      color:"red",
      textDecoration:"underline wavy white",
      "-webkit-text-decoration":"underline wavy white",
      background:"black"
    }
  }
  ```
  would produce:
  ```html
  <div class="" style="color:red;text-decoration:underline wavy white;-webkit-text-decoration:underline wavy white;background:black;">
    hello
  </div>
  ```
* On, the most *helpful* attribute so far, its basically ```element.addEventListener()``` made for Objects. **again Optional**
  * the On attribute can only accept Objects due to the affect that the eventlisteners need to be able to listen to a certain event.
  * think of `on` as a part of of an attribute that you add to an element in HTML, like "**on**click" or "**on**play",
  * an example of this would be
  ```javascript
  {
    div:["hello"],
    class:[],
    style:{
      color:"red",
      textDecoration:"underline wavy white",
      "-webkit-text-decoration":"underline wavy white",
      background:"black"
    },
    on:{
      click:(event) => {/*do something*/}/*ES8 function*/
      /*ES6/5 and later...*/
      click:function (event) {/*do something*/}
    }
  }
  ```
  * note: when you use this in the object, these will not be shown in the HTML structure as they are using Event listeners.
* **Use this structure with setattr but do not pass the element name because you only changing the attribute structure**
* final attribute(s), other attributes that are not `class`,`on`,`style` or `elementname` will be added as data to the Element, eg passing `role:"button"` would produce `<button role="button"></button>`
Well this is it.. you're ready to code with **BodyBuilderJS**, Bye!!
