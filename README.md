# bodyBuilderJS
An Easier way of Coding without JSX and minimizing the amount of Javascript you write

**THIS IS NOT A NODEJS COMPATIBLE LIBRARY**
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
   || almost like Apch when using object except element name is not required and will not thow an error when not passing an element name 
   || setattr obviously accepts object, WILL NOT ACCEPT strings numbers or functions
