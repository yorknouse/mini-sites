/*
Live Blogging for WordPress
Copyright (C) 2010 Chris Northwood <chris@pling.org.uk>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

var do_comments_update = true;
var queued_comments = '';

function live_blogging_handle_data(data)
{
    live_blogging_handle_entry(JSON.parse(data))

}

function live_blogging_poll(id)
{
    jQuery.post(
        live_blogging.ajaxurl,
        {
            action: 'live_blogging_poll',
            liveblog_id: id
        },
        function(entries) {
            for (entry in entries)
            {
                live_blogging_handle_entry(entries[entry])
            }
        },
        'json'
    )
    setTimeout(function(){live_blogging_poll(id)}, 15000)
}

function live_blogging_handle_entry(entry)
{
    var div_id = '#liveblog-entry-' + entry.id
    if ('entry' == entry.type)
    {
        if (0 == jQuery(div_id).length)
        {
            // Entry doesn't already exist
            if ('bottom' == live_blogging.update_effect)
            {
                jQuery('#liveblog-' + entry.liveblog).append('<div id="liveblog-entry-' + entry.id + '" class="liveblog-entry" style="display: none; position: absolute;">' + entry.html + '</div>');
            }
            else
            {
                jQuery('#liveblog-' + entry.liveblog).prepend('<div id="liveblog-entry-' + entry.id + '" class="liveblog-entry" style="display: none; position: absolute;">' + entry.html + '</div>');
            }
            jQuery(div_id).fadeTo(0, 0,
              function () {
                  // now the element is in DOM we can ask how big it is with height()
                  jQuery(this).css('margin-bottom', ((-1 * jQuery(div_id).height()) + 3) + 'px');
                  // now we have a good margin we can add the thing in properly.
                  jQuery(this).css('display', 'block');
                  jQuery(this).css('position', 'relative');
                  jQuery(this).animate({marginBottom: 0}, 1000, 'swing',
                                function () {jQuery(this).fadeTo('slowly', 1); });
              });
            // NOUSE ADDED
            live_blogging_update_counter('updates');
            // END NOUSE
        }
        else
        {
            jQuery(div_id).html(entry.html);
        }
    }
    else if ('delete-entry' == entry.type)
    {
        jQuery(div_id).empty();
    }
    else if ('comments' == entry.type)
    {
        if (do_comments_update)
        {
            // NOUSE ADDED/CHANGED
            var el = jQuery('#comment-'+entry.id);
            if (0 == el.length)
            {
                if (entry.html != '')
                {
                    el = jQuery(entry.html);
                    jQuery('em.comment-awaiting-moderation + br', el).remove();
                    jQuery('em.comment-awaiting-moderation', el).remove();
                    jQuery('a.comment-edit-link', el).remove();
                    jQuery('.commentlist').prepend(el);
                    el.fadeTo(0, 0,
                      function () {
                          el.css('margin-bottom', ((-1 * el.height()) + 3) + 'px');
                          el.css('display', 'block');                          el.css('position', 'relative');
                          el.animate({marginBottom: 0}, 1000, 'swing',
                                        function () { el.fadeTo('slowly', 1); });
                      });
                    live_blogging_update_counter('comments');
                }
            }
            else
            {
                el.replaceWith(entry.html);
            }
            // END NOUSE
            setup_toggle_comment_updating()
        }
        else
        {
            queued_comments = entry.html
        }
    }
}

function setup_toggle_comment_updating()
{
    jQuery('.comment-reply-link').click(function(){
        do_comments_update = false
        jQuery('#cancel-comment-reply-link').click(function(){
            do_comments_update = true
            if ('' != queued_comments)
            {
                jQuery('.commentlist').html(queued_comments)
                queued_comments = ''
                setup_toggle_comment_updating()
            }
        })
    })
}

jQuery(setup_toggle_comment_updating)

