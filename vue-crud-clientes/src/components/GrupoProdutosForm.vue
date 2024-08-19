<template>
    <div>
      <h1>{{ isEditing ? 'Editar Grupo de Produto' : 'Novo Grupo de Produto' }}</h1>
      <form @submit.prevent="salvarGrupoProduto">
        <div>
          <label for="nome">Nome:</label>
          <input v-model="grupoProduto.nome" type="text" id="nome" required />
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
  const grupoProduto = ref({
    nome: '',
  });
  const isEditing = ref(false);
  
  onMounted(() => {
    if (route.params.id) {
      isEditing.value = true;
      axios.get(`http://localhost:8000/api/grupoProdutos/${route.params.id}/`)
        .then(response => {
          grupoProduto.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar grupo de produto:', error);
        });
    }
  });
  
  const salvarGrupoProduto = () => {
    const method = isEditing.value ? 'put' : 'post';
    const url = isEditing.value
      ? `http://localhost:8000/api/grupoProdutos/${route.params.id}/`
      : `http://localhost:8000/api/grupoProdutos/`;
  
    axios[method](url, grupoProduto.value)
      .then(() => {
        router.push({ name: 'grupo_produtos' });
      })
      .catch(error => {
        console.error('Erro ao salvar grupo de produto:', error);
      });
  };
  </script>
  