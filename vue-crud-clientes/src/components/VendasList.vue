<template>
    <div>
      <h1>Lista de Vendas</h1>
      <router-link to="/vendas/novo">Adicionar Venda</router-link>
      <ul>
        <li v-for="venda in vendas" :key="venda.id">
          Venda ID: {{ venda.id }} - Cliente: {{ venda.cliente.nome }} - Vendedor: {{ venda.vendedor.nome }} - Data: {{ venda.data }}
          <button @click="editarVenda(venda.id)">Editar</button>
          <button @click="excluirVenda(venda.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const vendas = ref([]);
  const router = useRouter();
  
  onMounted(() => {
    carregarVendas();
  });
  
  const carregarVendas = () => {
    axios.get('http://localhost:8000/api/vendas/vendas')
      .then(response => {
        vendas.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar vendas:', error);
      });
  };
  
  const editarVenda = (id) => {
    router.push({ name: 'editar_venda', params: { id } });
  };
  
  const excluirVenda = (id) => {
    if (confirm('Deseja realmente excluir esta venda?')) {
      axios.delete(`http://localhost:8000/api/vendas/${id}/`)
        .then(() => {
          carregarVendas();
        })
        .catch(error => {
          console.error('Erro ao excluir venda:', error);
        });
    }
  };
  </script>
  