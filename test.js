var js = require("./dist/lib");

//I test updates here...
(() => {
  var errors = new js.Errors();
  errors.addError("Error message 1");
  errors.addError("Error message 2");

  send(errors);

  function send(errors) {
    // Here could be real POST request
    receive(errors.exportErrors());
  }
  function receive(res) {
    var errors = new js.Errors();
    errors.importErrors(res);

    console.log(errors.getErrors());
  }
})();