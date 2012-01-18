$(function(){
	// render page on creation
	$("#subsPage").live('pagecreate', function(){
	    // render posts
		$("#subsTemplate").tmpl(iLepra.sub.list).appendTo("#subsList");
	});
});