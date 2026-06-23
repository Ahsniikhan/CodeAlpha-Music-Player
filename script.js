         // playlist
        const songs = [{
            title: "Music Mood",
            artist: "Great Artist",
            src: "song1.mp3",
            cover: "cover1.jpg"
        }, {
            title: "LoFi Chill",
            artist: "DJ Relax",
            src: "song2.mp3",
            cover: "cover2.jpg"
        }, {
            title: "LoFi Chill",
            artist: "DJ Relax",
            src: "song3.mp3",
            cover: "cover3.jpg"
        }, {
            title: "LoFi Chill",
            artist: "DJ Relax",
            src: "song4.mp3",
            cover: "cover4.jpg"
        }, {
            title: "LoFi Chill",
            artist: "DJ Relax",
            src: "song5.mp3",
            cover: "cover5.jpg"
        }, {
            title: "LoFi Chill",
            artist: "DJ Relax",
            src: "song6.mp3",
            cover: "cover6.jpg"
        }];

        let current = 0;
        const audio = document.getElementById("audio");
        const cover = document.getElementById("cover");
        const title = document.getElementById("title");
        const artist = document.getElementById("artist");
        const progress = document.getElementById("progress");
        const currentTimeEl = document.getElementById("currentTime");
        const durationEl = document.getElementById("duration");

        function loadSong(i) {
            audio.src = songs[i].src;
            title.textContent = songs[i].title;
            artist.textContent = songs[i].artist;
            cover.style.backgroundImage = `url(${songs[i].cover})`;
        }

        function playPause() {
            audio.paused ? audio.play() : audio.pause();
        }

        function nextSong() {
            current = (current + 1) % songs.length;
            loadSong(current);
            audio.play();
        }

        function prevSong() {
            current = (current - 1 + songs.length) % songs.length;
            loadSong(current);
            audio.play();
        }

        // time format
        function formatTime(time) {
            if (isNaN(time)) return "0:00";
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60).toString().padStart(2, "0");
            return `${min}:${sec}`;
        }

        // progress update
        audio.addEventListener("timeupdate", function() {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + "%";
            currentTimeEl.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
        });

        audio.addEventListener("ended", nextSong);

        // seek bar
        document.getElementById("progressContainer").addEventListener("click", function(e) {
            const w = e.target.clientWidth;
            const x = e.offsetX;
            audio.currentTime = (x / w) * audio.duration;
        });

        // volume control
        function setVolume(val) {
            audio.volume = val;
        }

        // load first song
        loadSong(current);