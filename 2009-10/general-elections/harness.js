
/* Search form */

jQuery(function() {

    function testHtml5Support(element, attribute) {
        var test = document.createElement(element);
        return (attribute in test);
    }
    
    if (!testHtml5Support('input', 'placeholder')) {
        jQuery("input[placeholder]").each(function() {
            var input = jQuery(this);
            var placeholder = input.attr("placeholder");
            input.focus(function() {
                if (input.val() == placeholder) {
                    input.val("");
                    input.removeClass("placeholder");
                }
            }).blur(function() {
                if (input.val() == "") {
                    input.addClass("placeholder");
                    input.val(placeholder);
                }
            }).blur();
            input.parents("form").submit(function() {
                if (input.val() == placeholder) {
                    input.val("");
                }
            });
            jQuery(window).bind("unload", function() {
                if (input.val() == placeholder) {
                    input.val("");
                }
            });
        });
    }

});

/* Most read/commented tabs */

jQuery(function() {
    jQuery('#popular-widget h2 a').click(function() {
        if (!jQuery(this).hasClass('active')) {
            section = jQuery(this).attr('id').split('-')[1];
            jQuery('#popular-widget h2 a').removeClass('active');
            jQuery('#popular-arrow').toggleClass('movedright');
            jQuery(this).addClass('active');
            jQuery('#popular-widget ul').hide(0, function() {
                jQuery('#popular-widget #most-'+section).show();
            });
        }
        return false;
    });
});
