var LaunchControl = function() {
  let public = {
    formatId: element => {
      let id = element.value.replace(/\D/g, "");
      if (id.length == 0) {
        element.value = "";
      } else {
        element.value = id.substring(0,6);
      }
    }
  }
  
  return public;
}();
