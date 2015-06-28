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
      "click .toggle"   : "toggleMarker",
    },
    initialize: function() {
        this.listenTo(this.model, 'change:hide', this.render);
    },
    render: function(){
        var me = this,
            i,
            propertyNames = Object.getOwnPropertyNames(me.model.toJSON());
        for (i = 0; i < propertyNames.length; i++){
            me.$el
                .append($('<td>')
                    .text(me.model[propertyNames[i]])
                );
        }
        return me;
    },
    toggleMarker: function(){
        this.model.toggle();
    }
});