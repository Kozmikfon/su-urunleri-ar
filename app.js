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
    image: "./assets/images/levrek.jpg",
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
    image: "./assets/images/palyaco.jpg",
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
    image: "./assets/images/somon.jpg",
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
aiFloatBtn.addEventListener("click", () => {
  aiPopup.classList.remove("hidden");
  aiResult.classList.add("hidden");
  aiResult.textContent = "";
  aiAnalyzeBtn.classList.add("hidden");
  aiPreview.classList.add("hidden");
  aiImageInput.value = "";
});

aiClose.addEventListener("click", () => {
  aiPopup.classList.add("hidden");
});

aiImageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    aiPreview.src = ev.target.result;
    aiPreview.classList.remove("hidden");
    aiAnalyzeBtn.classList.remove("hidden");
    aiResult.classList.add("hidden");
  };
  reader.readAsDataURL(file);
});

aiAnalyzeBtn.addEventListener("click", async () => {
  const file = aiImageInput.files[0];
  if (!file) return;

  aiResult.className = "ai-result ai-loading";
  aiResult.textContent = "🔍 AI analiz ediyor...";
  aiResult.classList.remove("hidden");
  aiAnalyzeBtn.disabled = true;

  try {
    const base64 = await fileToBase64(file);
    const mediaType = file.type;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { 
    "Content-Type": "application/json",
    "Authorization": "Bearer " + window.OPENAI_KEY
  },

    body: JSON.stringify({
    model: "gpt-4o",
    max_tokens: 600,
    messages: [{
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: { url: `data:${mediaType};base64,${base64}` }
        },
        {
          type: "text",
          text: "Bu fotoğraftaki balık veya su ürününü tanımla. Türkçe olarak şunları söyle: 1) Türün adı 2) Yaşadığı bölge/habitat 3) Ortalama boyu 4) Beslenme şekli 5) İlginç bir özelliği. Eğer balık göremiyorsan bunu belirt."
        }
      ]
    }]
  })
    });

    const data = await response.json();
   const text = data.choices?.[0]?.message?.content || "Sonuç alınamadı.";
    aiResult.textContent = text;

  } catch (err) {
    aiResult.className = "ai-result";
    aiResult.textContent = "❌ Hata oluştu: " + err.message;
  }

  aiAnalyzeBtn.disabled = false;
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}