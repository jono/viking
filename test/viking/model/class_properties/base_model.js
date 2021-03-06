(function () {
    module("Viking.Model::baseModel");

    test("::baseModel get's set to self when extending Viking.Model", function() {
        var Ship = Viking.Model.extend();
    
        strictEqual(Ship, Ship.baseModel);
    });
    
    test("::baseModel get's set to parent Model when extending a Viking.Model", function() {
        var Ship = Viking.Model.extend();
        var Carrier = Ship.extend();
    
        strictEqual(Ship, Carrier.baseModel);
    });

}());