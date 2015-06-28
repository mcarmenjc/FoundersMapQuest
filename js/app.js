/*global Backbone */

var app = app || {};

app.Rows = new app.RowCollection();
var file = new app.FileModel();
$(function () {
    new app.FileView({model: file});
});