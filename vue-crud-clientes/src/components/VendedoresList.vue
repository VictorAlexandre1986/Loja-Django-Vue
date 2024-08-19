<template>
    <div>
      <h1>Lista de Vendedores</h1>
      <router-link to="/vendedor/novo">Adicionar Vendedor</router-link>
      <ul>
        <li v-for="vendedor in vendedores" :key="vendedor.id">
          {{ vendedor.nome }} - {{ vendedor.email }} - {{ vendedor.telefone }}
          <button @click="editarVendedor(vendedor.id)">Editar</button>
          <button @click="excluirVendedor(vendedor.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const vendedores = ref([]);
  const router = useRouter();
  
  onMounted(() => {
    carregarVendedores();
  });
  
  const carregarVendedores = () => {
    axios.get('http://localhost:8000/api/vendedor/')
      .then(response => {
        vendedores.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar vendedores:', error);
      });
  };
  
  const editarVendedor = (id) => {
    router.push({ name: 'editar_vendedor', params: { id } });
  };
  
  const excluirVendedor = (id) => {
    if (confirm('Deseja realmente excluir este vendedor?')) {
      axios.delete(`http://localhost:8000/api/vendedor/${id}/`)
        .then(() => {
          carregarVendedores();
        })
        .catch(error => {
          console.error('Erro ao excluir vendedor:', error);
        });
    }
  };
  </script>
  