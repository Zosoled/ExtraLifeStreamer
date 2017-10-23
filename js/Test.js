var Test = (function() {
  var testSuite = new Set();
  var failures = new Set();
  
  window.addEventListener('error', function(e) {
    failures.add(e);
    console.error("Error: " + e.message + "\n\tat " + e.filename + ":" + e.lineno);
    e.preventDefault();
  });
  
  var pub = {
    file: filepath => {
      var x = document.createElement('script');
      x.src = filepath;
      document.head.appendChild(x);
    },
    
    method: testMethod => {
      testSuite.add(testMethod);
    },
    
    assert: (expected, actual) => {
      if (expected != actual) {
        var msg = 'Expected ' + expected + '. Actual was ' + actual;
        var e = new Error(msg);
        failures.add(e);
        console.error(e);
      }
    }
  }
  
  pub.run = () => {
    for (var t of testSuite) {
      t();
    }
    if (failures.size == 0) {
      console.log("%cTests Pass", "background-color:#def; border: 0 solid #def; border-width: 0 1em; color:#00f");
    }
  }
  
  return pub;
}());
