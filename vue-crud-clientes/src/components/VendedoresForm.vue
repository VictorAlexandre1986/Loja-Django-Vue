<template>
    <div>
      <h1>{{ isEditing ? 'Editar Vendedor' : 'Novo Vendedor' }}</h1>
      <form @submit.prevent="salvarVendedor">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="vendedor.nome" type="text" id="nome" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="vendedor.email" type="email" id="email" required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const vendedor = ref({
    nome: '',
    email: '',
  });
  const isEditing = ref(false);
  
  onMounted(() => {
    if (route.params.id) {
      isEditing.value = true;
      axios.get(`http://localhost:8000/api/vendedor/${route.params.id}/`)
        .then(response => {
          vendedor.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar vendedor:', error);
        });
    }
  });
  
  const salvarVendedor = () => {
    const method = isEditing.value ? 'put' : 'post';
    const url = isEditing.value
      ? `http://localhost:8000/api/vendedor/${route.params.id}/`
      : 'http://localhost:8000/api/vendedor/';
  
    axios[method](url, vendedor.value)
      .then(() => {
        router.push({ name: 'vendedor' });
      })
      .catch(error => {
        console.error('Erro ao salvar vendedor:', error);
      });
  };
  </script>
  