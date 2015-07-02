/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class RowView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.RowView = Backbone.View.extend(/** @lends RowView.prototype */{
    tagName: 'tr',
    events: {
      "click #toggle"   : "toggleMarker",
    },
    render: function(){
        var me = this;
        me.$el
            .append($('<td>')
                .append($('<input>')
                    .attr('type', 'checkbox')
                    .attr('value', 'hide')
                    .attr('id', 'toggle')));
        _.each(me.model.toJSON(), function(val, key){
            var extension,
                isLink;
            if (key !== 'hide'){
                extension = val.substring(val.length-3);
                if (extension === 'jpg' || extension === 'png' || extension === 'gif'){
                    me.addImage(val);
                }
                else{
                    isLink = (val.substring(0, 4) === 'http');
                    if (isLink){
                        me.$el
                            .append($('<td>')
                                .append($('<a>')
                                    .attr('href', val)
                                    .attr('target', '_blank')
                                    .text(val)));
                    }
                    else{
                        me.$el
                        .append($('<td>')
                            .text(val)
                        );   
                    } 
                }
            }
        });
        return me;
    },
    addImage: function(val){
        var isLink = (val.substring(0, 4) === 'http');
        if (isLink){
            this.$el
            .append($('<td>')
                .append($('<a>')
                    .attr('href', val)
                    .attr('target', '_blank')
                    .append($('<img>')
                       .attr('src', val)
                       .attr('class', 'img-thumbnail')
                       .text(val))));
        }
        else{
            this.$el
            .append($('<td>')
                .append($('<img>')
                    .attr('src', val)
                    .attr('class', 'img-thumbnail')
                    .text(val)));
        }
    },
    toggleMarker: function(){
        this.model.toggle();
    }
});