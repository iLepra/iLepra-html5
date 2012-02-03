var postTemplate = '\
            <li data-icon="false">\
				<a href="#" class="postListItem" data-id="<%= id %>">\
					<% if(iLepra.config.loadImages && image.length > 0){ %>\
					<img src="<%= image %>" class="postThumb" />\
					<% } %>\
					<h3 style="white-space:normal; font-weight:normal;"><%= text %></h3>\
					<p><% if(domain_url != ""){ %><%= domain_url %> <% } %></p>\
				</a>\
			</li>\
			<li data-role="list-divider" class="postInfo">\
				<img />\
				<b><%= user %></b>, \
				<span style="font-size:80%;"><img src="../css/img/comment_16.png" class="iconImage" /> <%= comments %>,\
				<%= when %></span>\
				<% if(rating != undefined && rating.length > 0 && rating != 0){ %>, \
			        <span style="font-weight: bold; color: \
					<% if( rating >= 0 ){ %>lawngreen<% }else{ %>\
						white<% } %>\
					"><%= rating %></span> \
			    <% } %>\
			</li>';
			            
var subsTemplate = '\
            <li>\
                <a href="#" class="subListItem" data-link="<%= link %>">\
                    <% if(iLepra.config.loadImages){ %><img src="<%= logo %>" class="postThumb" /><% } %>\
                    <h1><%= name %></h1>\
                    <p><%= creator %></p>\
                </a>\
            </li>';
			
var commentTemplate = '\
			<li data-id="<%= id %>" data-user="<%= user %>" <% if (isNew == 1){ %>data-theme="d"<% } %> >\
				<p class="commentText"><%= text %></p>\
				<div style="display:none;" class="commentsMenu">\
					<a href="#" class="reply"><img src="../css/img/reply_32.png" /></a>\
					<a href="#" class="voteup" style="float:right;"><img src="../css/img/voteup_32.png" /></a>\
					<a href="#" class="votedown" style="float:right;"><img src="../css/img/votedown_32.png" /></a>\
				</div>\
			</li>\
			<li data-role="list-divider" class="postInfo">\
				<img />\
				<b><%= user %></b>, \
				<%= when %></span>\
				<% if(rating != undefined && rating.length > 0 && rating != 0){ %>, \
			        <span style="font-weight: bold; color: \
					<% if( rating >= 0 ){ %>lawngreen<% }else{ %>\
						white<% } %>\
					"><%= rating %></span> \
			    <% } %>\
			</li>';
			
var chatTemplate = '\
            <li>\
                <a href="#" class="chatMessage" data-user="<%= user_login %>">\
                    <h1 class="commentText"><%= body %></h1>\
                    <p><%= user_login %></p>\
                    <p class="ui-li-count"><%= createdate %></p>\
                </a>\
            </li>';