(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');
  const brand = document.getElementById('navbarBrand');
  const links = document.querySelectorAll('.nav-link');

  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    let current = '';
    document.querySelectorAll('section[id]').forEach((sec) => {
      const top = sec.offsetTop - 80;
      if (window.scrollY >= top) current = sec.id;
    });

    links.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  links.forEach((l) => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  brand.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const coupleCd = document.getElementById('coupleCountdown');
  if (coupleCd) {
    const target = new Date('2026-12-12T09:00:00Z').getTime();
    function updateCoupleCd() {
      const diff = target - Date.now();
      if (diff <= 0) return;

      const pad = (n) => String(n).padStart(2, '0');
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      const days = coupleCd.querySelector('[data-unit="days"]');
      const hours = coupleCd.querySelector('[data-unit="hours"]');
      const mins = coupleCd.querySelector('[data-unit="minutes"]');
      const secs = coupleCd.querySelector('[data-unit="seconds"]');

      if (days) days.textContent = pad(d);
      if (hours) hours.textContent = pad(h);
      if (mins) mins.textContent = pad(m);
      if (secs) secs.textContent = pad(s);
    }

    updateCoupleCd();
    setInterval(updateCoupleCd, 1000);
  }

  const detailsCopyBtn = document.getElementById('detailsCopyAddressBtn');
  if (detailsCopyBtn) {
    detailsCopyBtn.addEventListener('click', () => {
      const textToCopy = "East Riddlesden Hall, West Yorkshire\nhttps://www.google.com/maps/search/?api=1&query=East+Riddlesden+Hall,+West+Yorkshire";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          detailsCopyBtn.textContent = 'Address Copied';
           detailsCopyBtn.classList.add('is-active');

          setTimeout(() => {
            detailsCopyBtn.textContent = 'Copy Address';
            detailsCopyBtn.classList.remove('is-active');
          }, 1500);
        });
      }
    });
  }

  if (!reduceMotion) {
    const revealTargets = document.querySelectorAll('.event_title, .gallery_title, .story_grid, .details_grid, .gallery_scroll-container, .rsvp_form');
    revealTargets.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('reveal--visible'));
  }

  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpName = document.getElementById('rsvpName');
  const rsvpAttendance = document.getElementById('rsvpAttendance');
  const rsvpMessage = document.getElementById('rsvpMessage');
  const rsvpSubmitBtn = document.getElementById('rsvpSubmitBtn');

  const rsvpInputs = document.getElementById('rsvpInputs');
  const rsvpCard = document.getElementById('rsvpCard');
  const resultName = document.getElementById('resultName');
  const resultStatus = document.getElementById('resultStatus');
  const resultMessage = document.getElementById('resultMessage');

  if (rsvpForm && rsvpName && rsvpAttendance && rsvpSubmitBtn) {
    function checkRsvpInputs() {
      const isNameFilled = rsvpName.value.trim() !== '';
      const isAttendanceSelected = rsvpAttendance.value !== '';
      rsvpSubmitBtn.disabled = !(isNameFilled && isAttendanceSelected);
    }

    rsvpName.addEventListener('input', checkRsvpInputs);
    rsvpAttendance.addEventListener('change', checkRsvpInputs);

    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const exactInputHeight = rsvpInputs.offsetHeight;

      const statusText = rsvpAttendance.value === 'attending' ? 'Will Attend' : 'Unable to Attend';

      resultName.textContent = rsvpName.value.trim();
      resultStatus.textContent = statusText;
      resultMessage.textContent = rsvpMessage.value.trim();

      rsvpInputs.style.display = 'none';
      rsvpCard.style.height = `${exactInputHeight}px`;
      rsvpCard.style.display = 'flex';

      rsvpSubmitBtn.textContent = 'Thank you! Your RSVP has been received.';
      rsvpSubmitBtn.classList.add('is-submitted');
      rsvpSubmitBtn.disabled = true;
    });
  }

document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play()
          .then(() => {
            musicBtn.classList.add("playing");
          })
          .catch((err) => {
            console.log("Music file not found or blocked by the browser:", err);
            musicBtn.classList.toggle("playing");
          });
      } else {
        bgMusic.pause();
        musicBtn.classList.remove("playing");
      }
    });
  }
});
})();
