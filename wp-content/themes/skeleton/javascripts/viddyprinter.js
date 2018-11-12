jQuery(document).ready(function ($) {

    function notify(message) {
        var notification = new Notify(message, {
            tag: 'roses-total-score-update',
            icon: nouseViddyprinter.icon,
            timeout: 10
        });
        notification.show();
    }

    function updateTotals(notify) {
        $.get('http://www.nouse.co.uk/livescores/tournaments/' + nouseViddyprinter.tournamentId + '/totals.json', function (data) {
            document.getElementById('homeScore').innerHTML = data.homePoints;
            document.getElementById('awayScore').innerHTML = data.awayPoints;
            $('#points-remaining').text(data.availablePoints + ' more points on offer');
            $('.progress .home').css('width', (data.homePoints / data.maxPoints * 100) + '%');
            $('.progress .away').css('width', (data.awayPoints / data.maxPoints * 100) + '%');

            if (notify) {
                notify(nouseViddyprinter.home + ' ' + data.homePoints + '–' + data.awayPoints + ' ' + nouseViddyprinter.away);
            }
        }, 'json');
    }

    function updateFixtures() {
        if ($('#fixtures-content').length) { // multiple days (roses)
            $('#fixtures-content').load('http://www.nouse.co.uk/livescores/tournaments/' + nouseViddyprinter.tournamentId + '.html #fixtures-content > li');
        } else { // single day (varsity)
            $('.fixtures').load('http://www.nouse.co.uk/livescores/tournaments/' + nouseViddyprinter.tournamentId + '.html');
        }
    }

    updateTotals(false);

    var socket = io.connect('http://data.nouse.co.uk/');

    socket
        .on('score change', function () {
            updateTotals($('#n10-toggle').prop('checked'));
            updateFixtures();
        })
        .on('update', updateFixtures)
        .on('reconnect', function () {
            updateTotals();
            updateFixtures();
        })
        .on('connect', function () {
            $('#connectivity').html('Updating live&hellip;');
        })
        .on('disconnect', function () {
            $('#connectivity').html('Reconnecting&hellip;');
        })
        .on('reconnecting', function () {
            $('#connectivity').html('Reconnecting&hellip;');
        });

        if (Notify.isSupported) {

            $('.scoreboard').append('<p><label><input type="checkbox" id="n10-toggle" /> Show notifications</label></p>');

            $(document.getElementById('n10-toggle')).change(function () {
                if ($(this).prop('checked') && Notify.needsPermission) {
                    Notify.requestPermission(function () {
                        notify('Notifications enabled');
                    }, function () { // permission denied
                        $('#n10-toggle').prop('checked', false);
                    });
                } else {
                    notify('Notifications enabled');
                }
            });
        }

});
