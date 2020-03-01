//import Utils from '../../src/js/utils/utils';


const Utils = {
    builder: function (option) {
        try {
            var parent = document.createElement(option.element);

            for (key in option.attr) {
                if (option.attr[key] != null && option.attr[key] != undefined) {

                    if (Array.isArray(option.attr[key])) {
                        var values = '';
                        for (keyArray in option.attr[key]) {
                            values += (option.attr[key][keyArray] + ' ');
                        }

                        parent.setAttribute(key, values);
                    } else {
                        parent.setAttribute(key, option.attr[key]);
                    }
                }
            }

            if (option.text) {
                parent.appendChild(document.createTextNode(option.text));
            }

            if (option.html) {
                parent.innerHTML = option.html;
            }

            if (option.event) {
                for (var i = 0, len = option.event.length; i < len; i++) {
                    parent.addEventListener(option.event[i].type, option.event[i].func);
                }
            }

            if (option.child) {
                for (var i = 0, len = option.child.length; i < len; i++) {
                    parent.appendChild(utils.builder(option.child[i]));
                }
            }

            return parent;
        } catch (err) {
            console.log(err.message);
        }
    },

    rgb2Hex: () => {
        return '#fff';
    }
};

class Layout { //단일 Dom처럼 사용하기 위해 생성한 Class

    /*
        option
        {
            element: 'h1',
            attrs: {
                class: ['block_border-basic']
            },
            text: 'h1 element text',
            isHave: false
        }
    */
    constructor(option) {
        /*
            option은 변경되면 안되기 때문에 closuer를 이용하여 private 접근자를 사용한다.
        */
        let _option = option;
        this.getOption = () => {
            return _option;
        };

        this.dom = Utils.builder(option);
        //dom도 객체이기 때문에 layout property를 만들어서 자기 자신을 참조하게 한다.
        this.dom.layout = this;

        this.pos = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.canHaveChild = option.canHaveChild;

        /*
            1. Dom마다 event 생성 이유
                - Memory가 많이 든다 하더라고 어디에서 생성하더라도 단일로 관리 할 수 있도록 event를 각각 생성한다.
            2. 주의 사항
                - event combination이 생긴다.
        */


        /*
            1. for select 표시할 때 사용
         */
        const mouseMove = (evt) => {
            //새로운 element를 drag 중일 때
            //또는 element를 click해서 옮기고 있을 시

            this.dom;

            evt.stopPropagation();
        };

        /*
            1. for select
        */
        const click = (evt) => {
            // => method의 this는 현재 scope로 정해지기 때문에 this를 사용할 수 있다.
            this.dom;

            evt.stopPropagation();
        };

        /*
            1. for drag
        */
        const drag = (evt) => {
            
        };

        /*
             1. for drag end
         */
        const dragEnd = (evt) => {

        };

        /*
            1. for drag over -> drag하는 대상이 존재 할때 mousemove 대신 사용
        */
       const dragOver = (evt) => {
           //dataTransfer 사용
       };

       //dragleave
       //drop

       /*
        function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        
        console.log(data);
        
        ev.target.appendChild(document.getElementById(data));
        }
       */

    }

    //Layout을 꼭 미리 계산해야 하는가?
    /*Contain은 과연 필요한가? 
      그냥 이벤트 적용하면 되는거잖어 
      bubbling만 피하면 되고
      문제는 appendchild를 하면 안되고 순서를 정해야 한다. 왼쪽 오른쪽 밑에 위에 등 정해야 하는것이 있기때문에
      계산해야하고 보여주기도 해야한다.
    */

    //필요한지 모르겠다.
    isContain(x, y) {
        try {
            if (!this.canHaveChild) {
                return false;
            }

            const pos = this.pos();
            if (pos.x <= x && x <= (pos.x + pos.width) &&
                pos.y <= y && y <= (pos.y + pos.height)) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }

    get pos() {
        try {
            /*
                1. 사용이유
                    - pos는 필요할때마다 사용한다.
                    - 변경이 있을 시 마다 pos가 update되어야 하기 때문인다.
            */
            const pos = {};
            const dom = this.dom
            const rect = dom.getBoundingClientRect() //render된 후의 top, left, width, height을 제공;

            //Offset의 기준이 되는 Parent Element
            const offsetParent = dom.offsetParent;

            /*
                1. 주의 사항
                    - OffsetLeft 등을 통해 offsetParent에서 얼마나 떨어져 있는지 알 수 있다.
                    - padding이란 element 요소 안에 지정해둔 사이즈만큼 추가하는 것이다.
                    - 30px * 30px element가 존재할 시 padding이 20px이면 width = 30 + 20 * 2, height = 30 + 20 * 2; 이다.
            */
            if (offsetParent) {
                pos.x = dom.offsetLeft + (offsetParent.layout ? offsetParent.layout.pos.x : offsetParent.offsetLeft);
                pos.y = dom.offsetTop + (offsetParent.layout ? offsetParent.layout.pos.y : offsetParent.offsetTop);
            } else {
                pos.x = dom.offsetLeft;
                pos.y = dom.offsetTop;
            }

            const isScrollX = (dom.scrollWidth - dom.clientWidth);
            const isScrollY = (dom.scrollHeight - dom.clientHeight);

            /*
                1. 사용이유
                    - getBoundingClientRect를 사용하는 이유 -> inline 요소의 width, height값을 확인하기 위함
            */
            pos.width = (isScrollX ? dom.scrollWidth : rect.width);
            pos.height = (isScrollY ? dom.scrollHeight : rect.height);

        } catch (err) {
            console.log(err);
        }
    }

    initCss() {
        try {
            const classList = this.dom.classList;
            classList.remove('hb_border-contain');
            classList.remove('hb_border-top-contain');
            classList.remove('hb_border-top-move');
            classList.remove('hb_border-bottom-move');
            classList.remove('hb_border-left-move');
            classList.remove('hb_border-right-move');
        } catch (err) {
            console.log(err);
        }
    }

    get property() {
        const dom = this.dom;

        try {
            const property = {};

            property.id = (dom.id || null);
            property.name = (dom.getAttribute('name') || null);
            property.title = (dom.title || null);

            if (dom.firstChild) {
                if (dom.firstChild.nodeType === Node.TEXT_NODE) {
                    property.text = dom.firstChild.textContent;
                } else {
                    property.text = null;
                }
            } else {
                property.text = null;
            }

            if (dom.nodeName === 'INPUT' || dom.nodeName === 'TEXTAREA') {
                property.value = (dom.value || '');
            } else {
                property.value = (dom.getAttribute('value') || '');
            }

            if (dom.nodeName === 'IMG') {
                property.src = (dom.getAttribute('src') || '');
            }

            if (dom.nodeName === 'A') {
                property.href = (dom.getAttribute('href') || '');
            }

            property.class = [];
            for (let i = 0, len = dom.classList.length; i < len; i++) {
                if (dom.classList[i].indexOf('hb_selectable') === -1 && dom.classList[i].indexOf('hb_selected') === -1) {
                    property.class.push(dom.classList[i]);
                }
            }

            property.option = [];
            if (dom.options) {
                for (let i = 0, len = dom.options.length; i < len; i++) {
                    property.option.push({
                        text: dom.options[i].text,
                        value: dom.options[i].value
                    });
                }
            }

            property.style = {};
            const domStyle = dom.style;

            //Group Property padding, margin, border-width, border-color, border-style
            const groupProperty = {};
            groupProperty['padding'] = {
                checkSum: 0,
                value: null,
                group: true
            };
            groupProperty['margin'] = {
                checkSum: 0,
                value: null,
                group: true
            };
            groupProperty['border-width'] = {
                checkSum: 0,
                value: null,
                group: true
            };
            groupProperty['border-color'] = {
                checkSum: 0,
                value: null,
                group: true
            };
            groupProperty['border-style'] = {
                checkSum: 0,
                value: null,
                group: true
            };

            var direction = ['-left', '-right', '-top', '-bottom'];

            var i, len, groupName, propertyName, propertyValue;
            for (i = 0, len = domStyle.length; i < len; i++) {
                propertyName = domStyle.item(i);
                propertyValue = domStyle[propertyName];

                groupName = propertyName.split(/-left|-right|-top|-bottom/);
                groupName = groupName[0] + groupName[1];

                if (groupProperty[groupName]) {
                    if (groupProperty[groupName].checkSum === 0) {
                        groupProperty[groupName].value = propertyValue;
                    } else {
                        if (groupProperty[groupName].value !== propertyValue) {
                            groupProperty[groupName].group = false;
                        }
                    }

                    groupProperty[groupName].checkSum++;
                }

                if (propertyName.indexOf('color') != -1) {
                    property.style[propertyName] = Utils.rgb2Hex(propertyValue);
                } else {
                    property.style[propertyName] = propertyValue;
                }
            }

            for (key in groupProperty) {
                if (groupProperty[key].checkSum === 4 && groupProperty[key].group) {
                    if (key.indexOf('color') != -1) {
                        property.style[key] = Utils.rgb2Hex(groupProperty[key].value);
                    } else {
                        property.style[key] = groupProperty[key].value;
                    }

                    /*group화 할 시 사용
                    groupName = key.split('-');
                    for (i = 0, len = direction.length; i < len; i++) {
                        propertyName = ((groupName.length > 1) ? (groupName[0] + direction[i] + '-' + groupName[1]) : (groupName[0] + direction[i]));
                        property.style[propertyName] = null;
                    }
                    */
                }
            }

            return property;
        } catch (err) {
            console.log(err.message);
        }
    }

    copy() {
        function copyRecursive(parentDom) {
            const option = parentDom.layout.getOption();
            const copiedLayout = new Layout(option);
            const children = [...parentDom.children];

            for (let child of children) {
                copiedLayout.dom.appendChild(copyRecursive(child));
            }

            return copiedLayout.dom;
        }

        const copiedLayoutDom = copyRecursive(this.dom);
        this.dom.parentNode.appendChild(copiedLayoutDom);
    };

    delete() {
        function deleteRecursive(parentDom) {
            /*
                1. 사용이유
                 -  순환참조로 인하여 dom이 삭제되도 layout에서 참조되어 메모리에서
                    삭제되지 않을까봐 layout부터 null로 처리한다.
            */
            const children = [...parentDom.children];

            for (let child of children) {
                deleteRecursive(child);
            }

            parentDom.layout = null;
        }

        const dom = this.dom;
        const parent = this.dom.parentNode;
        deleteRecursive(dom);
        parent.removeChild(this.dom);
    }
}


const LayoutDiv1 = new Layout({
    element: 'div',
    attr: {
        style: 'width:100px; height:100px; padding:20px; margin:20px; border: 1px solid #dddddd'
    }
});

const LayoutDiv2 = new Layout({
    element: 'div',
    attr: {
        style: 'width:30px; height:30px; padding:20px; margin:20px; border: 1px solid #dddddd'
    }
});

const LayoutSpan = new Layout({
    element: 'span',
    text: 'text'
});

document.body.appendChild(LayoutDiv1.dom);
LayoutDiv1.dom.appendChild(LayoutDiv2.dom);
LayoutDiv2.dom.appendChild(LayoutSpan.dom);