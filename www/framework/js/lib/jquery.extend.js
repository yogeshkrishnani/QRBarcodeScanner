$.fn.setOptions = function( options, append ) {
    return this.each(function() {
    	var component = $(this)[0];
    	var componentType = component.tagName.toLowerCase();
    	var isDropDown = (componentType == "select");
    	if( isDropDown ) {
    		if(!append) {
    			component.innerHTML = "";
    		}
            for( var index=0; index < options.length; index++ ) {
            	
            	var opt = document.createElement('option');
            	
            	if (typeof options[index] == 'object') {
            		if(!options[index].value){
               			 options[index].value = options[index].label;
               		 }
            		
            		 var optLabel = options[index].label;
            		 opt.innerHTML = optLabel;
            		 delete options[index].label;
            		 
            		 $.each(options[index], function(key, val){
            			 opt.setAttribute(key, val);
            		 });
				}
            	else {
            		var optLabel = options[index];
            		var optValue = options[index];
            		opt.innerHTML = optLabel;
					opt.value = optValue;
            	}

            	component.appendChild(opt);
            }
    	}
    });
};

$.fn.isEmpty = function() {
	var value =  $(this).val();
	if(value) {
		return value.trim() == "";
	}
	else {
		return true;
	}
};