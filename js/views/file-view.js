/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class FileView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.FileView = Backbone.View.extend(/** @lends FileView.prototype */{
    el: '#main',
    /** 
     * @property {Object} events Object that associates different events in the DOM with the functions that handle them 
     */
    events: {
        'click #button-file-chooser': 'openFileChooser',
        'change #file-chooser': 'processFile',
        'click #show-results-button': 'showResults'
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
        me.$fileChooser = me.$('#file-chooser');

        me.listenTo(me.model, 'processedFile', me.showSelectOptions);

        me.$columnSelectionRow.hide();
        me.$resultRow.hide();
    },
    /** 
     * Opens file chooser dialog to select the csv file which contains the data to show 
     * @param {Object} data
     */
    openFileChooser: function() {
        this.$fileChooser.click();
    },
    /** 
     * Extract data from file
     * @param {Object} event 
     */
    processFile: function(event) {
        var fileName = this.$fileChooser.val(),
            file,
            i;
        if(fileName !== ''){
            file = event.originalEvent.target.files[0];
            this.model.setDataFromFile(file);
        }
    },
    /** 
     * Hide file chooser row and show dropdowns to select latitude, longitude and marker columns. 
     * Set dropdown options to the list of columns
     */
    showSelectOptions: function(){
        var me = this;
        me.model.guessLatitudeAndLongitudeColumns();
        me.setDropdownListValues('#dropdown-latitude', me.model.getLatitudeColumn());
        me.setDropdownListValues('#dropdown-longitude', me.model.getLongitudeColumn());
        me.setDropdownListValues('#dropdown-marker', 0);
        me.$selectFileRow.hide();
        me.$columnSelectionRow.show();
    },
    /** 
     * Set the dropdown list options to the columns list
     * @param {string} elementId DOM element id to select the dropdown
     * @param {number} selectedOption index of the option selected by default
     */
    setDropdownListValues:function(elementId, selectedOption){
        var me = this,
            dropdownList = me.$(elementId),
            i;
        if (dropdownList[0].options !== undefined){
            dropdownList[0].options.length = 0;
        }
        for (i = 0; i < me.model.getColumnsNo(); i++){
            dropdownList.append(new Option(me.model.getColumnAt(i), i));
        }
        if(selectedOption !== -1){
            dropdownList[0].options[selectedOption].selected = true;
        }
    },
    /** 
     * Show the result row and hide the dropdown row
     */
    showResults: function(){
        var me = this;
        me.$columnSelectionRow.hide();
        me.$resultRow.show();
    }
});