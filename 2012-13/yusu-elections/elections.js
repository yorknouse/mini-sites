jQuery(document).ready(function($){if($('#candidates-marquee').length){$('#candidates-marquee ul').css({overflow:'hidden'});$('#candidates-marquee').mousemove(function(event){var x=event.pageX-$(this).offset().left,width=$(this).outerWidth(),scroll_width=$('#candidates-marquee ul')[0].scrollWidth,scroll_left=$('#candidates-marquee ul').scrollLeft(),distance_from_left,distance_from_right,scroll_time;if(x<width*0.2){distance_from_left=x;scroll_time=scroll_left*(2+3*(distance_from_left/(width*0.2)));scroll_time=Math.round(scroll_time);$('#candidates-marquee ul').animate({scrollLeft:0},scroll_time,'linear');}else if(x>width*0.8){distance_from_right=width-x;scroll_time=(scroll_width-scroll_left)*(2+3*(distance_from_right/(width*0.2)));scroll_time=Math.round(scroll_time);$('#candidates-marquee ul').animate({scrollLeft:scroll_width},scroll_time,'linear');}else{$('#candidates-marquee ul').stop(true);}});$('#candidates-marquee').on('touchstart',function(){$(this).off('mousemove');$('#candidates-marquee ul').css({overflow:'auto'});});$('#candidates-marquee').on('mouseout mousedown',function(){$('#candidates-marquee ul').stop(true);});}else if($('#sidebar .vote').length){function nouse_post_vote(post_id,direction){var bothlinks='#sidebar p.vote button',link='#sidebar p.vote button.vote-'+direction,span=link+' span';$(bothlinks).attr('disabled','disabled').unbind('click');$(link).addClass('clicked');$(span).text(parseInt($(span).text(),10)+1);$.post(nouse_comment_voting.ajax_url,{'action':'nouse_post_vote','post':post_id,'direction':direction},null,'text');}
var post_id=$('div.single').attr('id').substring(5);$.post(nouse_comment_voting.ajax_url,{'action':'nouse_get_post_votes','post_id':post_id},function(response){console.log(response);$('#sidebar .vote').html(function(){var html='<button class="vote-up" disabled><i class="fa fa-thumbs-up"></i> <span>';html+=response.up;html+='</span></button><button class="vote-down" disabled><i class="fa fa-thumbs-down"></i> <span>';html+=response.down;html+='</span></button>';return html;}).each(function(){switch(response.voted){case'up':$(this).find('.vote-up').addClass('clicked');break;case'down':$(this).find('.vote-down').addClass('clicked');break;default:$(this).find('button').removeAttr('disabled');$(this).find('button.vote-up').click(function(){nouse_post_vote(post_id,'up');});$(this).find('button.vote-down').click(function(){nouse_post_vote(post_id,'down');});break;}});},'json');}});