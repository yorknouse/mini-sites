jQuery(function() {

// time between image change in milliseconds
var transitionTime = 5000;
// the api call to make (don't include format, callback, or tag id)

jQuery("div.slideshow").each(function() {

var slideshow = jQuery(this);
slideshow.html(''); // remove any placeholder text
var photos = []; // array of photos
var currentImage = -1; // pointer to active image
var allowAutomaticTransitions = true; // if this is set to false, automatic transitions will cease
var pauseAutomaticTransitions = false; // similar to above, but transitions continue scheduling
var timer; // timer for automatic transitions

var params = slideshow.attr('title').split(' ');
var flickrTag = params[0];
var size = false;
var layout = false;
var extras = false;
var limit = false;
var start = false;
var end = false;
var dates = '';

for (var i=0; i<params.length; i++) {
    var split = params[i].split('=');
    if (split[0] == 'size') {
        var size = split[1];
    } else if (split[0] == 'layout') {
        var layout = split[1];
    } else if (split[0] == 'extras') {
        var extras = split[1];
    } else if (split[0] == 'limit') {
        var limit = split[1];
    } else if (split[0] == 'start') {
        var start = split[1];
    } else if (split[0] == 'end') {
        var end = split[1];
    }
}

if (start && end) {
    dates = '&start='+start+'&end='+end;
}

jQuery.getJSON(flickrTag + '.json',
    function(data) {
        slideshow.removeAttr("title");
        photos = data.photos.photo;
        if ((extras == 'attachments') && (jQuery('#comment_post_ID').val())) {
            jQuery.getJSON(apiCall + 'attachments=' + jQuery('#comment_post_ID').val(), function(data) {
                photos = photos.concat(data.photos.photo);
            });
        }
        if (limit) {
            photos.length = limit;
        }
        if (photos.length == 0) {
            return;
        }
        slideshow.addClass('a_slideshow'+(size ? ' a_slideshow_'+size : ''));
        slideshow.append(jQuery('<img/>'));

        button = jQuery('<p class="button"><a href="#">&laquo;</a></p>').appendTo(slideshow);
        button.fadeTo(0, 0.4);
        button.click(function() {
            allowAutomaticTransitions = false;
            transitionBackwards();
            return false; // false to stop event bubbling (the # link being followed)
        }); // click() callback

        button = jQuery('<p class="button"><a href="#">&raquo;</a></p>').appendTo(slideshow);
        button.css('left', slideshow.width() - button.width() - 30);
        button.fadeTo(0, 0.4);
        button.click(function() {
            allowAutomaticTransitions = false;
            transitionForwards();
            return false;
        }); // click() callback

        if (layout == 'thumbs') {
            jQuery(buildThumbs()).insertAfter(slideshow);
        }

        // controls
        slideshow.hover(function() { pauseAutomaticTransitions = true; slideshow.find("p.button").fadeIn(); },
                        function() { pauseAutomaticTransitions = false; slideshow.find("p.button").fadeOut(); });

        // begin transition loop
        autoTransition();
    } // getJSON() callback
);

function autoTransition() {
    // if autoTransitions are disabled, quit the transition loop
    if (!allowAutomaticTransitions)
        return;
    
    // auto transitioning always goes forwards
    if (!pauseAutomaticTransitions)
        transitionForwards();

    timer = setTimeout(autoTransition, transitionTime);
}

function transitionForwards() {
    currentImage++;
    if (currentImage >= photos.length)
        currentImage = 0;

    nextImage(currentImage);
}

function transitionBackwards() {
    currentImage--;
    if (currentImage < 0)
        currentImage = photos.length - 1;

    nextImage(currentImage);
}

function flickrUrlToLarger(photo) {
    if (photo.is_public == 'yes') {
        return photo.full;
    } else {
        // we can get larger images by editing the URL slightly
        if (size == 'large') {
            return photo.url_s.replace(/_m/, '_z');
        } else {
            return photo.url_s.replace(/_m/, '');
        }
    }
}

function flickrUrlToThumb(photo) {
    if (photo.is_public == 'yes') {
        return photo.thumbnail;
    } else {
        return photo.url_s.replace(/_m/, '_s');
    }
}

function resize(image) {
    if (image.width() > slideshow.innerWidth()) {
        image.height(image.height() * (slideshow.innerWidth() / image.width()));
        image.width(slideshow.innerWidth());
    }

    if (image.height() > slideshow.innerHeight()) {
        image.width(image.width() * (slideshow.innerHeight() / image.height()));
        image.height(slideshow.innerHeight());
    }
}

function nextImage(imagesIndex) {
    // keeping references to these makes the code clearer and allows closures to close over them
    var image = slideshow.find('img');
    var new_image = jQuery('<img/>');
    new_image.get(0).onload = function() {
        resize(new_image);

        new_image
            // vertically align the image
            .css('top', (slideshow.innerHeight() - new_image.height()) / 2)
            .css('left', (slideshow.innerWidth() - new_image.width()) / 2)
            // fade it back in
            .fadeIn('slow', function() {
                jQuery('div.a_slideshow_thumbs a').removeClass('activep');
                jQuery('#slideshowimg-'+imagesIndex).addClass('activep');
            });

        image.fadeOut("slow", function () {
            image.remove();
        }); // fadeOut() callback
    }; // onload callback
    slideshow.prepend(new_image);
    new_image
        .attr('src', flickrUrlToLarger(photos[imagesIndex]))
        .attr('title', photos[imagesIndex].title);
}

function buildThumbs() {
    var thumbs = '<div class="a_slideshow_thumbs">';
    for (var i=0; i<photos.length; i++) {
        thumbs += '<a href="#'+i+'" id="slideshowimg-'+i+'"><img src="'+flickrUrlToThumb(photos[i])+'" /></a>';
    }
    thumbs += '</div><div style="clear:both;"></div>';
    return thumbs;
}

jQuery('div.a_slideshow_thumbs a').live('click', function() {
    clearTimeout(timer);
    timer = setTimeout(autoTransition, transitionTime);
    currentImage = jQuery(this).attr('id').split('-')[1];
    nextImage(currentImage);
    return false;
});

});
}); // ready()
