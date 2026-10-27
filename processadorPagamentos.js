/*
 * Atividade 15.2 - Callbacks no Back-End
 * PayFast Solutions - Simulador de pagamentos PIX
 */

// Passo 2: Função principal com callback síncrona
function processarTransacaoPix(chavePix, valor, callbackAcao) {
    console.log("\n==================================");
    console.log("Iniciando processamento PIX...");

    // Validação do valor
    if (valor <= 0) {
        console.log("ERRO: O valor da transação deve ser maior que zero.");
        return;
    }

    // Criação do objeto de transação
    const transacao = {
        id: Math.floor(Math.random() * 100000),
        chavePix,
        valor,
        data: new Date().toLocaleTimeString()
    };

    console.log("Transação processada com sucesso!");
    console.log(`ID: ${transacao.id}`);
    console.log(`Valor: R$ ${transacao.valor.toFixed(2)}`);

    // Execução da callback recebida por parâmetro
    callbackAcao(transacao);
}

// Passo 3: Callbacks especializadas

// Emissão de comprovante por e-mail
function emitirComprovantePorEmail(transacao) {
    console.log("\n--- Comprovante por E-mail ---");
    console.log(`Prezado cliente, seu PIX foi processado.`);
    console.log(`ID da transação: ${transacao.id}`);
    console.log(`Valor pago: R$ ${transacao.valor.toFixed(2)}`);
    console.log(`Destinatário: ${transacao.chavePix}`);
    console.log(`Data: ${transacao.data}`);
}

// Crédito de cashback de 2%
function creditarCashback(transacao) {
    const cashback = transacao.valor * 0.02;

    console.log("\n--- Cashback ---");
    console.log(`Transação: ${transacao.id}`);
    console.log(`Valor do PIX: R$ ${transacao.valor.toFixed(2)}`);
    console.log(`Cashback concedido: R$ ${cashback.toFixed(2)}`);
}

// Auditoria antifraude
function auditarTransacaoSuspeita(transacao) {
    console.log("\n--- Auditoria Antifraude ---");

    if (transacao.valor > 5000) {
        console.log("🚨 BANDEIRA VERMELHA!");
        console.log("Transação encaminhada para análise antifraude.");
        console.log(`Valor suspeito: R$ ${transacao.valor.toFixed(2)}`);
        console.log(`ID: ${transacao.id}`);
    } else {
        console.log("Transação sem alerta pelo critério de valor.");
    }
}

// Passo 5: Callback assíncrona para envio de webhook
function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
    console.log("\n--- Webhook ---");
    console.log(`Webhook agendado para a transação ${transacao.id}.`);
    console.log("Aguardando resposta do sistema externo...");

    setTimeout(() => {
        console.log(`Webhook enviado com sucesso para a transação ${transacao.id}.`);
        console.log("Executando callback de finalização...");

        callbackFinalizacao(transacao);
    }, 2000);
}

// Passo 4: Testes das callbacks síncronas

console.log("### TESTE 1: Comprovante por e-mail ###");
processarTransacaoPix(
    "cliente@email.com",
    250.00,
    emitirComprovantePorEmail
);

console.log("\n### TESTE 2: Crédito de cashback ###");
processarTransacaoPix(
    "11987654321",
    150.00,
    creditarCashback
);

console.log("\n### TESTE 3: Auditoria antifraude ###");
processarTransacaoPix(
    "empresa@pix.com",
    7500.00,
    auditarTransacaoSuspeita
);

console.log("\n### TESTE 4: Arrow Function inline ###");
processarTransacaoPix(
    "cliente@pix.com",
    100.00,
    (transacao) => {
        const desconto = 5.00;
        const valorFinal = transacao.valor - desconto;

        console.log("\n--- Desconto promocional ---");
        console.log(`Valor original: R$ ${transacao.valor.toFixed(2)}`);
        console.log(`Desconto aplicado: R$ ${desconto.toFixed(2)}`);
        console.log(`Valor após desconto: R$ ${valorFinal.toFixed(2)}`);
    }
);

// Teste adicional: valor inválido
console.log("\n### TESTE 5: Validação de valor inválido ###");
processarTransacaoPix("cliente@pix.com", 0, emitirComprovantePorEmail);

// Teste da callback assíncrona
console.log("\n### TESTE 6: Webhook assíncrono ###");

const transacaoWebhook = {
    id: 12345,
    chavePix: "loja@exemplo.com",
    valor: 320.00,
    data: new Date().toLocaleTimeString()
};

enviarWebhookAssincrono(transacaoWebhook, (transacao) => {
    console.log("\n--- Finalização do Webhook ---");
    console.log(`Notificação concluída para a transação ${transacao.id}.`);
    console.log("A loja externa foi notificada.");
});

console.log("\nO programa continua executando enquanto o webhook aguarda...");