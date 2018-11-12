
function changeTab() {
    if (jQuery(this).hasClass('active')) {
        return false;
    }
    var id = jQuery(this).attr('id').split('-')[1];
    jQuery('.collegecuptabs a').removeClass("active");
    jQuery('#cctab-' + id).addClass('active');
    jQuery('.collegecuptable').hide();
    jQuery('#cctable-' + id).show();
    return false;
}

jQuery(document).ready(function(){
    jQuery('.collegecuptabs a').click(changeTab);

    jQuery('.fixtures-list').click(function(){
        var link = jQuery('a', this);
        var list = jQuery('ul', this);
        if (jQuery(link).text() == '+') {
            jQuery(list).stop(true, true).slideDown('medium', function(){
                jQuery(link).text('-');
            });
        } else {
            jQuery(list).stop(true, true).slideUp('medium', function(){
                jQuery(link).text('+');
            });
        }
        return false;
    });

    jQuery('.collegecuptable tbody tr td a').hover(function(){
        var team = jQuery(this).attr('id').split('-')[1];
        jQuery('#teamguide div').stop(true, true).hide();
        jQuery('#'+team).fadeIn('slow');
    }, function(){
        var team = jQuery(this).attr('id').split('-')[1];
        jQuery('#'+team).fadeOut('medium');
    });
});
