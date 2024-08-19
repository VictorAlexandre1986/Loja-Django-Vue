<template>
    <div>
      <h1>Lista de Clientes</h1>
      <router-link to="/clientes/novo">Adicionar Cliente</router-link>
      <ul>
        <li v-for="cliente in clientes" :key="cliente.id">
          {{ cliente.nome }} - {{ cliente.email }} - {{ cliente.telefone }}
          <button @click="editarCliente(cliente.id)">Editar</button>
          <button @click="excluirCliente(cliente.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const clientes = ref([]);
  const router = useRouter();
  
  onMounted(() => {
    carregarClientes();
  });
  
  const carregarClientes = () => {
    axios.get('http://localhost:8000/api/clientes/')
      .then(response => {
        clientes.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar clientes:', error);
      });
  };
  
  const editarCliente = (id) => {
    router.push({ name: 'editar-cliente', params: { id } });
  };
  
  const excluirCliente = (id) => {
    if (confirm('Deseja realmente excluir este cliente?')) {
      axios.delete(`http://localhost:8000/api/clientes/${id}/`)
        .then(() => {
          carregarClientes();
        })
        .catch(error => {
          console.error('Erro ao excluir cliente:', error);
        });
    }
  };
  </script>
  