$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var imagehtml = (message.image)? `<img class = "lower-message__image">` : "";
    var html =
      `<div class="message" data-message-id = "${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name" >
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-meesage">
          <p class="lower-message__content">
            ${message.content}
          </P>
        </div>
            ${imagehtml}
      </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop("disabled", false);
    })
    .fail(function(){
      alert('error');
    })
  });
});
