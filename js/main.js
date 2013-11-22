jQuery(document).ready(function () {
    allMusic = null;
    currentIndex = 0;
    container = $('#container');
    cover = $('#cover');
    play = $('#play');
    pause = $('#pause');
    mute = $('#mute');
    muted = $('#muted');
    close = $('#close');
    next = $('#next');
    wheelButton = $('#wheelButton');
    colorWheel = null;
    colorTable = null;

    wheelOn = false;
//    songIndex = 0;
//   numSongs = 3;

    initialize();



    play.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!song.paused) {
            song.pause();
            $(this).css({
                'background-position': '6px 5px'
            });
        }
        else {
            song.play();
            //$(this).replaceWith('<a class="button gradient" id="pause" href="" title=""></a>');
            $(this).css({
                'background-position': '-32px 5px'
            });
        }
        //return false;
    });

    $('#pause').bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        song.pause();
        $(this).replaceWith('<a class="button gradient" id="play" href="" title=""></a>');
        //return false;
    });

    mute.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (song.volume == 1) {
            song.volume = 0;
            $(this).css({
                'background-position': '-106px 5px'
            });
        }
        else {
            song.volume = 1;
            $(this).css({
                'background-position': '-63px 5px'
            });
        }
    });

    wheelButton.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (wheelOn == true) {
            wheelOn = false;
            
            var color = getColor();
 
            writeData(uid,currentIndex,color.h0, color.h1, color.h2);
            
            finalize();
            $("#cover").css({
                'width': '398px',
                'height': '398px',
                'left': 'auto',
                'top': 'auto'
            });

            if(colorWheel)
            colorWheel.finalize();
        }
        else {
            wheelOn = true;
            $("#cover").css({
                'width': '270px',
                'height': '270px',
                'left': '75px',
                'top': '75px'
            });

            
            WheelController();
            readData(uid,currentIndex);
        }
        return false;
    });



    muted.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        song.volume = 1;
        $(this).replaceWith('<a class="button gradient" id="mute" href="" title=""></a>');
        return false;
    });

    next.bind('click', function (e) {
        song.pause();
        song.currentTime = 0;
        currentIndex = (currentIndex+1) % allMusic.length;
        fetchSong(currentIndex);
        play.css({
            'background-position': '6px 5px'
        });

        return false;
    });



    $("#seek").bind("change", function () {
        song.currentTime = $(this).val();
        $("#seek").attr("max", song.duration);
    });


    function initialize() {
        //container.addClass('containerLarge');
        //cover.addClass('coverLarge');
        
        colorTable = ColorTable();
        
        var xdoc = null;
        var xml = 'songlist.xml';
    
       if (window.XMLHttpRequest)
        {
            xhttp=new XMLHttpRequest();
        }
        else // IE 5/6
         {
            xhttp=new ActiveXObject("Microsoft.XMLHTTP");
        } 
        xhttp.open("GET",xml,false);
        xhttp.send();
        xdoc=xhttp.responseXML;
       
        //所有的歌曲
        this.allMusic = getAllMusic(xdoc);
        //当前歌曲
        this.currentMusic = this.allMusic[0];
        //当前歌曲索引
        this.currentIndex = this.currentMusic.key;
        
        fetchSong(this.currentIndex);
        
        $('#close').fadeIn(300);
        $('#seek').attr('max', song.duration);
    }
    
    
    
    
    //获取所有的音乐列表
    function getAllMusic(xdoc) {
            var _allMusic = new Array();
            nodes = xdoc.documentElement.childNodes;
            var counter = 0;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes.item(i).nodeName == "items"){
                var _music = new music(nodes.item(i).childNodes.item(1).textContent, 
                nodes.item(i).childNodes.item(3).textContent, nodes.item(i).childNodes.item(5).textContent);
                _allMusic.push({ key: counter, value: _music });
                counter += 1;
                }
            }
            return _allMusic;
    }
    
    
    
    function music(title, url, cover){
            this.title = title;
            this.url = url;
            this.cover = cover;
    }
    
    

    function fetchSong(index) {

        this.currentMusic = this.allMusic[index].value;
             
        song = new Audio(this.currentMusic.url);
        duration = song.duration;

        song.type = 'audio/mpeg';
        song.src = this.currentMusic.url;

        $("#cover").attr("src", this.currentMusic.cover);

        song.addEventListener('timeupdate', function () {
            curtime = parseInt(song.currentTime, 10);
            $("#seek").attr("value", curtime);
        });


    }



});
