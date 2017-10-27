var Test = (function() {
  let testSuite = new Set();
  let failures = new Set();
  
  window.addEventListener('error', function(e) {
    failures.add(e);
    console.error("Error: " + e.message + "\n\tat " + e.filename + ":" + e.lineno);
    e.preventDefault();
  });
  
  let pub = {
    file: filepath => {
      let x = document.createElement('script');
      x.src = filepath;
      document.head.appendChild(x);
    },
    
    method: testMethod => {
      testSuite.add(testMethod);
    },
    
    assert: (expected, actual) => {
      if (expected != actual) {
        let msg = 'Expected ' + expected + '. Actual was ' + actual;
        let e = new Error(msg);
        failures.add(e);
        console.error(e);
      }
    }
  }
  
  pub.run = () => {
    for (let t of testSuite) {
      t();
    }
    if (failures.size == 0) {
      console.log("%cTests Pass", "background-color:#def; border: 0 solid #def; border-width: 0 1em; color:#00f");
    }
  }
  
  return pub;
}());
