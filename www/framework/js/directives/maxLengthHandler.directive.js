angular.module(config.appDirectives).directive('maxLengthHandler', function() {
	
	return {
		
		restrict: 'A',
		link: function (scope, element, attrs) {
			var max_chars = parseInt($(element).attr("maxlength"));
			var type =  $(element).attr("type");
			
			var VALID_KEY = false;
			
			if( !isNaN(max_chars)  ) {
				$(element).keydown( function(e){
					
					if(e.which == 8 || e.which == 46) { // 8 for backspace and 46 for delete
						VALID_KEY =  true;
					}
					else {
						if(type == "number") {
							if(e.which == 69) {  //69 for 'e' in input number (exponential)
								VALID_KEY = false;
							}
							else if($(this).val().replace(/[^0-9]/g,'').length >= max_chars) {
								VALID_KEY = false;
							}
							else {
								VALID_KEY = true;
							}
						}
						else {
							if($(this).val().length >= max_chars) {
								VALID_KEY =  false;
							}
							else {
								VALID_KEY =  true;
							}
						}
					}
					
					return VALID_KEY;
					
				});
				$(element).keyup( function(e){
					if ( $(this).val().isEmpty() ) {
						$(this).val("");
					}
					else if(type == "number") {
						if( !VALID_KEY || e.which == 69 || $(this).val().replace(/[^0-9]/g,'').length >= max_chars) {  //69 for 'e' in input number (exponential)
							/* Even when you see invalid value in HTML view, when you get value of it using val method, 
							It will return a valid value. 
							i.e On HTML Page : 01234.  
							val function will return 01234 (dot is ignored)*/
							var validValue = $(this).val().substr(0, max_chars); 
							$(this).val("").val(validValue);
						}
					}
					else {
						if ( $(this).val().length >= max_chars ) {
							$(this).val($(this).val().substr(0, max_chars));
						}
					}
					/* Default change was not getting fired, so manually triggering change event, 
					 * so onchange events can listen(i.e labelUp directive). */
					$(this).trigger("change"); 
				});
			}
		}
	};
    
});
