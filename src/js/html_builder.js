(
  function(root, factory) {
    //Initialize
    root.HtmlBuilder = factory(root);

  } (typeof window !== 'undefined' ? window : this, function(win) {
      //HtmlBuilder
      var HtmlBuilder = {}; 
      
      //Utils
      var Utils = {}; 
      
      //Default Setting
      var Options = {
        /*
          Content Id
        */
        HB_CONTENT_DIV_ID: '!content',
        HB_MENU_DIV_ID: '!menu',

        /*
          Block ATTR
          1. attr
          2. style
          3. layout
        */
        HB_ATTR_ID: 'hb_attr_id',
        HB_ATTR_TYPE: 'hb_attr_type',
        HB_ATTR_TYPE_OPTION: {
          add: 'add',
          delete: 'delete',
          save: 'save',
          select: 'select',
          text: 'text'
        },

        HB_STYLE_ID: 'hb_style_id',
        HB_STYLE_TYPE: 'hb_style_type',
        HB_STYLE_TYPE_OPTION: {
          units: 'units',
          select: 'select',
          text: 'text',
          color: 'color'
        },
        HB_LAYOUT_ID: 'hb_layout_id',

        /*
          1. block 종류
            - Basic
            1) Div
            2) P
            
            - Forms
            1) Input(Text)
            2) Input(Number)
            3) Text Area
            4) Link
            5) Image
            6) Select
            7) Button
            8) Label
            9) Checkbox
            10) Radio
        */
        blocks: [
          {
            title: 'Div',
            element: 'div',
            attrs: {
              class: ['hb_half', 'hb_border-basic', 'hb_padding-10px', 'hb_margin-10px']  
            },
            icon: 'hb_btn-div'
          },
          {
            title: 'P',
            element: 'p',
            attrs: {
              class: ['hb_border-basic']  
            },
            text: 'P element text',
            icon: 'hb_btn-p'
          },
          {
            title: 'Input (Text)',
            element: 'input',
            attrs: {
              type: 'text',
              class: ['hb_border-basic']
            },
            icon: 'hb_btn-input'
          },
          {
            title: 'Input (Number)',
            element: 'input',
            attrs: {
              type: 'number',
              class: ['hb_border-basic']  
            },
            icon: 'hb_btn-input'
          },
          {
            title: 'Text Area',
            element: 'textarea',
            attrs: {
              class: ['hb_border-basic']  
            },
            icon: 'hb_btn-text-area'
          },
          {
            title: 'Link',
            element: 'a',
            attrs: {
              class: ['hb_border-basic'],
              target: '_blank'
            },
            text: 'A element text',
            icon: 'hb_btn-link'
          },
          {
            title: 'Image',
            element: 'img',
            attrs: {
              class: ['hb_half', 'hb_border-basic']  
            },
            icon: 'hb_btn-img'
          },
          {
            title: 'Select',
            element: 'select',
            attrs: {
              class: ['hb_half', 'hb_border-basic']  
            },
            icon: 'hb_btn-select'
          },
          {
            title: 'Button',
            element: 'button',
            attrs: {
              class: ['hb_border-basic']  
            },
            text: 'Button element text',
            icon: 'hb_btn-button'
          },
          {
            title: 'Label',
            element: 'label',
            attrs: {
              class: ['hb_border-basic']  
            },
            text: 'Label element text',
            icon: 'hb_btn-label'
          },
          {
            title: 'Checkbox',
            element: 'input',
            attrs: {
              type: 'checkbox',
              class: ['hb_border-basic'],
              style: 'width:15px; height:15px;'
            },
            icon: 'hb_btn-check-box'
          },
          {
            title: 'Radio',
            element: 'input',
            attrs: {
              type: 'radio',
              class: ['hb_border-basic'],  
              style: 'width:15px; height:15px;'
            },
            icon: 'hb_btn-radio'
          }
        ],

        /*
          1. list
            1) User Preset 저장용도
        */
        attr: [
          {
            name:'id',
            title:'Id',
            type: 'text',
            multiple: false,
            list: false
          },
          {
            name:'name',
            title:'Name',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name:'title',
            title:'Title',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name:'text',
            title:'Text',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name:'value',
            title:'Value',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name: 'src',
            title: 'Src',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name: 'href',
            title: 'Href',
            type: 'text',
            multiple: false,
            list: false
          },

          {
            name:'class',
            title:'Class',
            type: 'text',
            multiple: true,
            list: false
          }
        ],

        /* 
          1. style content
            1. display
            2. positon - top, bottom, left, right
            3. float
            4. width, height
            5. margin - top, bottom, left, right
            6. padding - top, bottom, left, right
            7. font - color, font-weight
            8. border
            10. background 
            11. background image
          
          2. stye category
            1. position
            2. size
            3. font
            4. border
            5. background
        */

        style_category: [
          {
            name: 'position',
            title: 'Position'
          },

          {
            name: 'size',
            title: 'Size'
          },

          {
            name: 'font',
            title: 'Font'
          },

          {
            name: 'border',
            title: 'Border'
          },

          {
            name: 'background',
            title: 'Background'
          }
        ],

        style: [
          //Display
          {
            name: 'display',
            title: 'Display',
            type: 'select',
            options: ['', 'block', 'inline', 'inline-block', 'none'],
            units: [],
            category: 'position'
          },

          //Position
          {
            name: 'position',
            title: 'Position',
            type: 'select',
            options: ['', 'static', 'relative', 'fixed', 'absolute', 'sticky'],
            units: [],
            category: 'position'
          },

          {
            name: 'left',
            title: 'Left',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'position'
          },

          {
            name: 'right',
            title: 'Right',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'position'
          },

          {
            name: 'top',
            title: 'Top',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'position'
          },

          {
            name: 'bottom',
            title: 'Bottom',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'position'
          },

          //Float
          {
            name: 'float',
            title: 'Float',
            type: 'text',
            units: [],
            category: 'position'
          },

          //Width, Height
          {
            name: 'width',
            title: 'Width',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'size'
          },

          {
            name: 'height',
            title: 'Height',
            type: 'text',
            units: ['px', '%', 'cm', 'mm', 'in'],
            category: 'size'
          },

          //Margin
          {
            name: 'margin',
            title: 'Margin',
            type: 'text',
            units: ['px', 'cm', 'mm', 'in'],
            category: 'size',
            sub_category: [
              {
                name: 'margin-top',
                title: 'Margin Top',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'margin-bottom',
                title: 'Margin bottom',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'margin-left',
                title: 'Margin Left',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'margin-right',
                title: 'Margin Right',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              }
            ]
          },

          //Padding
          {
            name: 'padding',
            title: 'Padding',
            type: 'text',
            units: ['px', 'cm', 'mm', 'in'],
            category: 'size',
            sub_category: [
              {
                name: 'padding-top',
                title: 'Padding Top',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'padding-bottom',
                title: 'Padding Bottom',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'padding-left',
                title: 'Padding Left',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              },

              {
                name: 'padding-right',
                title: 'Padding Right',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'size'
              }
            ]
          },

          //Font
          {
            name: 'color',
            title: 'Color',
            type: 'color',
            units: [],
            category: 'font'
          },

          {
            name: 'font-weight',
            title: 'Font weight',
            type: 'select',
            options: ['', 'normal', 'bold', 'bolder', 'lighter', 'initial', 'inherit'],
            units: [],
            category: 'font'
          },

          //Border
          {
            name: 'border-width',
            title: 'Border width',
            type: 'text',
            units: ['px', 'cm', 'mm', 'in'],
            category: 'border',
            sub_category: [
              {
                name: 'border-left-width',
                title: 'Border left width',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'border'
              },

              {
                name: 'border-right-width',
                title: 'Border right width',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'border'
              },

              {
                name: 'border-top-width',
                title: 'Border top width',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'border'
              },

              {
                name: 'border-bottom-width',
                title: 'Border bottom width',
                type: 'text',
                units: ['px', 'cm', 'mm', 'in'],
                category: 'border'
              }
            ]
          },

          {
            name: 'border-color',
            title: 'Border color',
            type: 'color',
            units: [],
            category: 'border',
            sub_category: [
              {
                name: 'border-left-color',
                title: 'Border left color',
                type: 'color',
                units: [],
                category: 'border'
              },

              {
                name: 'border-right-color',
                title: 'Border right color',
                type: 'color',
                units: [],
                category: 'border'
              },

              {
                name: 'border-top-color',
                title: 'Border top color',
                type: 'color',
                units: [],
                category: 'border'
              },

              {
                name: 'border-bottom-color',
                title: 'Border bottom color',
                type: 'color',
                units: [],
                category: 'border'
              }
            ]
          },

          {
            name: 'border-style',
            title: 'Border style',
            type: 'select',
            options: ['', 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
            units: [],
            category: 'border',
            sub_category: [
              {
                name: 'border-left-style',
                title: 'Border left style',
                type: 'select',
                options: ['', 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
                units: [],
                category: 'border'
              },

              {
                name: 'border-right-style',
                title: 'Border right style',
                type: 'select',
                options: ['', 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
                units: [],
                category: 'border'
              },

              {
                name: 'border-top-style',
                title: 'Border top style',
                type: 'select',
                options: ['', 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
                units: [],
                category: 'border'
              },

              {
                name: 'border-bottom-style',
                title: 'Border bottom style',
                type: 'select',
                options: ['', 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'],
                units: [],
                category: 'border'
              }
            ]
          },

          //Background
          {
            name:'background',
            title:'background',
            type: 'text',
            units: [],
            category: 'background'
          },

          {
            name:'background-color',
            title:'background-color',
            type: 'color',
            units: [],
            category: 'background'
          },
          
          //Background Image
          {
            name:'background-image',
            title:'background-image',
            type: 'text',
            units: [],
            category: 'background'
          },
          
          {
            name:'background-repeat',
            title:'background-repeat',
            type: 'select',
            options: ['', 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'],
            units: [],
            category: 'background'
          },
          
          {
            name:'background-size',
            title:'background-size',
            type: 'select',
            options: ['', 'auto', 'cover', 'contain'],
            units: [],
            category: 'background'
          }
        ]
      };

      /** 
      * Utils
      * Control Layout, Events
      * 
      **/
      (function(U, O) {
        /**
        * Content Layout has every child layout (Content Layout은 모든 layout의 부모 layout이다.)
        * Don't change Content Layout(Content Layout은 변경이 되면 안된다)
        * @param  null
        * @public 
        **/
        U.contentLayout = null;
        U.newLayout = null;
        U.selectedLayout = null;
        U.idIdx = 0;

        U.blockDefaultEvents = [
            {
              type: 'mouseover',
              func: function(e) {
                U.selectableBlock(e);
                e.stopPropagation();
              }
            },
            {
              type: 'mouseout',
              func: function(e) {
                U.selectableBlock(e);
                e.stopPropagation();
              }
            },
            {
              type: 'click',
              func: function(e) {
                U.selectBlock(e);
                U.setFunctionBlock();
                U.setBlockAttr();
                U.setBlockStyle();
                e.stopPropagation();
              }
            },
            {
              type: 'drag',
              func: function(e) {
                U.moveBlock(e); 
                e.stopPropagation();
              }
            },
            {
              type: 'dragend',
              func: function(e) {
                U.setBlock();
                U.setFunctionBlock();
                U.draggableMenuBlock(true);
                e.stopPropagation();
              }
            }
        ];

        /* ---------------------------------- Element --------------------------------------*/
        U.getQueryOption = function() {
          var option = {};

          try {
            for(var i = 0, len = arguments.length; i < len; i+=2) {
              option[arguments[i]] = arguments[i + 1];  
            }
          } catch(err) {
            console.log(err.message);
          }

          return option;
        }

        U.getElementByAttribute = function(options) {
          var query = '';
          for(var key in options) {
            query += ('[' + key + '="' + options[key] + '"]');
          }

          return document.querySelector(query);
        };

        U.getElementsByAttribute = function(options) {
          //attrName, attrValue
          //'[' + attrName + "='" + attrValue + "']"

          var query = '';
          for(var key in options) {
            query += ('[' + key + '="' + options[key] + '"]');
          }

          return document.querySelectorAll(query);
        };


        /* ----------------------------------Layout --------------------------------------*/

        /**
        * Layout Class - Layout will control block
        * For Event
        * @param  null
        * @public 
        */
        function Layout() {
          this.id = null;
          this.parentLayoutId = null;
          this.element = null;
          this.x = 0;
          this.y = 0;
          this.width = 0;
          this.height = 0;
          this.child = [];
        };

        /**
        *  Inititialize layout block css(css 초기화)
        **/
        Layout.prototype.initCss = function() {
          try {
            var dom = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, this.id));

            dom.classList.remove('hb_border-contain');
            dom.classList.remove('hb_border-top-contain');
            dom.classList.remove('hb_border-top-move');
            dom.classList.remove('hb_border-bottom-move');
            dom.classList.remove('hb_border-left-move');
            dom.classList.remove('hb_border-right-move');
          } catch (err) {
            console.log(err.message);
          }
        };

        /**
        * Check layout contain
        * @param {double} x
        * @param {double} y
        *
        * @return true or false
        **/
        Layout.prototype.contain = function(x, y) {
          if(this.x <= x && x <= (this.x + this.width) &&
              this.y <= y && y <= (this.y + this.height)) {
            return true;
          } else {
            return false;
          }
        };


        /**
        * Get copied layout
        *
        * @return {Object} Layout
        **/
        Layout.prototype.copy = function() {
          var copiedLayout = new Layout();
          copiedLayout.id = this.id;
          copiedLayout.parentLayoutId = this.parentLayoutId;
          copiedLayout.element = this.element;
          copiedLayout.x = this.x;
          copiedLayout.y = this.y;
          copiedLayout.width = this.width;
          copiedLayout.height = this.height;
          copiedLayout.child = [];

          return copiedLayout;
        };

        /**
        * Get layout block
        *
        * @return {Object} dom
        **/
        Layout.prototype.getBlock = function() {
          return U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, this.id));
        };

        /* ----------------------------------Layout Controller --------------------------------------*/
        
        /**
        * Layout Controller(Layout을 관리한다)
        * Only one Controller(오직 하나의 Controller만 존재한다)
        **/        
        var LayoutController = {};

        /**
        * Find layout that has same id(id에 해당하는 layout을 return)
        * @param {string} layout id
        * @param {Object(layout)} layout
        *
        * @return Object
        **/
        LayoutController.selectLayout = function (id, layout) {
          try {
            var selectedLayout = null;

            if(id == layout.id) {
              return layout;
            } else {
              for(var i = 0, len = layout.child.length; i < len; i++) {
                if(selectedLayout = LayoutController.selectLayout(id, layout.child[i])) {
                  return selectedLayout;
                }
              }

              return null;
            }            
          } catch(err) {
            console.log(err.message);
          }
        };

        /**
        * Update layout - Width, Height, X, Y, Etc...
           (
            1. Parent layout 입력 받아서 모든 Child의 layout을 재조정
            2. 기존 작성된 HTML Import 고려 필요
            3. offsetLeft offsetTop은 자기자신의 부모 위치를 시작점으로 정함
              - margin
              - padding
            4. resizing 될때 update 필요
           )
        *
        *@param {Object(layout)}
        **/
        LayoutController.updateLayout = function(layout) {
          try {
            if(layout) {
              var child = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, layout.id));
              var childRect = child.getBoundingClientRect();
              var style = window.getComputedStyle(child);
              
              if(style.position === 'relative') {
                if(layout.parentLayoutId != null) {
                  var parentLayout = LayoutController.selectLayout(layout.parentLayoutId, U.contentLayout);    
                  layout.x = (child.offsetLeft ? (child.offsetLeft + parentLayout.x) : parentLayout.x);
                  layout.y = (child.offsetTop ? (child.offsetTop + parentLayout.y) : parentLayout.y);
                  layout.width = (child.scrollWidth ? child.scrollWidth : childRect.width);
                  layout.height = (child.scrollHeight ? child.scrollHeight : childRect.height);
                } else {
                  layout.x = (child.offsetLeft ? child.offsetLeft  : childRect.left);
                  layout.y = (child.offsetTop ? child.offsetTop : childRect.top);
                  layout.width = (child.scrollWidth ? child.scrollWidth : childRect.width);
                  layout.height = (child.scrollHeight ? child.scrollHeight : childRect.height);
                }
              } else {
                layout.x = (child.offsetLeft ? child.offsetLeft : childRect.left);
                layout.y = (child.offsetTop ? child.offsetTop : childRect.top);
                layout.width = (child.scrollWidth ? child.scrollWidth : childRect.width);
                layout.height = (child.scrollHeight ? child.scrollHeight : childRect.height);
              }

              for(var i = 0, len = layout.child.length; i < len; i++) {
                LayoutController.updateLayout(layout.child[i]);
              }
            }
          } catch(err) {
            console.log(err.message);
          }
        };

        /**
        * Add child layout to parent layout (parent layout에 child layout 추가)
        *
        *@param {Object(layout)}
        *@param {Object(layout)}
        *@param {number}
        **/
        LayoutController.addLayout = function(parent, child, position) {
          var parentLayout, childLayout;

          if(typeof parent === 'string') {
            parentLayout = LayoutController.selectLayout(parent, U.contentLayout);
          } else {
            parentLayout = parent;
          }

          if(typeof child === 'string') {
            childLayout = LayoutController.selectLayout(child, U.contentLayout);
          } else {
            childLayout = child;
          }

          childLayout.parentLayoutId = parentLayout.id;

          parentLayout.child.splice(position, 0, childLayout);
        };

        /**
        * Delete child layout in parent layout (parent layout에 child layout 삭제)
        *
        *@param {Object(layout)}
        *@param {Object(layout)}
        **/
        LayoutController.deleteLayout = function(parent, child) {
          var parentLayout, childLayout;

          if(typeof parent === 'string') {
            parentLayout = LayoutController.selectLayout(parent, U.contentLayout);
          } else {
            parentLayout = parent;
          }

          if(typeof child === 'string') {
            childLayout = LayoutController.selectLayout(child, U.contentLayout);
          } else {
            childLayout = child;
          }
          
          for(var i = 0, len = parentLayout.child.length; i < len; i++) {
              if(parentLayout.child[i].id == childLayout.id) {
                  parentLayout.child.splice(i, 1);
                  break;
              }
          }
        };
 
        /* ----------------------------------Utils --------------------------------------*/
        U.initContentLayout = function(id, contentRect) {
          try {
            U.contentLayout = new Layout();
            U.contentLayout.id = id;
            U.contentLayout.element = 'div';
            U.contentLayout.x = contentRect.left;
            U.contentLayout.y = contentRect.top;
            U.contentLayout.width = contentRect.width;
            U.contentLayout.height = contentRect.height;  
          } catch(err) {
            console.log(err.message);
          }
          
        };

        U.updateLayout = function(layout) {
          LayoutController.updateLayout(layout);
        };
        
        /**
          Create dom with option (dom을 생성하는 function)
          @param {Object}
            {
              element : document.createElement(element),
              attr : {
                type - document.setAttribute("type", type);
                class - document.setAttribute("class", class);
                id - document.setAttribute("id", id);
                name - document.setAttribute("name", name);
                value: "" 
              },
              text: '',
              html: '',
              event: [{
                type: '',
                func: ''
              }]
              child : []
            }
        **/
        U.builder = function(option) {
          try {
            var parent = document.createElement(option.element);
            
            for(key in option.attr) {
              if(option.attr[key] != null && option.attr[key] != undefined) {

                if(Array.isArray(option.attr[key])) {
                  var values = '';
                  for(keyArray in option.attr[key]) {
                    values += (option.attr[key][keyArray] + ' ');
                  }

                  parent.setAttribute(key, values);
                } else {
                  parent.setAttribute(key, option.attr[key]);
                }
              }
            }

            if(option.text) {
              parent.appendChild(document.createTextNode(option.text));
            }

            if(option.html) {
              parent.innerHTML = option.html;
            }

            if(option.event) {
              for(var i = 0, len = option.event.length; i< len; i++) {
                parent.addEventListener(option.event[i].type, option.event[i].func);
              }
            }

            if(option.child) {
              for(var i = 0, len = option.child.length; i < len; i++) {
                parent.appendChild(U.builder(option.child[i]));  
              }
            }

            return parent;
          } catch(err) {
            console.log(err.message);
          }
        };

        U.initCss = function(layout) {
          layout.initCss();

          for(var i = 0, len = layout.child.length; i < len; i++) {
            U.initCss(layout.child[i]);
          }
        };

        /**
          Check contain block
          1. Block 포함 확인
          2. Tree 구조 사용
            - parent에 속하지 않으면 parent의 child 쪽은 확인 할 필요 없음
          3. 중위 순회
        **/
        U.containBlock = function(x, y, layout) {
          try {
            if(U.selectedLayout && U.selectedLayout.id == layout.id) {
                return null;
            }

            var containLayout = null;
            if(layout.contain(x,y)) {
              containLayout = layout;
              
              if(layout.child.length == 0) {
                return containLayout;
              }

              var childLayout = null;
              for(var i = 0, len = layout.child.length; i < len; i++) {
                childLayout = U.containBlock(x, y, layout.child[i]);
                if(childLayout) {
                  containLayout = childLayout;
                  break;
                }
              }
            }
            
            return containLayout;
          } catch(err) {
            console.log(err.message);
          }
        };

        /**
          Check move block
          1. Block 위치 확인
           - Block 위치 Preview 제공 (Border)
           - Contain 확인 필요
           - 위치 Outline 확인 필요
          2. Block 포함 확인
          3. Selected layout이 존재할때 Move는?
        **/
        U.moveBlock = function (e) {
          try {
            U.initCss(U.contentLayout);
            
            if(e.clientX == 0 && e.clientY == 0) {
              return;
            }
            
            var body = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.contentLayout.id)),
                x = e.clientX + body.scrollLeft,
                y = e.clientY + body.scrollTop,
                parentLayout = U.containBlock(x, y, U.contentLayout);

            if(parentLayout) {
              U.newLayout = {
                parentLayoutId: parentLayout.id,
                selectedLayoutId: (U.selectedLayout ? U.selectedLayout.id : null),
                posIdx: 0,
                blockTypeIdx: (e.target.attributes['typeIdx'] ? e.target.attributes['typeIdx'].value : null)
              };

              var parent = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, parentLayout.id));
              parent.classList.add('hb_border-contain');

              if(parentLayout.child.length > 0) {
                var nearLayout, layoutPos = 0, minDistance = Infinity, distance = 0;
                for(var i = 0, len = parentLayout.child.length; i < len; i++) {
                  distance = Math.sqrt(
                    Math.pow(x - (parentLayout.child[i].x + parentLayout.child[i].width * 0.5) ,2) +
                    Math.pow(y - (parentLayout.child[i].y + parentLayout.child[i].height * 0.5) ,2)
                  );

                  if(minDistance > distance) {
                    minDistance = distance;
                    nearLayout = parentLayout.child[i];
                    layoutPos = i;
                  }
                }

                var child = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, nearLayout.id));
                if(nearLayout.y < y && (nearLayout.y + nearLayout.height) > y) {
                  if(nearLayout.x > x) {
                    child.classList.add('hb_border-left-move');
                    U.newLayout.posIdx = ((layoutPos - 1) < 0) ? 0 : layoutPos;
                  } else {
                    child.classList.add('hb_border-right-move');
                    U.newLayout.posIdx = layoutPos + 1;
                  }
                } else {
                  if(nearLayout.y > y) {
                    child.classList.add('hb_border-top-move');
                    U.newLayout.posIdx = ((layoutPos - 1) < 0) ? 0 : layoutPos;
                  } else {
                    child.classList.add('hb_border-bottom-move');
                    U.newLayout.posIdx = layoutPos + 1;
                  }
                }
              } else {
                parent.classList.add('hb_border-top-contain');
              }
            } else {
              U.newLayout = null;
            }
          } catch(err) {
            console.log(err.message);
          }
        };

        /**
          Set Block
          1. Block 이동 완료
          2. Block layout 업데이트 
        **/
        U.setBlock = function(e) {
          try {
            U.initCss(U.contentLayout);

            if(U.newLayout) {
              var parentLayout = LayoutController.selectLayout(U.newLayout.parentLayoutId, U.contentLayout);
              var parent = parentLayout.getBlock();
              
              if(!U.selectedLayout) { //Set new layout
                  var blockOption = O.blocks[U.newLayout.blockTypeIdx];
                  var newChildId = blockOption.element + '_' + U.idIdx;
                  
                  var _newChild = {
                    element: blockOption.element,
                    event: U.blockDefaultEvents
                  };
                  _newChild.attr = {};
                  for(var attrName in blockOption.attrs) {
                    _newChild.attr[attrName] = blockOption.attrs[attrName];
                  }
                  _newChild.attr[O.HB_LAYOUT_ID] = newChildId;
                  _newChild.text = (blockOption.text ? blockOption.text : null);
                  var newChild = U.builder(_newChild);

                  //posIdx
                  if(parentLayout.child[U.newLayout.posIdx]) {
                    if(U.contentLayout.id == parentLayout.id) {
                      parent.insertBefore(newChild, parent.children[U.newLayout.posIdx + 1]);
                    } else {
                      parent.insertBefore(newChild, parent.children[U.newLayout.posIdx]);
                    }
                  } else {
                    parent.appendChild(newChild);
                  }

                  var newChildLayout = new Layout();
                  newChildLayout.id = newChildId;
                  newChildLayout.parentLayoutId = parentLayout.id;
                  newChildLayout.element = blockOption.element;

                  LayoutController.addLayout(parentLayout, newChildLayout, U.newLayout.posIdx);
                  
                  U.idIdx++;
              } else {
                  LayoutController.deleteLayout(U.selectedLayout.parentLayoutId, U.selectedLayout.id);
                  LayoutController.addLayout(parentLayout, U.selectedLayout, U.newLayout.posIdx);

                  var selectedBlock = U.selectedLayout.getBlock();

                  if(parentLayout.child[U.newLayout.posIdx]){
                    if(U.contentLayout.id == parentLayout.id) {
                      parent.insertBefore(selectedBlock, parent.children[U.newLayout.posIdx + 1]);
                    } else {
                      parent.insertBefore(selectedBlock, parent.children[U.newLayout.posIdx]);
                    }
                    //parent.insertBefore(selectedBlock, parent.childNodes[U.newLayout.posIdx]);
                  } else {
                    parent.appendChild(selectedBlock);
                  }

                  selectedBlock.classList.remove('hb_selected');
                  selectedBlock.removeAttribute('draggable');
                  U.selectedLayout = null;
              }

              LayoutController.updateLayout(U.contentLayout);
            }

            U.showBlockAttr(false);
          } catch(err) {
            console.log(err.message);
          }
        };

        /*
          1. Block 선택 가능 확인
        */
        U.selectableBlock = function (e) {
          try {
            if(!U.selectedLayout) {
              if(e.type === 'mouseover') {
                e.target.classList.add('hb_selectable'); 
              } else if(e.type === 'mouseout'){
                e.target.classList.remove('hb_selectable');
              }
            }
          } catch(err) {
            console.log(err.message);
          }
        };

        /*
          1. Block 선택
        */
        U.selectBlock = function (e) {
          try {
            if(U.selectedLayout) {
              var selectedBlock = U.selectedLayout.getBlock();
              selectedBlock.classList.remove('hb_selected');
              selectedBlock.removeAttribute('draggable');

              if(U.selectedLayout.id == e.target.attributes[O.HB_LAYOUT_ID].value) {
                U.selectedLayout = null;
                U.draggableMenuBlock(true);
                return;

              } else {
                selectedBlock.classList.remove('hb_selectable');
              }
            }

            U.selectedLayout = LayoutController.selectLayout(e.target.attributes[O.HB_LAYOUT_ID].value, U.contentLayout);
            e.target.setAttribute('draggable', 'true');
            e.target.classList.add('hb_selected');
            e.target.classList.add('hb_selectable');

            U.draggableMenuBlock(false);
          } catch(err) {
            console.log(err.message);
          }
        };

        U.deleteBlock = function() {
          try {
            if(U.selectedLayout) {
              LayoutController.deleteLayout(U.selectedLayout.parentLayoutId, U.selectedLayout.id);
              U.selectedLayout.getBlock().remove();
              U.selectedLayout = null;
            }
          } catch(err) {
            console.log(err.message);
          }
        };

        U.copyBlock = function(parent, copy) {
          try {
            var parentLayout, copyLayout;

            if(typeof parent === 'string') {
              parentLayout = LayoutController.selectLayout(parent, U.contentLayout);
            } else {
              parentLayout = parent;
            }

            if(typeof copy === 'string') {
              copyLayout = LayoutController.selectLayout(copy, U.contentLayout);
            } else {
              copyLayout = copy;
            }

            if(parentLayout && copyLayout) {
              var copiedLayout = copyLayout.copy();
              copiedLayout.id = copiedLayout.element + '_' + U.idIdx;
              U.idIdx++;
              copiedLayout.child = [];
              copiedLayout.parentLayoutId = parentLayout.id;
              LayoutController.addLayout(parentLayout, copiedLayout, parentLayout.child.length);

              var parentBlock = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, parentLayout.id));
              var originalBlock = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, copyLayout.id));

              if(originalBlock.classList.contains('hb_selected')) {
                U.selectBlock({
                  target: originalBlock
                  });
              }

              if(originalBlock.classList.contains('hb_selectable')) {
                originalBlock.classList.remove('hb_selectable');
              }

              var _copiedBlock = {
                    element: copiedLayout.element,
                    attr: {
                      type: (originalBlock.attributes['type'] ? originalBlock.attributes['type'].value : null),
                      class: originalBlock.classList.value
                    },
                    event: U.blockDefaultEvents
                  };
              _copiedBlock.attr[O.HB_LAYOUT_ID] = copiedLayout.id;
              var copiedBlock = U.builder(_copiedBlock);
              parentBlock.appendChild(copiedBlock);

              for (var i = 0, len = copyLayout.child.length; i < len; i++) {
                  U.copyBlock(copiedLayout, copyLayout.child[i]);
              }
            }
          } catch (err) {
            console.log(err.message);
          }
        };
        
        /*
          1. Block 선택시 선택할 수 있는 Menu 제공
            1) Delete
            2) Copy - Copy 버튼 클릭시 Parent에 추가
        */
        U.setFunctionBlock = function() {
            try {
              var functionBlock = document.getElementsByClassName('hb_func-menu');
              if(U.selectedLayout) {
                var layout = LayoutController.selectLayout(U.selectedLayout.id, U.contentLayout);
                functionBlock[0].setAttribute('style', 'position: absolute; left: ' + layout.x + 'px; top: ' + (layout.y - 20) + 'px;');
              } else {
                functionBlock[0].setAttribute('style', 'position: absolute; left: 0px; top: -100px;');
              }
            } catch(err) {
              console.log(err.message);
            }
        };

        /*
          Show Attr Block
        */
        U.showBlockAttr = function(isShow) {
          if(isShow) {
            document.getElementById('#content-attr_block').style.display = 'block';
            document.getElementById('#content-attr_block_none').style.display = 'none';
          } else {
            document.getElementById('#content-attr_block').style.display = 'none';
            document.getElementById('#content-attr_block_none').style.display = 'block';
          }
        };

        /*
          1. Block 선택시 Block Attribute를 가져옴
            1) Id
            2) Name
            3) Title
            4) Class List
            5) Style
              1. Element.style
        */
        U.getBlockAttr = function() {
          try {
            var attrs = null;

            if(U.selectedLayout) {
              var block = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));

              attrs = {};
              attrs.id = (block.id ? block.id : '');
              attrs.name = (block.getAttribute('name') ? block.getAttribute('name') : '');
              attrs.title = (block.title ? block.title : '');
              if(block.firstChild) {
                if(block.firstChild.nodeType == Node.TEXT_NODE) {
                  attrs.text = block.firstChild.textContent;
                } else {
                  attrs.text = '';
                }
              } else {
                attrs.text = '';
              }

              /*
                Value
                1. input
                2. textarea
              */
              if(block.nodeName == 'INPUT' || block.nodeName == 'TEXTAREA') {
                attrs.value = (block.value ? block.value : '');
              } else {
                attrs.value = (block.getAttribute('value') ? block.getAttribute('value') : '');  
              }

              if(block.nodeName == 'IMG') {
                attrs.src = (block.getAttribute('src') ? block.getAttribute('src') : '');
              }

              if(block.nodeName == 'A') {
                attrs.href = (block.getAttribute('href') ? block.getAttribute('href') : '');
              }

              attrs.classList = [];
              for(var i = 0, len = block.classList.length; i < len; i++) {
                if(block.classList[i].indexOf('hb_selectable') == -1 && block.classList[i].indexOf('hb_selected') == -1) {
                  attrs.classList.push(block.classList[i]);  
                }
              }
            }

            return attrs;
            
          } catch(err) {
            console.log(err.message);
          }
        };

        U.setBlockAttr = function() {
          try {
            var attrs = U.getBlockAttr();

            if(attrs) {
              U.showBlockAttr(true);

              U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'id', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value = attrs.id;
              U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'name', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value = attrs.name;
              U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'title', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value = attrs.title;
              U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'text', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value = attrs.text;
              U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'value', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value = attrs.value;

              var srcAttr = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'src', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text));
              var hrefAttr = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'href', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text));

              if(attrs.src != undefined) {
                srcAttr.parentElement.parentElement.style.display = 'block';
                srcAttr.value = attrs.src;
              } else {
                srcAttr.parentElement.parentElement.style.display = 'none';
              }

              if(attrs.href != undefined) {
                hrefAttr.parentElement.parentElement.style.display = 'block';
                hrefAttr.value = attrs.href;
              } else {
                hrefAttr.parentElement.parentElement.style.display = 'none';
              }

              var classSelect = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, 'class', O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.select)), i = 0;

              for(i = classSelect.options.length - 1 ; i >= 0 ; i--)
              {
                  classSelect.remove(i);
              }

              var option;
              for(i = 0, len = attrs.classList.length; i < len; i++) {
                option = document.createElement('option');
                option.text = attrs.classList[i];
                option.value = attrs.classList[i];
                classSelect.add(option);
              }
            } else {
              U.showBlockAttr(false);
            }
          } catch(err) {
            console.log(err.message);
          }
        };

        /*
          1. Get style options 
        */
        U.getBlockStyle = function() {
          try {
            var styles = null;

            if(U.selectedLayout) {
              styles = {};

              var block = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));
              var blockStyles = block.style;

              //Group Property padding, margin, border-width, border-color, border-style
              var groupProperty = {};
              groupProperty['padding'] = {checkSum: 0, value: null, group: true};
              groupProperty['margin'] = {checkSum: 0, value: null, group: true};
              groupProperty['border-width'] = {checkSum: 0, value: null, group: true};
              groupProperty['border-color'] = {checkSum: 0, value: null, group: true};
              groupProperty['border-style'] = {checkSum: 0, value: null, group: true};

              var i, len, groupName, propertyName, propertyValue;
              for(i = 0, len = blockStyles.length; i < len; i++) {
                propertyName = blockStyles.item(i);
                propertyValue = blockStyles[propertyName];
                
                groupName = propertyName.split(/-left|-right|-top|-bottom/);
                groupName = groupName[0] + groupName[1];

                if(groupProperty[groupName]) {
                  if(groupProperty[groupName].checkSum == 0) {
                    groupProperty[groupName].value = propertyValue;
                  } else {
                    if(groupProperty[groupName].value != propertyValue) {
                      groupProperty[groupName].group = false;
                    }
                  }

                  groupProperty[groupName].checkSum++;
                }

                styles[propertyName] = propertyValue;
              }

              for(i in groupProperty) {
                if(groupProperty[i].checkSum == 4 && groupProperty[i].group) {
                  styles[i] = groupProperty[i].value;
                }
              }
            }

            /*
            var sheet = document.getElementById("cssTest").sheet;
            console.log(sheet);
            console.log(sheet.cssRules);
            */
            /*http://usefulangle.com/post/39/adding-css-to-stylesheet-with-javascript*/

            return styles;

          } catch (err) {
            console.log(err.message);
          }
        }

        U.setBlockStyle = function() {
          try {
              var styles = U.getBlockStyle();

              var name, value, domValue, domUnit;
              // Init Style Html
              O.style.forEach(function(obj) {
                domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, obj.name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.text));
                if(!domValue) {
                  domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, obj.name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.select));
                }

                if(!domValue) {
                  domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, obj.name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.color));
                }
                domUnit = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, obj.name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.units));
                
                if(domValue.nodeName == 'INPUT') {
                  domValue.value = '';
                  if(domUnit != null) {
                    domUnit.value = obj.units[0];
                  }
                } else {
                  domValue.value = obj.options[0];
                }
              });
              
              for(name in styles) {
                domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.text));
                if(!domValue) {
                  domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.select));
                }

                if(!domValue) {
                  domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, obj.name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.color));
                }
                domUnit = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, name, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.units));
                
                if(domValue.nodeName == 'INPUT') {
                  if(domUnit != null) {
                    for(idx in domUnit.children) {
                      if(styles[name].indexOf(domUnit.children[idx].value) != -1) {
                        domValue.value = styles[name].replace(domUnit.children[idx].value, '');
                        domUnit.value = domUnit.children[idx].value;
                        break;
                      }
                    }
                  } else {
                    if(domValue.getAttribute('type') == O.HB_STYLE_TYPE_OPTION.color) {
                      domValue.value = U.rgb2Hex(styles[name]);
                    } else {
                      domValue.value = styles[name];  
                    }
                  }
                } else {
                  if(domUnit != null) {
                    for(idx in domUnit.children) {
                      if(styles[name].indexOf(domUnit.children[idx].value) != -1) {
                        value = styles[name].replace(domUnit.children[idx].value, '');
                        domUnit.value = domUnit.children[idx].value;
                        break;
                      }
                    }
                    domValue.value = value;
                  } else {
                    domValue.value = styles[name];
                  }
                }
              }
          } catch (err) {
            console.log(err.message);
          }
        };

        U.rgb2Hex = function(rgbStr) {
          var rgb = rgbStr.split('(')[1].split(')')[0].split(',');

          var r,g,b;
          r = parseInt(rgb[0]).toString(16);
          g = parseInt(rgb[1]).toString(16);
          b = parseInt(rgb[2]).toString(16);

          var hex = '#' + ((r.length == 2) ? r : ('0' + r)) + ((g.length == 2) ? g : ('0' + g)) + ((b.length == 2) ? b : ('0' + b));
          return hex;
        };
        
        /*
          1. Menu Block Draggable 선택
        */
        U.draggableMenuBlock = function(chk) {
            try {
                var blocks = document.getElementsByClassName('hb_btn-block');
                for(var i = 0, len = blocks.length; i < len; i++) {
                    blocks[i].setAttribute('draggable', chk);
                }
            } catch(err) {
                console.log(err.message);
            }
        };

        /*
          1. Html Import
            1) Text Parsing => Dom Element
            2) Dom Element => Layout object
        */
        U.importHtml = function(htmlText) {
          var content = document.getElementById(O.HB_CONTENT_DIV_ID);
          var funcBlock = document.querySelectorAll('[class=hb_func-menu]')[0];

          content.innerHTML = htmlText;
          
          U.importLayout(content, null);
          U.updateLayout(U.contentLayout);

          content.insertBefore(funcBlock, content.children[0]);
        };

        /*
          1. Html Import
            1) Layout을 update하기 위해서는 Import된 Dom Element정보를 통하여 Layout을 생성해야 한다.
            2) Layout 생성 하면서 ID 입력
            3) Layout 생성 하면서 Event 입력
        */
        U.importLayout = function(child, parent) {
          var layout = null, parentLayout = null;
          if(parent != null) {
            parentLayoutId = parent.getAttribute(O.HB_LAYOUT_ID);
            parentLayout = LayoutController.selectLayout(parentLayoutId, U.contentLayout);

            layout = new Layout();
            layout.element = child.tagName.toLowerCase();
            layout.id = layout.element + '_' + U.idIdx;
            layout.parentLayoutId = parentLayoutId;
            child.setAttribute(O.HB_LAYOUT_ID, layout.id);

            for(var idx in U.blockDefaultEvents) {
              child.addEventListener(U.blockDefaultEvents[idx].type, U.blockDefaultEvents[idx].func);  
            }

            parentLayout.child.push(layout);
            U.idIdx++;
          }

          for(var i = 0, len = child.children.length; i < len; i++) {
            U.importLayout(child.children[i], child);
          }
        };

        U.importCss = function(cssText) {
          var userCss = document.getElementById('user_css');
          userCss.innerHTML = cssText;

          /*
          var sheet = document.getElementById("cssTest").sheet;
          console.log(sheet);
          console.log(sheet.cssRules);
          */
        };

        U.changeResolution = function(width, height) {
          var content = document.getElementById(O.HB_CONTENT_DIV_ID);
          content.style.width = width;
          content.style.height = height;
        };
        
      }(Utils, Options));
    
      (function(H, U, O) {
        H.init = function(config) {
          var defaults = {
            container: '#container', //전체 화면
            ids: [O.HB_CONTENT_DIV_ID, O.HB_MENU_DIV_ID],
            width: ['80%', '18%'],
            height: ['100%', '100%']
          };

          var c = config || {};
          for (var name in defaults) {
            if (!(name in c)) {
              c[name] = defaults[name];
            }
          }
          
          try {
            //container
            var container = document.getElementById(c.container);
            
            //content
            var _content = {
                element: 'div',
                attr: {
                    id: c.ids[0],
                    style: ('width:' + c.width[0] + ';height:' + c.height[0] + '; float:left; overflow: auto;'),
                    class: 'hb_content hb_full hb_padding-10px hb_border-basic'
                },
                event: [
                    {
                        type: 'resize',
                        func: function() {
                            U.update_layout(U.layout[0]);
                        }
                    }
                ]
                
            };
            _content.attr[O.HB_LAYOUT_ID] = c.ids[0];
            var content = U.builder(_content);
            container.appendChild(content);
            U.initContentLayout(c.ids[0], content.getBoundingClientRect());
            
            //selected ui function
            var selectedBlockFunc = U.builder({
             element: 'div',
             attr: {
                style: 'position: absolute; left: 0px; top: -100px;',
                class: 'hb_func-menu'
             },
             child: [
                {
                  element: 'button',
                  attr: {
                    class: 'hb_btn-func hb_btn-delete'
                  },
                  event: [
                    {
                      type: 'click',
                      func: function() {
                        U.deleteBlock();
                        U.updateLayout(U.contentLayout);
                        U.setFunctionBlock();
                        U.draggableMenuBlock(true);
                        U.showBlockAttr(false);
                      }
                    }
                  ]
                },
                {
                  element: 'button',
                  attr: {
                    class: 'hb_btn-func hb_btn-copy'
                  },
                  event: [
                    {
                      type: 'click',
                      func: function() {
                        U.copyBlock(U.selectedLayout.parentLayoutId, U.selectedLayout.id);
                        U.updateLayout(U.contentLayout);
                        U.setFunctionBlock();
                        U.draggableMenuBlock(true);
                        U.showBlockAttr(false);
                      }
                    }
                  ]
                }
             ]
            });

            content.appendChild(selectedBlockFunc);

            //menu
            var menu = U.builder({
                element: 'div',
                attr: {
                    id: c.ids[1],
                    style: ('width:' + c.width[1] + ';height:' + c.height[1] + '; float:right;'),
                    class: 'hb_main-menu hb_border-basic'
                }
            });
            container.appendChild(menu);

            H.menuNav(menu);
            H.menuBlocks(menu);
            H.menuAttr(menu);
            H.menuStyle(menu);

          } catch(err) {
            console.log(err.message);
          } finally {
            return;
          }
        };

        /*
          1. Menu 종류
            1) Blocks
            2) Style Manager -> Attr Manager
            3) Layer Manager

          2. 예외사항
            1) Style Manager은 Block 선택하지 않을시 아무것도 보이지 않는다.
          
          3. Style Manager 구성
            1) Classes
            2) Settings - Id, Titles
            3) General - Alignment, display, position, top, right, left, bottom
            4) Dimention - width, height, min width, max width, min height, max height, margin, padding
            5) Typography - font, font size, weight, letter spacing, font color, line height, text align, text decoration
        */

        /*
          1. Menu Nav
            1) Nav
            2) Content parent
        */
        H.menuNav = function(container) {
          try {
            var click = function(e) {
              var content = document.getElementById('#main-content');
              var children = content.children;

              for(var i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
              }

              var block = document.getElementById(e.target.value);
              block.style.display = 'block';
            };

            var _nav = {
              element: 'div',
              attr: {
                class: 'hb_nav',
                id: '#main-nav'
              },
              child: [
                {
                  element: 'button',
                  attr: {
                    class: 'hb_btn-nav hb_btn-nav-block',
                    name: '#main-nav',
                    value: '#main-content_block'
                  },
                  event: [{
                    type: 'click',
                    func: click
                  }]
                },
                {
                  element: 'button',
                  attr: {
                    class: 'hb_btn-nav hb_btn-nav-attr',
                    name: '#main-nav',
                    value: '#main-attr_block'
                  },
                  event: [{
                    type: 'click',
                    func: click
                  }]
                },
                {
                  element: 'button',
                  attr: {
                    class: 'hb_btn-nav hb_btn-nav-setting',
                    name: '#main-nav',
                    value: '#main-setting_block'
                  },
                  event: [{
                    type: 'click',
                    func: click
                  }]
                }
              ]
            };

            container.appendChild(U.builder(_nav));

            var _content = {
              element: 'div',
              attr: {
                id: '#main-content',
                class: 'hb_content'
              },
              child: [
                {
                  element: 'div',
                  attr: {
                    id: '#main-content_block',
                    class: 'hb_content-blocks'
                  }
                },
                {
                  element: 'div',
                  attr: {
                    id: '#main-attr_block',
                    class: 'hb_content-attr',
                    style: 'display:none;'
                  },
                  child: [
                    {
                      element: 'div',
                      attr: {
                        id:'#content-attr_block',
                        class: 'hb_content-attr',
                        style: 'display:none;'
                      }
                    },
                    {
                      element:'div',
                      attr: {
                        id:'#content-attr_block_none',
                        class: 'hb_content-attr',
                        style: 'display:block;'
                      },
                      text: 'There is no selected Block\nPlease select at least 1 block'
                    }
                  ]
                },
                {
                  element: 'div',
                  attr: {
                    id: '#main-setting_block',
                    class: 'hb_content-blocks'
                  }
                }
              ]
            };

            container.appendChild(U.builder(_content));
          } catch (err) {
            console.log(err.message);
          }
        };

        H.menuBlocks = function(container) {
          try {
            var i, len;
            var _block, _title;
            for(i = 0, len = O.blocks.length; i < len; i++) {
              _block = {
                element: 'div',
                attr: {
                  class: 'hb_btn-block hb_cursor-move',
                  typeIdx: i,
                  draggable: true
                },
                event: [
                  {
                    type: 'drag',
                    func: function(e) {
                      U.moveBlock(e); 
                    }
                  },
                  {
                    type: 'dragend',
                    func: function(e) {
                      U.setBlock();
                    }
                  }
                ],
                child: [
                  {
                    element: 'div',
                    attr: {
                      class:'hb_img ' + O.blocks[i].icon
                    }
                  },
                  {
                    element: 'div',
                    attr: {
                      class: 'hb_lbl',
                      block: O.blocks[i].element,
                      block_type: (O.blocks[i].attrs.type ? O.blocks[i].attrs.type : '')
                    },
                    text: O.blocks[i].title
                  }
                ]
              };

              container.children[1].children[0].appendChild(U.builder(_block));
            }

          } catch (err) {
            console.log(err.message);
          }

        };

        H.menuAttr = function(container) {
          /**
          *  Check save event
          *  1. Id, Title, Name save check
          *  2. If they are checked, program shows alarm
          **/
          var saveEvent = function(e) {
            var target = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));
            var type = e.target.getAttribute(O.HB_ATTR_ID);
            var value = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, type, O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text)).value;

            if(type == 'text') {
              if(target.firstChild) {
                if(target.firstChild.nodeType != Node.TEXT_NODE) {
                  target.insertBefore(document.createTextNode(value), target.firstChild);
                } else {
                  target.firstChild.textContent = value;
                }
              } else {
                target.insertBefore(document.createTextNode(value), target.firstChild);
              }
            } else if(type == 'value') {
              if(target.nodeName == 'INPUT' || target.nodeName == 'TEXTAREA') {
                target.value = value;
              } else {
                target.setAttribute(type, value);
              }
            } else {
              target.setAttribute(type, value);
            }
          };

          /**
          *  Check class add event
          *  1. Class add event
          **/
          var addEvent = function(e) {
            var id = e.target.getAttribute(O.HB_ATTR_ID);
            var input = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, id, O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.text));

            if(input.value != '') {
              var target = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));
              var select = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, id, O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.select));

              var option = U.builder({
                element: 'option',
                attr: {
                  value: input.value
                },
                text: input.value
              });
              select.appendChild(option);

              target.classList.add(input.value);
            }

            U.updateLayout(U.contentLayout);
          };

          /**
          *  Check class delete event
          *  1. Class delete event
          **/
          var deleteEvent = function(e) {
            var target = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));
            var id = e.target.getAttribute(O.HB_ATTR_ID);
            var select = U.getElementByAttribute(U.getQueryOption(O.HB_ATTR_ID, id, O.HB_ATTR_TYPE, O.HB_ATTR_TYPE_OPTION.select));

            for(var i = 0; i < select.options.length; i++) {
                if(select.options[i].selected == true) {
                    target.classList.remove(select.options[i].value);
                    select.removeChild(select.options[i]);
                    i--;
                }
            }

            U.updateLayout(U.contentLayout);
          };

          try {
            var i, len;
            var _block, _title, _title_list, _list;
            for (i = 0, len = O.attr.length; i < len; i++) {
              _block = {
                element: 'div',
                attr: {
                  class: 'hb_attr-block'
                },
                child: []
              };

              _title = {
                element: 'div',
                attr: {
                  class: 'hb_title-block'
                },
                child: [
                  {
                    element: 'label',
                    attr: {
                      class: 'hb_lbl'
                    },
                    text: O.attr[i].title
                  },
                  {
                    element: 'input',
                    attr: {
                      type: 'text',
                      class: 'hb_input'
                    }
                  }
                ]
              };

              _title.child[1].attr[O.HB_ATTR_ID] = O.attr[i].name;
              _title.child[1].attr[O.HB_ATTR_TYPE] = O.HB_ATTR_TYPE_OPTION.text;

              if(O.attr[i].multiple) {
                _title.child.push(
                    {
                      element: 'button',
                      attr: {
                        class: 'hb_btn hb_btn-add'
                      },
                      event: [
                        {
                          type: 'click',
                          func: addEvent
                        }
                      ]
                    }
                  );

                //id: 'hb_attr_btn_add_' + ,
                _title.child[2].attr[O.HB_ATTR_ID] = O.attr[i].name;
                _title.child[2].attr[O.HB_ATTR_TYPE] = O.HB_ATTR_TYPE_OPTION.add;

                _title.child.push(
                    {
                      element: 'button',
                      attr: {
                        class: 'hb_btn hb_btn-delete'
                      },
                      event: [
                        {
                          type: 'click',
                          func: deleteEvent
                        }
                      ]
                    }
                  );

                _title.child[3].attr[O.HB_ATTR_ID] = O.attr[i].name;
                _title.child[3].attr[O.HB_ATTR_TYPE] = O.HB_ATTR_TYPE_OPTION.delete;

                _title_list = {
                  element: 'div',
                  attr: {
                    class: 'hb_title-block'
                  },
                  child: [
                    {
                      element: 'select',
                      attr: {
                        class: 'hb_select',
                        multiple: 'true'
                      }
                    }
                  ]
                };

                _title_list.child[0].attr[O.HB_ATTR_ID] = O.attr[i].name;
                _title_list.child[0].attr[O.HB_ATTR_TYPE] = O.HB_ATTR_TYPE_OPTION.select;

              } else {
                _title.child.push(
                    {
                      element: 'button',
                      attr: {
                        class: 'hb_btn hb_btn-save'
                      },
                      event: [
                        {
                          type: 'click',
                          func: saveEvent
                        }
                      ]
                    }
                  );

                _title.child[2].attr[O.HB_ATTR_ID] = O.attr[i].name;
                _title.child[2].attr[O.HB_ATTR_TYPE] = O.HB_ATTR_TYPE_OPTION.save;

                _title_list = null;
              }

              if(O.attr[i].list) {
                _list = {
                  element: 'div',
                  attr: {
                    class: 'hb_attr-list-block'
                  }
                };
              }
              
              _block.child.push(_title);
              if(_title_list) {
                _block.child.push(_title_list);
              }

              if(_list) {
                _block.child.push(_list);
              }

              container.children[1].children[1].children[0].appendChild(U.builder(_block));
            }
          } catch(err) {
            console.log(err.message);
          }
        };


        H.menuStyle = function(container) {
          // title, div
          // hb_attr-block, hb_title-block, hb_lbl
          // hb_attr-list-block

          /*
            //Position
            {
              name: 'position',
              title: 'Position',
              type: 'select',
              options: ['', 'static', 'relative', 'fixed', 'absolute', 'sticky'],
              units: [],
              category: 'position'
            },

            {
              name: 'left',
              title: 'Left',
              type: 'text',
              units: ['px', '%', 'cm', 'mm', 'in'],
              category: 'position'
            },


            -- units 존재시 title 옆 input text와 조합
            -- type이 select면 select box를 제공
          */

          var saveEvent = function(e) {
            var target = U.getElementByAttribute(U.getQueryOption(O.HB_LAYOUT_ID, U.selectedLayout.id));
            var id = e.target.getAttribute(O.HB_STYLE_ID);
            var type = e.target.getAttribute(O.HB_STYLE_TYPE);

            var domValue = null, domUnits = null;
            if(type == O.HB_STYLE_TYPE_OPTION.units || type == O.HB_STYLE_TYPE_OPTION.text) {
              domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, id, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.text));
              domUnits = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, id, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.units));

              var value = null;
              if(domValue) {
                if(domValue.value != null && domValue.value != '') {
                  value = domValue.value;
                  if(domUnits) {
                    value += domUnits.value;
                  }
                }
              }

              target.style[id] = value;

            } else if(type == O.HB_STYLE_TYPE_OPTION.select){
              domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, id, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.select));
              target.style[id] = domValue.value;
            } else {
              domValue = U.getElementByAttribute(U.getQueryOption(O.HB_STYLE_ID, id, O.HB_STYLE_TYPE, O.HB_STYLE_TYPE_OPTION.color));
              target.style[id] = domValue.value;
            }

            U.updateLayout(U.contentLayout);
          };

          var toggleEvent = function(e) {
            var target;
            
            if(e.target.nodeName == 'LABEL') {
              target = e.target.parentNode;
            } else {
              target = e.target;
            }

            if(target.innerHTML.indexOf('\u25B2') != -1) {
              target.innerHTML = target.innerHTML.replace('\u25B2', '\u25BC');
            } else {
              target.innerHTML = target.innerHTML.replace('\u25BC', '\u25B2');
            }

            var sibling = target.nextSibling;

            while(sibling) {
              if(sibling.style.display == 'none') {
                sibling.style.display = 'block';
              } else {
                sibling.style.display = 'none';
              }

              sibling = sibling.nextSibling;
            }
          };

          var makeContentOption = function(style, O) {
            var _block_content, _title_content, _style_options, _style_units;
            var  i, len;

            _block_content = {
                element: 'div',
                attr: {
                  class: 'hb_attr-block'
                },
                child: []
              };

            _title_content = {
              element: 'div',
              attr: {
                class: 'hb_title-block'
              },
              child: [
                {
                  element: 'label',
                  attr: {
                    class: 'hb_style_lbl'
                  },
                  text: style.title,
                  name: style.name
                }
              ]
            };

            if(style.type == 'text') {
              _style_options = {
                  element: 'input',
                  attr: {
                    type: 'text',
                    class: 'hb_style_input'
                  },
                  event: [{
                    type: 'change',
                    func: saveEvent
                  }]
                };
              _style_options.attr[O.HB_STYLE_ID] = style.name;
              _style_options.attr[O.HB_STYLE_TYPE] = O.HB_STYLE_TYPE_OPTION.text;

              _title_content.child.push(_style_options);

              if(style.units.length > 0) {
                _style_units = {
                  element: 'select',
                  attr: {
                    class: 'hb_style_select'
                  },
                  child: [],
                  event: [{
                    type: 'change',
                    func: saveEvent
                  }]
                };
                _style_units.attr[O.HB_STYLE_ID] = style.name;
                _style_units.attr[O.HB_STYLE_TYPE] = O.HB_STYLE_TYPE_OPTION.units;

                for(i = 0, len = style.units.length; i < len; i++) {
                  _style_units.child.push({
                    element: 'option',
                    attr: {
                      value: style.units[i]
                    },
                    text: style.units[i]
                  });
                }

                _title_content.child.push(_style_units);
              }
            } else if(style.type == 'select') {
                _style_options = {
                  element: 'select',
                  attr: {
                    class: 'hb_style_select'
                  },
                  child:[],
                  event: [{
                    type: 'change',
                    func: saveEvent
                  }]
                };
                _style_options.attr[O.HB_STYLE_ID] = style.name;
                _style_options.attr[O.HB_STYLE_TYPE] = O.HB_STYLE_TYPE_OPTION.select;

                for(i = 0, len = style.options.length; i < len; i++) {
                  _style_options.child.push({
                    element: 'option',
                    attr: {
                      value: style.options[i]
                    },
                    text: style.options[i]
                  });
                }

                _title_content.child.push(_style_options);
            } else {
              _style_options = {
                  element: 'input',
                  attr: {
                    type: 'color',
                    class: 'hb_style_input'
                  },
                  event: [{
                    type: 'change',
                    func: saveEvent
                  }]
                };
              _style_options.attr[O.HB_STYLE_ID] = style.name;
              _style_options.attr[O.HB_STYLE_TYPE] = O.HB_STYLE_TYPE_OPTION.text;

              _title_content.child.push(_style_options);
            }

            _block_content.child.push(_title_content);

            if(style.sub_category) {
              _block_content.child.push({
                element: 'div',
                attr: {
                  style: 'width: 100%; background-color: #9fa8b7; border-top: 1px solid #495267; font-size:8px; cursor:pointer;'
                },
                html: '\u25B2',
                event: [{
                  type: 'click',
                  func: toggleEvent
                }]
              });

              for(i = 0, len = style.sub_category.length; i < len; i++) {
                _block_content.child.push(makeContentOption(style.sub_category[i], O));
              }
            }

            return _block_content;
          }

          var i, len, j, len_content;
          var _block, _title;
          for(i = 0, len = O.style_category.length; i < len; i++) {
            _block = {
                element: 'div',
                attr: {
                  class: 'hb_attr-block'
                },
                child: []
              };

            _title = {
                element: 'div',
                attr: {
                  class: 'hb_style_title-block',
                  style: 'cursor:pointer;'
                },
                child: [
                  {
                    element: 'label',
                    attr: {
                      class: 'hb_style_lbl'
                    },
                    html: O.style_category[i].title  + ' \u25B2',
                    name: O.style_category[i].name
                  }
                ],
                event: [{
                  type: 'click',
                  func: toggleEvent
                }]
              };

              _block.child.push(_title);

              for(j = 0, len_content = O.style.length; j < len_content; j++) {
                if( O.style_category[i].name == O.style[j].category) {
                   _block.child.push(makeContentOption(O.style[j], O));
                }
              }

              container.children[1].children[1].children[0].appendChild(U.builder(_block));
          }
        };

        H.menuSetting = function(container) {
          try {
            var _block;

            //settig 관련 하여 어떻게 동작할 것인지 확인 필요
            //Import html, css 동시에 할 수 있도록 Modal 적용
            //Export html, css 동시에 할 수 있도록 Modal 적용
            //Resolution Button으로 미리 정해두자

            /*
            {
            element: 'div',
            attr: {
              class: 'hb_nav',
              id: '#main-nav'
            },
            */


            container.children[1].children[2].appendChild(U.builder(_block_content));

          } catch(err) {
            console.log(err.message);
          }
        }
        
      }(HtmlBuilder, Utils, Options));
    
    //테스트용
    HtmlBuilder.importHtml = Utils.importHtml;
    HtmlBuilder.importCss = Utils.importCss;
    HtmlBuilder.changeResolution = Utils.changeResolution;

    return HtmlBuilder;
  })
);