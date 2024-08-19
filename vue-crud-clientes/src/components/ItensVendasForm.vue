<template>
    <div>
      <h1>{{ isEditing ? 'Editar Item de Venda' : 'Novo Item de Venda' }}</h1>
      <form @submit.prevent="salvarItemVenda">
        <div>
          <label for="venda">Venda:</label>
          <select v-model="itemVenda.venda" id="venda" required>
            <option v-for="venda in vendas" :key="venda.id" :value="venda.id">
              {{ venda.id }} - {{ venda.cliente.nome }}
            </option>
          </select>
        </div>
        <div>
          <label for="produto">Produto:</label>
          <select v-model="itemVenda.produto" id="produto" required>
            <option v-for="produto in produtos" :key="produto.id" :value="produto.id">
              {{ produto.nome }}
            </option>
          </select>
        </div>
        <div>
          <label for="quantidade">Quantidade:</label>
          <input v-model="itemVenda.quantidade" type="number" id="quantidade" required />
        </div>
        <div>
          <label for="preco_unitario">Preço Unitário:</label>
          <input v-model="itemVenda.preco_unitario" type="number" step="0.01" id="preco_unitario" required />
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
  const itemVenda = ref({
    venda: null,
    produto: null,
    quantidade: 1,
    preco_unitario: 0.00,
  });
  const isEditing = ref(false);
  const vendas = ref([]);
  const produtos = ref([]);
  
  onMounted(() => {
    carregarVendas();
    carregarProdutos();
    if (route.params.id) {
      isEditing.value = true;
      axios.get(`http://localhost:8000/api/itensVendas/${route.params.id}/`)
        .then(response => {
          itemVenda.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar item de venda:', error);
        });
    }
  });
  
  const carregarVendas = () => {
    axios.get('http://localhost:8000/api/vendas/')
      .then(response => {
        vendas.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar vendas:', error);
      });
  };
  
  const carregarProdutos = () => {
    axios.get('http://localhost:8000/api/produtos/')
      .then(response => {
        produtos.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
      });
  };
  
  const salvarItemVenda = () => {
    const method = isEditing.value ? 'put' : 'post';
    const url = isEditing.value
      ? `http://localhost:8000/api/itensVendas/${route.params.id}/`
      : 'http://localhost:8000/api/itensVendas/';
  
    axios[method](url, itemVenda.value)
      .then(() => {
        router.push({ name: 'itens_vendas' });
      })
      .catch(error => {
        console.error('Erro ao salvar item de venda:', error);
      });
  };
  </script>
  