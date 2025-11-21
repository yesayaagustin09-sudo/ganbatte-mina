// Memastikan semua kode dijalankan setelah dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', function() {

    const bgMusic = document.getElementById('bg-music');
    const nextPageButton = document.getElementById('nextPageButton');
    const typingTextElement = document.getElementById('typing-text');
    const musicControlButton = document.getElementById('musicControlButton'); // Ambil tombol kontrol

    
    // ===============================================
    // FUNGSI UMUM: KONTROL MUSIK LINTAS HALAMAN (PLAY/PAUSE & WAKTU)
    // ===============================================
    
    // Fungsi untuk memperbarui tampilan teks tombol kontrol
    function updateMusicButtonText() {
        if (musicControlButton && bgMusic) {
            musicControlButton.textContent = bgMusic.paused ? '▶️ Putar Musik' : '⏸️ Pause Musik';
        }
    }

    if (bgMusic) {
        const savedTime = localStorage.getItem('musicTime');
        const isPaused = localStorage.getItem('isMusicPaused') === 'true';

        // 1. Lanjutkan Waktu
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }

        // 2. Lanjutkan Status (Play/Pause)
        if (!isPaused) {
            // Coba play. Jika berhasil, status play otomatis tersimpan.
            bgMusic.play().catch(error => {
                // Biarkan saja, tombol play harus diklik manual
            });
        } else {
            // Set musik ke status pause jika sebelumnya di pause
            bgMusic.pause();
        }
        
        updateMusicButtonText(); // Perbarui teks tombol saat dimuat

        // Simpan posisi musik ke localStorage setiap detik
        setInterval(() => {
            localStorage.setItem('musicTime', bgMusic.currentTime);
            localStorage.setItem('isMusicPaused', bgMusic.paused);
        }, 1000);
    }
    
    // Event listener untuk tombol kontrol musik
    if (musicControlButton && bgMusic) {
        musicControlButton.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().catch(error => {
                    console.log("Gagal memutar musik:", error);
                });
            } else {
                bgMusic.pause();
            }
            // Simpan status dan perbarui teks setelah aksi
            localStorage.setItem('isMusicPaused', bgMusic.paused);
            updateMusicButtonText();
        });
    }


    // ===============================================
    // 1. KONTROL HALAMAN (index.html)
    // ===============================================

    if (nextPageButton) {
        nextPageButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            // Saat pindah, pastikan status musik saat ini disimpan
            if (bgMusic) {
                // Langsung simpan posisi/status dan pindah
                localStorage.setItem('musicTime', bgMusic.currentTime);
                localStorage.setItem('isMusicPaused', bgMusic.paused);

                // Jika musik dipause, coba play saat klik (hanya jika sebelumnya tidak dipause)
                if (bgMusic.paused && localStorage.getItem('isMusicPaused') !== 'true') {
                    bgMusic.play();
                }

                // Tetap lakukan play untuk memastikan interaksi browser tercatat
                bgMusic.play().then(() => {
                    window.location.href = 'page2.html';
                }).catch(() => {
                    window.location.href = 'page2.html';
                });

            } else {
                 window.location.href = 'page2.html';
            }
        });
    }


    // ===============================================
    // 2. ANIMASI (page2.html)
    // ===============================================

    if (typingTextElement) {

        // --- 2.1. Animasi Mengetik ---
        const textToType = "Dengarkan baik-baik: Kebahagiaan sejati dimulai dari **mencintai dan menerima diri sendiri** seutuhnya. Berhentilah membandingkan perjalananmu dengan orang lain. Kamu telah melakukan yang terbaik dengan sumber daya yang kamu miliki, dan itu adalah hal yang luar biasa. Beri dirimu izin untuk beristirahat, merayakan kemajuan kecil, dan melepaskan hal-hal yang tidak bisa kamu kontrol. **Kamu pantas mendapatkan kedamaian.** Perlakukan dirimu seperti sahabat terbaikmu. Peluk dirimu erat, dan yakinkan bahwa semua akan baik-baik saja, karena kamu adalah pahlawan dalam cerita hidupmu sendiri. Teruslah bersinar! ✨";
        let i = 0;
        const speed = 70;

        function typeWriter() {
            if (i < textToType.length) {
                typingTextElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();

        // --- 2.2. Animasi Latar Belakang Hati dan Bunga ---
        const animationContainer = document.querySelector('.animation-container');
        const flowers = ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'];
        const love = '💖';
        const flowerColors = ['red', 'yellow', 'blue', 'purple'];

        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        function createAnimatedElement(type) {
            const element = document.createElement('span');
            element.classList.add(`animated-${type}`);

            if (type === 'love') {
                element.textContent = love;
                element.style.left = `${getRandom(0, window.innerWidth - 50)}px`;
                element.style.bottom = `${getRandom(-50, 0)}px`;
                element.style.animationDuration = `${getRandom(8, 15)}s`;
                element.style.fontSize = `${getRandom(1.5, 3)}em`;
            } else if (type === 'flower') {
                element.textContent = flowers[Math.floor(getRandom(0, flowers.length))];
                element.classList.add(flowerColors[Math.floor(getRandom(0, flowerColors.length))]);
                element.style.left = `${getRandom(0, window.innerWidth - 50)}px`;
                element.style.top = `${getRandom(-50, 0)}px`;
                element.style.animationDuration = `${getRandom(10, 18)}s`;
                element.style.fontSize = `${getRandom(1, 2.5)}em`;
            }

            if (animationContainer) {
                animationContainer.appendChild(element);

                element.addEventListener('animationend', () => {
                    element.remove();
                });
            }
        }

        setInterval(() => createAnimatedElement('love'), getRandom(1000, 3000));
        setInterval(() => createAnimatedElement('flower'), getRandom(1500, 4000));
    }
});