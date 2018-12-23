var Test = (function() {
	let testSuite = new Set();
	let successes = new Set();
	let failures = new Set();
	
	window.addEventListener('error', function(e) {
		failures.add(e);
		console.error("Error: " + e.message + "\n\tat " + e.filename + ":" + e.lineno + "\n" + e);
		e.preventDefault();
	});
	
	let pub = {
		file: (filepath) => {
			let x = document.createElement('script');
			x.src = filepath;
			document.head.appendChild(x);
		},
		
		method: (testMethod) => {
			testSuite.add(testMethod);
		},
		
		assert: (expected, actual) => {
			let msg = 'Expected ' + expected + '. Actual was ' + actual;
			if (expected == actual) {
				successes.add(msg);
			} else {
				failures.add(msg);
				console.error(msg);
			}
		},
		
		assertTrue: (actual) => {
			let msg = 'Expected true. Actual was ' + actual;
			if (actual) {
				successes.add(msg);
			} else {
				failures.add(msg);
				console.error(msg);
			}
		}
	}
	
	pub.run = () => {
		for (let t of testSuite) {
			t();
		}
		(function finish() {
			if (successes.size + failures.size < testSuite.size) {
				timeoutId = setTimeout(finish, 1000);
			} else if (failures.size == 0) {
				let passMessage = document.createElement('h1');
				passMessage.style = "background-color:#def; border: 0 solid #def; border-width: 0 1em; color:#00f";
				passMessage.innerText = "Tests Pass";
				document.body.append(passMessage);
			} else {
				let failCount = document.createElement('h2');
				failCount.style = "background-color:#fed; border: 0 solid #fed; border-width: 0 1em; color:#f00";
				failCount.innerText = "Failures: " + failures.size;
				document.body.append(failCount);
				for (let f of failures) {
					let failMessage = document.createElement('p');
					failMessage.style = "background-color:#fed; border: 0 solid #fed; border-width: 0 1em; color:#f00";
					failMessage.innerText = f.message;
					document.body.append(failMessage);
				}
			}
		})();
	}

	return pub;
}());
