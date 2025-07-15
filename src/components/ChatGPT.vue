<template>
  <div class="chat-container">
    <div class="chat-header">
      <div class="chat-avatar">📖</div>
      <div class="chat-title">
        <h6 class="fs-5 fw-bolder">{{ $t("title") }}</h6>
        <div class="status">{{ $t("online") }}</div>
      </div>
      <div class="chat-actions">
        <button class="action-btn" @click="toggleTopics">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </button>
        <button class="action-btn close-btn" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div ref="messagesContainer" class="chat-messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.role]"
      >
        <div class="message-content">
          <div class="message-sender">
            <span>{{ msg.role === "assistant" ? $t("assistant") : $t("you") }}</span>

            <span class="message-time">{{ getTime() }}</span>
          </div>

          <div class="message-bubble" v-html="msg.content"></div>
        </div>
      </div>

      <div v-if="loading" class="loading-indicator">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </div>

    <div v-if="showTopics" class="topic-section">
      <div class="topic-header">
        <div class="divider"></div>
        <div class="topic-title">{{ $t("chooseTopic") }}</div>
        <div class="divider"></div>
      </div>
      <div class="topic-buttons">
        <button
          v-for="(topic, index) in topics"
          :key="index"
          class="topic-btn"
          @click="askTopic(topic)"
        >
          <span class="topic-icon">📚</span>
          {{ topic }}
        </button>
      </div>
    </div>

    <div class="chat-input">
      <div class="input-wrapper">
        <button class="emoji-btn" @click="toggleTopics">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
            />
          </svg>
        </button>
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          :placeholder="$t('placeholder')"
          class="message-input"
          ref="messageInput"
        />
        <button class="clear-btn" @click="clearChat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
      <button @click="sendMessage" class="send-button" :disabled="loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fill="currentColor"
            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: "",
      messages: JSON.parse(localStorage.getItem("chatMessages")) || [
        {
          role: "assistant",
          content:
            "👋 Ассаламу алейкум! Я ваш помощник по Корану. Чем могу помочь?",
        },
      ],
      loading: false,
      showTopics: true,
      topics: [
        "Какой самый длинный аят в Коране?",
        "Что такое аятуль-Курси?",
        "Сура «Аль-Фатиха» и её смысл",
        "Дуа перед сном",
        "Хадис о намерении",
        "Значение таджвида",
        "История ниспослания Корана",
      ],
    };
  },

  methods: {
    async sendMessage() {
      const userMessage = this.newMessage.trim();
      if (!userMessage || this.loading) return;

      if (this.showTopics) this.showTopics = false;

      this.messages.push({ role: "user", content: userMessage });
      this.newMessage = "";
      this.loading = true;
      this.scrollToBottom();

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `
📚 Всегда отвечайте сначала на основе Корана. Если ответ есть в Коране, покажите его.

- Отображайте аят в HTML:
<div class="ayah-box">
  <p class="ayah-arabic">[Арабский текст с полной ташкель]</p>
  <p class="ayah-translation">[Перевод]</p>
  <a href="http://localhost:5173/qurandet/{surahNumber}#{surahNumber}-{ayahNumber}" target="_blank" class="btn btn-outline-success q-link">
    {surahName} — {ayahNumber}
  </a>
</div>

- Всегда включайте тире между сурой и аятом в ссылке ("#{surahNumber}-{ayahNumber}").

🕋 Если ответ не найден в Коране:
- Ищите в достоверных сборниках хадисов (Сахих аль-Бухари, Муслим и др.).
- Всегда упоминайте источник.

👳‍♂️ Если не найдено и в хадисах:
- Ищите ответы у известных доверенных исламских ученых.
- Ищите онлайн на надежных сайтах фетв, таких как IslamQA, IslamWeb и т.д.
- Четко скажите: «Это мнение ученых, а не из Корана или Сахих хадисов».

❌ Никогда не выдумывайте ответы.
- Если нет ответа в надежных источниках, скажите:
  "Извините, я не смог найти четкого ответа в Коране или Сунне. Лучше спросить квалифицированного исламского ученого."

💡 Сделайте ассистента знающим, как мудрый исламский учитель.
- Если пользователь чего-то не знает, объясните терпеливо.
- Но если тема не связана с исламом, скажите:
  "Извините, я могу отвечать только на вопросы, связанные с исламом, Кораном, хадисами и молитвами."

🗣 Язык:
- Отвечайте на том же языке, на котором задан вопрос (узбекский, русский или английский).

📊 Если вы показываете таблицу:
- Она должна быть обернута в \`<div class="table-responsive">\`.
- Покажите общее количество аятов в конце таблицы.

📝 Если пользователь изучает арабский язык:
- Красиво объясняйте арабские слова.
- Выделите слово.
- Покажите его значение, тип слова (существительное, глагол и т.д.) и корень.
- Предоставьте перевод и пример предложения.
- Используйте компонент Bootstrap card: \`<div class="card">\`
- Используйте понятный язык. Избегайте сложных грамматических терминов, если вы их не объясняете.

📖 Если пользователь спрашивает об аяте, хадисе или дуа — отобразите это красиво:
- Используйте следующую HTML-структуру:
<div class="ayah-box">
  <p class="ayah-arabic">[Арабский текст]</p>
  <p class="ayah-translation">[Перевод]</p>
  <a href="http://localhost:5173/qurandet/{surahNumber}#{surahNumber}{ayahNumber}" target="_blank" class="btn btn-outline-success q-link">
    {surahName} — {ayahNumber}
  </a>
</div>
⚠️ Всегда включайте **#{surahNumber}{ayahNumber}** после ссылки, а не только номер аята.

- Никогда не добавляйте другие ссылки или длинные URL.
- Всегда включайте полную огласовку в арабском тексте.
- Добавьте перевод на новой строке.
- При необходимости включите краткий тафсир (комментарий).
- Всегда упоминайте источник (например, "Аль-Бакара 282" или "Сахих аль-Бухари").
- Упоминая Пророка Мухаммада, всегда говорите: (ﷺ)
- HTML должен быть чистым и действительным, с правильными закрывающими тегами.

🧠 Если пользователь упоминает тему (например, «сердце», «покаяние», «бедствие», «боль») — предоставьте соответствующий аят или хадис, даже если они не просили стих напрямую. Всегда включайте правильную ссылку на аят.

🩺 Если пользователь говорит что-то вроде "У меня болит голова" или делится жизненной проблемой:
- Отвечайте доброжелательно.
- Порекомендуйте аят или дуа со ссылкой для чтения.
- Скажите что-то полезное, а не роботизированное.

👨‍🏫 Учите как мудрый ученый:
- Будьте мягким, знающим и ясным.
- Если вы чего-то не знаете — скажите:
"Извините, я не знаю ответа на этот вопрос."

🛡 Если вопрос не об исламе — скажите:
"Извините, я могу отвечать только на вопросы об исламе, Коране, хадисах и молитвах."

🌐 Язык ответа:
- Если вопрос на узбекском — отвечайте на узбекском.
- Если на русском — отвечайте на русском.
- Если на английском — отвечайте на английском.

⚠️ Не изобретайте вещи — используйте только достоверные исламские источники.
Будьте ясны, кратки и точны.

`,
              },
              ...this.messages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            ],
            temperature: 0.7,
          }),
        });

        const data = await res.json();

        if (data.choices && data.choices.length > 0) {
          const reply = data.choices[0].message.content;
          this.messages.push({
            role: "assistant",
            content: reply,
          });
        } else {
          this.messages.push({
            role: "assistant",
            content: "⚠️ Извините, ответ не найден. Пожалуйста, попробуйте снова.",
          });
        }
      } catch (error) {
        console.error("❌ API хатоси:", error);
        this.messages.push({
          role: "assistant",
          content: "⚠️ Произошла ошибка. Проверьте интернет-соединение или API-ключ.",
        });
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },

    askTopic(topic) {
      this.showTopics = false;
      this.newMessage = topic;
      this.sendMessage();
    },

    toggleTopics() {
      this.showTopics = !this.showTopics;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    getTime() {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    clearChat() {
      this.messages = [
        {
          role: "assistant",
          content:
            "👋 Ассаламу алейкум! Я ваш помощник по Корану. Чем могу помочь?",
        },
      ];
      this.showTopics = true;
      localStorage.removeItem("chatMessages");
      this.$nextTick(() => {
        this.$refs.messageInput.focus();
      });
    },
  },

  watch: {
    messages: {
      handler(newVal) {
        localStorage.setItem("chatMessages", JSON.stringify(newVal));
      },
      deep: true,
    },
  },

  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap");

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5fff5, #e6ffe6);
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 128, 0, 0.2);
  font-family: "Nunito", "Segoe UI", sans-serif;
  border: 1px solid #d0e8d0;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  color: white;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 100, 0, 0.2);
}

.chat-avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-right: 18px;
  box-shadow: 0 4px 8px rgba(0, 100, 0, 0.3);
}

.chat-title h5 {
  margin: 0;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.status {
  font-size: 14px;
  opacity: 0.95;
  margin-top: 5px;
  display: flex;
  align-items: center;
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.status::before {
  content: "";
  width: 10px;
  height: 10px;
  background-color: #4ade80;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 5px #4ade80;
}

.chat-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.3);
}

.chat-messages {
  flex: 1;
  padding: 25px 25px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f0fff0, #e6ffe6);
  scroll-behavior: smooth;
}

.message {
  display: flex;
  margin-bottom: 25px;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 85%;
  min-width: 120px;
}

.message-sender {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #2e7d32;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
}

.message-time {
  font-weight: 500;
  font-size: 12px;
  opacity: 0.8;
  color: #689f38;
}

.message-bubble {
  padding: 16px 20px;
  border-radius: 20px;
  line-height: 1.6;
  position: relative;
  word-wrap: break-word;
  font-size: 17px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.message-bubble:hover {
  transform: translateY(-2px);
}

.assistant .message-bubble {
  background: white;
  color: #1b5e20;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 20px;
  border: 1px solid #c8e6c9;
}

.user .message-bubble {
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  color: white;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 20px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.chat-input {
  display: flex;
  padding: 20px;
  background: white;
  border-top: 1px solid #d0e8d0;
  align-items: center;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.03);
}

.input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  background: white;
  border-radius: 30px;
  padding: 0 18px;
  transition: all 0.3s;
  border: 2px solid #c8e6c9;
  box-shadow: 0 4px 10px rgba(56, 142, 60, 0.1);
}

.input-wrapper:focus-within {
  border-color: #388e3c;
  box-shadow: 0 4px 15px rgba(56, 142, 60, 0.2);
}

.message-input {
  flex: 1;
  border: none;
  padding: 6px 8px;
  font-size: 17px;
  background: transparent;
  min-height: 26px;
  color: #1b5e20;
  font-family: "Nunito", sans-serif;
  font-weight: 500;
}

.message-input::placeholder {
  color: #81c784;
  font-weight: 500;
}

.message-input:focus {
  outline: none;
}

.emoji-btn,
.clear-btn {
  background: transparent;
  border: none;
  color: #81c784;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.emoji-btn:hover,
.clear-btn:hover {
  background: #e8f5e9;
  color: #2e7d32;
  transform: scale(1.1);
}

.send-button {
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 6px 15px rgba(56, 142, 60, 0.4);
}

.send-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2e7d32, #388e3c);
  transform: scale(1.05) rotate(5deg);
  box-shadow: 0 8px 20px rgba(56, 142, 60, 0.5);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  background: #c8e6c9;
  cursor: not-allowed;
  opacity: 0.7;
}

.send-button svg {
  transform: translateX(2px);
}

/* Индикатор загрузки */
.loading-indicator {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-bottom: 15px;
}

.loading-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #388e3c;
  margin: 0 8px;
  animation: loading 1.4s infinite ease-in-out both;
  box-shadow: 0 0 10px rgba(56, 142, 60, 0.5);
}

.loading-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading {
  0%,
  80%,
  100% {
    transform: scale(0.7);
    opacity: 0.7;
  }
  40% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* Секция с темами */
.topic-section {
  padding: 0 25px 25px;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.topic-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.divider {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c8e6c9, transparent);
}

.topic-title {
  padding: 0 25px;
  color: #2e7d32;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.topic-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.topic-btn {
  background: white;
  border: 2px solid #c8e6c9;
  border-radius: 18px;
  padding: 18px 22px;
  color: #1b5e20;
  font-size: 16px;
  text-align: left;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.topic-btn:hover {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  transform: translateY(-5px);
  border-color: #388e3c;
  box-shadow: 0 8px 25px rgba(56, 142, 60, 0.2);
}

.topic-icon {
  margin-right: 15px;
  font-size: 24px;
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Скроллбар */
.chat-messages::-webkit-scrollbar {
  width: 10px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(200, 230, 201, 0.3);
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #388e3c, #2e7d32);
  border-radius: 10px;
  border: 2px solid #e8f5e9;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2e7d32, #388e3c);
}

/* Адаптивность */
@media (max-width: 768px) {
  .chat-container {
    height: 95vh;
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }

  .topic-buttons {
    grid-template-columns: 1fr;
  }
  
  .chat-header {
    padding: 15px;
  }
  
  .chat-avatar {
    width: 45px;
    height: 45px;
    font-size: 22px;
    margin-right: 12px;
  }
  
  .chat-title h5 {
    font-size: 18px;
  }
}
</style>