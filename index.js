/*made by ExtravagantBoost*/
var l = (query) => {

    let element = document.querySelector(query);
    if (element != undefined && !element.apCh) {
        l.__actions__.addLattrs(element);
    }
    return element;
};

l.CE = (TagName) => {

    let element = document.createElement(TagName);
    l.__actions__.addLattrs(element);
    return element;
};
Object.defineProperty(l, '__actions__', {
    value: {
        lookInto(dict) {
            //console.log(this.lookInto)
            if (typeof dict == "object") {
                let ele = Object.entries(dict)[0];
                let element = document.createElement(ele[0]);
                Object.entries(dict[Object.keys(dict)[0]]).forEach((entry) => {
                    let value = entry[1];
                    //console.log(key,value)
                    if (typeof value == 'object') {
                        if (value instanceof Element) {
                            element.appendChild(value);
                        } else {

                            element.appendChild(this.lookInto(value));
                        }
                    } else if (typeof value == 'string') {
                        element.appendChild(document.createTextNode(value));
                    }

                });

                let sa = [false, false, false];
                Object.entries(dict).forEach((entry, index) => {
                    if (index != 0/*skip first index due to it being the creation state of dictionary*/) {
                        let [key, value] = entry;
                        if (key == 'style' && !sa[0]) {
                            sa[0] = true;
                            let style = Object.entries(value);
                            style.forEach((value) => {
                                let [attr, val] = value;
                                element.style.setProperty(attr, val);
                                if (
                                    Object.values(element.style).indexOf(attr) !=
                                    -1 /*check if attribute has been added else brute force the attribute*/
                                ) {
                                    element.style[attr] = val; //will trigger the setter function of style
                                }
                            });
                        }
                        if (key == 'class' && !sa[1]) {
                            sa[1] = false;
                            let classes = value;
                            if (typeof classes == "string") {
                                element.className = classes;
                            } else classes.forEach((klase) => {
                                if (typeof klase == 'string') element.classList.add(klase);
                            });
                        }
                        if (key == 'on' && !sa[2]) {
                            sa[2] = true;
                            let events = value;
                            Object.entries(events).forEach((value) => {
                                let [event, cond] = value;
                                //console.log(typeof cond)
                                if (typeof cond == "function") {
                                    element.addEventListener(event, cond, true);
                                } else {
                                    element.addEventListener(event, cond[0], cond[1]);
                                }
                            });
                        }
                        if (key != 'class' && key != 'on' && key != 'style') {
                            element.setAttribute(key, value);

                        }
                    }
                });
                this.addLattrs(element);
                return element;
            }

        },
        addLattrs: (ele) => {

            if (ele.apCh == undefined) {
                Object.defineProperties(ele, {
                    l: {
                        value(query) {
                            if (typeof query == 'string') {
                                let evl = ele.querySelector(query);
                                if (evl != undefined && !evl.apCh) {
                                    l.__actions__.addLattrs(evl);
                                }
                                return evl;
                            }
                            return undefined;
                        }
                    },
                    apCh: {
                        value(...ch) {
                            ch.forEach((child) => {
                                if (typeof child == "string") {
                                    this.appendChild(document.createTextNode(child));
                                }
                                if (typeof child == "object") {
                                    if (child instanceof Element
                                    ) {
                                        this.appendChild(child);
                                    } else {
                                        this.appendChild(l.__actions__.lookInto(child));
                                    }
                                }
                            });
                        },
                    },
                    __style__: {
                        value: Object.create(null),
                    },
                    inHTML: {
                        get() {
                            return this.innerHTML;
                        },
                        set(val) {
                            this.innerHTML = val;
                        },
                    },
                    clsnm: {
                        get() {
                            return this.className;
                        },
                        set(val) {
                            this.className = val;
                        },
                    },
                    setStyle: {
                        value(styles, method) {
                            if (method) {
                                if (method == "add") {
                                    //do nothing, add to original
                                } else if (method == "replace") {
                                    //clear current style
                                    ele.style = "";
                                    ele.__style__ = styles;
                                }
                            } //else default to additive
                            Object.entries(styles).forEach((style) => {
                                let [attr, value] = style;
                                ele.style.setProperty(attr, value);
                                if (
                                    Object.values(ele.style).indexOf(attr) !=
                                    -1 /*check if attribute has been added else brute force the attribute*/
                                ) {
                                    ele.style[attr] = value; //will trigger the setter function of style
                                }
                                if (method != "replace") {
                                    ele.__style__[attr] = value;
                                }
                            });
                        },
                    },
                    setattr: {
                        value(dict) {
                            let sa = [false, false, false];
                            Object.entries(dict).forEach((entry) => {
                                if (entry[0] == "style" && !sa[0]) {
                                    sa[0] = true;
                                    let style = Object.entries(dict.style);
                                    style.forEach((value) => {
                                        let [attr, val] = value;
                                        ele.style.setProperty(attr, val);
                                        if (
                                            Object.values(ele.style).indexOf(attr) !=
                                            -1 /*check if attribute has been added else brute force the attribute*/
                                        ) {
                                            ele.style[attr] = val; //will trigger the setter function of style
                                        }
                                    });
                                }
                                if (entry[0] == "class" && !sa[2]) {
                                    sa[2] = true;
                                    let classes = dict.class;
                                    if (typeof classes == 'string') {
                                        ele.className = classes;
                                    } else {
                                        classes.forEach((klase) => {
                                            if (typeof klase == "string" /*to avoid errors*/) {
                                                ele.classList.add(klase);
                                            }
                                        });
                                    }
                                }
                                if (entry[0] == "on" && !sa[1]) {
                                    sa[1] = true;
                                    let events = Object.entries(dict.on);
                                    events.forEach((value) => {
                                        let [event, cond] = value;
                                        //console.log(typeof cond)
                                        if (typeof cond == "function") {
                                            ele.addEventListener(event, cond, true);
                                        } else {
                                            ele.addEventListener(event, cond[0], cond[1]);
                                        }
                                    });
                                }
                                if (
                                    ["class", "on", "style"].indexOf(entry[0]) == -1
                                ) {
                                    ele.setAttribute(entry[0], entry[1]
                                    );
                                }
                            });
                        },
                    },
                    clsLst: {
                        value: {
                            add(...classes) {
                                classes.forEach((klase) => {
                                    ele.classList.add(klase);
                                });
                            },
                            rm(...classes) {
                                classes.forEach((klase) => {
                                    ele.classList.remove(klase);
                                });
                            },
                            rp(cls1, cls2) {
                                ele.classList.replace(cls1, cls2);
                            },
                            has(cls) {
                                ele.classList.contains(cls);
                            },
                        },
                    },
                });
            } else {
                if (console) {
                    console.warn("element already initialized");
                }
            }

        }
    }
});
