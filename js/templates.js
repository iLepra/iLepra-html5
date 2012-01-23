var postTemplate = '\
            <li>\
				<a href="#" class="postListItem" data-id="<%= id %>">\
					<% if(iLepra.config.loadImages){ %><img src="<%= image %>" class="postThumb" /><% } %>\
					<h1><%= text %></h1>\
					<p>Написал <%= user_rank %> <%= login %></p>\
					<p><%= textdate %> <%= posttime %> <% if(domain_url != ""){ %> / <%= domain_url %> <% } %></p>\
					<p>Комментарии: <%= comm_count %> / <i><%= unread %></i></p>\
					<p class="ui-li-count"><%= rating %></p>\
				</a>\
			</li>';
			
			
var mystuffTemplate = '\
            <li>\
				<a href="#" class="postListItem" data-id="<%= id %>">\
					<% if(iLepra.config.loadImages){ %><img src="<%= image %>" class="postThumb" /><% } %>\
					<h1><%= text %></h1>\
					<p><%= wroteText %></p>\
					<p><%= comments %></i></p>\
					<p class="ui-li-count"><%= rating %></p>\
				</a>\
			</li>';
			
var inboxTemplate = '\
            <li>\
				<a href="#" class="postListItem" data-id="<%= id %>">\
					<% if(iLepra.config.loadImages){ %><img src="<%= image %>" class="postThumb" /><% } %>\
					<h1><%= text %></h1>\
					<p><%= wrote %></p>\
					<p><%= comments %></i></p>\
				</a>\
			</li>';
			
var favsTemplate = '\
            <li>\
                <a href="#" class="postListItem" data-id="<%= id %>">\
                    <% if (iLepra.config.loadImages){ %><img src="<%= image %>" class="postThumb" /><% } %>\
                    <h1><%= text %></h1>\
                    <p><%= wrote %></p>\
                    <p><%= comments %></i></p>\
                    <p class="ui-li-count"><%= rating %></p>\
                </a>\
            </li>';
            
var subpostTemplate = '\
            <li>\
                <a href="#" class="postListItem" data-id="<%= id %>">\
                    <% if (iLepra.config.loadImages){ %><img src="<%= image %>" class="postThumb" /><% } %>\
                    <h1><%= text %></h1>\
                    <p><%= wrote.replace(/<[^>]+>/g, "") %></p>\
                    <p><%= comments %></i></p>\
                    <p class="ui-li-count"><%= rating %></p>\
                </a>\
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
			<li <% if (isNew == 1){ %>data-theme="d"<% } %> >\
				<a>\
					<p class="commentText"><%= text %></p>\
					<p><%= wrote %></p> \
					<p class="ui-li-count"><%= rating %></p>\
				</a>\
				<a href="#" class="postCommentItemMenu" data-id="<%= id %>" data-user="<%= user %>">split</a>\
			</li>';
			
var chatTemplate = '\
            <li>\
                <a href="#" class="chatMessage" data-user="<%= user_login %>">\
                    <h1 class="commentText"><%= body %></h1>\
                    <p><%= user_login %></p>\
                    <p class="ui-li-count"><%= createdate %></p>\
                </a>\
            </li>';