(function () {
    module("Viking.Model#paramRoot");

    test("instance.paramRoot returns underscored modelName", function() {
        var Model = Viking.Model.extend('model');
        var model = new Model();
    
        equal(model.paramRoot(), 'model');
    });
    
    test("instance.paramRoot returns underscored baseModel.modelName when used as STI", function() {
        var Boat = Viking.Model.extend('boat');
        var Carrier = Boat.extend('boat');
        var model = new Carrier();
    
        equal(model.paramRoot(), 'boat');
    });

}());