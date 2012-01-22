$(function(){
	// render page on creation
	$("#mystuffPage").live('pagecreate', function(){
		// render posts
		$("#mystuffTemplate").tmpl(iLepra.myStuffPosts, {
			image: function(){ 
				var imgReg = /img src="(.+?)"/g
				var res = imgReg.exec(this.data.body);
				var img = "";
				if( res != null ){ 
					img = "http://src.sencha.io/80/80/"+res[1];
				}else{
					img = "../css/img/placeholder.png";
				}
				return img;
			},
			text: function(){
				return this.data.body.replace(/(<([^>]+)>)/ig," ").substr(0, 128) + "...";
			},
			wrote: function(){
			    return this.data.wrote.replace(/(<([^>]+)>)/ig," ");
			}
		}).appendTo("#mystuffList");
	});
});