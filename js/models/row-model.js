/* global Backbone */
/* global google */

var app = app || {};

/**
 * @class RowModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.RowModel = Backbone.Model.extend(/** @lends RowModel.prototype */ {
	/** 
     * @constructs RowModel object
     */
	 initialize: function(attributes){
	 	var me = this;
	 	me.set('hide', false);
	 	me.set(attributes);
	 },
	 /** 
     * Set value of hide property to !hide, to show or hide the marker on the map
     */
	 toggle: function(){
	 	var me = this;
	 	me.set('hide', !me.get('hide'));
	 	if (me.get('hide')){
	 		me.hideMarker();
	 	}
	 	else{
	 		me.showMarker();
	 	}
	 },
	 /** 
     * Get if the row is hidden from the map or not
     * @returns {boolean} True if the row is hidden and false if not
     */
	 isHidden: function(){
	 	return this.get('hide');
	 },
	 /** 
     * Hide the marker from the map, removing value of the map property of the marker
     */
	 hideMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(null);
	 },
	 /** 
     * Set map property of the marker, to make it visible again
     */
	 showMarker: function(){
	 	var me = this,
	 		marker = me.get('googleMarker');
	 	marker.setMap(me.get('googleMap'));
	 },
	 /** 
     * Initialise googleMarker property
     * @param {string} latitude Latitude name property
     * @param {string} longitude Longitude name property
     * @param {string} marker Marker name property (empty value is no marker defined)
     * @param {Object} googleMap Map where the marker is going to be displayed
     */
	 createGoogleMarker: function(latitude, longitude, marker, googleMap){
	 	var me = this,
	 		title = '',
	 		gMarker;
	 	if (marker !== 'empty'){
	 		title = title + me.get(marker);
	 	}
	 	gMarker = new google.maps.Marker({
            position: new google.maps.LatLng(me.get(latitude), me.get(longitude)),
            map: googleMap,
            title: title
        });
        me.set('googleMap', googleMap);
	 	me.set('googleMarker', gMarker);
	 }
}); 