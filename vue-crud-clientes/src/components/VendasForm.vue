<template>
    <div>
      <h1>{{ isEditing ? 'Editar Venda' : 'Nova Venda' }}</h1>
      <form @submit.prevent="salvarVenda">
        <div>
          <label for="cliente">Cliente:</label>
          <select v-model="venda.cliente" id="cliente" required>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
              {{ cliente.nome }}
            </option>
          </select>
        </div>
        <div>
          <label for="vendedor">Vendedor:</label>
          <select v-model="venda.vendedor" id="vendedor" required>
            <option v-for="vendedor in vendedores" :key="vendedor.id" :value="vendedor.id">
              {{ vendedor.nome }}
            </option>
          </select>
        </div>
        <div>
          <label>Itens da Venda:</label>
          <div v-for="(item, index) in venda.itens" :key="index">
            <select v-model="item.produto" required>
              <option v-for="produto in produtos" :key="produto.id" :value="produto.id">
                {{ produto.nome }}
              </option>
            </select>
            <input v-model="item.quantidade" type="number" placeholder="Quantidade" required />
            <input v-model="item.preco_unitario" type="number" step="0.01" placeholder="Preço Unitário" required />
            <button @click="removerItem(index)">Remover</button>
          </div>
          <button @click="adicionarItem">Adicionar Item</button>
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
  
  const venda = ref({
    cliente: '',
    vendedor: '',
    itens: [{ produto: '', quantidade: 1, preco_unitario: 0 }],
  });
  const clientes = ref([]);
  const vendedores = ref([]);
  const produtos = ref([]);
  const isEditing = ref(false);
  
  onMounted(() => {
    carregarClientes();
    carregarVendedores();
    carregarProdutos();
  
    if (route.params.id) {
      isEditing.value = true;
      axios.get(`http://localhost:8000/api/vendas/${route.params.id}/`)
        .then(response => {
          venda.value = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar venda:', error);
        });
    }
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
  
  const carregarVendedores = () => {
    axios.get('http://localhost:8000/api/vendedor/')
      .then(response => {
        vendedores.value = response.data;
      })
      .catch(error => {
        console.error('Erro ao carregar vendedores:', error);
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
  
  const adicionarItem = () => {
  venda.value.itens.push({ produto: '', quantidade: 1, preco_unitario: 0 });
};

const removerItem = (index) => {
  venda.value.itens.splice(index, 1);
};

const salvarVenda = () => {
  const method = isEditing.value ? 'put' : 'post';
  const url = isEditing.value
    ? `http://localhost:8000/api/vendas/vendas/${route.params.id}/`
    : 'http://localhost:8000/api/vendas/vendas/';

  axios[method](url, venda.value)
    .then(() => {
      router.push({ name: 'vendas' });
    })
    .catch(error => {
      console.error('Erro ao salvar venda:', error);
    });
};
</script>