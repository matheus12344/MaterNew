import { Resend } from "resend"
import { WeeklyUpdate } from "../emails/WeeklyUpdate"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWeeklyUpdate(
  email: string,
  name: string,
  updates: {
    title: string
    description: string
    imageUrl?: string
  }[]
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Mater <updates@mater.app>",
      to: email,
      subject: `Novidades do Mater: ${updates[0].title}`,
      react: WeeklyUpdate({ name, updates }),
    })

    if (error) {
      console.error("Error sending email:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

// Exemplo de uso:
const exampleUpdates = [
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