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
     * @property {Object} events Associates DOM events with a function to process them
     */
    events: {
      "click #toggle"   : "toggleMarker"
    },
    /** 
     * @contructs RowView object.
     * Initialize the related template in the DOM
     * @listens RowModel:change:hidden
     */
    initialize: function(){
      var me = this;
      me.template = _.template($('#row-template').html());
      me.listenTo(me.model, 'change:hidden', me.toggleRow);
    },
    /** 
     * Renders the row. Create the html code for rendering the row. It manages if the content of the cell
     * is a link or an image
     * @returns {Object} It returns itself
     */
    render: function(){
        var me = this;
        me.$el.html(me.template());
        _.each(me.model.toJSON(), function(val, key){
            var dataCell,
                isLink,
                extension;
            if(key !== 'hiddenMarker' && key !== 'hidden' && key !== 'googleMap' && key !== 'googleMarker'){
              me.$el.find('#data-table')
              .append($('<tr>')
                .append($('<td>')
                  .text(key))
                .append($('<td>')));
              dataCell = me.$el.find('#data-table')
                                .find('tr').last()
                                .find('td').last();
              isLink = (val.substring(0, 4) === 'http');
              extension = val.substring(val.length-3);
              if (isLink){
                dataCell.append($('<a>')
                          .attr('href', val)
                          .attr('target', '_blank'));
                dataCell = dataCell.find('a');
              }
              if (extension === 'jpg' || extension === 'png' || extension === 'gif'){
                dataCell.append($('<img>')
                          .attr('src', val)
                          .attr('class', 'img-thumbnail')
                          .text(val));
              }
              else{
                dataCell.text(val);
              }
            }
        });
        return me;
    },
    /** 
     * Toggle if the row should be displayed or not in the map.
     */
    toggleMarker: function(){
        this.model.toggleMarker();
    },
    /** 
     * Depending if the row is hidden or not, the DOM element is going to be hidden or shown.
     */
    toggleRow: function(){
      var me = this;
      if (me.model.isHidden()){
        me.$el.hide();
      }
      else{
        me.$el.show();
      }
    }
});