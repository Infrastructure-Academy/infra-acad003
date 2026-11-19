/* Public issued-film rails.
   Sources, posters, and listed lengths are the ones already on /pages/movies.html.
   Sixteen slots, fifteen unique encodes. No hold, session, or unissued cut is listed. */
(function () {
  var CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/kUQZAex2uPvgKcHnt7bmh3/';
  var MANUS = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/';

  var FILMS = {
    'la-menara': {
      title: 'La Menara — An Infrastructure Odyssey',
      listed: '10:00',
      poster: CDN + 'la_menara_doc_poster_7851b3f9.jpg',
      src: MANUS + 'wHlzVXzMODYYdntg.mp4'
    },
    'la-menara-trailer': {
      title: 'La Menara — Trailer',
      listed: '2:11',
      poster: CDN + 'la_menara_trailer_poster_2a54c010.jpg',
      src: MANUS + 'iqkMXujGPgKFLVkB.mp4'
    },
    calories: {
      title: 'Calories to Consciousness — Main Pitch',
      listed: '4:22',
      poster: MANUS + 'OcXXMLdnmQbhMWui.jpg',
      src: MANUS + 'BhohCnRNKxGTfvlS.mp4'
    },
    principia: {
      title: 'Principia Tectonica',
      listed: '10:33',
      poster: CDN + 'principia_poster_a3090690.jpg',
      src: CDN + 'PRINCIPIA-TECTONICA-V5-MEGA-MOVIE(2)_f41e7154.mp4'
    },
    'igo-architecture': {
      title: 'iGO Architecture',
      listed: '1:40',
      poster: CDN + 'igo_architecture_poster_4d90f4a7.jpg',
      src: CDN + 'iGO_Movie_SHARE_WITH_TEAM_16x9_7c72b3fe.mp4'
    },
    'igo-play': {
      title: 'iGO — Would You Like to Play a Game?',
      listed: '0:50',
      poster: CDN + 'igo_poster_9e81af3b.jpg',
      src: CDN + 'iGO_trailer_v7_6a22857c.mp4',
      portrait: true
    },
    'reality-engine': {
      title: 'The Reality Engine — Guided Learning Platform',
      listed: '~1:00',
      poster: CDN + 'reality_engine_poster_bd73f47b.jpg',
      src: CDN + 'reality-engine-trailer_7e837497.mp4'
    },
    snapshot: {
      title: 'Snapshot Trailer',
      listed: '~0:35',
      poster: MANUS + 'rMRwaBvDONNyHqpS.jpg',
      src: MANUS + 'lXPMPIyzekwVrToI.MP4'
    },
    'river-valley': {
      title: 'River Valley Civilization',
      listed: '~0:06',
      poster: MANUS + 'zWxgmErsajJzpeNj.jpg',
      src: CDN + 'river_plain_perfect_e99879d1.mp4'
    },
    linkedin: {
      title: 'LinkedIn Professional',
      listed: '~1:00',
      poster: CDN + 'iaai_linkedin_pro_poster-huZHGojJEQdCzLuRsKmiBT.webp',
      src: CDN + 'IAAI_LinkedIn_Professional_16x9_fd21eefc.mp4',
      sameEncode: true
    },
    'linkedin-v2': {
      title: 'LinkedIn Professional v2',
      listed: '~1:00',
      poster: CDN + 'iaai_linkedin_pro_v2_poster-g5B7CMVQWQKgqVs2EHeiTB.webp',
      src: CDN + 'IAAI_LinkedIn_Professional_16x9(1)_72fb0c21.mp4',
      sameEncode: true
    },
    'x-teaser': {
      title: 'X / Twitter Teaser',
      listed: '~0:30',
      poster: CDN + 'iaai_twitter_teaser_poster-5JFY2f5MNeJV9XUV3NVNz3.webp',
      src: CDN + 'IAAI_Twitter_Teaser_16x9_9cddb68c.mp4'
    },
    whatsapp: {
      title: 'WhatsApp / Stories',
      listed: '~0:30',
      poster: CDN + 'iaai_whatsapp_stories_poster-JM2VSRDHdWUe9G5jfXeTpk.webp',
      src: CDN + 'IAAI_WhatsApp_Stories_9x16_8c7aca76.mp4',
      portrait: true
    },
    'dearden-dynamics': {
      title: 'Dearden Dynamics',
      listed: '2:40',
      poster: CDN + 'dearden_poster_e4495e95.jpg',
      src: CDN + 'MASTER-VIDEO-DEARDEN-DYNAMICS(2)_fdde8442.mp4'
    },
    'investor-companion': {
      title: 'Investor Companion',
      listed: '~2:00',
      poster: CDN + 'investor_companion_poster_7943cb02.jpg',
      src: CDN + 'final_investor_companion_5aa32eb1.mp4'
    },
    katana: {
      title: 'The Blade and the Bridge — Katana 13-Fold',
      listed: '4:04',
      poster: CDN + 'katana_poster_01e586bd.jpg',
      src: CDN + 'katana_13fold_v2_155b15a1.mp4'
    }
  };

  var PUBLIC_RAILS = [
    {
      title: 'Issued library',
      note: 'Sixteen public slots. Fifteen unique encodes. LinkedIn Professional and LinkedIn Professional v2 are one encode under two titles.',
      ids: ['la-menara', 'principia', 'igo-architecture', 'katana', 'dearden-dynamics', 'la-menara-trailer', 'reality-engine', 'igo-play', 'investor-companion', 'calories', 'snapshot', 'river-valley', 'linkedin', 'linkedin-v2', 'x-teaser', 'whatsapp']
    },
    {
      title: 'Odyssey / La Menara',
      note: 'Issued feature, trailer, and main pitch.',
      ids: ['la-menara', 'la-menara-trailer', 'calories']
    },
    {
      title: 'Principia',
      note: 'Issued Principia Tectonica.',
      ids: ['principia']
    },
    {
      title: 'Play / iGO',
      note: 'Issued architecture film and play invitation.',
      ids: ['igo-architecture', 'igo-play']
    },
    {
      title: 'Reality Engine',
      note: 'Issued guided-learning trailer. Kept distinct from Quest.',
      ids: ['reality-engine']
    },
    {
      title: 'Short form',
      note: 'LinkedIn Professional and LinkedIn Professional v2 are one encode under two titles.',
      ids: ['snapshot', 'river-valley', 'linkedin', 'linkedin-v2', 'x-teaser', 'whatsapp']
    },
    {
      title: 'Academy and briefing',
      note: 'Issued institution film and investor companion.',
      ids: ['dearden-dynamics', 'investor-companion']
    },
    {
      title: 'Blade and the Bridge',
      note: 'Issued Katana 13-Fold.',
      ids: ['katana']
    }
  ];

  var DPM_RAILS = [
    {
      title: 'Issued films on this door',
      note: 'Four titles already on the catalogue. This tray does not carry Accept.',
      ids: ['dearden-dynamics', 'la-menara-trailer', 'igo-play', 'snapshot']
    }
  ];

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cardHtml(id) {
    var film = FILMS[id];
    if (!film) return '';
    var portrait = film.portrait ? ' is-portrait' : '';
    var same = film.sameEncode ? '<p class="ifr-same">One encode, two titles.</p>' : '';
    return ''
      + '<article class="ifr-card' + portrait + '" data-film="' + esc(id) + '">'
      + '<div class="ifr-stage">'
      + '<img src="' + esc(film.poster) + '" alt="" loading="lazy">'
      + '<button type="button" class="ifr-play" data-src="' + esc(film.src) + '" aria-label="Play ' + esc(film.title) + '"><span aria-hidden="true">&#9654;</span></button>'
      + '</div>'
      + '<p class="ifr-title">' + esc(film.title) + '</p>'
      + '<p class="ifr-meta">Listed ' + esc(film.listed) + '</p>'
      + same
      + '</article>';
  }

  function railHtml(rail) {
    var cards = rail.ids.map(cardHtml).join('');
    return ''
      + '<div class="ifr-rail">'
      + '<div class="ifr-rail-head">'
      + '<h3>' + esc(rail.title) + '</h3>'
      + '<div class="ifr-arrows">'
      + '<button type="button" class="ifr-prev" aria-label="Scroll ' + esc(rail.title) + ' back">&#8249;</button>'
      + '<button type="button" class="ifr-next" aria-label="Scroll ' + esc(rail.title) + ' forward">&#8250;</button>'
      + '</div>'
      + '</div>'
      + '<p class="ifr-rail-note">' + esc(rail.note) + '</p>'
      + '<div class="ifr-row">' + cards + '</div>'
      + '</div>';
  }

  function pauseOthers(root, current) {
    var videos = root.querySelectorAll('video');
    for (var i = 0; i < videos.length; i++) {
      if (videos[i] !== current) videos[i].pause();
    }
  }

  function playFromButton(root, button) {
    var stage = button.parentNode;
    var src = button.getAttribute('data-src');
    var label = button.getAttribute('aria-label') || 'Play film';
    var video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-label', label.replace(/^Play\s+/, ''));
    var source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    button.remove();
    var img = stage.querySelector('img');
    if (img) img.remove();
    stage.appendChild(video);
    pauseOthers(root, video);
    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(function () {});
  }

  function scrollRow(button, direction) {
    var rail = button.closest('.ifr-rail');
    if (!rail) return;
    var row = rail.querySelector('.ifr-row');
    if (!row) return;
    var amount = Math.max(220, Math.round(row.clientWidth * 0.8));
    row.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  function render(root) {
    var mode = root.getAttribute('data-issued-rails') || 'public';
    var rails = mode === 'dpm' ? DPM_RAILS : PUBLIC_RAILS;
    var catalogue = root.getAttribute('data-catalogue') !== 'false';
    var lead = mode === 'dpm'
      ? 'A short tray for this door. <a href="/pages/movies.html">Full catalogue</a>.'
      : 'Issued films, grouped by the work they already do. <a href="/pages/movies.html">Full catalogue</a>.';
    if (!catalogue) {
      lead = 'Issued films, grouped by the work they already do.';
    }
    if (mode === 'public' && root.getAttribute('data-on-catalogue') === 'true') {
      lead = 'Browse the issued library here. Sixteen slots, fifteen unique encodes. The players below are the same films.';
    }
    root.innerHTML = ''
      + '<div class="ifr-wrap">'
      + '<h2>' + (mode === 'dpm' ? 'On this door' : 'Issued films') + '</h2>'
      + '<p class="ifr-lead">' + lead + '</p>'
      + rails.map(railHtml).join('')
      + '</div>';

    root.addEventListener('click', function (event) {
      var play = event.target.closest('.ifr-play');
      if (play && root.contains(play)) {
        event.preventDefault();
        playFromButton(root, play);
        return;
      }
      var prev = event.target.closest('.ifr-prev');
      if (prev && root.contains(prev)) {
        scrollRow(prev, -1);
        return;
      }
      var next = event.target.closest('.ifr-next');
      if (next && root.contains(next)) scrollRow(next, 1);
    });
  }

  function boot() {
    var nodes = document.querySelectorAll('[data-issued-rails]');
    for (var i = 0; i < nodes.length; i++) render(nodes[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
