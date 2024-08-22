// Configuração inicial para cada usuário
const usuarios = {
    'luis': 10000,
    'soares': 10000,
    'vv': 10000
};

// Opções corretas para apostas (exemplo)
const opcoesCorretas = {
    'jogo1': 'Time A', // Correto para Jogo 1
    'numeroGols': 5,  // Correto para Número de Gols
    'jogadorGol': 'Jogador 1' // Correto para Quem Fez o Gol
};

// Atualiza o saldo na página do usuário
function atualizarSaldo(usuario) {
    document.getElementById(`saldo${usuario.charAt(0).toUpperCase() + usuario.slice(1)}`).textContent = `${usuarios[usuario]} Kwanzas`;
}

// Função para confirmar apostas
function confirmarAposta(usuario) {
    const apostaJogo1 = document.querySelector('input[name="jogo1"]:checked')?.value;
    const numeroGols = parseInt(document.getElementById('numeroGols').value);
    const jogadorGol = document.getElementById('jogadorGol').value;
    const valorAposta = parseInt(document.getElementById('valorAposta').value); // Usar parseInt para garantir número inteiro

    if (!apostaJogo1 || isNaN(valorAposta) || valorAposta <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Calcula o ganho e a perda
    let ganho = 0;
    let perda = 0;
    
    if (apostaJogo1 === opcoesCorretas['jogo1']) {
        ganho += valorAposta * 0.50; // 50% de ganho por acerto
    } else {
        perda += Math.floor(valorAposta / 3); // 1/3 da aposta arredondado para baixo
    }
    
    if (numeroGols === opcoesCorretas['numeroGols']) {
        ganho += valorAposta * 0.50; // 50% de ganho por acerto
    } else {
        perda += Math.floor(valorAposta / 3); // 1/3 da aposta arredondado para baixo
    }
    
    if (jogadorGol === opcoesCorretas['jogadorGol']) {
        ganho += valorAposta * 0.50; // 50% de ganho por acerto
    } else {
        perda += Math.floor(valorAposta / 3); // 1/3 da aposta arredondado para baixo
    }

    // Arredondar ganho para número inteiro
    ganho = Math.floor(ganho);
    perda = Math.floor(perda);

    // Atualiza saldo e exibe mensagem
    if (ganho > 0) {
        usuarios[usuario] += ganho;
        alert(`Você acertou! Ganhou ${ganho} Kwanzas.`);
    } else if (perda > 0) {
        usuarios[usuario] -= perda;
        alert(`Você errou! Perdeu ${perda} Kwanzas.`);
    } else {
        alert('Nenhuma alteração no saldo.');
    }

    atualizarSaldo(usuario);

    // Salvar histórico (exemplo simplificado)
    const historico = document.getElementById(`historico${usuario.charAt(0).toUpperCase() + usuario.slice(1)}`);
    const item = document.createElement('li');
    item.textContent = `Aposta em ${apostaJogo1}, gols: ${numeroGols}, jogador: ${jogadorGol}.`;
    historico.appendChild(item);
}

// Código para inicialização e gerenciamento da página
document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location.href);
    const usuario = url.pathname.split('/').pop().split('.').shift();

    if (usuarios[usuario] === undefined) {
        alert('Usuário inválido!');
        window.location.href = 'index.html';
    }

    atualizarSaldo(usuario);

    document.getElementById('confirmarAposta').addEventListener('click', function () {
        confirmarAposta(usuario);
    });
});
