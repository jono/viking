// textField(model, attribute, options)
// ====================================
//
// Returns an input tag of the "text" type tailored for accessing a specified
// attribute on a model. Additional options on the input tag can be passed as
// a hash with options. These options will be tagged onto the HTML as an HTML
// element attribute as in the example shown.
//
// Examples
// ========
//   text_field(post, "title", {size: 20})
//   // => <input id="post_title" name="post[title]" size="20" type="text" value="title">
//   
//   text_field(post, "title", {class: "create_input"})
//   // => <input class="create_input" id="post_title" name="post[title]" type="text" value="title">
Viking.View.Helpers.textField = function (model, attribute, options) {
    var name = Viking.View.tagNameForModelAttribute(model, attribute);
    
    if (options === undefined) { options = {}; }
    Viking.View.addErrorClassToOptions(model, attribute, options);
    
    return Viking.View.Helpers.textFieldTag(name, model.get(attribute), options);
};