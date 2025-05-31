import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface BaseEmailProps {
  previewText: string
  title: string
  children: React.ReactNode
}

export const BaseEmail = ({
  previewText,
  title,
  children,
}: BaseEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Text style={logoText}>Mater</Text>
          </Section>
          <Section style={content}>
            <Heading style={heading}>{title}</Heading>
            {children}
          </Section>
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 Mater. Todos os direitos reservados.
            </Text>
            <Text style={footerText}>
              <Link href="#" style={footerLink}>
                Política de Privacidade
              </Link>{" "}
              •{" "}
              <Link href="#" style={footerLink}>
                Termos de Uso
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const logo = {
  padding: "24px 48px",
  textAlign: "center" as const,
}

const logoText = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#2563eb",
  margin: "0",
}

const content = {
  padding: "0 48px",
}

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#1f2937",
  padding: "17px 0 0",
}

const footer = {
  padding: "24px 48px",
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "12px",
  color: "#6b7280",
  margin: "4px 0",
}

const footerLink = {
  color: "#2563eb",
  textDecoration: "underline",
} 