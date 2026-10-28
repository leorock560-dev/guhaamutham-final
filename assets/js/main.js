const $ = (s) => document.querySelector(s);
const P = document.body.dataset.page;

const N = [
  ["home", "home.html", "Home"],
  ["oils", "our-oils.html", "Our Oils"],
  ["about", "about.html", "About Us"],
  ["contact", "contact.html", "Contact"],
];

const PH = "+91 94875 58918";
const EM = "info@guhaamutham.com";
const AD = "132/1, Cooperative Street, Vilankurichi, Coimbatore – 641035, Tamil Nadu, India.";

const hd = $("#hd");
if (hd) {
  hd.innerHTML = `<header class="hd"><div class="w bar"><a class="logo" href="home.html"><img class="image" src="assets/images/logo-1.png" height="45px">  <img class="image" src="assets/images/logo-2 (2).png" height="45px"></a><button class="mb" aria-label="Toggle menu" aria-expanded="false">☰</button><nav id="nv" aria-label="Main">${N.map((n) => `<a href="${n[1]}" class="${n[0] == P ? "on" : ""}">${n[2]}</a>`).join("")}<a class="btn" href="contact.html#business-enquiry">Enquire Now</a></nav></div></header>`;
  const b = $(".mb");
  const nv = $("#nv");

  b.onclick = () => b.setAttribute("aria-expanded", nv.classList.toggle("open"));
  nv.onclick = (e) => {
    if (e.target.tagName == "A") {
      nv.classList.remove("open");
      b.setAttribute("aria-expanded", false);
    }
  };
}

const ft = $("#ft");
if (ft) {
  const footerNumbers = (value) => value.replace(/\d+/g, '<span class="ft-num">$&</span>');
  ft.innerHTML = `<footer class="ft"><div class="w"><div class="fg"><div><a class="logo" href="home.html"><img src="assets/images/logo-1.png" height="60px">  <img src="assets/images/logo-2 (2).png" height="60px"></a><br><p>Traditional edible oils crafted for everyday Indian cooking — inspired by heritage, made with care.</p></div><div><h4>EXPLORE</h4><ul>${N.map((n) => `<li><a href="${n[1]}">${n[2]}</a></li>`).join("")}</ul></div><div><h4>CONTACT</h4><ul><li><a href="https://www.guhaamutham.com">www.guhaamutham.com</a></li><li><a href="mailto:${EM}">${EM}</a></li><li><a href="tel:+919487558918">${footerNumbers(PH)}</a></li><li style="opacity:.75">${footerNumbers(AD)}</li></ul></div></div><div class="fb"><span>© ${footerNumbers(String(new Date().getFullYear()))} GuhaAmutham LLP. All rights reserved.</span><span>TRADITIONAL PURITY · IN EVERY DROP.</span></div></div></footer>`;
}

const it = $("#intro");

if (it) {
  const images = [...it.querySelectorAll(".is")];

  if (images.length) {
    let current = 0;
    let timer;
    let paused = false;

    const duration = 800; // Transition speed
    const interval = 1900; // Time between image changes
    const pause = 10000; // Pause after all images

    // Prepare all four images
    images.forEach((img, index) => {
      img.style.position = "absolute";
      img.style.inset = "0";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.transition = `transform ${duration}ms ease-in-out`;
      img.style.transform =
        index === 0 ? "translateX(0)" : "translateX(100%)";
      img.style.zIndex = index === 0 ? "2" : "1";
    });

    const rotate = () => {
      const next = (current + 1) % images.length;
      const outgoing = images[current];
      const incoming = images[next];

      // Incoming image starts on the right
      incoming.style.transition = "none";
      incoming.style.transform = "translateX(100%)";
      incoming.style.zIndex = "2";

      // Force the browser to apply the starting position
      incoming.offsetWidth;

      incoming.style.transition =
        `transform ${duration}ms ease-in-out`;
      outgoing.style.zIndex = "1";

      // Both images move simultaneously, right to left
      requestAnimationFrame(() => {
        outgoing.style.transform = "translateX(-100%)";
        incoming.style.transform = "translateX(0)";
      });

      current = next;

      // Pause after every image has been displayed
      if (current === 0) {
        clearTimeout(timer);
        paused = true;

        timer = setTimeout(() => {
          paused = false;
          timer = setTimeout(rotate, interval);
        }, pause);
      } else {
        timer = setTimeout(rotate, interval);
      }
    };

    // Keep the first image visible initially
    timer = setTimeout(rotate, interval);
  }
}
document.querySelectorAll(".car").forEach((c) => {
  const s = [...c.querySelectorAll(".sl")];
  const d = document.querySelector(".dots");
  const cap = c.querySelector(".cap");
  let i = 0;
  let h = 0;
  let x0 = 0;

  d.innerHTML = s.map((_, k) => `<i data-k="${k}" role="button" aria-label="Slide ${k + 1}"></i>`).join("");
  const go = (n) => {
    i = (n + s.length) % s.length;
    s.forEach((e, k) => e.classList.toggle("on", k == i));
    [...d.children].forEach((e, k) => e.classList.toggle("on", k == i));
    if (cap) cap.textContent = s[i].dataset.cap;
  };

  go(0);
  c.querySelector(".pv").onclick = () => go(i - 1);
  c.querySelector(".nx").onclick = () => go(i + 1);
  d.onclick = (e) => e.target.dataset.k && go(+e.target.dataset.k);
  c.onmouseenter = c.onfocusin = () => (h = 1);
  c.onmouseleave = c.onfocusout = () => (h = 0);
  c.ontouchstart = (e) => (x0 = e.touches[0].clientX);
  c.ontouchend = (e) => {
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
  };

  if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
    setInterval(() => h || go(i + 1), 4500);
  }
});

document.querySelectorAll(".tk div").forEach((e) => (e.innerHTML += e.innerHTML));

const fv = (f) => {
  let good = true;
  f.querySelectorAll("[required]").forEach((e) => {
    const m = e.nextElementSibling;
    const bad =
      !e.value.trim() ||
      (e.type == "email" && !/^\S+@\S+\.\S+$/.test(e.value)) ||
      (e.type == "tel" && !/^[+\d\s-]{7,}$/.test(e.value));
    e.classList.toggle("bad", bad);
    if (m && m.classList.contains("er")) {
      m.textContent = bad ? "Please enter a valid " + (e.dataset.n || "value") + "." : "";
    }
    if (bad) good = false;
  });
  return good;
};

document.querySelectorAll("form[data-f]").forEach((f) => {
  f.onsubmit = (e) => {
    e.preventDefault();
    const ok = f.querySelector(".ok");
    if (!fv(f)) return ok.classList.remove("show");

    const d = Object.fromEntries(new FormData(f));
    const body = encodeURIComponent(Object.entries(d).map(([k, v]) => k + ": " + v).join("\n"));
    ok.innerHTML = `Thank you, ${d.name.replace(/[<>&]/g, "")}. <b>Demo mode:</b> no server is connected yet, so your message has <b>not</b> been sent. To send it now, <a href="mailto:${EM}?subject=${encodeURIComponent(f.dataset.f)}&body=${body}" style="text-decoration:underline">open it in your email app</a>.`;
    ok.classList.add("show");
    ok.focus();
  };
});

const o = new URLSearchParams(location.search).get("oil");
const ps = $("#prod");
if (o && ps) {
  [...ps.options].forEach((x) => {
    if (x.value == o) ps.value = o;
  });
}

const wa = $("#wa");
if (wa) {
  wa.href = "https://wa.me/919487558918?text=" + encodeURIComponent("Hello GuhaAmutham LLP, I would like to enquire about your traditional edible oils.");
}
