/* ajaxRoute | Lucas Morales | http://github.com/lukedmor/ajaxRoute.js */
(function(){
	
	/* Create object to store saved routes */
	var R={};
	
	/* Function to reroute */
	function router () {
		
		try{
		/* Store route object and prepare request */
		var r = R[location.hash.slice(1)||'/']||R['/'],
			x = new XMLHttpRequest();
		}catch(e){throw "Undefined hash request, no fallback '/' hash defined"}
		x.onload = function(){

			/* remove active classes where relevant */
			if(typeof r.a=='string')Array.prototype.forEach.call(document.querySelectorAll(r.a+'.active'),function(i){i.classList.remove('active')});
			
			/* add active class to elements with id as an attribute */
			if(r.i)Array.prototype.forEach.call(document.querySelectorAll('['+r.i+']'),function(i){i.classList.add('active')});
			
			var s=this.responseText;
			/* run moustache on template response */
			/* adapted from jstemplate | Lucas Morales | http://github.com/lukedmor/jstemplate */
		    Array.prototype.forEach.call(document.querySelectorAll(r.d),function(e){
				e.innerHTML = new Function('o','var t=[];with(o){t.push("' +
					s.replace(/\s+/g, " ")
					 .replace(/"/g,'\\"')
					 .replace(/{{[^\!](.*?)}}/g, '",$1,"')
					 .split('{{!').join('");')
					 .split('}}').join('t.push("')
					 + '")}return t.join("");')(r.c||{});
			});
			/* run callback with controller as argument */
			r.f&&r.f(r.c);
		};
		/* Send Request */
		x.open("get", r.u);
		x.send();
	}
	window.addEventListener('hashchange', router);
	window.addEventListener('load', router);
	window.ajaxRoute=function(o){
		['url','hash','destination'].forEach(function(v){
			if(!o[v])throw 'Could not route: '+v+' not defined';
		});
		R[o.hash] = {i: o.bindActive, c: o.controller, f:o.callback, a:o.removeActive, d: o.destination, u:o.url}
	};
})();