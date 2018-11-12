function changeTab(id) {
    jQuery('.fixture-headers li').removeClass('active');
    jQuery('.fixture-box').fadeOut('fast');
    jQuery('#'+id+'_tab').addClass('active');
    jQuery('#'+id+'_fixtures').fadeIn('fast');
}
jQuery(document).ready(function() {
    jQuery('#before_tab').click(function() { changeTab('before'); });
    jQuery('#friday_tab').click(function() { changeTab('friday'); });
    jQuery('#saturday_tab').click(function() { changeTab('saturday'); });
    jQuery('#sunday_tab').click(function() { changeTab('sunday'); });
});