(function () {
  var root = document.getElementById('gptread-language');

  if (!root || root.dataset.ready === 'true') {
    return;
  }

  root.dataset.ready = 'true';

  var languages = [
    'Afrikaans',
    'Arabic',
    'Bangladeshi Bangla',
    'Bengali',
    'Bulgarian',
    'Cantonese',
    'Catalan',
    'Chinese',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Estonian',
    'Filipino',
    'Finnish',
    'French',
    'German',
    'Greek',
    'Gujarati',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Indonesian',
    'Iranian-Persian',
    'Italian',
    'Japanese',
    'Kannada',
    'Khmer',
    'Korean',
    'Latvian',
    'Lithuanian',
    'Malay',
    'Malayalam',
    'Mandarin',
    'Marathi',
    'Norwegian',
    'Pashto',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Romanian',
    'Russian',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Tamil',
    'Telugu',
    'Thai',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Vietnamese'
  ];

  function buildSequence(target, before, after) {
    var excluded = [target].concat(before, after);

    var rest = languages.filter(function (language) {
      return excluded.indexOf(language) === -1;
    });

    var cut = Math.floor(rest.length * 0.58);

    return rest
      .slice(0, cut)
      .concat(
        before,
        [target],
        after,
        rest.slice(cut)
      );
  }

  var configs = {
    left: {
      target: 'Spanish',
      entrance: 'down',

      sequence: buildSequence(
        'Spanish',
        ['Slovenian', 'Serbian'],
        ['Slovak', 'Swedish']
      ),

      duration: 2550,
      delay: 0
    },

    right: {
      target: 'English',
      entrance: 'up',

      sequence: buildSequence(
        'English',
        ['Estonian', 'French'],
        ['German', 'Finnish']
      ),

      duration: 2750,
      delay: 100
    }
  };

  var reducedMotion = window
    .matchMedia('(prefers-reduced-motion: reduce)')
    .matches;

  var repeatCount = 7;
  var middleRepeat = 3;
  var states = [];
  var started = false;

  var bubbles = {
    left: root.querySelector('[data-bubble="left"]'),
    right: root.querySelector('[data-bubble="right"]')
  };

  var bubbleCards = {
    left: root.querySelector('[data-bubble-card="left"]'),
    right: root.querySelector('[data-bubble-card="right"]')
  };

  var bubbleTimers = {
    left: 0,
    right: 0
  };

  var rtlLanguages = [
    'Arabic',
    'Hebrew',
    'Iranian-Persian',
    'Pashto',
    'Urdu'
  ];

  var bubbleTranslations = {
    "Afrikaans": {
      ask: "Hallo, kan jy my duidelik volg?",
      reply: "Hallo! Ja, natuurlik. Ek verstaan jou baie goed."
    },
    "Arabic": {
      ask: "مرحبًا، هل يمكنك متابعتي بوضوح؟",
      reply: "مرحبًا! نعم، بالتأكيد. أفهمك جيدًا جدًا."
    },
    "Bangladeshi Bangla": {
      ask: "হ্যালো, আপনি কি আমাকে স্পষ্টভাবে বুঝতে পারছেন?",
      reply: "হ্যালো! হ্যাঁ, অবশ্যই। আমি আপনাকে খুব ভালোভাবে বুঝতে পারছি।"
    },
    "Bengali": {
      ask: "হ্যালো, আপনি কি আমাকে স্পষ্টভাবে বুঝতে পারছেন?",
      reply: "হ্যালো! হ্যাঁ, অবশ্যই। আমি আপনাকে খুব ভালোভাবে বুঝতে পারছি।"
    },
    "Bulgarian": {
      ask: "Здравейте, разбирате ли ме ясно?",
      reply: "Здравейте! Да, разбира се. Разбирам ви много добре."
    },
    "Cantonese": {
      ask: "你好，你聽得清楚我講嘢嗎？",
      reply: "你好！係呀，當然。我聽得你好清楚。"
    },
    "Catalan": {
      ask: "Hola, em pots seguir amb claredat?",
      reply: "Hola! Sí, és clar. T'entenc molt bé."
    },
    "Chinese": {
      ask: "你好，你能清楚地听懂我吗？",
      reply: "你好！当然可以。我听得非常清楚。"
    },
    "Croatian": {
      ask: "Bok, možete li me jasno pratiti?",
      reply: "Bok! Da, naravno. Razumijem vas vrlo dobro."
    },
    "Czech": {
      ask: "Dobrý den, rozumíte mi jasně?",
      reply: "Dobrý den! Ano, samozřejmě. Rozumím vám velmi dobře."
    },
    "Danish": {
      ask: "Hej, kan du følge mig tydeligt?",
      reply: "Hej! Ja, selvfølgelig. Jeg forstår dig rigtig godt."
    },
    "Dutch": {
      ask: "Hallo, kunt u mij duidelijk volgen?",
      reply: "Hallo! Ja, natuurlijk. Ik begrijp u heel goed."
    },
    "English": {
      ask: "Hello, can you follow me clearly?",
      reply: "Hello! Yes, of course. I understand you very well."
    },
    "Estonian": {
      ask: "Tere, kas saate minust selgelt aru?",
      reply: "Tere! Jah, muidugi. Saan teist väga hästi aru."
    },
    "Filipino": {
      ask: "Kumusta, malinaw mo ba akong naiintindihan?",
      reply: "Kumusta! Oo, siyempre. Naiintindihan kita nang mabuti."
    },
    "Finnish": {
      ask: "Hei, ymmärrätkö minua selvästi?",
      reply: "Hei! Kyllä, tietenkin. Ymmärrän sinua erittäin hyvin."
    },
    "French": {
      ask: "Bonjour, vous me suivez bien ?",
      reply: "Bonjour ! Oui, bien sûr. Je vous comprends très bien."
    },
    "German": {
      ask: "Hallo, können Sie mir gut folgen?",
      reply: "Hallo! Ja, natürlich. Ich verstehe Sie sehr gut."
    },
    "Greek": {
      ask: "Γεια σας, με καταλαβαίνετε καθαρά;",
      reply: "Γεια σας! Ναι, φυσικά. Σας καταλαβαίνω πολύ καλά."
    },
    "Gujarati": {
      ask: "નમસ્તે, શું તમે મને સ્પષ્ટ રીતે સમજી શકો છો?",
      reply: "નમસ્તે! હા, ચોક્કસ. હું તમને ખૂબ સારી રીતે સમજી શકું છું."
    },
    "Hebrew": {
      ask: "שלום, האם אתם מבינים אותי בבירור?",
      reply: "שלום! כן, כמובן. אני מבין אתכם היטב."
    },
    "Hindi": {
      ask: "नमस्ते, क्या आप मुझे साफ़-साफ़ समझ पा रहे हैं?",
      reply: "नमस्ते! हाँ, बिल्कुल। मैं आपको बहुत अच्छी तरह समझ पा रहा हूँ।"
    },
    "Hungarian": {
      ask: "Szia, jól érthetően hallasz engem?",
      reply: "Szia! Igen, természetesen. Nagyon jól értelek."
    },
    "Indonesian": {
      ask: "Halo, apakah Anda bisa mengikuti saya dengan jelas?",
      reply: "Halo! Ya, tentu. Saya memahami Anda dengan sangat baik."
    },
    "Iranian-Persian": {
      ask: "سلام، آیا می‌توانید من را واضح متوجه شوید؟",
      reply: "سلام! بله، حتماً. من شما را خیلی خوب متوجه می‌شوم."
    },
    "Italian": {
      ask: "Ciao, riesci a seguirmi chiaramente?",
      reply: "Ciao! Sì, certo. Ti capisco molto bene."
    },
    "Japanese": {
      ask: "こんにちは、私の話ははっきり分かりますか？",
      reply: "こんにちは！はい、もちろんです。とてもよく分かります。"
    },
    "Kannada": {
      ask: "ನಮಸ್ಕಾರ, ನಾನು ಹೇಳುವುದನ್ನು ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ?",
      reply: "ನಮಸ್ಕಾರ! ಹೌದು, ಖಂಡಿತ. ನಾನು ನಿಮ್ಮನ್ನು ತುಂಬಾ ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ."
    },
    "Khmer": {
      ask: "សួស្តី តើអ្នកអាចយល់ខ្ញុំបានច្បាស់ទេ?",
      reply: "សួស្តី! បាទ/ចាស ច្បាស់ណាស់។ ខ្ញុំយល់អ្នកបានល្អណាស់។"
    },
    "Korean": {
      ask: "안녕하세요, 제 말이 또렷하게 이해되시나요?",
      reply: "안녕하세요! 네, 물론이죠. 아주 잘 이해됩니다."
    },
    "Latvian": {
      ask: "Sveiki, vai jūs mani skaidri saprotat?",
      reply: "Sveiki! Jā, protams. Es jūs ļoti labi saprotu."
    },
    "Lithuanian": {
      ask: "Sveiki, ar mane aiškiai suprantate?",
      reply: "Sveiki! Taip, žinoma. Jus labai gerai suprantu."
    },
    "Malay": {
      ask: "Hai, bolehkah anda memahami saya dengan jelas?",
      reply: "Hai! Ya, sudah tentu. Saya memahami anda dengan sangat baik."
    },
    "Malayalam": {
      ask: "ഹലോ, ഞാൻ പറയുന്നത് നിങ്ങൾക്ക് വ്യക്തമായി മനസ്സിലാകുന്നുണ്ടോ?",
      reply: "ഹലോ! അതെ, തീർച്ചയായും. ഞാൻ നിങ്ങളെ വളരെ നന്നായി മനസ്സിലാക്കുന്നു."
    },
    "Mandarin": {
      ask: "你好，你能清楚地听懂我吗？",
      reply: "你好！当然可以。我听得非常清楚。"
    },
    "Marathi": {
      ask: "नमस्कार, मी काय म्हणतोय ते तुम्हाला स्पष्ट समजत आहे का?",
      reply: "नमस्कार! हो, नक्कीच. मला तुम्ही खूप चांगले समजता."
    },
    "Norwegian": {
      ask: "Hei, kan du følge meg tydelig?",
      reply: "Hei! Ja, selvfølgelig. Jeg forstår deg veldig godt."
    },
    "Pashto": {
      ask: "سلام، آیا زما خبرې په روښانه ډول درک کولی شئ؟",
      reply: "سلام! هو، بالکل. زه تاسو ډېر ښه درک کوم."
    },
    "Polish": {
      ask: "Cześć, czy dobrze mnie rozumiesz?",
      reply: "Cześć! Tak, oczywiście. Rozumiem cię bardzo dobrze."
    },
    "Portuguese": {
      ask: "Olá, consegue me acompanhar claramente?",
      reply: "Olá! Sim, claro. Entendo você muito bem."
    },
    "Punjabi": {
      ask: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਕੀ ਤੁਸੀਂ ਮੈਨੂੰ ਸਾਫ਼ ਤੌਰ ਤੇ ਸਮਝ ਰਹੇ ਹੋ?",
      reply: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਹਾਂ, ਬਿਲਕੁਲ। ਮੈਂ ਤੁਹਾਨੂੰ ਬਹੁਤ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਮਝ ਰਿਹਾ ਹਾਂ।"
    },
    "Romanian": {
      ask: "Bună, mă puteți urmări clar?",
      reply: "Bună! Da, desigur. Vă înțeleg foarte bine."
    },
    "Russian": {
      ask: "Здравствуйте, вы хорошо меня понимаете?",
      reply: "Здравствуйте! Да, конечно. Я вас очень хорошо понимаю."
    },
    "Serbian": {
      ask: "Zdravo, da li me jasno razumete?",
      reply: "Zdravo! Da, naravno. Veoma vas dobro razumem."
    },
    "Slovak": {
      ask: "Dobrý deň, rozumiete mi jasne?",
      reply: "Dobrý deň! Áno, samozrejme. Rozumiem vám veľmi dobre."
    },
    "Slovenian": {
      ask: "Pozdravljeni, me jasno razumete?",
      reply: "Pozdravljeni! Da, seveda. Zelo dobro vas razumem."
    },
    "Spanish": {
      ask: "Hola, ¿puede seguirme con claridad?",
      reply: "Hola! Sí, claro. Le entiendo muy bien."
    },
    "Swahili": {
      ask: "Habari, unaweza kunielewa vizuri?",
      reply: "Habari! Ndiyo, bila shaka. Ninakuelewa vizuri sana."
    },
    "Swedish": {
      ask: "Hej, kan du följa mig tydligt?",
      reply: "Hej! Ja, självklart. Jag förstår dig mycket bra."
    },
    "Tagalog": {
      ask: "Kumusta, malinaw mo ba akong naiintindihan?",
      reply: "Kumusta! Oo, siyempre. Naiintindihan kita nang mabuti."
    },
    "Tamil": {
      ask: "வணக்கம், நான் சொல்வது உங்களுக்கு தெளிவாகப் புரிகிறதா?",
      reply: "வணக்கம்! ஆம், நிச்சயமாக. நான் உங்களை மிகவும் நன்றாகப் புரிந்துகொள்கிறேன்."
    },
    "Telugu": {
      ask: "నమస్కారం, నేను చెప్పేది మీకు స్పష్టంగా అర్థమవుతోందా?",
      reply: "నమస్కారం! అవును, ఖచ్చితంగా. నేను మిమ్మల్ని చాలా బాగా అర్థం చేసుకుంటున్నాను."
    },
    "Thai": {
      ask: "สวัสดี คุณเข้าใจฉันได้ชัดเจนไหม?",
      reply: "สวัสดี! ได้แน่นอน ฉันเข้าใจคุณดีมาก"
    },
    "Turkish": {
      ask: "Merhaba, beni net bir şekilde anlayabiliyor musunuz?",
      reply: "Merhaba! Evet, elbette. Sizi çok iyi anlıyorum."
    },
    "Ukrainian": {
      ask: "Вітаю, ви добре мене розумієте?",
      reply: "Вітаю! Так, звичайно. Я вас дуже добре розумію."
    },
    "Urdu": {
      ask: "سلام، کیا آپ مجھے واضح طور پر سمجھ پا رہے ہیں؟",
      reply: "سلام! جی ہاں، بالکل۔ میں آپ کو بہت اچھی طرح سمجھ رہا ہوں۔"
    },
    "Vietnamese": {
      ask: "Xin chào, bạn có nghe và hiểu tôi rõ không?",
      reply: "Xin chào! Vâng, tất nhiên. Tôi hiểu bạn rất rõ."
    }
  };

  var layoutMetrics = {
    row: 0,
    gap: 0
  };

  function refreshLayoutMetrics() {
    var row = root.querySelector('.gptread-language__row');

    layoutMetrics.row = row
      ? row.getBoundingClientRect().height
      : 48;

    var gapProbe = document.createElement('div');
    gapProbe.style.cssText =
      'position:absolute;visibility:hidden;height:var(--gr-gap);pointer-events:none';
    root.appendChild(gapProbe);
    layoutMetrics.gap =
      gapProbe.getBoundingClientRect().height || 12;
    root.removeChild(gapProbe);
  }

  function cssNumber(name) {
    if (name === '--gr-row') {
      if (!layoutMetrics.row) {
        refreshLayoutMetrics();
      }

      return layoutMetrics.row;
    }

    if (name === '--gr-gap') {
      if (!layoutMetrics.gap) {
        refreshLayoutMetrics();
      }

      return layoutMetrics.gap;
    }

    var parsed = parseFloat(
      getComputedStyle(root)
        .getPropertyValue(name)
        .trim()
    );

    return Number.isFinite(parsed) ? parsed : 0;
  }

  function clamp(value, min, max) {
    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  function smoothstep(value) {
    value = clamp(value, 0, 1);

    return (
      value *
      value *
      (3 - 2 * value)
    );
  }

  function getBubbleText(side, language) {
    var translation =
      bubbleTranslations[language] ||
      bubbleTranslations.English;

    return side === 'left'
      ? translation.ask
      : translation.reply;
  }

  function setBubbleText(side, language) {
    var card = bubbleCards[side];

    if (!card) {
      return;
    }

    card.textContent =
      getBubbleText(side, language);

    card.setAttribute(
      'dir',
      rtlLanguages.indexOf(language) !== -1
        ? 'rtl'
        : 'ltr'
    );
  }

  function showBubble(side) {
    if (!bubbles[side]) {
      return;
    }

    bubbles[side].classList.add('is-visible');
    bubbles[side].setAttribute('aria-hidden', 'false');
  }

  function hideBubble(side) {
    if (!bubbles[side]) {
      return;
    }

    bubbles[side].classList.remove('is-visible');
    bubbles[side].setAttribute('aria-hidden', 'true');
  }

  function clearBubbleTimer(side) {
    window.clearTimeout(bubbleTimers[side]);
    bubbleTimers[side] = 0;
  }

  function selectedLanguage(state) {
    var row =
      state.labelRows[
        Math.round(state.position)
      ];

    return row
      ? row.dataset.language
      : state.cfg.target;
  }

  function revealBubbleForState(state, delay) {
    var side = state.side;
    var language =
      selectedLanguage(state);

    clearBubbleTimer(side);
    hideBubble(side);
    setBubbleText(side, language);

    bubbleTimers[side] =
      window.setTimeout(
        function () {
          showBubble(side);
        },
        reducedMotion ? 0 : delay
      );
  }

  function buildWheel(wheel) {
    var side = wheel.dataset.wheel;
    var cfg = configs[side];

    var viewport = wheel.querySelector(
      '.gptread-language__viewport'
    );

    var lineTrack = wheel.querySelector(
      '.gptread-language__line-track'
    );

    var labelTrack = wheel.querySelector(
      '.gptread-language__label-track'
    );

    var fullSequence = [];

    for (
      var repeat = 0;
      repeat < repeatCount;
      repeat += 1
    ) {
      fullSequence = fullSequence.concat(
        cfg.sequence
      );
    }

    fullSequence.forEach(function (language) {
      var lineRow = document.createElement('div');
      lineRow.className = 'gptread-language__row';
      lineRow.dataset.language = language;

      var line = document.createElement('span');
      line.className = 'gptread-language__line';

      lineRow.appendChild(line);
      lineTrack.appendChild(lineRow);

      var labelRow = document.createElement('div');
      labelRow.className = 'gptread-language__row';
      labelRow.dataset.language = language;

      var label = document.createElement('span');
      label.className = 'gptread-language__label';
      label.textContent = language;

      labelRow.appendChild(label);
      labelTrack.appendChild(labelRow);
    });

    var targetIndex =
      middleRepeat *
      cfg.sequence.length +
      cfg.sequence.indexOf(cfg.target);

    var state = {
      side: side,
      wheel: wheel,
      viewport: viewport,
      lineTrack: lineTrack,
      labelTrack: labelTrack,

      lineRows: Array.from(
        lineTrack.children
      ),

      labelRows: Array.from(
        labelTrack.children
      ),

      cfg: cfg,
      sequenceLength: cfg.sequence.length,

      position: targetIndex,
      targetPosition: targetIndex,
      targetIndex: targetIndex,

      raf: 0,
      snapTimer: 0,

      entranceAnimations: []
    };

    wheel.addEventListener(
      'wheel',
      function (event) {
        handleWheel(state, event);
      },
      {
        passive: false
      }
    );

    bindPointerScroll(wheel, state);

    states.push(state);
  }

  function applyScrollDelta(state, delta) {
    if (!started) {
      startEntrance();
    }

    if (state.entranceAnimations.length) {
      stopEntrance(state);
    }

    clearBubbleTimer(state.side);
    hideBubble(state.side);

    delta = clamp(delta, -160, 160);

    state.targetPosition += delta * 0.0105;

    var edgePadding = state.sequenceLength;

    state.targetPosition = clamp(
      state.targetPosition,
      edgePadding,
      state.labelRows.length - edgePadding - 1
    );

    animateToTarget(state);

    window.clearTimeout(state.snapTimer);

    state.snapTimer = window.setTimeout(function () {
      snap(state);
    }, 130);
  }

  function bindPointerScroll(wheel, state) {
    var activePointer = null;
    var lastY = 0;

    wheel.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      activePointer = event.pointerId;
      lastY = event.clientY;
      wheel.setPointerCapture(event.pointerId);
    });

    wheel.addEventListener('pointermove', function (event) {
      if (activePointer !== event.pointerId) {
        return;
      }

      var dy = event.clientY - lastY;
      lastY = event.clientY;

      if (Math.abs(dy) < 0.5) {
        return;
      }

      event.preventDefault();
      applyScrollDelta(state, dy * 1.35);
    });

    function endPointer(event) {
      if (activePointer !== event.pointerId) {
        return;
      }

      activePointer = null;

      try {
        wheel.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* ignore */
      }

      snap(state);
    }

    wheel.addEventListener('pointerup', endPointer);
    wheel.addEventListener('pointercancel', endPointer);
  }

  root
    .querySelectorAll('[data-wheel]')
    .forEach(buildWheel);

  refreshLayoutMetrics();

  function transformFor(state, position) {
    var rowHeight = cssNumber('--gr-row');
    var viewportHeight =
      state.viewport.clientHeight;

    return (
      viewportHeight / 2 -
      rowHeight / 2 -
      position * rowHeight
    );
  }

  function setTrackPosition(state) {
    var transform =
      'translate3d(0,' +
      transformFor(
        state,
        state.position
      ) +
      'px,0)';

    state.lineTrack.style.transform =
      transform;

    state.labelTrack.style.transform =
      transform;
  }

  function styleFromDistance(distancePx, viewportHeight) {
    var normalized = clamp(
      distancePx / (viewportHeight * 0.31),
      0,
      1
    );

    var proximity = 1 - normalized;
    proximity = smoothstep(proximity);

    var active = Math.pow(proximity, 4.4);

    return {
      proximity: proximity,
      active: active
    };
  }

  function paint(state) {
    var viewportRect =
      state.viewport.getBoundingClientRect();

    var center =
      viewportRect.top +
      viewportRect.height / 2;

    var gap =
      cssNumber('--gr-gap');

    var nearestIndex = 0;
    var nearestDistance = Infinity;

    state.labelRows.forEach(
      function (labelRow, index) {
        var lineRow =
          state.lineRows[index];

        var label =
          labelRow.querySelector(
            '.gptread-language__label'
          );

        var line =
          lineRow.querySelector(
            '.gptread-language__line'
          );

        var rowRect =
          labelRow.getBoundingClientRect();

        var rowCenter =
          rowRect.top +
          rowRect.height / 2;

        var distancePx =
          Math.abs(
            rowCenter - center
          );

        if (
          distancePx <
          nearestDistance
        ) {
          nearestDistance =
            distancePx;

          nearestIndex =
            index;
        }

        var fx =
          styleFromDistance(
            distancePx,
            viewportRect.height
          );

        var p = fx.proximity;
        var active = fx.active;

        var grey;

        if (active > 0.58) {
          grey = 24;
        } else {
          grey =
            Math.round(
              30 +
              (1 - p) * 170
            );
        }

        var color;

        if (active > 0.48) {
          var orangeMix =
            clamp(
              (active - 0.48) /
              0.52,
              0,
              1
            );

          var r =
            Math.round(
              grey +
              (240 - grey) * orangeMix
            );

          var g =
            Math.round(
              grey +
              (96 - grey) * orangeMix
            );

          var b =
            Math.round(
              grey +
              (61 - grey) * orangeMix
            );

          color =
            'rgb(' +
            r +
            ',' +
            g +
            ',' +
            b +
            ')';
        } else {
          color =
            'rgb(' +
            grey +
            ',' +
            grey +
            ',' +
            grey +
            ')';
        }

        var opacity =
          0.18 +
          p * 0.82;

        var scale =
          0.86 +
          p * 0.25 +
          active * 0.48;

        var lineLength =
          86 +
          p * 82;

        label.style.color =
          color;

        label.style.opacity =
          String(opacity);

        label.style.transform =
          'translateY(-50%) scale(' +
          scale +
          ')';

        line.style.width =
          lineLength +
          'px';

        line.style.opacity =
          String(
            0.10 +
            p * 0.52
          );

        if (active > 0.5) {
          line.style.backgroundColor =
            '#F0603D';
        } else {
          var lineGrey =
            Math.round(
              70 +
              (1 - p) * 150
            );

          line.style.backgroundColor =
            'rgb(' +
            lineGrey +
            ',' +
            lineGrey +
            ',' +
            lineGrey +
            ')';
        }

        if (state.side === 'left') {
          label.style.left =
            (
              lineLength +
              gap
            ) +
            'px';

          label.style.right = 'auto';
        } else {
          label.style.right =
            (
              lineLength +
              gap
            ) +
            'px';

          label.style.left = 'auto';
        }
      }
    );

    var selected =
      state.labelRows[
        nearestIndex
      ];

    if (selected) {
      state.wheel.setAttribute(
        'aria-label',
        selected.dataset.language || ''
      );
    }
  }

  function render(state) {
    setTrackPosition(state);
    paint(state);
  }

  function repaintDuring(ms) {
    var start =
      performance.now();

    function frame(now) {
      states.forEach(paint);
  
      if (now - start < ms) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  function stopEntrance(state) {
    state.entranceAnimations.forEach(
      function (animation) {
        try {
          animation.cancel();
        } catch (error) {}
      }
    );

    state.entranceAnimations = [];
    state.position = state.targetPosition;

    render(state);
  }

  function normalizePosition(state) {
    var len =
      state.sequenceLength;

    var minSafe =
      len * 1.5;

    var maxSafe =
      state.labelRows.length -
      len * 1.5;

    if (
      state.position < minSafe ||
      state.position > maxSafe
    ) {
      var localIndex =
        Math.round(
          state.position
        ) % len;

      if (localIndex < 0) {
        localIndex += len;
      }

      state.position =
        middleRepeat * len + localIndex;

      state.targetPosition =
        state.position;

      render(state);
    }
  }

  function animateToTarget(state) {
    if (state.raf) {
      return;
    }

    function frame() {
      var diff =
        state.targetPosition -
        state.position;

      if (
        Math.abs(diff) <
        0.0015
      ) {
        state.position =
          state.targetPosition;

        state.raf = 0;

        render(state);
        normalizePosition(state);
        revealBubbleForState(state, 180);

        return;
      }

      state.position += diff * 0.18;

      render(state);
  
      state.raf =
        requestAnimationFrame(frame);
    }

    state.raf =
      requestAnimationFrame(frame);
  }

  function snap(state) {
    state.targetPosition =
      Math.round(state.targetPosition);

    animateToTarget(state);
  }

  function handleWheel(state, event) {
    event.preventDefault();

    var delta = event.deltaY;

    if (event.deltaMode === 1) {
      delta *= 16;
    } else if (event.deltaMode === 2) {
      delta *= state.viewport.clientHeight;
    }

    applyScrollDelta(state, delta);
  }

  function entrance(state) {
    var rowHeight =
      cssNumber('--gr-row');

    var finalY =
      transformFor(
        state,
        state.targetIndex
      );

    var travel =
      rowHeight * 17;

    var startY =
      state.cfg.entrance === 'down'
        ? finalY - travel
        : finalY + travel;

    var nearY =
      state.cfg.entrance === 'down'
        ? finalY - 74
        : finalY + 74;

    var overY =
      state.cfg.entrance === 'down'
        ? finalY + 9
        : finalY - 9;

    if (reducedMotion) {
      state.position =
        state.targetIndex;

      state.targetPosition =
        state.targetIndex;

      render(state);

      revealBubbleForState(
        state,
        state.side === 'left' ? 0 : 250
      );

      return;
    }

    state.lineTrack.style.transform =
      'translate3d(0,' +
      startY +
      'px,0)';

    state.labelTrack.style.transform =
      'translate3d(0,' +
      startY +
      'px,0)';

    paint(state);

    var keyframes = [
      {
        transform:
          'translate3d(0,' + startY + 'px,0)',
        offset: 0
      },
      {
        transform:
          'translate3d(0,' + nearY + 'px,0)',
        offset: 0.76
      },
      {
        transform:
          'translate3d(0,' + overY + 'px,0)',
        offset: 0.93
      },
      {
        transform:
          'translate3d(0,' + finalY + 'px,0)',
        offset: 1
      }
    ];

    var options = {
      duration: state.cfg.duration,
      delay: state.cfg.delay,
      easing: 'cubic-bezier(.12,.72,.18,1)',
      fill: 'forwards'
    };

    var lineAnimation =
      state.lineTrack.animate(
        keyframes,
        options
      );

    var labelAnimation =
      state.labelTrack.animate(
        keyframes,
        options
      );

    state.entranceAnimations = [
      lineAnimation,
      labelAnimation
    ];

    var startTime =
      performance.now();

    function repaint(now) {
      paint(state);
  
      if (
        now -
        startTime <
        state.cfg.duration +
        state.cfg.delay +
        150
      ) {
        requestAnimationFrame(repaint);
      }
    }

    requestAnimationFrame(repaint);

    labelAnimation.finished
      .then(function () {
        state.entranceAnimations = [];

        state.position =
          state.targetIndex;

        state.targetPosition =
          state.targetIndex;

        state.lineTrack.style.transform =
          'translate3d(0,' +
          finalY +
          'px,0)';

        state.labelTrack.style.transform =
          'translate3d(0,' +
          finalY +
          'px,0)';

        lineAnimation.cancel();
        labelAnimation.cancel();

        render(state);

        revealBubbleForState(
          state,
          state.side === 'left' ? 180 : 720
        );
      })
      .catch(function () {});
  }

  function startEntrance() {
    if (started) {
      return;
    }

    started = true;

    states.forEach(entrance);
    repaintDuring(3800);
  }

  var observer =
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.25
          ) {
            startEntrance();
            observer.disconnect();
          }
        });
      },
      {
        threshold: [0.25, 0.45]
      }
    );

  observer.observe(root);

  var resizeTimer = 0;

  window.addEventListener(
    'resize',
    function () {
      window.clearTimeout(resizeTimer);

      resizeTimer =
        window.setTimeout(function () {
          layoutMetrics.row = 0;
          layoutMetrics.gap = 0;
          refreshLayoutMetrics();
          states.forEach(render);
        }, 120);
    }
  );

  states.forEach(render);
})();
