(function () {
    module("Viking.model::extend");

    // setting attributes on a model coerces relations
    test("::extend acts like normal Backbone.Model", function() {
        var Model = Viking.Model.extend({key: 'value'}, {key: 'value'});
        
        equal(Model.key, 'value');
        equal((new Model()).key, 'value');
    });
    
    test("::extend with modelName", function() {
        var Model = Viking.Model.extend('model');
    
        equal(Model.modelName, 'model');
        equal((new Model()).modelName, 'model');
    });
    
    test("::extend initalizes the assocations", function() {
        var Model = Viking.Model.extend();
        
        deepEqual(Model.associations, {});
    });
    
    test("::extend adds hasMany relationships to associations", function() {
        Ship = Viking.Model.extend({ hasMany: ['ships'] });
        
        equal(Ship.associations['ships'].name, 'ships');
        equal(Ship.associations['ships'].macro, 'hasMany');
        deepEqual(Ship.associations['ships'].options, {});
        equal(Ship.associations['ships'].collectionName, 'ShipCollection');
        
        delete Ship;
    });
    
    test("::extend adds hasMany relationships with options to associations", function() {
        Ship = Viking.Model.extend({ hasMany: [['ships', {collection: 'MyCollection'}]] });
        
        equal(Ship.associations['ships'].name, 'ships');
        equal(Ship.associations['ships'].macro, 'hasMany');
        deepEqual(Ship.associations['ships'].options, {collection: 'MyCollection'});
        equal(Ship.associations['ships'].collectionName, 'MyCollection');
        
        delete Ship;
    });
    
    test("::extend adds belongsTo relationships to associations", function() {
        Ship = Viking.Model.extend({ belongsTo: ['ship'] });
        
        equal(Ship.associations['ship'].name, 'ship');
        equal(Ship.associations['ship'].macro, 'belongsTo');
        deepEqual(Ship.associations['ship'].options, {});
        equal(Ship.associations['ship'].modelName, 'Ship');
        
        delete Ship;
    });
    
    test("::extend adds belongsTo relationships with options to associations", function() {
        Ship = Viking.Model.extend({ belongsTo: [['ship', {model: 'Carrier'}]] });
        
        equal(Ship.associations['ship'].name, 'ship');
        equal(Ship.associations['ship'].macro, 'belongsTo');
        deepEqual(Ship.associations['ship'].options, {model: 'Carrier'});
        equal(Ship.associations['ship'].modelName, 'Carrier');
        
        delete Ship;
    });
    
    // STI
    // ========================================================================
    
    test("::extend a Viking.Model unions the hasMany relationships", function () {
        Key = Viking.Model.extend('key');
        Comment = Viking.Model.extend('comment');
        Account = Viking.Model.extend('account', { hasMany: ['comments'] });
        Agent   = Account.extend('agent', { hasMany: ['keys'] });
        
        deepEqual(['comments'], _.map(Account.associations, function(a) { return a.name; }));
        deepEqual(['comments', 'keys'], _.map(Agent.associations, function(a) { return a.name; }).sort());
        
        delete Key;
        delete Comment;
        delete Account;
        delete Agent;
    });
    
    test("::extend a Viking.Model unions the belongsTo relationships", function () {
        State = Viking.Model.extend('state');
        Region = Viking.Model.extend('region');
        Account = Viking.Model.extend('account', { belongsTo: ['state'] });
        Agent   = Account.extend('agent', { belongsTo: ['region'] });
        
        deepEqual(['state'], _.map(Account.associations, function(a) { return a.name; }));
        deepEqual(['region', 'state'], _.map(Agent.associations, function(a) { return a.name; }).sort());
        
        delete State;
        delete Region;
        delete Account;
        delete Agent;
    });
    
    test("::extend a Viking.Model unions the coercions", function () {
        Account = Viking.Model.extend('account', { coercions: {
            created_at: 'Date'
        }});
        
        Agent   = Account.extend('agent', { coercions: {
            name: 'String'
        }});
        
        deepEqual(Account.prototype.coercions, {created_at: 'Date'});
        deepEqual(Agent.prototype.coercions, {created_at: 'Date', name: 'String'});
        
        delete Account;
        delete Agent;
    });
    
    test("::extend a Viking.Model adds itself to the descendants", function () {
        Account = Viking.Model.extend('account');
        Agent   = Account.extend('agent');

        deepEqual(Account.descendants, [Agent]);
        deepEqual(Agent.descendants, []);
        
        delete Account;
        delete Agent;
    });
    
}());