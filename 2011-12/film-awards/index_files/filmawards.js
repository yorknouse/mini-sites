jQuery(function() {
    var active = 'main';
    jQuery('.frontfilmawards h2 a[id], .frontfilmawards h3 a[id]').click(function() {
        var section = jQuery(this).attr('id').substr(5);
        if (section != active) {
            jQuery('#'+active+'content').slideUp(600, function() {
                jQuery('#'+section+'content').slideDown(600, function() {
                    active = section;
                });
            });
        }
        return false;
    });
});

var img_active = 1;
var img_length;
var img_width;
var img_margin;
var imgs;

function accordion_initialise(passedarray,divid) {
    imgs = passedarray;
    img_length = imgs.length;
    if (img_length) {
        document.getElementById(divid).style.display = 'block';
        document.getElementById(divid).innerHTML = '<div id="aimgs"></div><div id="aheadline"><a></a></div>';
        for (var i = 0; i < img_length; i++) {
            jQuery('#aimgs').append('<a href="'+imgs[i]['article'][0]+'" id="aimg'+i+'"><img src="'+imgs[i]['img'][0]+'" /><div class="shadow-right"></div></a>');
        }
        img_width = ((jQuery('#'+divid).width() - 300) / (img_length - 1));
        img_margin = ((img_width / 2) - 150);
        jQuery('#aimgs a').width(img_width);
        jQuery('#aimgs a img').css('margin-left', img_margin);
        jQuery('#aimg0 div').removeClass('shadow-right').addClass('shadow-middle');
        change_img(0);            
    }
    jQuery('#aimgs a').live('mouseover', function() {
        change_img(jQuery(this).attr('id').substr(4));
        return false;
    });
}

function change_img(id) {
    if (id != img_active) {
        jQuery('#aimgs a').stop(true, true);
        jQuery('#aimgs a img').stop(true, true);
        jQuery('#aheadline a').stop(true, true);
        jQuery('#aimg'+img_active).animate({width: img_width}, 500);
        jQuery('#aimg'+img_active+' img').animate({marginLeft: img_margin}, 500);
        jQuery('#aimg'+id).animate({width: 300}, 500);
        jQuery('#aimg'+id+' img').animate({marginLeft: 0}, 500);
        jQuery('#aimg'+id+' div').removeClass('shadow-left').removeClass('shadow-right').addClass('shadow-middle');
        jQuery('#aimg'+img_active+' div').removeClass('shadow-middle');
        if (id > img_active) {
            for (var i = 0; i < id; i++) {
                jQuery('#aimg'+i+' div').removeClass('shadow-right').addClass('shadow-left');
            }
        } else {
            for (var i = (img_length - 1); i > id; i--) {
                jQuery('#aimg'+i+' div').removeClass('shadow-left').addClass('shadow-right');
            }
        }
        jQuery('#aheadline a').attr('href', imgs[id]['article'][0]).html(imgs[id]['article'][1]);
        var txt_margin = (150 + (id * img_width) - (jQuery('#aheadline a').width() / 2));
        if (txt_margin < 0) {
            txt_margin = 0;
        }
        if (txt_margin > (jQuery('#aheadline').width() - jQuery('#aheadline a').width())) {
            txt_margin = (jQuery('#aheadline').width() - jQuery('#aheadline a').width());
        }
        jQuery('#aheadline a').animate({marginLeft: txt_margin}, 500);
        img_active = id;
    }
}

var scroller_stop_color   = '#afafaf';
var scroller_outtime      = 400;
var scroller_intime       = 1000;
var scroller_showtime     = 8000;
var scroller_mouseouttime = 1500;

var scroller_currentitem;
var scroller_array;
var scroller_currenttimer;
var scroller_hover        = false;

function scroller_start_timer (dur) {
    scroller_currenttimer = setTimeout(scroller_changer_auto, dur);
}

function scroller_stop_timer () {
    clearTimeout(scroller_currenttimer);
}

function scroller_next_item () {
    return (scroller_currentitem==((scroller_array.length)-1)) ? 0 : scroller_currentitem + 1
}

function scroller_prev_item () {
    return (scroller_currentitem == 0) ? scroller_array.length - 1 : scroller_currentitem - 1;
}

function scroller_click_action (selector) {
    return function () {
        scroller_stop_timer();
        scroller_changer_item(selector());
        if (!scroller_hover) { scroller_start_timer(scroller_showtime); }
        return false;
    }
}

function scroller_initialise(passedarray) {
    document.getElementById('scroller-container').style.display = 'block';
    scroller_array = passedarray.sort(function() { return 0.5 - Math.random(); });
    scroller_currentitem = scroller_array.length - 1;
    scroller_changer_auto();
    jQuery('#scroller-container').mouseover(function () {
        scroller_hover = true;
        scroller_stop_timer();
        document.getElementById('scroller-index').style.color = scroller_stop_color;
    });
    jQuery('#scroller-container').mouseout(function () {
        scroller_hover = false;
        scroller_stop_timer();
        scroller_start_timer(scroller_mouseouttime);
        document.getElementById('scroller-index').style.color = '';
    });
    jQuery('#scrollerp').click(scroller_click_action(scroller_prev_item));
    jQuery('#scrollern').click(scroller_click_action(scroller_next_item));
}

function scroller_changer_item(curr) {
    scroller_currentitem = curr;
    change_scroller(curr, false);
}

function scroller_changer_auto () {
    scroller_start_timer(scroller_showtime);
    scroller_currentitem = scroller_next_item();
    change_scroller(scroller_currentitem, true);
}

function change_scroller(nextindex, autop) {
    var nextitem = scroller_array[nextindex];
    jQuery('#scroller').fadeOut(autop ? scroller_outtime : 0, function(){
        document.getElementById('scroller').innerHTML = nextitem['article'][0];
        document.getElementById('scroller-index').innerHTML = (nextindex + 1);
    });
    jQuery('#scroller').fadeIn(autop ? scroller_intime : 0);
}
