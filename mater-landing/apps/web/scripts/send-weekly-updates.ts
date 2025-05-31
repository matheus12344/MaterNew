import { sendWeeklyUpdate } from "../lib/email"

// Aqui você pode importar a função que busca os usuários do banco de dados
// Por enquanto, vamos usar um array de exemplo
const subscribers = [
  {
    name: "João Silva",
    email: "joao@example.com",
    profile: "driver",
  },
  {
    name: "Maria Santos",
    email: "maria@example.com",
    profile: "provider",
  },
]

// Exemplo de atualizações semanais
const weeklyUpdates = [
  {
    title: "Nova Interface do App",
    description:
      "Redesenhamos completamente a interface do app para torná-la mais intuitiva e fácil de usar. Confira as mudanças!",
    imageUrl: "https://mater.app/images/new-interface.png",
  },
  {
    title: "Programa de Fidelidade",
    description:
      "Agora você pode ganhar pontos e descontos ao usar o Mater frequentemente. Saiba como participar!",
  },
  {
    title: "Lançamento em Breve",
    description:
      "Estamos nos preparando para o lançamento oficial do app. Seja um dos primeiros a experimentar!",
  },
]

async function sendWeeklyUpdates() {
  console.log("Iniciando envio de atualizações semanais...")

  for (const subscriber of subscribers) {
    try {
      await sendWeeklyUpdate(subscriber.email, subscriber.name, weeklyUpdates)
      console.log(`E-mail enviado com sucesso para ${subscriber.email}`)
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${subscriber.email}:`, error)
    }
  }

  console.log("Envio de atualizações semanais concluído!")
}

// Executa a função
sendWeeklyUpdates().catch(console.error) 