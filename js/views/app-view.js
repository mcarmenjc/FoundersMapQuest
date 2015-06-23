/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class AppView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.AppView = Backbone.View.extend(/** @lends AppView.prototype */{
    /** 
     * @property {Object} el DOM object 
     */
    el: $('#main'),
    /** 
     * @property {Object} events Object that associates different events in the DOM with the functions that handle them 
     */
    events: {
    },
    /** 
     * @contructs AppView object 
     * @param {Object} data
     */
    initialize: function (data) {
        var me = this;
        me.$stepsRow = me.$('#steps-row');
        me.$selectFileRow = me.$('#select-file-row');
        me.$columnSelectionRow = me.$('#column-selection-row');
        me.$resultRow = me.$('#result-row');
    }
});