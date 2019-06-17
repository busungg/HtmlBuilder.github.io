const CSS = require('../config/css');

var propertyText = {
  setProperty: function (prop) {
    this.prop = {};

    this.prop.name = prop.name;
    this.prop.title = prop.title;
    this.prop.attr_type = prop.attr_type;
    this.prop.category = prop.category;
  },

  setDom: function (dom) {
    this.dom = dom;
  },

  setSelected: function (selected) {
    this.selected = selected;
  },

  callback: function (callback) {
    this.callback = callback;
  },

  event: {
    type: 'change',
    func: function (e) {
      if (propertyText.selected) {
        var eventDom = e.target;

        if (eventDom.value) {
          propertyText.selected.setAttribute(propertyText.prop.name, eventDom.value);
        } else {
          propertyText.selected.removeAttribute(propertyText.prop.name);
        }

        if (propertyText.callback && typeof propertyText.callback === 'function') {
          propertyText.callback();
        }
      }
    }
  },

  render: function () {
    var event = this.event;
    var prop = this.prop;

    return {
      element: 'div',
      attr: {
        class: CSS.prop_body_div
      },
      child: [{ //div for title
          element: 'div',
          attr: {
            class: CSS.prop_body_title_div
          },
          child: [{
            element: 'label',
            attr: {
              class: CSS.prop_body_title_label
            },
            text: prop.title
          }]
        },

        { //div for property set
          element: 'div',
          attr: {
            class: CSS.prop_body_set_div
          },
          child: [{
            element: 'input',
            attr: {
              type: 'text',
              class: CSS.prop_body_set_text,
              hb_set_type: 'value'
            },
            event: [event]
          }]
        }
      ]
    };
  },

  update : function() {

  }
};

module.exports = propertyText;