$(function(){
	// render page on creation
	$("#inboxPage").live('pagecreate', function(){
		// render posts
		$("#inboxTemplate").tmpl(iLepra.inboxPosts, {
			image: function(){ 
				var imgReg = /img src="(.+?)"/g
				var res = imgReg.exec(this.data.body);
				var img = "";
				if( res != null ){ 
					img = res[1];
				}else{
					img = "../css/img/placeholder.png";
				}
				return img;
			},
			text: function(){
				return this.data.body.replace(/(<([^>]+)>)/ig," ").substr(0, 128) + "...";
			}
		}).appendTo("#inboxList");
	});
});