/**
 *
 * https://github.com/lukasolson/backbone-super
 */
(function(e,a){if("function"===typeof define&&define.amd)define(["underscore","backbone"],function(h,b){a(h,b)});else if("undefined"!==typeof exports){var g=require("underscore"),d=require("backbone");a(g,d)}else a(e._,e.Backbone)})(this,function(e,a){a.Model.extend=a.Collection.extend=a.Router.extend=a.View.extend=function(h,b){var a=d(this,h,b);a.extend=this.extend;return a};var g=function(){},d=function(a,b,d){var c,k=a.prototype,l=/\b_super\b/;c=b&&b.hasOwnProperty("constructor")?b.constructor: function(){return a.apply(this,arguments)};e.extend(c,a,d);g.prototype=a.prototype;c.prototype=new g;if(b){e.extend(c.prototype,b);for(var f in b)"function"==typeof b[f]&&l.test(b[f])&&(c.prototype[f]=function(a,b){var c=function(){var d=this._super,c;if(!(c=k[a]))throw"Super does not implement this method: "+a;this._super=c;var e;try{e=b.apply(this,arguments)}finally{this._super=d}return e},d;for(d in b)c[d]=b[d],delete b[d];return c}(f,b[f]))}d&&e.extend(c,d);c.prototype.constructor=c;c.__super__= a.prototype;return c};return d});

/**
 *
 * danielarandaochoa.com
 * Template Library
 * ::::::::::::::::::::::::::::
 *
 * Use this library to load external templates to your module. The logic is to store HTML templates into packages.
 *      One package per module and also one package for commons. The path to store the templates is:
 *      /assets/templates/{package}.html
 *      Package will contain templates in this way:
 *      <script class="tpl{TemplateName}" type="text/x-FCG-tpl">
 *          This is a containg for a Template
 *      </script>
 *
 *      To get a Template use:
 *      $s.tpl.getTemplate('campaigns', 'drafts-list', data);
 *
 *      Real worl example to get the template for the Package "Campaigns" and the template "drafts-list"
 *      $s.tpl.getTemplate('campaigns', 'drafts-list', data);
 *
 * @author: Daniel Aranda
 *
 * @since: 2.0
 *
 */

$d.tpl = {

    templates : {},

    compiledTemplates : {},

    loadTemplates : function(templateUrl){

        $.ajax({
            url: templateUrl,
            context: this,
            async: false,
            success: function(templateRaw) {
                this.templates = $('<div />').append(templateRaw);
                this.templatesLoaded = true;
            },
            error: function(){
                throw new Error('Error loading this template: ' + templateUrl);
            }
        });

    },

    getTemplate : function(name, data){

        if( !this.templatesLoaded ){
            throw 'Templates should be loaded first';
        }

        if( !this.compiledTemplates[name] ){
            var templateDom = this.templates.find( '.tpl.' + name);

            if( templateDom.length === 0 ){
                console.log('Template Not Found.', arguments);
                return 'Template Not Found.';
            }
            if( templateDom.length > 1 ){
                console.log(arguments);
                console.log('You defined more than one template with the same name. Please make sure each template has an unique name.');
            }
            try{
                this.compiledTemplates[name] = _.template( templateDom.html() );
            }catch(e){
                console.log('Error preparing the template: ' + e.message);
                console.log('Template: ', arguments);
            }
        }

        var template = this.compiledTemplates[name];
        var result;

        try{
            result = template(data);
        }catch(e){
            console.log('Error rendering the template: ' + e.message);
            console.log('Template: ', arguments);
        }

        return result;
    }

};