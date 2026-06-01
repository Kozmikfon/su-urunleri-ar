/* ── ELEMENTLER ── */
const popup       = document.getElementById("fishPopup");
const fishImage   = document.getElementById("fishImage");
const fishName    = document.getElementById("fishName");
const fishDesc    = document.getElementById("fishDesc");
const fishSize    = document.getElementById("fishSize");
const fishHabitat = document.getElementById("fishHabitat");
const fishDiet    = document.getElementById("fishDiet");
const fishStatus  = document.getElementById("fishStatus");
const closeBtn    = document.getElementById("closeBtn");
const quizBtn     = document.getElementById("quizBtn");
const startBtn    = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

const quizPopup   = document.getElementById("quizPopup");
const quizQuestion= document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizProgress= document.getElementById("quizProgress");
const quizScore   = document.getElementById("quizScore");
const quizFeedback= document.getElementById("quizFeedback");
const quizNext    = document.getElementById("quizNext");
const quizFinish  = document.getElementById("quizFinish");

const resultPopup = document.getElementById("resultPopup");
const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultDesc  = document.getElementById("resultDesc");
const resultScore = document.getElementById("resultScore");
const resultClose = document.getElementById("resultClose");
const showModelBtn = document.getElementById("showModelBtn");
const modelPopup = document.getElementById("modelPopup");
const closeModelBtn = document.getElementById("closeModelBtn");
const fishModelViewer = document.getElementById("fishModelViewer");

const aiPopup     = document.getElementById("aiPopup");
const aiFloatBtn  = document.getElementById("aiFloatBtn");
const aiClose     = document.getElementById("aiClose");
const aiImageInput= document.getElementById("aiImageInput");
const aiPreview   = document.getElementById("aiPreview");
const aiResult    = document.getElementById("aiResult");
const aiAnalyzeBtn= document.getElementById("aiAnalyzeBtn");

let currentTarget = null;
let quizState = { questions: [], index: 0, score: 0, currentFish: null };

/* ── BALIK VERİSİ ── */
const fishData = {
  0: {
    name: "Levrek",
    desc: "Levrek (Dicentrarchus labrax), Akdeniz ve Ege Denizi'nde yaygın bulunan, hızlı yüzen etçil bir balık türüdür. Lezzetli eti sayesinde Türkiye'de en çok tüketilen balıklar arasındadır.",
    habitat: "Ege & Akdeniz",
    size: "30–70 cm",
    diet: "Etçil (balık, karides)",
    status: "Yaygın",
    image: "./assets/images/0-levrek.jpg",
    
    questions: [
      {
        q: "Levrek hangi denizde yaşar?",
        options: ["Karadeniz", "Ege Denizi", "Kızıl Deniz", "Baltık Denizi"],
        correct: 1
      },
      {
        q: "Levreğin beslenme türü nedir?",
        options: ["Ot yiyen", "Etçil", "Her şeyi yer", "Plankton filtreler"],
        correct: 1
      },
      {
        q: "Levreğin bilimsel adı nedir?",
        options: ["Salmo salar", "Amphiprion ocellaris", "Dicentrarchus labrax", "Thunnus thynnus"],
        correct: 2
      }
    ]
  },
  1: {
    name: "Palyaço Balığı",
    desc: "Palyaço balığı (Amphiprion ocellaris), tropikal mercan resiflerinde anemon balıkları ile simbiyotik ilişki içinde yaşar. Turuncu-beyaz rengi ve karakteristik yüzüşüyle tanınır.",
    habitat: "Pasifik & Hint Okyanusu",
    size: "8–15 cm",
    diet: "Zooplankton, algler",
    status: "Yaygın",
    image: "./assets/images/1-palyaco.jpg",
    model: "./assets/models/palyaco.glb",
    questions: [
      {
        q: "Palyaço balığı hangi canlıyla birlikte yaşar?",
        options: ["Ahtapot", "Denizanası", "Deniz anemon'u", "Mercan"],
        correct: 2
      },
      {
        q: "Palyaço balığının ortalama boyu nedir?",
        options: ["30 cm", "8–15 cm", "50 cm", "1 metre"],
        correct: 1
      },
      {
        q: "Palyaço balığı hangi okyanus/denizlerde bulunur?",
        options: ["Atlantik", "Arktik", "Pasifik & Hint Okyanusu", "Akdeniz"],
        correct: 2
      }
    ]
  },
  2: {
    name: "Somon",
    desc: "Somon (Salmo salar), tatlı suda doğup okyanusta büyüyen eşsiz göç balığıdır. Yüksek omega-3 içeriği ile sağlıklı beslenmenin sembolü haline gelmiştir.",
    habitat: "Kuzey Atlantik & Pasifik",
    size: "50–120 cm",
    diet: "Küçük balık, karides",
    status: "Kültür balıkçılığı",
    image: "./assets/images/2-somon.jpg",
    questions: [
      {
        q: "Somon balığı nerede doğar?",
        options: ["Okyanusta", "Tatlı suda", "Lagünde", "Deniz tabanında"],
        correct: 1
      },
      {
        q: "Somon hangi besin maddesiyle ünlüdür?",
        options: ["Kalsiyum", "Demir", "Omega-3 yağ asidi", "Vitamin C"],
        correct: 2
      },
      {
        q: "Somonun bilimsel adı nedir?",
        options: ["Salmo salar", "Dicentrarchus labrax", "Trachurus trachurus", "Sparus aurata"],
        correct: 0
      }
    ]
  },
    3: {
    name: "Sazan Balığı",
    desc: "Sazan balığı tatlı sularda yaşayan dayanıklı ve yaygın bir balık türüdür.",
    habitat: "Göl ve Nehirler",
    size: "30–100 cm",
    diet: "Omnivor",
    status: "Yaygın",
    image: "./assets/images/3-sazan.jpg",
    model: "./assets/models/sazan.glb",

    questions: [
      {
        q: "Sazan balığı hangi sularda yaşar?",
        options: ["Tatlı su", "Okyanus", "Tuz gölü", "Mercan resifi"],
        correct: 0
      },
      {
        q: "Sazan nasıl beslenir?",
        options: ["Etçil", "Otçul", "Omnivor", "Sadece plankton"],
        correct: 2
      },
      {
        q: "Sazan balığı genelde nerede bulunur?",
        options: ["Çölde", "Nehir ve göllerde", "Buzullarda", "Mağarada"],
        correct: 1
      }
    ]
  },

  4: {
    name: "Köpek Balığı",
    desc: "Köpek balıkları okyanusların en güçlü avcılarından biridir.",
    habitat: "Okyanuslar",
    size: "2–12 metre",
    diet: "Etçil",
    status: "Bazı türler tehlikede",
    image: "./assets/images/4-kopekbaligi.jpg",
    model: "./assets/models/kopekbaligi.glb",

    questions: [
      {
        q: "Köpek balığı nasıl beslenir?",
        options: ["Otçul", "Etçil", "Plankton", "Alg"],
        correct: 1
      },
      {
        q: "Köpek balıkları nerede yaşar?",
        options: ["Çöller", "Ormanlar", "Okyanuslar", "Nehirler"],
        correct: 2
      },
      {
        q: "Köpek balığı hangi özelliğiyle bilinir?",
        options: ["Uçması", "Güçlü avcı olması", "Karada yaşaması", "Işık saçması"],
        correct: 1
      }
    ]
  },

  5: {
    name: "Ton Balığı",
    desc: "Ton balığı hızlı yüzmesiyle bilinen büyük bir okyanus balığıdır.",
    habitat: "Atlantik ve Pasifik",
    size: "100–250 cm",
    diet: "Etçil",
    status: "Ticari avcılık",
    image: "./assets/images/5-ton.jpg",

    questions: [
      {
        q: "Ton balığı nasıl bir balıktır?",
        options: ["Yavaş", "Uçamayan", "Hızlı yüzen", "Tatlı su"],
        correct: 2
      },
      {
        q: "Ton balığı nerede yaşar?",
        options: ["Okyanus", "Çöl", "Nehir", "Bataklık"],
        correct: 0
      },
      {
        q: "Ton balığı neyle beslenir?",
        options: ["Etçil", "Otçul", "Meyve", "Alg"],
        correct: 0
      }
    ]
  },

  6: {
    name: "Yunus Balığı",
    desc: "Yunus balığı hızlı hareket eden tropikal bir deniz canlısıdır.",
    habitat: "Tropikal Denizler",
    size: "50–200 cm",
    diet: "Etçil",
    status: "Yaygın",
    image: "./assets/images/6-yunus.jpg",

    questions: [
      {
        q: "Yunus balığı hangi sularda yaşar?",
        options: ["Tatlı su", "Tropikal denizler", "Buzullar", "Mağaralar"],
        correct: 1
      },
      {
        q: "Yunus balığı nasıl beslenir?",
        options: ["Otçul", "Etçil", "Alg", "Plankton"],
        correct: 1
      },
      {
        q: "Yunus balığı hangi özelliğiyle bilinir?",
        options: ["Hızlı yüzmesi", "Karada yaşaması", "Uçması", "Işık saçması"],
        correct: 0
      }
    ]
  },

  7: {
    name: "Hamsi",
    desc: "Hamsi Karadeniz'de yaygın bulunan küçük bir balık türüdür.",
    habitat: "Karadeniz",
    size: "10–18 cm",
    diet: "Plankton",
    status: "Yaygın",
    image: "./assets/images/7-hamsi.jpg",

    questions: [
      {
        q: "Hamsi en çok hangi bölgede bulunur?",
        options: ["Karadeniz", "Çöl", "Pasifik", "Atlantik"],
        correct: 0
      },
      {
        q: "Hamsi neyle beslenir?",
        options: ["Et", "Plankton", "Alg", "Meyve"],
        correct: 1
      },
      {
        q: "Hamsi nasıl bir balıktır?",
        options: ["Dev", "Küçük", "Uçan", "Tatlı su"],
        correct: 1
      }
    ]
  },

  8: {
    name: "Orkinos",
    desc: "Orkinos büyük ve güçlü bir açık deniz balığıdır.",
    habitat: "Açık Denizler",
    size: "150–300 cm",
    diet: "Etçil",
    status: "Av baskısı altında",
    image: "./assets/images/8-orkinos.jpg",

    questions: [
      {
        q: "Orkinos nasıl beslenir?",
        options: ["Otçul", "Etçil", "Alg", "Plankton"],
        correct: 1
      },
      {
        q: "Orkinos nerede yaşar?",
        options: ["Açık deniz", "Çöl", "Nehir", "Orman"],
        correct: 0
      },
      {
        q: "Orkinos nasıl bir balıktır?",
        options: ["Küçük", "Güçlü", "Uçan", "Karasal"],
        correct: 1
      }
    ]
  },

  9: {
    name: "Japon Balığı",
    desc: "Japon balığı akvaryumlarda en çok beslenen süs balıklarından biridir.",
    habitat: "Tatlı Su",
    size: "15–30 cm",
    diet: "Omnivor",
    status: "Evcil",
    image: "./assets/images/9-japon.jpg",
    model: "./assets/models/japon.glb",

    questions: [
      {
        q: "Japon balığı genellikle nerede yaşar?",
        options: ["Akvaryum", "Çöl", "Okyanus", "Buzul"],
        correct: 0
      },
      {
        q: "Japon balığı nasıl beslenir?",
        options: ["Etçil", "Omnivor", "Sadece et", "Sadece alg"],
        correct: 1
      },
      {
        q: "Japon balığı hangi amaçla beslenir?",
        options: ["Yarış", "Süs", "Avcılık", "Taşıma"],
        correct: 1
      }
    ]
  }
};

/* ── START ── */
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  aiFloatBtn.classList.remove("hidden");
});

/* ── BALIK POPUP KAPAT ── */
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  currentTarget = null;
});

/* ── QUİZ BAŞLAT ── */
quizBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  startQuiz(quizState.currentFish);
});

/* ── QUİZ FONKSİYONLARI ── */
function startQuiz(fish) {
  quizState = {
    questions: fish.questions,
    index: 0,
    score: 0,
    currentFish: fish
  };
  quizPopup.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = quizState.questions[quizState.index];
  quizProgress.textContent = `Soru ${quizState.index + 1} / ${quizState.questions.length}`;
  quizScore.textContent = `⭐ ${quizState.score}`;
  quizQuestion.textContent = q.q;

  quizOptions.innerHTML = "";
  quizFeedback.className = "quiz-feedback hidden";
  quizFeedback.textContent = "";
  quizNext.classList.add("hidden");
  quizFinish.classList.add("hidden");

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.textContent = opt;
    btn.addEventListener("click", () => answerQuestion(i, q.correct));
    quizOptions.appendChild(btn);
  });
}

function answerQuestion(selected, correct) {
  const opts = quizOptions.querySelectorAll(".quiz-opt");
  opts.forEach(b => b.disabled = true);
  opts[correct].classList.add("correct");

  if (selected === correct) {
    quizState.score++;
    quizFeedback.textContent = "✅ Doğru! Harika!";
    quizFeedback.className = "quiz-feedback correct-fb";
  } else {
    opts[selected].classList.add("wrong");
    quizFeedback.textContent = `❌ Yanlış! Doğrusu: "${quizState.questions[quizState.index].options[correct]}"`;
    quizFeedback.className = "quiz-feedback wrong-fb";
  }

  quizScore.textContent = `⭐ ${quizState.score}`;

  if (quizState.index < quizState.questions.length - 1) {
    quizNext.classList.remove("hidden");
  } else {
    quizFinish.classList.remove("hidden");
  }
}

quizNext.addEventListener("click", () => {
  quizState.index++;
  showQuestion();
});

quizFinish.addEventListener("click", () => {
  quizPopup.classList.add("hidden");
  showResult();
});

/* ── SONUÇ ── */
function showResult() {
  const total = quizState.questions.length;
  const score = quizState.score;
  resultScore.textContent = `${score}/${total}`;

  if (score === total) {
    resultEmoji.textContent = "🏆";
    resultTitle.textContent = "Mükemmel!";
    resultDesc.textContent = "Tüm soruları doğru bildin. Sen gerçek bir deniz biyoloğusun!";
  } else if (score >= total / 2) {
    resultEmoji.textContent = "🐟";
    resultTitle.textContent = "İyi İş!";
    resultDesc.textContent = "Yarısından fazlasını doğru bildin. Biraz daha çalışırsan uzman olursun!";
  } else {
    resultEmoji.textContent = "📚";
    resultTitle.textContent = "Daha Çok Çalış!";
    resultDesc.textContent = "Merak etme, tekrar taratıp quiz'i tekrarlayabilirsin!";
  }

  resultPopup.classList.remove("hidden");
}

resultClose.addEventListener("click", () => {
  resultPopup.classList.add("hidden");
});

/* ── AR TARGET EVENTS ── */
window.addEventListener("load", () => {
  const targets = document.querySelectorAll("[mindar-image-target]");

  targets.forEach((target, index) => {
    target.addEventListener("targetFound", () => {
      if (currentTarget === index) return;
      currentTarget = index;

      const fish = fishData[index];
      if (!fish) return;

      quizState.currentFish = fish;
      fishImage.src   = fish.image;
      fishName.textContent    = fish.name;
      fishDesc.textContent    = fish.desc;
      fishSize.textContent    = fish.size;
      fishHabitat.textContent = fish.habitat;
      fishDiet.textContent    = fish.diet;
      fishStatus.textContent  = fish.status;

      popup.classList.remove("hidden");
    });
  });
});

/* ── AI BALIK TANIMA ── */
let aiStream = null;
const aiVideo   = document.getElementById("aiVideo");
const aiCanvas  = document.getElementById("aiCanvas");
const aiCapture = document.getElementById("aiCaptureBtn");

aiFloatBtn.addEventListener("click", async () => {
  // AR sahnesini duraklat
  const sceneEl = document.querySelector("a-scene");
  if (sceneEl && sceneEl.systems["mindar-image-system"]) {
    sceneEl.systems["mindar-image-system"].pause();
  }
// AR video elementini gizle
  const arVideo = document.querySelector("video.videoTexture");
  if (arVideo) arVideo.style.display = "none";
  aiPopup.classList.remove("hidden");
  aiResult.classList.add("hidden");
  aiResult.textContent = "";
  aiAnalyzeBtn.classList.add("hidden");
  aiPreview.classList.add("hidden");

  try {
    aiStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    aiVideo.srcObject = aiStream;
  } catch (err) {
    aiResult.textContent = "❌ Kamera açılamadı: " + err.message;
    aiResult.classList.remove("hidden");
  }
});

aiClose.addEventListener("click", () => {
  aiPopup.classList.add("hidden");
  if (aiStream) { aiStream.getTracks().forEach(t => t.stop()); aiStream = null; }
  aiPreview.classList.add("hidden");
  aiAnalyzeBtn.classList.add("hidden");
  aiResult.classList.add("hidden");
  aiVideo.srcObject = null;

  // AR sahnesini tekrar başlat
  const sceneEl = document.querySelector("a-scene");
  if (sceneEl && sceneEl.systems["mindar-image-system"]) {
    sceneEl.systems["mindar-image-system"].unpause();
  }
  // AR video elementini tekrar göster
  const arVideo = document.querySelector("video.videoTexture");
  if (arVideo) arVideo.style.display = "";
});
aiCapture.addEventListener("click", () => {
  aiCanvas.width  = aiVideo.videoWidth;
  aiCanvas.height = aiVideo.videoHeight;
  aiCanvas.getContext("2d").drawImage(aiVideo, 0, 0);
  const dataUrl = aiCanvas.toDataURL("image/jpeg");
  aiPreview.src = dataUrl;
  aiPreview.classList.remove("hidden");
  aiAnalyzeBtn.classList.remove("hidden");
  aiResult.classList.add("hidden");
});

aiAnalyzeBtn.addEventListener("click", async () => {
  aiResult.className = "ai-result ai-loading";
  aiResult.textContent = "🔍 AI analiz ediyor...";
  aiResult.classList.remove("hidden");
  aiAnalyzeBtn.disabled = true;

  try {
    const base64 = aiPreview.src.split(",")[1];
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64, mediaType: "image/jpeg" })
    });
    const data = await response.json();
    aiResult.className = "ai-result";
    aiResult.textContent = data.result || "Sonuç alınamadı.";
  } catch (err) {
    aiResult.className = "ai-result";
    aiResult.textContent = "❌ Hata oluştu: " + err.message;
  }

  aiAnalyzeBtn.disabled = false;
});
showModelBtn.addEventListener("click", () => {

  const fish = quizState.currentFish;

  if (!fish || !fish.model) {
    alert("Bu balık için 3D model bulunamadı.");
    return;
  }

  fishModelViewer.src = fish.model;

  resultPopup.classList.add("hidden");
  modelPopup.classList.remove("hidden");
});

closeModelBtn.addEventListener("click", () => {
  modelPopup.classList.add("hidden");
});