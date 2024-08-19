<template>
    <div>
      <h1>Lista de Itens de Venda</h1>
      <router-link to="/itens_vendas/novo">Adicionar Item de Venda</router-link>
      <ul>
        <li v-for="item in itensVenda" :key="item.id">
          Venda: {{ item.venda }} - Produto: {{ item.produto.nome }} - Quantidade: {{ item.quantidade }} - Preço Unitário: {{ item.preco_unitario }}
          <button @click="editarItemVenda(item.id)">Editar</button>
          <button @click="excluirItemVenda(item.id)">Excluir</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const itensVenda = ref([]);
  const router = useRouter();
  
  onMounted(() => {
    carregarItensVenda();
  });
  
  const carregarItensVenda = () => {
    axios.get('http://localhost:8000/api/itensVendas/')
      .then(response => {
        itensVenda.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar itens de venda:', error);
      });
  };
  
  const editarItemVenda = (id) => {
    router.push({ name: 'editar_itens_vendas', params: { id } });
  };
  
  const excluirItemVenda = (id) => {
    if (confirm('Deseja realmente excluir este item de venda?')) {
      axios.delete(`http://localhost:8000/api/itensVendas/${id}/`)
        .then(() => {
          carregarItensVenda();
        })
        .catch(error => {
          console.error('Erro ao excluir item de venda:', error);
        });
    }
  };
  </script>
  