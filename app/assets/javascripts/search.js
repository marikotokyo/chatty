$(document).on('turbolinks:load',function() {

var search_list = $("#chat-group-users")

function appendUser(users) {
  var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${ users.name }
                </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ users.id }" data-user-name="${ users.name }">
                        追加
                </a>
              </div>
              `
  search_list.append(html);
}

function appendNoUser(users) {
  var html = `
             <div class="chat-group-user clearfix">${ users }</div>
             `
  search_list.appen(html);
}

  $("#user-search-field").on("keyup", function() {
    var input_name = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input_name },
      dataType: 'json'
    })

    .done(function(users) {
      $("#chat-group-users").empty();
      if (users.length !== 0) {
        users.forEach(function(users){
          appendUser(users);
        });
      }
      else {
        appendNoUser("一致するユーザーがいません")
      }
    })
    .fail(function(){
      alert('失敗しました');
    })
  });
});

