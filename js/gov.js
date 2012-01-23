$(window).load(function(){
	// render page on creation
	$("#govPage").live('pagecreate', function(){
	    // render posts
		$("#president").html(
		    "<a href='#' class='username'>"+iLepra.gov.president + "</a> - " + iLepra.gov.time
		);
	});
});