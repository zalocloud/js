
    $(document).ready(function () {
        $('.mediPlayer').mediaPlayer();
     // Duyệt qua tất cả các phần tử ghichu-music
    $('.ghichu-music').each(function () {
        var $ghichuMusic = $(this);
        var $audio = $ghichuMusic.find('audio.listen'); // Lấy phần tử audio trong mỗi ghichu-music
        var $timeMusice = $ghichuMusic.find('.time-musice'); // Lấy phần tử time-musice trong cùng một ghichu-music

        // Lắng nghe sự kiện 'loadedmetadata' để đảm bảo lấy được thời gian tổng của audio
        $audio.on('loadedmetadata', function () {
            var duration = $audio[0].duration; // Thời gian tổng của audio
            var totalMinutes = Math.floor(duration / 60); // Tính phút cho thời gian tổng
            var totalSeconds = Math.floor(duration % 60); // Tính giây cho thời gian tổng

            // Đảm bảo giây có 2 chữ số
            totalSeconds = totalSeconds < 10 ? '0' + totalSeconds : totalSeconds;
            totalMinutes = totalMinutes < 10 ? '0' + totalMinutes : totalMinutes;

            // Cập nhật thời gian tổng vào .time-musice (0:00 / tổng thời gian)
           // $timeMusice.text('00:00 / ' + totalMinutes + ':' + totalSeconds);
        });

        // Lắng nghe sự kiện timeupdate để cập nhật thời gian hiện tại
        $audio.on('timeupdate', function () {
            var currentTime = $audio[0].currentTime; // Thời gian hiện tại của audio
            var duration = $audio[0].duration; // Thời gian tổng của audio
            var minutes = Math.floor(currentTime / 60); // Tính phút cho thời gian hiện tại
            var seconds = Math.floor(currentTime % 60); // Tính giây cho thời gian hiện tại

            var totalMinutes = Math.floor(duration / 60); // Tính phút cho thời gian tổng
            var totalSeconds = Math.floor(duration % 60); // Tính giây cho thời gian tổng

            // Đảm bảo giây và phút đều có 2 chữ số
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            totalMinutes = totalMinutes < 10 ? '0' + totalMinutes : totalMinutes;
            totalSeconds = totalSeconds < 10 ? '0' + totalSeconds : totalSeconds;

            // Cập nhật thời gian vào .time-musice
            $timeMusice.text(totalMinutes + ':' + totalSeconds);
          //$timeMusice.text(minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds);
        });
    });  
});
  
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.lunar = factory();
    }
})(this, function() {

    'use strict';

    var lunar = {};

    lunar.hasClass = function(elem, name) {
        return new RegExp('(\\s|^)' + name + '(\\s|$)').test(elem.attr('class'));
    };

    lunar.addClass = function(elem, name) {
        if (!lunar.hasClass(elem, name)) {
            elem.attr('class', (!!elem.attr('class') ? elem.attr('class') + ' ' : '') + name);
        }
    };

    lunar.removeClass = function(elem, name) {
        if (lunar.hasClass(elem, name)) {
            var remove = elem.attr('class').replace(new RegExp('(\\s|^)' + name + '(\\s|$)', 'g'), '$2');
            elem.attr('class', remove);
        }
    };

    lunar.toggleClass = function(elem, name) {
        lunar[lunar.hasClass(elem, name) ? 'removeClass' : 'addClass'](elem, name);
    };

    lunar.className = function(elem, name) {
        elem.attr('class', name);
        console.log('className', elem);
    };

    return lunar;

});

(function($) {

    var _ = {

        cursorPoint: function(evt, el) {
            _.settings.pt.x = evt.clientX;
            _.settings.pt.y = evt.clientY;
            var playObject = el.find('svg').attr('id');
            playObject = document.getElementById(playObject);
            return _.settings.pt.matrixTransform(playObject.getScreenCTM().inverse());
        },

        angle: function(ex, ey) {
            var dy = ey - 50; // 100;
            var dx = ex - 50; // 100;
            var theta = Math.atan2(dy, dx); // range (-PI, PI]
            theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
            theta = theta + 90; // in our case we are animating from the top, so we offset by the rotation value;
            if (theta < 0) theta = 360 + theta; // range [0, 360)
            return theta;
        },

        setGraphValue: function(obj, val, el) {

            var audioObj = el.find(_.settings.audioObj),
                pc = _.settings.pc,
                dash = pc - parseFloat(((val / audioObj[0].duration) * pc), 10);

            $(obj).css('strokeDashoffset', dash);

            if (val === 0) {
                _.addClass($(obj), 'done');
                if (obj === $(_.settings.progress)) {
                    $(obj).attr('class', 'ended');
                }
            }
        },

        reportPosition: function(el, audioId) {
            var progress = el.find(_.settings.progress),
                audio = el.find(_.settings.audioObj);

            _.setGraphValue(progress, audioId.currentTime, el);
        },

        stopAllSounds: function() {

            document.addEventListener('play', function(e) {
                var audios = document.getElementsByTagName('audio');
                for (var i = 0, len = audios.length; i < len; i++) {
                    if (audios[i] != e.target) {
                        audios[i].pause();
                    }
                    if (audios[i] != e.target) $(audios[i]).parent('div').find('.playing').attr('class', 'paused');
                }
            }, true);
        },

        settings: {},

        init: function(options) {

            var template = ['<svg viewBox="0 0 100 100" id="playable" version="1.1" xmlns="http://www.w3.org/2000/svg" width="34" height="34" data-play="playable" class="not-started playable">',
                '<g class="shape">',
                '<circle class="progress-track" cx="50" cy="50" r="47.45" stroke="#becce1" stroke-opacity="0.25" stroke-linecap="round" fill="none" stroke-width="5"/>',
                '<circle class="precache-bar" cx="50" cy="50" r="47.45" stroke="#302F32" stroke-opacity="0.25" stroke-linecap="round" fill="none" stroke-width="5" transform="rotate(-90 50 50)"/>',
                '<circle class="progress-bar" cx="50" cy="50" r="47.45" stroke="#009EF8" stroke-opacity="1" stroke-linecap="round" fill="none" stroke-width="5" transform="rotate(-90 50 50)"/>',
                '</g>',
                '<circle class="controls" cx="50" cy="50" r="45" stroke="none" fill="#000000" opacity="0.0" pointer-events="all"/>',
                '<g class="control pause">',
                '<line x1="40" y1="35" x2="40" y2="65" stroke="#009EF8" fill="none" stroke-width="8" stroke-linecap="round"/>',
                '<line x1="60" y1="35" x2="60" y2="65" stroke="#009EF8" fill="none" stroke-width="8" stroke-linecap="round"/>',
                '</g>',
                '<g class="control play">',
                '<polygon points="45,35 65,50 45,65" fill="#009EF8" stroke-width="0"></polygon>',
                '</g>',
                '<g class="control stop">',
                '<rect x="35" y="35" width="30" height="30" stroke="#009EF8" fill="none" stroke-width="1"/>',
                '</g>',
                '</svg>'
            ];

            template = template.join(' ');

            $.each(this, function(a, b) {

                var audio = $(this).find('audio');
                audio.attr('id', 'audio' + a);
                template = template.replace('width="34"', 'width="' + audio.data('size') + '"');
                template = template.replace('height="34"', 'height="' + audio.data('size') + '"');
                template = template.replace('id="playable"', 'id="playable' + a + '"');
                $(this).append(template);

            });

            var svgId = $(this).find('svg').attr('id');
            svgId = document.getElementById(svgId);

            _.defaults = {
                this: this,
                thisSelector: this.selector.toString(),
                playObj: 'playable',
                progress: '.progress-bar',
                precache: '.precache-bar',
                audioObj: 'audio',
                controlsObj: '.controls',
                pt: svgId.createSVGPoint(),
                pc: 298.1371428256714 // 2 pi r                                
            };

            lunar = {};

            _.settings = $.extend({}, _.defaults, options);

            $(_.settings.controlsObj).on('click', function(e) {

                var el = $(e.currentTarget).closest($(_.settings.thisSelector));

                var obj = {
                    el: el,
                    activeAudio: el.find(_.settings.audioObj),
                    playObj: el.find('[data-play]'),
                    precache: el.find(_.settings.precache)
                };

                obj.class = obj.playObj.attr('class');
                switch (obj.class.replace('playable', '').trim()) {

                    case 'not-started':
                        _.stopAllSounds();
                        obj.activeAudio[0].play();
                        var audioId = document.getElementById(obj.activeAudio.attr('id'));
                        audioId.addEventListener('timeupdate', function(e) {
                            _.reportPosition(el, audioId);
                        });
                        obj.playObj.attr('class', 'playing');
                        break;
                    case 'playing':
                        obj.playObj.attr('class', 'playable paused');
                        obj.activeAudio[0].pause();
                        $(audioId).off('timeupdate');
                        break;
                    case 'paused':
                        obj.playObj.attr('class', 'playable playing');
                        obj.activeAudio[0].play();
                        break;
                    case 'ended':
                        obj.playObj.attr('class', 'not-started playable');
                        obj.activeAudio.off('timeupdate', _.reportPosition);
                        break;
                }
            });

            $(_.defaults.audioObj).on('progress', function(e) {
                if (this.buffered.length > 0) {
                    var end = this.buffered.end(this.buffered.length - 1);
                    var cache = $(e.currentTarget).parent().find(_.settings.precache),
                        el = $(this).closest($(_.settings.thisSelector));
                    _.setGraphValue(cache, end, el);
                }
            });

            // Xử lý sự kiện 'ended'
            $(_.defaults.audioObj).on('ended', function() {
                var el = $(this).closest($(_.settings.thisSelector));
                var playObj = el.find('[data-play]');
                playObj.attr('class', 'not-started playable');
            });
        }

    };

    // Add Plugin to Jquery
    $.fn.mediaPlayer = function(methodOrOptions) {
        if (_[methodOrOptions]) {
            return _[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return _.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.mediaPlayer');
        }
    };
})(jQuery);
