<template>
    <div>
      <h1>{{ isEditing ? 'Editar Cliente' : 'Novo Cliente' }}</h1>
      <form @submit.prevent="salvarCliente">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="cliente.nome" type="text" id="nome" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="cliente.email" type="email" id="email" required />
        </div>
        <div>
          <label for="telefone">Telefone:</label>
          <input v-model="cliente.telefone" type="text" id="telefone" required />
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
  const cliente = ref({
    nome: '',
    email: '',
    telefone: '',
  });
  const isEditing = ref(false);
  
  onMounted(() => {
    if (route.params.id) {
      isEditing.value = true;
      axios.get(`http://localhost:8000/api/clientes/${route.params.id}/`)
        .then(response => {
          cliente.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar cliente:', error);
        });
    }
  });
  
  const salvarCliente = () => {
    const method = isEditing.value ? 'put' : 'post';
    const url = isEditing.value
      ? `http://localhost:8000/api/clientes/${route.params.id}/`
      : 'http://localhost:8000/api/clientes/';
  
    axios[method](url, cliente.value)
      .then(() => {
        router.push({ name: 'clientes' });
      })
      .catch(error => {
        console.error('Erro ao salvar cliente:', error);
      });
  };
  </script>
  