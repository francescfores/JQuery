var EnterKey = 13;

$.fn.isBound = function(type, fn) {
    var data = this.data('events')[type];

    if (data === undefined || data.length === 0) {
        return false;
    }

    return (-1 !== $.inArray(fn, data));
};

$(document).ready(function() {
    function runBind() {
        $('.destroy').on('click', function(e) {
            $currentListItem = $(this).closest('li');

            $currentListItem.remove();
        });

        $('.toggle').on('click', function(e) {
            var $currentListItemLabel = $(this).closest('li').find('label');
            /*
             * Do this or add css and remove JS dynamic css.
             */
            if ( $currentListItemLabel.attr('data') == 'done' ) {
                $currentListItemLabel.attr('data', '');
                $currentListItemLabel.css('text-decoration', 'none');
            }
            else {
                $currentListItemLabel.attr('data', 'done');
                $currentListItemLabel.css('text-decoration', 'line-through');
            }
        });
    }
    var num = 0;
    $todoList = $('#todo-list');
    $('#new-todo').keypress(function(e) {
        if (e.which === EnterKey) {
            $('.destroy').off('click');
            $('.toggle').off('click');
            var todos = $todoList.html();

            todos += ""+
                "<li>" +
                "<div class='view'>" +
                "<input class='toggle' type='checkbox'>" +
                "<input id='' class='insert' type='text' style='display:none;'>" +
                "<label  class='edited' data=''>" + " " + $('#new-todo').val();  + "</label>" +
                "<a class='destroy'></a>" +
                "</div>" +
                "</li>";

            $(this).val('');
            $todoList.html(todos);
            runBind();
            $('#main').show();

            $('.toggle').click( function (){
                $(this).attr("value","true");
                $(this).prop( "checked", true );
            });
            $('.view').dblclick( function (){
                    $(this).find('.insert').show();
                    $(this).find('.edited').hide();
                    $(this).find('.toggle').hide();
                $('.view').keypress(function(e) {
                    if (e.which === EnterKey) {
                        $(this).find('.insert').hide();
                        $(this).find('.edited').show();
                        $(this).find('.toggle').show();
                        $(this).find('.edited').text($(this).find('.insert').val());
                    }
                });
            });


        }}); // end if
    $('#clear-completed').click( function () {
        $('#todo-list').remove();
    });

    $('#completed').click( function () {
        alert("Ee");
    });
});
