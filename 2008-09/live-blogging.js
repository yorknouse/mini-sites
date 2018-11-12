var do_comments_update=true;var queued_comments='';function live_blogging_handle_data(data)
{live_blogging_handle_entry(JSON.parse(data))}
function live_blogging_poll(id)
{jQuery.post(live_blogging.ajaxurl,{action:'live_blogging_poll',liveblog_id:id},function(entries){for(entry in entries)
{live_blogging_handle_entry(entries[entry])}},'json')
setTimeout(function(){live_blogging_poll(id)},15000)}
function live_blogging_handle_entry(entry)
{var div_id='#liveblog-entry-'+ entry.id
if('entry'==entry.type)
{if(0==jQuery(div_id).length)
{if('bottom'==live_blogging.update_effect)
{jQuery('#liveblog-'+ entry.liveblog).append('<div id="liveblog-entry-'+ entry.id+'" class="liveblog-entry" style="display: none; position: absolute;">'+ entry.html+'</div>');}
else
{jQuery('#liveblog-'+ entry.liveblog).prepend('<div id="liveblog-entry-'+ entry.id+'" class="liveblog-entry" style="display: none; position: absolute;">'+ entry.html+'</div>');}
jQuery(div_id).fadeTo(0,0,function(){jQuery(this).css('margin-bottom',((-1*jQuery(div_id).height())+ 3)+'px');jQuery(this).css('display','block');jQuery(this).css('position','relative');jQuery(this).animate({marginBottom:0},1000,'swing',function(){jQuery(this).fadeTo('slowly',1);});});live_blogging_update_counter('updates');}
else
{jQuery(div_id).html(entry.html);}}
else if('delete-entry'==entry.type)
{jQuery(div_id).empty();}
else if('comments'==entry.type)
{if(do_comments_update)
{var el=jQuery('#comment-'+entry.id);if(0==el.length)
{if(entry.html!='')
{el=jQuery(entry.html);jQuery('em.comment-awaiting-moderation + br',el).remove();jQuery('em.comment-awaiting-moderation',el).remove();jQuery('a.comment-edit-link',el).remove();jQuery('.commentlist').prepend(el);el.fadeTo(0,0,function(){el.css('margin-bottom',((-1*el.height())+ 3)+'px');el.css('display','block');                          el.css('position', 'relative');
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

