const $ = (s) => document.querySelector(s);
const P = document.body.dataset.page;

const N = [
  ["home", "home.html", "Home"],
  ["oils", "our-oils.html", "Our Oils"],
  ["about", "about.html", "About Us"],
  ["contact", "contact.html", "Contact"],
];

const PH = "+91 94875 58918";
const Ph = "04224814757  ";
const EM = "info@guhaamutham.com";
const FORMSPREE_ENDPOINTS = {
  "Business enquiry": "https://formspree.io/f/mqppgydo",
  Feedback: "https://formspree.io/f/myeebndr"
};
const AD = "132/1, Coperative Street, Vilankurichi, Coimbatore – 641035, Tamil Nadu, India.";

const hd = $("#hd");
if (hd) {
  hd.innerHTML = `<header class="hd"><div class="w bar"><a class="logo" href="home.html"><img class="image" src="assets/images/logo-1.png" height="45px">  <img class="image logo-secondary" src="assets/images/logo-2 (2).png"></a><button class="mb" aria-label="Toggle menu" aria-expanded="false">☰</button><nav id="nv" aria-label="Main">${N.map((n) => `<a href="${n[1]}" class="${n[0] == P ? "on" : ""}">${n[2]}</a>`).join("")}<a class="btn" href="contact.html#business-enquiry">Enquire Now</a></nav></div></header>`;
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
  ft.innerHTML = `<footer class="ft"><div class="w"><div class="fg"><div><a class="logo" href="home.html"><img src="assets/images/logo-1.png" height="60px">  <img class="logo-secondary" src="assets/images/logo-2 (2).png"></a><br><p>Traditional edible oils crafted for everyday Indian cooking — inspired by heritage, made with care.</p></div><div><h4>EXPLORE</h4><ul>${N.map((n) => `<li><a href="${n[1]}">${n[2]}</a></li>`).join("")}</ul></div><div><h4>CONTACT</h4><ul><li><a href="https://www.guhaamutham.com">www.guhaamutham.com</a></li><li><a href="mailto:${EM}">${EM}</a></li><li><a href="tel:04224814757"><i class="fas fa-phone" style="color:#AA7C20;"></i>  ${footerNumbers(Ph)} <span  class="contact-phone">Landline</span></a></li><li><a href="tel:+919487558918"> <i class="fas fa-mobile-alt" style="color:#AA7C20;"></i>  ${footerNumbers(PH)}</a></li><li style="opacity:.75">${footerNumbers(AD)}</li></ul></div></div><div class="fb"><span>© ${footerNumbers(String(new Date().getFullYear()))} GuhaAmutham LLP. All rights reserved.</span><span>TRADITIONAL PURITY · IN EVERY DROP.</span></div></div></footer>`;
}

const it = $("#intro");

if (it) {
  const content = [...it.children].find(
    (child) => child.classList.contains("is") && child.classList.contains("w"),
  );
  const slides = [...it.children].filter(
    (child) => child.classList.contains("is") && !child.classList.contains("w"),
  );

  if (content) slides.push(content);
  if (slides.length) {
    let current = 0;
    let timer;

    const duration = 800; // Transition speed
    const interval = 1900; // Time between image changes
    const pause = 10000; // Pause after all images

    const slideTransform = (slide, direction) => {
      if (slide === content) {
        if (direction > 0) return "translateX(calc(100vw + 100%))";
        if (direction < 0) return "translateX(calc(-100vw - 100%))";
      }

      return `translateX(${direction * 100}%)`;
    };

    // Prepare the background slides, followed by the content slide.
    slides.forEach((img, index) => {
      if (img !== content) {
        img.style.position = "absolute";
        img.style.inset = "0";
        img.style.width = "100%";
        img.style.height = "100%";
      }
      img.style.transition = `transform ${duration}ms ease-in-out`;
      img.style.transform = slideTransform(img, index === 0 ? 0 : 1);
      img.style.zIndex = index === 0 ? "2" : "1";
    });

    const rotate = () => {
      const next = (current + 1) % slides.length;
      const outgoing = slides[current];
      const incoming = slides[next];

      // Incoming image starts on the right
      incoming.style.transition = "none";
      incoming.style.transform = slideTransform(incoming, 1);
      incoming.style.zIndex = "2";

      // Force the browser to apply the starting position
      incoming.offsetWidth;

      incoming.style.transition =
        `transform ${duration}ms ease-in-out`;
      outgoing.style.zIndex = "1";

      // Both images move simultaneously, right to left
      requestAnimationFrame(() => {
        outgoing.style.transform = slideTransform(outgoing, -1);
        incoming.style.transform = slideTransform(incoming, 0);
      });

      current = next;

      // Hold the content slide before returning to the first background.
      if (current === slides.length - 1) {
        timer = setTimeout(rotate, pause);
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

const submitToFormspree = async (form) => {
  const endpoint = FORMSPREE_ENDPOINTS[form.dataset.f];
  if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint || "")) {
    throw new Error("The form hasn't been connected to Formspree yet.");
  }

  const formData = new FormData(form);
  formData.append("formType", form.dataset.f);
  formData.append("_subject", `New ${form.dataset.f} - GuhaAmutham`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  });
  const responseText = await response.text();
  let result;

  try {
    result = responseText ? JSON.parse(responseText) : null;
  } catch {
    result = null;
  }

  if (!response.ok) {
    const message = result?.errors
      ?.map((item) => item.message)
      .filter(Boolean)
      .join(" ");
    throw new Error(
      message || result?.error || `Formspree couldn't accept the submission (HTTP ${response.status}).`
    );
  }

  if (!result || result.ok === false) {
    throw new Error("Formspree returned an invalid response. Please try again.");
  }
};

document.querySelectorAll("form[data-f]").forEach((f) => {
  f.onsubmit = async (e) => {
    e.preventDefault();

    const ok = f.querySelector(".ok");
    const btn = f.querySelector('button[type="submit"]');

    if (!fv(f)) {
      ok.classList.remove("show");
      return;
    }

    const fields = Object.fromEntries(new FormData(f));
    btn.disabled = true;
    btn.textContent = "Sending...";
    ok.classList.remove("show");
    ok.textContent = "";

    try {
      await submitToFormspree(f);

      ok.textContent =
        `Thank you, ${fields.name}. Your ${f.dataset.f.toLowerCase()} has been sent successfully.`;
      ok.classList.add("show");
      ok.focus();
      f.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      const message = error instanceof Error
        ? error.message
        : "We couldn't send your message.";
      ok.textContent = `${message} Please try again or `;
      const contactLink = document.createElement("a");
      contactLink.href = `mailto:${EM}`;
      contactLink.textContent = "email us directly";
      ok.append(contactLink, ".");
      ok.classList.add("show");
      ok.focus();
    } finally {
      btn.disabled = false;
      btn.textContent =
        f.dataset.f === "Feedback" ? "Submit Feedback" : "Send Enquiry";
    }
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
