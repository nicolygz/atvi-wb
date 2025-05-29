"use strict";
class Cliente {
    constructor(id, nome, genero, telefone, consumo = []) {
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.telefone = telefone;
        this.consumo = consumo;
    }
}
class Produto {
    constructor(id, nome, preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }
}
class Consumo {
    constructor(clienteId, produtoId, quantidade) {
        this.clienteId = clienteId;
        this.produtoId = produtoId;
        this.quantidade = quantidade;
    }
}
class Relatorios {
    constructor(clientes, produtos, consumos) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.consumos = consumos;
    }
    topClientesMaisConsumiram() {
        const totalConsumo = this.clientes.map(c => ({
            id: c.id,
            total: this.consumos.filter(cons => cons.clienteId === c.id).reduce((sum, curr) => sum + curr.quantidade, 0)
        }));
        return totalConsumo.sort((a, b) => b.total - a.total).slice(0, 10);
    }
    topClientesMenosConsumiram() {
        const totalConsumo = this.clientes.map(c => ({
            id: c.id,
            total: this.consumos.filter(cons => cons.clienteId === c.id).reduce((sum, curr) => sum + curr.quantidade, 0)
        }));
        return totalConsumo.sort((a, b) => a.total - b.total).slice(0, 10);
    }
    topClientesMaisGastaram() {
        const totalValor = this.clientes.map(c => {
            const gastos = this.consumos.filter(cons => cons.clienteId === c.id).reduce((sum, cons) => {
                const produto = this.produtos.find(p => p.id === cons.produtoId);
                return sum + (produto ? produto.preco * cons.quantidade : 0);
            }, 0);
            return { id: c.id, total: gastos };
        });
        return totalValor.sort((a, b) => b.total - a.total).slice(0, 5);
    }
    produtosMaisConsumidos() {
        const totalPorProduto = this.produtos.map(p => ({
            id: p.id,
            total: this.consumos.filter(cons => cons.produtoId === p.id).reduce((sum, curr) => sum + curr.quantidade, 0)
        }));
        return totalPorProduto.sort((a, b) => b.total - a.total);
    }
    produtosMaisConsumidosPorGenero(genero) {
        const idsClientes = this.clientes.filter(c => c.genero === genero).map(c => c.id);
        const total = this.produtos.map(p => ({
            id: p.id,
            total: this.consumos.filter(cons => idsClientes.includes(cons.clienteId) && cons.produtoId === p.id).reduce((sum, curr) => sum + curr.quantidade, 0)
        }));
        return total.sort((a, b) => b.total - a.total);
    }
    clientesPorGenero(genero) {
        return this.clientes.filter(c => c.genero === genero);
    }
}
const clientes = [];
const produtos = [];
const consumos = [];
for (let i = 1; i <= 30; i++) {
    const genero = i % 2 === 0 ? 'Feminino' : 'Masculino';
    clientes.push(new Cliente(i, `Cliente ${i}`, genero, `11999999${i}`));
}
for (let i = 1; i <= 20; i++) {
    produtos.push(new Produto(i, `Produto ${i}`, 10 + i));
}
for (let i = 0; i < 100; i++) {
    const clienteId = Math.ceil(Math.random() * 30);
    const produtoId = Math.ceil(Math.random() * 20);
    const quantidade = Math.ceil(Math.random() * 5);
    consumos.push(new Consumo(clienteId, produtoId, quantidade));
}
const relatorios = new Relatorios(clientes, produtos, consumos);
console.log('Top 10 que mais consumiram:', relatorios.topClientesMaisConsumiram());
console.log('Top 10 que menos consumiram:', relatorios.topClientesMenosConsumiram());
console.log('Top 5 que mais gastaram:', relatorios.topClientesMaisGastaram());
console.log('Produtos mais consumidos:', relatorios.produtosMaisConsumidos());
console.log('Produtos mais consumidos (feminino):', relatorios.produtosMaisConsumidosPorGenero('Feminino'));
console.log('Clientes do gênero masculino:', relatorios.clientesPorGenero('Masculinoo'));
