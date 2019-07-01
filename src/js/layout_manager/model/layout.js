class Layout {
    constructor() {
        this._info = {
            layoutId: null,
            parentLayoutId: null,
            elementType: null
        };

        this._pos = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        this._child = [];
        this._prop = null;

        this._dom = null;
    };

    set info(_info) {
        this._info = _info;
    };

    get info() {
        return this._info;
    };

    set pos(_pos) {
        this._pos = _pos;
    };

    get pos() {
        return this._pos;
    };

    set child(_child) {
        this._child = _child;
    };

    get child() {
        return this._child;
    };

    set prop(_prop) {
        this._prop = _prop;
    };

    get prop() {
        return this._prop;
    }

    set dom(_dom) {
        this._dom = _dom;
        this.updateProp(_dom);
    };

    get dom() {
        return this._dom;
    }

    initCss() {
        try {
            var dom = this._dom;
            if (dom) {
                dom.classList.remove('hb_border-contain');
                dom.classList.remove('hb_border-top-contain');
                dom.classList.remove('hb_border-top-move');
                dom.classList.remove('hb_border-bottom-move');
                dom.classList.remove('hb_border-left-move');
                dom.classList.remove('hb_border-right-move');
            }
        } catch (err) {
            console.log(err);
        }
    };

    contain(x, y) {
        try {
            if (this._info.elementType !== 'div') {
                return false;
            }

            var pos = this._pos;

            if (pos.x <= x && x <= (pos.x + pos.width) &&
                pos.y <= y && y <= (pos.y + pos.height)) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    };

    copy() {
        var copiedLayout = new Layout();
        copiedLayout._info.layoutId = this._info.layoutId;
        copiedLayout._info.parentLayoutId = this._info.parentLayoutId;
        copiedLayout._info.elementType = this._info.elementType;

        copiedLayout._pos.x = this._pos.x;
        copiedLayout._pos.y = this._pos.y;
        copiedLayout._pos.width = this._pos.width;
        copiedLayout._pos.height = this._pos.height;

        copiedLayout._prop.prop = this._prop.prop;
        copiedLayout._prop.style = this._prop.style;
        copiedLayout._prop.class = this._prop.class;
        return copiedLayout;
    };

    updateProp(dom) {
        if(!dom) {
            dom = this.dom;
        }

        try {
            var prop = this.prop;
            prop.id = (dom.id ? dom.id : null);
            prop.name = (dom.getAttribute('name') ? dom.getAttribute('name') : null);
            prop.title = (dom.title ? dom.title : null);

            if (dom.firstChild) {
                if (dom.firstChild.nodeType == Node.TEXT_NODE) {
                    prop.text = dom.firstChild.textContent;
                } else {
                    prop.text = null;
                }
            } else {
                prop.text = null;
            }

            if (dom.nodeName == 'INPUT' || dom.nodeName == 'TEXTAREA') {
                prop.value = (dom.value ? dom.value : '');
            } else {
                prop.value = (dom.getAttribute('value') ? dom.getAttribute('value') : '');
            }

            if (dom.nodeName == 'IMG') {
                prop.src = (dom.getAttribute('src') ? dom.getAttribute('src') : '');
            }

            if (dom.nodeName == 'A') {
                prop.href = (dom.getAttribute('href') ? dom.getAttribute('href') : '');
            }

            prop.class = [];
            for (var i = 0, len = dom.classList.length; i < len; i++) {
                if (dom.classList[i].indexOf('hb_selectable') == -1 && dom.classList[i].indexOf('hb_selected') == -1) {
                    prop.class.push(dom.classList[i]);
                }
            }

            prop.style = {};
            var domStyle = dom.style;

            //Group Property padding, margin, border-width, border-color, border-style
            var groupProperty = {};
            groupProperty['padding'] = { checkSum: 0, value: null, group: true };
            groupProperty['margin'] = { checkSum: 0, value: null, group: true };
            groupProperty['border-width'] = { checkSum: 0, value: null, group: true };
            groupProperty['border-color'] = { checkSum: 0, value: null, group: true };
            groupProperty['border-style'] = { checkSum: 0, value: null, group: true };

            var direction = ['-left', '-right', '-top', '-bottom'];

            var i, len, groupName, propertyName, propertyValue;
            for (i = 0, len = domStyle.length; i < len; i++) {
                propertyName = domStyle.item(i);
                propertyValue = domStyle[propertyName];

                groupName = propertyName.split(/-left|-right|-top|-bottom/);
                groupName = groupName[0] + groupName[1];

                if (groupProperty[groupName]) {
                    if (groupProperty[groupName].checkSum == 0) {
                        groupProperty[groupName].value = propertyValue;
                    } else {
                        if (groupProperty[groupName].value != propertyValue) {
                            groupProperty[groupName].group = false;
                        }
                    }

                    groupProperty[groupName].checkSum++;
                }

                prop.style[propertyName] = propertyValue;
            }

            for (key in groupProperty) {
                if (groupProperty[key].checkSum == 4 && groupProperty[key].group) {
                    prop.style[key] = groupProperty[key].value;

                    if (group) {
                        groupName = key.split('-');
                        for (i = 0, len = direction.length; i < len; i++) {
                            propertyName = ((groupName.length > 1) ? (groupName[0] + direction[i] + '-' + groupName[1]) : (groupName[0] + direction[i]));
                            prop.style[propertyName] = null;
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};

module.exports = Layout;