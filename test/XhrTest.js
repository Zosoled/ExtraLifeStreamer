Test.file("../js/Xhr.js");

Test.method(function connectionAttempted() {
	Xhr.get('https://api.github.com', function(response) {
		Test.assertTrue(response);
	});
});
