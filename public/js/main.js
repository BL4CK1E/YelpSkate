// Remove Alert box after login fail
var alertBox = document.getElementById('alert');

setTimeout( function() {
    alertBox.outerHTML = "";
}, 5000);



// DOM Elements
var eventForm = document.getElementById('event-add-form');
var addEventEditor = document.getElementById('event-add-form-information-editor');
var addEventTextArea = document.getElementById('event-add-form-information-textarea');

// Editor Inits
var alloyEditor = AlloyEditor.editable('event-add-form-information-editor');
var content = alloyEditor.get('nativeEditor').getData();

eventForm.addEventListener('keypress', function(){
    var content = alloyEditor.get('nativeEditor').getData();
    return addEventTextArea.value = content;
})