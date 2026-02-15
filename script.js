// ========== TOGGLE MENU MOBILE ==========
function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu){
    menu.classList.toggle("show");
  }
}
// ========== JAM REAL TIME ==========
function updateClock(){
  const clock = document.getElementById("clock");
  if(!clock) return; // 🔥 cegah error

  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");

  clock.innerText = hours + ":" + minutes + ":" + seconds;
}

setInterval(updateClock, 1000);
updateClock();


// ========== TANGGAL ==========
function setTodayDate(){
  const el = document.getElementById("today-date");
  if(!el) return; // 🔥 cegah error

  const today = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  };

  el.innerText = today.toLocaleDateString("id-ID", options);
}

setTodayDate();

//bagian menu
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const indicator = document.querySelector(".menu-indicator");
  const links = document.querySelectorAll("#menu a");

  if (!menu || !indicator) return;

  function moveIndicator(el) {
    const rect = el.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.left = (rect.left - menuRect.left) + "px";
  }

  // cari link aktif berdasarkan URL (biar otomatis)
  let activeLink = null;

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
      activeLink = link;
    }
  });

  // kalau tidak ada yang active, pakai yang pertama
  if (!activeLink && links.length > 0) {
    activeLink = links[0];
    activeLink.classList.add("active");
  }

  // set posisi awal setelah halaman stabil
  setTimeout(() => {
    if (activeLink) moveIndicator(activeLink);
  }, 200);

  // saat hover pindah garis
  links.forEach(link => {
    link.addEventListener("mouseenter", () => moveIndicator(link));
  });

  // saat keluar hover, balik ke menu aktif
  menu.addEventListener("mouseleave", () => {
    if (activeLink) moveIndicator(activeLink);
  });

  // jika layar di-resize (desktop ↔ mobile)
  window.addEventListener("resize", () => {
    if (activeLink) moveIndicator(activeLink);
  });
});

// ==================================================
// ANIMASI REVEAL (TIDAK DIGANGGU)
// ==================================================
document.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

function reveal(){
  let items = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right"
  );

  for(let i = 0; i < items.length; i++){
    let windowHeight = window.innerHeight;
    let revealTop = items[i].getBoundingClientRect().top;
    let revealPoint = 120;

    if(revealTop < windowHeight - revealPoint){
      items[i].classList.add("active");
    }
  }
}


// ===== ANIMASI BERITA IKUT GIBS (1x SAJA) =====
document.addEventListener("DOMContentLoaded", function(){
  const news = document.querySelectorAll(".news-card");
  if(news.length > 0){
    news.forEach(card => {
      card.classList.add("reveal-up");
    });
  }
});

function kirimWA() {
  // ambil semua input penting
  const wajib = [
    "nama","tempatLahir","tanggalLahir","jk","alamat",
    "namaBapak","namaIbu","pekerjaanOrtu","kecamatan",
    "kabupaten","statusKeluarga","anakKe","jumlahSaudara",
    "telpOrtu","waSiswa","emailSiswa"
  ];

  // cek kolom kosong
  for (let id of wajib) {
    let el = document.getElementById(id);

    if (!el.value) {
      el.focus(); // langsung tunjuk kolom yang kosong
      alert("⚠️ Mohon isi kolom: " + el.previousElementSibling.innerText);
      return; // hentikan proses kirim
    }
  }

  // jika semua terisi, susun pesan WA
  let pesan = `📋 *FORM PENDAFTARAN SANTRI BARU*\n\n` +
    `Nama Lengkap: ${nama.value}\n` +
    `Tempat, Tgl Lahir: ${tempatLahir.value}, ${tanggalLahir.value}\n` +
    `Jenis Kelamin: ${jk.value}\n` +
    `Alamat: ${alamat.value}\n\n` +

    `👨‍👩‍👦 *Data Orang Tua*\n` +
    `Nama Bapak: ${namaBapak.value}\n` +
    `Nama Ibu: ${namaIbu.value}\n` +
    `Pekerjaan: ${pekerjaanOrtu.value}\n\n` +

    `📍 *Domisili*\n` +
    `Kecamatan: ${kecamatan.value}\n` +
    `Kabupaten: ${kabupaten.value}\n\n` +

    `👶 *Data Keluarga*\n` +
    `Status: ${statusKeluarga.value}\n` +
    `Anak ke: ${anakKe.value}\n` +
    `Jumlah Saudara: ${jumlahSaudara.value}\n\n` +

    `📞 *Kontak*\n` +
    `Telp Ortu: ${telpOrtu.value}\n` +
    `WhatsApp: ${waSiswa.value}\n` +
    `Email: ${emailSiswa.value}`;

  let waLink =
    "https://wa.me/6285175049779?text=" + encodeURIComponent(pesan);

  window.open(waLink, "_blank");
}
function fokusNama() {
  setTimeout(() => {
    document.getElementById("nama").focus();
  }, 400);
}
/* ===============================*/
document.addEventListener("DOMContentLoaded", function(){

  const links = document.querySelectorAll("a[href]");
  const transition = document.getElementById("page-transition");

  links.forEach(link => {

    link.addEventListener("click", function(e){

      if(
        link.hostname === window.location.hostname &&
        !link.hasAttribute("target") &&
        !link.getAttribute("href").startsWith("#")
      ){

        e.preventDefault();

        if(transition) transition.classList.add("active");

        // delay kecil biar cepat
        setTimeout(() => {
          window.location.assign(this.href);
        }, 250);

      }

    });

  });

});

let index = 0;
function slideTesti(step){
  const slider = document.getElementById("testiSlider");
  const total = slider.children.length;

  index += step;

  if(index < 0) index = total - 1;
  if(index >= total) index = 0;

  slider.style.transform = "translateX(-" + (index * 100) + "%)";
}
function kirimPesanWA(){

  let pesan = document.getElementById("pesanWA").value;

  if(pesan.trim() === ""){
    alert("Silakan tulis pertanyaan dulu 🙂");
    return;
  }

  let nomor = "6285175049779"; // nomor pondok

  let text =
`Assalamu'alaikum Pondok Pesantren Hidayatul Mubtadi-in

Apa Pertanyaan Anda?
${pesan}`;

  let url = "https://wa.me/" + nomor + "?text=" + encodeURIComponent(text);

  window.open(url, "_blank");
}
// 🔥 BIAR BACK HP TIDAK LOADING LAMA
window.addEventListener("pageshow", function (event) {

  const transition = document.getElementById("page-transition");

  // jika halaman dari cache (BACK)
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {

    if (transition) {
      transition.classList.remove("active");
    }

  }
});


