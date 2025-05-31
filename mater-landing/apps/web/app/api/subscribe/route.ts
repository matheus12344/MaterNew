import { NextResponse } from "next/server"
import { sendWeeklyUpdate } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { name, email, profile } = await request.json()

    // Aqui você pode adicionar validações adicionais
    if (!name || !email || !profile) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      )
    }

    // Exemplo de atualizações para o primeiro e-mail
    const updates = [
      {
        title: "Bem-vindo ao Mater!",
        description:
          "Obrigado por se inscrever para receber nossas atualizações. Estamos trabalhando duro para trazer o melhor serviço de socorro veicular para você!",
      },
      {
        title: "O que vem por aí",
        description:
          "Em breve, você receberá atualizações semanais sobre o desenvolvimento do app, incluindo novos recursos, melhorias e datas importantes.",
      },
      {
        title: "Convide seus amigos",
        description:
          "Compartilhe o Mater com seus amigos e seja um dos primeiros a experimentar o app quando lançarmos!",
      },
    ]

    // Envia o e-mail de boas-vindas
    await sendWeeklyUpdate(email, name, updates)

    // Aqui você pode adicionar a lógica para salvar o usuário no banco de dados

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing subscription:", error)
    return NextResponse.json(
      { error: "Erro ao processar inscrição" },
      { status: 500 }
    )
  }
} 