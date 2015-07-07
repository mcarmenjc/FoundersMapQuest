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
    /** 
     * @property {string} tagName Associates RowView with its element in the DOM (in this 
     * case a row, tr, in a table)
     */
    tagName: 'tr',
    /** 
     * @property {Object} events Associates DOM events with a function to process them
     */
    events: {
      "click #toggle"   : "toggleMarker",
    },
    /** 
     * Render the row. Create the html code for rendering the row. It manages if the content of the cell
     * is a link or an image
     * @returns {Object} It returns itself
     */
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
    /** 
     * Add an image to a cell, using img html tag
     */
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
    /** 
     * Toggle if the row should be displayed or not in the map.
     */
    toggleMarker: function(){
        this.model.toggle();
    }
});