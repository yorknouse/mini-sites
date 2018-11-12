jQuery(document).ready(function ($) {

    // Sticky scrolly sidebar

    /*
    if ($('body.single-format-standard').length && document.documentElement.clientWidth >= 768) {
        function repositionSidebar() {
            if (document.documentElement.clientWidth >= 768 && $('#content').height() > $('#sidebar').height()) {
                if ($(this).scrollTop() + $(window).height() > $('#footer').offset().top) { // at the bottom
                    $('#sidebar').css('position', 'absolute');\
                    $('#sidebar').css('left', ($('#content').width() + 30) + 'px');
                    $('#sidebar').css('bottom', ($('#footer').height() + $('#bottom').height() + 60) + 'px');
                }
                else if ($(this).scrollTop() + $(window).height() > $('#content').offset().top + $('#sidebar').height()) { // in the middle
                    $('#sidebar').css('position', 'fixed');
                    $('#sidebar').css('left', + ($('#content').offset().left + $('#content').width() + 10) + 'px');
                    $('#sidebar').css('bottom', '0');
                }
                else { // at the top
                    $('#sidebar').css('position', 'static');
                    $('#sidebar').css('margin-left', '10px');
                }
            }
            else { // belt and braces during resizing
                $('#sidebar').css('position', 'static');
                $('#sidebar').css('margin-left', '10px');
            }
        }
        $(document).scroll(repositionSidebar);
        $(window).resize(repositionSidebar);
    }
    */

    // Tabs Activation

    var tabs = $('ul.tabs');
    tabs.each(function () {
        //Get all tabs
        var tab = $(this).find('> li > a');

        tab.on('mousedown focus click', function (e) {

            var contentLocation = $(this).attr('href') + "Tab";

            if (contentLocation.charAt(0) === "#") {

                e.preventDefault();

                tab.removeClass('active');
                $(this).addClass('active');

                $(contentLocation).show().addClass('active').siblings().hide().removeClass('active');

            }

        });

    });

    // comment form
    if ($('#respond').length) {
        $('#comment').focus(function () {
            $('#commentform').addClass('expanded');
        });
    }

    // load related posts
    if ($('#related-posts-container').length) {
        $('#related-posts-container').load(window.location.pathname + '?related=1');
    }


    // From when we hand-rolled our own so social media sharing buttons

    /*
    $('.entry-share a').click(function (e) {
        if ( !!window.open( $(this).attr('href'), '_blank', 'toolbar=0,resizable=1,scrollbars=1,status=1,width=480,height=320' ) ) {
           e.preventDefault();
        }
    });
    */

    // Modals and their keyboard shortcuts

    $('#header .inner a, .site-masthead .logo').on('contextmenu', function (e) {
        e.preventDefault();
        $.modal('<h3>Looking for the <cite>Nouse</cite> logo?</h3>\
        <p>You can download it in a range of formats, or read <a href="/2013/01/22/our-new-logo-a-word-from-the-designer/">a word from the designer</a>.</p>\
        <ul>\
        <li>Kingfisher + <i>Nouse</i> text: <a href="/static/logos/nouse-logo-full.4.png">PNG</a>, <a href="/static/logos/nouse-logo-full.4.svg">SVG</a></li>\
        <li>Kingfisher: <a href="/static/logos/kingfisher-1307-797.png">PNG</a>, <a href="/static/logos/kingfisher.1.svg">SVG</a>, <a href="/static/logos/kingfisher.tiff">TIFF</a>, <a href="/static/logos/kingfisher.ai">AI</a></li>\
        </ul>',
            { overlayClose: true}
        );
    });

    Mousetrap.bind('h', function() {
        window.location.href = '/';
    });

    Mousetrap.bind('d', function() {
        window.location.href = '/wp-admin/';
    });

    if ($('#edit-link').length) { // If an edit link exists on the page
        Mousetrap.bind('e', function() {
            window.location.href = $('#edit-link').attr("href");
        });
    }

    function showsearchform() {
        jQuery.modal('<div><h3>Search Nouse</h3><form role="search" method="get" id="searchform" action="/search/"><div><input type="text" value="" name="s" id="s" autofocus /> <input type="submit" id="searchsubmit" value="Search" /></div></form></div>', {overlayClose: true});
    }
    Mousetrap.bind('/', showsearchform);
    $('#menu-search a').click(function(e) {
        showsearchform();
        e.preventDefault();
    });

    // Activate sliders on home and Muse pages

    if ($('.headlineblock').filter(':visible').length) {
        $('.headlineblock').bxSlider({
            auto: true,
            autoHover: true,
            speed: 250,
            pause: 6000,
            pagerSelector: '.pager'
        });
    }

    // load logos for sports match reports scores

    if ($('.entry-sportsscores').length) {
        var colleges = ['alcuin', 'constantine', 'derwent', 'goodricke', 'halifax', 'james', 'langwith', 'vanbrugh', 'wentworth', 'york', 'durham'];

        $('.team').each(function(i, element) {
            var haystack = $(element).find('.name').text().toLowerCase();
            $.each(colleges, function(i, needle) {
                if (haystack.indexOf(needle) >= 0) {
                    if ($(element).hasClass('team-home')) {
                        $(element).prepend('<img alt="" src="/bucket/colleges/' + needle + '.png" />');
                    } else {
                        $(element).append('<img alt="" src="/bucket/colleges/' + needle + '.png" />');                      
                    }
                }
            });
        });
    }

    // Print edition on home page

    if ($('.pdfblock').length) {
        $('.pdf-thumbs img').mouseenter(function () {
            $('.pdf-big').attr('src', this.src);
        });
    }

    // Advertising

    var adcontainer = document.getElementById('sidebar-ad');

    if (document.documentElement.clientWidth >= 768 && adcontainer !== null) {

        // adcontainer.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7908211756267459" data-ad-slot="4835592679" data-ad-format="auto"></ins>';
        // (adsbygoogle = window.adsbygoogle || []).push({});

        // Google Analytics event creepiness
        function trackad(ad, adname) {

            _gaq.push(['_trackEvent', adname, 'click']);

            setTimeout(function () {
                window.location.href = ad.href;
            }, 100);

        }

        // The advertisements

        var ads = [];

        // ads[0] = '<a href=""><img src="" alt="" /></a>';

        function addad() {

            var banner = document.createElement('p');

            var whichad = Math.floor((Math.random() * ads.length));

            banner.innerHTML = ads[whichad];

            adcontainer.appendChild(banner);

            ads.splice(whichad, 1); // remove from array

        }

        window.onload = function () {
            while (ads.length > 0) {
                addad();
            }
        };

    }

    function getCookieValue(name) {
        var cookies = document.cookie.split('; '); // ['name=value', 'name=value'] list
        for (var i=0; i < cookies.length; i++) {
            cookie = cookies[i].split('='); // [name, value] pair
            if (cookie[0] === name) {
                return decodeURIComponent(cookie[1]);
            }
        }
        return false;
    }

    // Fill in remembered comment form details

    function getCommentAuthorCookieValue(name) {
        name += '_aa07ca7333f6cbf92029eafc07054dcb'; // WordPress appends the MD5-hash of 'http://www.nouse.co.uk/wordpress' to the name
        return getCookieValue(name);
    }

    if (document.getElementById('commentform')) {

        if (getCommentAuthorCookieValue('comment_author')) {
            document.getElementById('author').value = getCommentAuthorCookieValue('comment_author').split('+').join(' ');
        }
        if (getCommentAuthorCookieValue('comment_author_email')) {
            document.getElementById('email').value = getCommentAuthorCookieValue('comment_author_email');
        }

    }

});
