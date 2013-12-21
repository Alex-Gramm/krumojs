Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
         size++;
    }
    return size;
};
    /**
    * JavaScript routines for Krumo
    *
    * @version $Id: krumo.js 1020 2007-04-17 07:14:10Z Kaloyan $
    * @link http://sourceforge.net/projects/krumo
    */

    /////////////////////////////////////////////////////////////////////////////

    /**
    * Krumo JS Class
    */
    function krumo() {
        }

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    /**
    * Add a CSS class to an HTML element
    *
    * @param HtmlElement el
    * @param string className
    * @return void
    */
    krumo.reclass = function(el, className) {
        if (el.className.indexOf(className) < 0) {
        el.className += (' ' + className);
        }
    }

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    /**
    * Remove a CSS class to an HTML element
    *
    * @param HtmlElement el
    * @param string className
    * @return void
    */
    krumo.unclass = function(el, className) {
        if (el.className.indexOf(className) > -1) {
        el.className = el.className.replace(className, '');
        }
    }

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    /**
    * Toggle the nodes connected to an HTML element
    *
    * @param HtmlElement el
    * @return void
    */
    krumo.toggle = function(el) {
        var ul = el.parentNode.getElementsByTagName('ul');
        for (var i=0; i<ul.length; i++) {
        if (ul[i].parentNode.parentNode == el.parentNode) {
        ul[i].parentNode.style.display = (ul[i].parentNode.style.display == 'none')
        ? 'block'
        : 'none';
        }
    }

    // toggle class
    //
    if (ul[0].parentNode.style.display == 'block') {
        krumo.reclass(el, 'krumo-opened');
        } else {
        krumo.unclass(el, 'krumo-opened');
        }
    }

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    /**
    * Hover over an HTML element
    *
    * @param HtmlElement el
    * @return void
    */
    krumo.over = function(el) {
        krumo.reclass(el, 'krumo-hover');
        }

    // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    /**
    * Hover out an HTML element
    *
    * @param HtmlElement el
    * @return void
    */

    krumo.out = function(el) {
        krumo.unclass(el, 'krumo-hover');
        }

    krumo.child = function(data,name)
    {
        if(name == undefined)
            name = 'unnamed';

        var len = "";
        var type = typeof data;

        var out = '<li class="krumo-child">';

        switch (type){
            case "number":
            case 'string':
            {
                var len = type=="string"?data.length+' characters':'';
                out += '<div class="krumo-element  " onmouseover="krumo.over(this);" onmouseout="krumo.out(this);">';

                break;
            }
            case "object":{
                var len = Object.size(data)+' elements';
                out += '<div class="krumo-element krumo-expand" onclick="krumo.toggle(this);"                onmouseover="krumo.over(this);" onmouseout="krumo.out(this);">';
                break;
            }

        }

             out += '<a class="krumo-name">'+name+'</a>'+
            '(<em class="krumo-type">'+typeof data;
        if(len != ''){
            out += ',<strong class="krumo-string-length">'+len+'</strong> ';
        }
        out += ')'+
            '</em>';





        switch (type){
            case "number":
            case 'string':
            {
                out += '<strong class="krumo-string">'+data+'</strong>';
                out += '</div>';
                console.log('item');
                break;
            }
            case "object":{
                out += '</div>';
                out += '<div class="krumo-nest" style="display: none;"><ul class="krumo-node">';
                $.each(data,function(key,val){
                    out += krumo.child(val,key);
                })
                out += '</ul></div>';
                break;
            }

        }
        out += '</li>';

return out;
        //$("#messages").append($(out));




    }

    krumo.dump = function(data)
    {


        var out = '<div class="krumo-root">'+
            '<ul class="krumo-node krumo-first">';
            out += krumo.child(data,"...");

        out += '</li>';
        $("#messages").append($(out));
    }
