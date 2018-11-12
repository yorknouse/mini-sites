var candidate_box_height=530;var candidate_box_width=730;var candidate_box;var grey_shade;function candidate_box_show(id)
{var off_top_sum=Math.floor((jQuery(window).height()- candidate_box_height)/2);var off_left_sum=Math.floor((jQuery(window).width()- candidate_box_width)/2);var off_top=(off_top_sum<0)?0:off_top_sum;var off_left=(off_left_sum<0)?0:off_left_sum;if(candidate_box)
candidate_box.hide();candidate_box=jQuery('#candidate-'+ id);if(candidate_box.size()===0){candidate_box=null;return false;}
candidate_box.find('a.close').click(candidate_box_close);candidate_box.css('top',(jQuery(window).scrollTop()+ off_top)+'px');candidate_box.css('left',(jQuery(window).scrollLeft()+ off_left)+'px');grey_shade.css('width','100%');grey_shade.css('height',jQuery(document).height()+'px');if(!jQuery.browser.msie)
grey_shade.fadeIn();candidate_box.show();return false;}
function candidate_box_close()
{candidate_box.hide();if(!jQuery.browser.msie)
grey_shade.fadeOut('fast');candidate_box=null;return false;}
function candidates_click()
{return candidate_box_show(jQuery(this).attr('id').substr(5));}
function candidates_init()
{grey_shade=jQuery('<div id="grey-shade"/>').prependTo(document.body);jQuery('.lightbox-links a').click(candidates_click);jQuery('.lightbox-links area').click(candidates_click);}
jQuery(candidates_init);