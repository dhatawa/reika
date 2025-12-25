const gallery = document.getElementById('gallery');
const fileInput = document.getElementById('fileInput');

// 1. Fungsi untuk memuat foto yang sudah tersimpan saat web dibuka
window.onload = function() {
    const savedPhotos = JSON.parse(localStorage.getItem('myMemories')) || [];
    savedPhotos.forEach(src => addPhoto(src));
};

function addPhoto(src) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    
    const pins = ['red', 'blue', 'yellow', 'green'];
    const randomPin = pins[Math.floor(Math.random() * pins.length)];

    card.innerHTML = `
        <div class="pin ${randomPin}"></div>
        <img src="${src}">
    `;
    
    gallery.appendChild(card);
}

// 2. Fungsi Upload dan Menyimpan ke LocalStorage
fileInput.addEventListener('change', function() {
    for (let file of this.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            addPhoto(imageData); // Tampilkan di layar

            // Ambil data lama, tambah foto baru, simpan kembali
            const savedPhotos = JSON.parse(localStorage.getItem('myMemories')) || [];
            savedPhotos.push(imageData);
            localStorage.setItem('myMemories', JSON.stringify(savedPhotos));
        };
        reader.readAsDataURL(file);
    }
});