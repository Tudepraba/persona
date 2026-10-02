(function () {
  'use strict';
  var D = window.PORTFOLIO || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* huruf bergaya potongan kertas */
  function ransom(node, text) {
    node.textContent = '';
    var n = 0;
    Array.from(text || '').forEach(function (ch, i) {
      if (ch === ' ') { node.appendChild(document.createTextNode(' ')); return; }
      var s = el('span', 'l l' + (i % 4), ch);
      s.style.setProperty('--r', ((i * 7) % 9 - 4) + 'deg');
      s.style.setProperty('--s', (0.92 + ((i * 5) % 4) / 20).toFixed(2));
      s.style.setProperty('--i', n++);
      node.appendChild(s);
    });
  }

  /* efek suara (opsional) */
  var ctx, soundOn = false;
  function blip(freq) {
    if (!soundOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.value = freq || 660; g.gain.value = 0.04;
      o.connect(g); g.connect(ctx.destination); o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      o.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }

  /* kartu proyek / kontak */
  function card(p) {
    var a = el('a', 'card');
    a.href = p.link || '#';
    if (p.link) { a.target = '_blank'; a.rel = 'noopener'; }
    else a.addEventListener('click', function (e) { e.preventDefault(); });
    if (p.tag) a.appendChild(el('span', 'badge', p.tag));
    a.appendChild(el('strong', null, p.title));
    a.appendChild(el('p', null, p.desc || 'Belum ada deskripsi.'));
    var foot = (p.note || '') + (p.stars != null ? '  ★ ' + p.stars : '');
    if (foot.trim()) a.appendChild(el('span', 'foot', foot));
    return a;
  }

  function fill(container, list) {
    container.textContent = '';
    (list || []).forEach(function (p) { container.appendChild(card(p)); });
  }

  /* ---------- susun halaman ---------- */
  var stage = $('#stage'), host = $('#screens');
  $('#tagLeft').textContent = D.tagLeft || '';
  $('#tagRight').textContent = D.tagRight || '';
  document.title = D.name ? D.name + ' | Portfolio' : 'Portfolio';

  var items = [['projects', 'Projects'], ['skills', 'Skills'], ['about', 'About'], ['contact', 'Contact']];
  var menuBtns = [], idx = 0, cur = 'home';

  // beranda
  var home = el('section', 'screen active'); home.id = 'screen-home';
  home.appendChild(el('p', 'kicker', D.kicker || ''));
  var h1 = el('h1', 'name ransom'); ransom(h1, D.name || 'Nama Kamu'); home.appendChild(h1);
  home.appendChild(el('p', 'bio', D.bio || ''));
  var ul = el('ul', 'menu');
  items.forEach(function (it, i) {
    var li = el('li'), b = el('button', 'ransom'); b.type = 'button';
    ransom(b, it[1]);
    b.addEventListener('mouseenter', function () { setSel(i); });
    b.addEventListener('focus', function () { setSel(i, true); });
    b.addEventListener('click', function () { go(it[0]); });
    li.appendChild(b); ul.appendChild(li); menuBtns.push(b);
  });
  home.appendChild(ul);
  var hero = el('div', 'hero'); hero.setAttribute('aria-hidden', 'true');
  if (D.photo) {
    var ph = el('div', 'photo'); ph.style.backgroundImage = 'url("' + D.photo + '")'; hero.appendChild(ph);
  } else hero.appendChild(el('div', 'art'));
  home.appendChild(hero);
  host.appendChild(home);

  function sub(id, title) {
    var s = el('section', 'screen'); s.id = 'screen-' + id;
    var h = el('h2', 'ransom'); ransom(h, title); s.appendChild(h);
    var back = el('button', 'back', 'Esc  Kembali'); back.type = 'button';
    back.addEventListener('click', function () { go('home'); });
    s.appendChild(back); host.appendChild(s); return s;
  }

  // projects
  var pr = sub('projects', 'Projects');
  pr.appendChild(el('h3', 'sub', 'Featured'));
  var featured = el('div', 'cards'); fill(featured, D.featured); pr.appendChild(featured);
  pr.appendChild(el('h3', 'sub', 'All repositories'));
  var repos = el('div', 'cards light'); fill(repos, D.projects); pr.appendChild(repos);

  if (D.githubUser) {
    fetch('https://api.github.com/users/' + encodeURIComponent(D.githubUser) + '/repos?sort=updated&per_page=9')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (list) {
        fill(repos, list.filter(function (r) { return !r.fork; }).map(function (r) {
          return { title: r.name, desc: r.description, tag: r.language || 'Repo', link: r.html_url, stars: r.stargazers_count };
        }));
      })
      .catch(function () { /* tetap pakai daftar manual */ });
  }

  // skills
  var sk = sub('skills', 'Skills');
  (D.skills || []).forEach(function (g) {
    var w = el('div', 'group'); w.appendChild(el('h3', 'sub', g.title));
    var c = el('div', 'chips');
    (g.items || []).forEach(function (t) { c.appendChild(el('span', 'chip', t)); });
    w.appendChild(c); sk.appendChild(w);
  });

  // about
  var ab = sub('about', 'About');
  var A = D.about || {};
  (A.paragraphs || []).forEach(function (t) { ab.appendChild(el('p', 'box', t)); });
  if (A.facts && A.facts.length) {
    var dl = el('dl', 'facts');
    A.facts.forEach(function (f) { dl.appendChild(el('dt', null, f.label)); dl.appendChild(el('dd', null, f.value)); });
    ab.appendChild(dl);
  }

  // contact
  var ct = sub('contact', 'Contact');
  var cc = el('div', 'cards light'); fill(cc, D.contact); ct.appendChild(cc);

  /* ---------- navigasi ---------- */
  function setSel(i, keepFocus) {
    idx = (i + menuBtns.length) % menuBtns.length;
    menuBtns.forEach(function (b, k) { b.classList.toggle('sel', k === idx); });
    if (!keepFocus && cur === 'home') menuBtns[idx].focus({ preventScroll: true });
  }

  function go(id) {
    if (id === cur) return;
    blip(880);
    stage.classList.remove('go'); void stage.offsetWidth; stage.classList.add('go');
    setTimeout(function () {
      $('.screen.active').classList.remove('active');
      $('#screen-' + id).classList.add('active');
      cur = id;
      var f = id === 'home' ? menuBtns[idx] : $('#screen-' + id + ' .card');
      if (f) f.focus({ preventScroll: true });
      if (id === 'home') setSel(idx, true);
    }, 260);
  }

  document.addEventListener('keydown', function (e) {
    var k = e.key;
    if (cur === 'home') {
      if (k === 'ArrowDown') { e.preventDefault(); setSel(idx + 1); blip(520); }
      else if (k === 'ArrowUp') { e.preventDefault(); setSel(idx - 1); blip(520); }
      else if (k === 'Enter') { e.preventDefault(); go(items[idx][0]); }
    } else {
      if (k === 'Escape' || k === 'Backspace') { e.preventDefault(); go('home'); return; }
      var next = k === 'ArrowDown' || k === 'ArrowRight' ? 1 : (k === 'ArrowUp' || k === 'ArrowLeft' ? -1 : 0);
      if (!next) return;
      var list = Array.prototype.slice.call(document.querySelectorAll('#screen-' + cur + ' a.card'));
      if (!list.length) return;
      e.preventDefault();
      var i = list.indexOf(document.activeElement);
      list[(i + next + list.length) % list.length].focus();
      blip(520);
    }
  });

  /* tombol suara + jam */
  var sb = $('#sound');
  sb.addEventListener('click', function () {
    soundOn = !soundOn;
    sb.setAttribute('aria-pressed', soundOn);
    sb.textContent = 'Suara: ' + (soundOn ? 'nyala' : 'mati');
    blip(700);
  });

  function tick() {
    var opt = { hour: '2-digit', minute: '2-digit' };
    var t;
    try { t = new Date().toLocaleTimeString([], D.timezone ? Object.assign({ timeZone: D.timezone }, opt) : opt); }
    catch (e) { t = new Date().toLocaleTimeString([], opt); }
    $('#clock').textContent = t;
  }
  tick(); setInterval(tick, 30000);

  setSel(0);
})();
