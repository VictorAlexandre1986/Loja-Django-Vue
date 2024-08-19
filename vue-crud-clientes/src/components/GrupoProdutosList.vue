<template>
    <div>
      <h1>Lista de Grupos de Produtos</h1>
      <router-link to="/grupoProdutos/novo">Adicionar Grupo de Produto</router-link>
      <ul>
        <li v-for="grupo in gruposProdutos" :key="grupo.id">
          {{ grupo.nome }}
          <button @click="editarGrupoProduto(grupo.id)">Editar</button>
          <button @click="excluirGrupoProduto(grupo.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const gruposProdutos = ref([]);
  const router = useRouter();
  
  onMounted(() => {
    carregarGruposProdutos();
  });
  
  const carregarGruposProdutos = () => {
    axios.get('http://localhost:8000/api/grupoProdutos/')
      .then(response => {
        gruposProdutos.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar grupos de produtos:', error);
      });
  };
  
  const editarGrupoProduto = (id) => {
    router.push({ name: 'editar_grupo_produtos', params: { id } });
  };
  
  const excluirGrupoProduto = (id) => {
    if (confirm('Deseja realmente excluir este grupo de produto?')) {
      axios.delete(`http://localhost:8000/api/grupoProdutos/${id}/`)
        .then(() => {
          carregarGruposProdutos();
        })
        .catch(error => {
          console.error('Erro ao excluir grupo de produto:', error);
        });
    }
  };
  </script>
  