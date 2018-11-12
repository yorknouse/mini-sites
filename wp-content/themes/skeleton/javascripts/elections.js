jQuery(document).ready(function ($) {

    // applies fancy horizontal-scroll-on-mouse-movement behaviour to all elements matched by the selector
    // with a slightly janky fallback for devices without mice
    function fancyScroll(selector) {

        $(selector).css({overflow: 'hidden'});

        $(selector).mousemove(function (event) {
            var x = event.pageX - $(this).offset().left,
                width = $(this).outerWidth(),
                scroll_width = $(this)[0].scrollWidth,
                scroll_left = $(this).scrollLeft(),
                distance_from_left,
                distance_from_right,
                scroll_time;

            if (x < width * 0.2) {
                distance_from_left = x;
                scroll_time = scroll_left * (2 + 3 * (distance_from_left / (width * 0.2)));
                scroll_time = Math.round(scroll_time);
                $(this).animate({ scrollLeft: 0 }, scroll_time, 'linear');
            } else if (x > width * 0.8) {
                distance_from_right = width - x;
                scroll_time = (scroll_width - scroll_left) * (2  + 3 * (distance_from_right / (width * 0.2)));
                scroll_time = Math.round(scroll_time);
                $(this).animate({ scrollLeft: scroll_width }, scroll_time, 'linear');
            } else {
                $(this).stop(true);
            }
        });

        $(selector).on('touchstart', function () { // detect touchscreen devices which presumably don't have mice
            $(this).off('mousemove');
            $(this).css({overflow: 'auto'});
        });

        $(selector).on('mouseout mousedown', function () {
            $(this).stop(true);
        });
    }


    if ($('.candidates-thumbnails').length) { // /elections/ front page OR part-time candidates page
        fancyScroll('.candidates-thumbnails');
    }

    if (document.getElementById('candidates-lists')) { // /elections/ front page
            
        $('#candidates-lists h2').hide();

        showCandidates('yusu-president'); // (also hides other positions)
    
    }/* else if ($('#sidebar .vote').length) {

        function nouse_post_vote(post_id, direction) {
            // selector strings
            var bothlinks = '#sidebar p.vote button',
                link = '#sidebar p.vote button.vote-' + direction,
                span = link + ' span';

            $(bothlinks).attr('disabled', 'disabled').unbind('click');
            $(link).addClass('clicked');
            $(span).text(parseInt($(span).text(), 10) + 1);

            $.post(
                nouse_comment_voting.ajax_url,
                {
                    'action':    'nouse_post_vote',
                    'post':      post_id,
                    'direction': direction
                },
                null,
                'text'
            );
        }

        var post_id = $('div.single').attr('id').substring(5);

        $.post(
            nouse_comment_voting.ajax_url,
            {
                'action':  'nouse_get_post_votes',
                'post_id': post_id
            },
            function (response) {

                console.log(response);

                $('#sidebar .vote').html(function () {

                    var html = '<button class="vote-up" disabled><i class="fa fa-thumbs-up"></i> <span>';
                    html += response.up;
                    html += '</span></button><button class="vote-down" disabled><i class="fa fa-thumbs-down"></i> <span>';
                    html += response.down;
                    html += '</span></button>';
                    return html;

                }).each(function () {

                    switch (response.voted) {
                    case 'up':
                        $(this).find('.vote-up').addClass('clicked');
                        break;
                    case 'down':
                        $(this).find('.vote-down').addClass('clicked');
                        break;
                    default:
                        $(this).find('button').removeAttr('disabled');
                        $(this).find('button.vote-up').click(function () {
                            nouse_post_vote(post_id, 'up');
                        });
                        $(this).find('button.vote-down').click(function () {
                            nouse_post_vote(post_id, 'down');
                        });
                        break;
                    }

                });

            },
            'json'
        );

    }*/

});

function showCandidates(slug) {
    var catarray = ['yusu-president', 'academic-officer', 'welfare-officer', 'york-sport-president', 'activities-officer', 'community-and-wellbeing-officer'];
    for (var cat in catarray) {
        if (window.document.getElementById('candidates-' + catarray[cat])) {
            if (catarray[cat] !== slug) {
                window.document.getElementById('candidates-' + catarray[cat]).style.display = 'none';
                window.document.getElementById('selector-' + catarray[cat]).className = '';
            } else {
                window.document.getElementById('candidates-' + catarray[cat]).style.display = 'block';
                window.document.getElementById('selector-' + catarray[cat]).className = 'selected';
            }
        }
    }
}