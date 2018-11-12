function changeTab()
{college=jQuery(this).attr('id').split('_')[0];tab=jQuery(this).attr('id').split('_')[1];jQuery('#'+ college+'_information_tab').removeClass("active");jQuery('#'+ college+'_information').fadeOut('fast');jQuery('#'+ college+'_links_tab').removeClass("active");jQuery('#'+ college+'_links').fadeOut('fast');jQuery('#'+ college+'_video_tab').removeClass("active");jQuery('#'+ college+'_video').fadeOut('fast');jQuery('#'+ college+'_'+ tab+'_tab').addClass('active');jQuery('#'+ college+'_'+ tab).fadeIn('fast')}
function setupCollegeTab(college)
{jQuery('#'+ college+'_information_tab').click(changeTab);jQuery('#'+ college+'_links_tab').click(changeTab);jQuery('#'+ college+'_video_tab').click(changeTab);}
function openCollegeLightbox()
{var college=jQuery(this).attr('id').substr(5);jQuery('#'+ college+'_information_tab').click();}
jQuery(document).ready(function(){setupCollegeTab('alcuin');setupCollegeTab('derwent');setupCollegeTab('halifax');setupCollegeTab('james');setupCollegeTab('langwith');setupCollegeTab('goodricke');setupCollegeTab('vanbrugh');setupCollegeTab('wentworth');jQuery('.lightbox-links area').click(openCollegeLightbox);});