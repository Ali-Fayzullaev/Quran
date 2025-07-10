<template>
    <div class="p-3 border rounded">
      <h5>🤖 ChatGPT билан савол-жаваб</h5>
      <div v-for="(msg, index) in messages" :key="index">
        <b>{{ msg.role === 'user' ? 'Сиз' : 'ChatGPT' }}:</b> <p class="border-2 border border-success rounded-3 p-2">{{ msg.content }}</p>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" class="form-control mt-2" placeholder="Савол ёзинг..." />
      <button @click="sendMessage" class="btn btn-success mt-2">Юбориш</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: "",
        messages: [],
      };
    },
    methods: {
      async sendMessage() {
        if (!this.newMessage.trim()) return;
  
        this.messages.push({ role: "user", content: this.newMessage });
  
        const res = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: this.newMessage }),
        });
  
        const data = await res.json();
        this.messages.push({ role: "assistant", content: data.reply });
        this.newMessage = "";
      },
    },
  };
  </script>
  