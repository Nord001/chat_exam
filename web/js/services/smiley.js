define([''], function() {
	var emoticons = {
		":\\)"          : '0101.gif',
		':\\('          : '0102.gif',
		':D'            : '0103.gif',
		'\\(cool\\)'    : '0104.gif',
		':O'            : '0105.gif',
		';\\)'          : '0106.gif',
		';\\('          : '0107.gif',
		':$'            : '0204.gif',
		'\\(facepalm\\)': '0406.gif',
		'\\(devil\\)'   : '0407.gif',
		'\\(angel\\)'   : '0408.gif',
		'\\(rock\\)'    : '1106.gif'
	}

	//replacing emoticons re to gif's
	return function(msg) {
		for (var i in emoticons) {
			var re = new RegExp(i, "g");
			msg = msg.replace(re, "<img src='/img/smiles/" + emoticons[i] + "'>");
		}
		
		return msg;
	}
});