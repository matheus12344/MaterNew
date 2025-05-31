import {
  Button,
  Column,
  Hr,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"
import { BaseEmail } from "./BaseEmail"

interface WeeklyUpdateProps {
  name: string
  updates: {
    title: string
    description: string
    imageUrl?: string
  }[]
}

export const WeeklyUpdate = ({ name, updates }: WeeklyUpdateProps) => {
  return (
    <BaseEmail
      previewText={`Novidades do Mater: ${updates[0].title}`}
      title="Novidades do Mater"
    >
      <Text style={paragraph}>Olá {name},</Text>
      <Text style={paragraph}>
        Estamos muito animados em compartilhar as últimas novidades do Mater com você!
        Confira o que preparamos nesta semana:
      </Text>

      {updates.map((update, index) => (
        <Section key={index} style={updateSection}>
          {update.imageUrl && (
            <img
              src={update.imageUrl}
              alt={update.title}
              style={updateImage}
            />
          )}
          <Text style={updateTitle}>{update.title}</Text>
          <Text style={updateDescription}>{update.description}</Text>
          <Button
            href="#"
            style={button}
          >
            Saiba mais
          </Button>
        </Section>
      ))}

      <Hr style={hr} />

      <Section style={ctaSection}>
        <Text style={ctaTitle}>
          Quer ser um dos primeiros a experimentar o Mater?
        </Text>
        <Text style={ctaDescription}>
          Estamos selecionando usuários para testar o app antes do lançamento oficial.
          Não perca esta oportunidade!
        </Text>
        <Button
          href="#"
          style={button}
        >
          Quero ser um beta tester
        </Button>
      </Section>

      <Hr style={hr} />

      <Text style={footerText}>
        Você está recebendo este e-mail porque se inscreveu para receber atualizações do Mater.
        <br />
        <Link href="#" style={footerLink}>
          Cancelar inscrição
        </Link>
      </Text>
    </BaseEmail>
  )
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#1f2937",
}

const updateSection = {
  marginTop: "32px",
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
}

const updateImage = {
  width: "100%",
  maxWidth: "600px",
  height: "auto",
  borderRadius: "8px",
  marginBottom: "16px",
}

const updateTitle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 8px",
}

const updateDescription = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#4b5563",
  margin: "0 0 16px",
}

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
}

const ctaSection = {
  textAlign: "center" as const,
  padding: "32px 0",
}

const ctaTitle = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 16px",
}

const ctaDescription = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#4b5563",
  margin: "0 0 24px",
}

const footerText = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6b7280",
  textAlign: "center" as const,
}

const footerLink = {
  color: "#2563eb",
  textDecoration: "underline",
} 