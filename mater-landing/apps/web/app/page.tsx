'use client';

import React, { useState, useEffect, Suspense, lazy, useCallback } from "react"
import { Button } from "@mater/ui"
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

// Lazy load components
const SubscribeForm = lazy(() => import('./components/SubscribeForm').then(mod => ({ default: mod.SubscribeForm })));

// Memoize static data
const features = [
  {
    icon: '📱',
    title: 'Interface Intuitiva',
    description: 'Design moderno e fácil de usar, pensado para maximizar sua produtividade.',
  },
  {
    icon: '🔄',
    title: 'Sincronização em Tempo Real',
    description: 'Mantenha suas tarefas sincronizadas em todos os seus dispositivos.',
  },
  {
    icon: '🔔',
    title: 'Notificações Inteligentes',
    description: 'Receba lembretes personalizados para nunca mais esquecer uma tarefa importante.',
  },
] as const;

const roadmap = [
  {
    icon: '🚀',
    title: 'Fase 1: MVP',
    description: 'Desenvolvimento da versão inicial com funcionalidades essenciais.',
    status: 'Em andamento',
  },
  {
    icon: '🎯',
    title: 'Fase 2: Beta',
    description: 'Testes com usuários selecionados e refinamento das funcionalidades.',
    status: 'Previsto para Q2/2025',
  },
  {
    icon: '🌟',
    title: 'Fase 3: Lançamento',
    description: 'Disponibilização pública do aplicativo com todas as funcionalidades.',
    status: 'Previsto para Q3/2025',
  },
  {
    icon: '📈',
    title: 'Fase 4: Expansão',
    description: 'Adição de novas funcionalidades e melhorias baseadas no feedback dos usuários.',
    status: 'Previsto para Q4/2025',
  },
] as const;

const benefits = [
  {
    icon: '🎁',
    title: 'Acesso Antecipado',
    description: 'Seja um dos primeiros a experimentar o app e influenciar seu desenvolvimento.',
  },
  {
    icon: '💎',
    title: 'Recursos Premium',
    description: 'Usuários da lista de espera receberão acesso a recursos premium gratuitamente.',
  },
  {
    icon: '🤝',
    title: 'Comunidade Exclusiva',
    description: 'Participe de uma comunidade exclusiva de usuários e desenvolvedores.',
  },
  {
    icon: '📊',
    title: 'Feedback Prioritário',
    description: 'Suas sugestões terão prioridade no desenvolvimento de novas funcionalidades.',
  },
] as const;

// Memoize particle options
const particleOptions = {
  fullScreen: false,
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: "#3b82f6",
    },
    links: {
      color: "#3b82f6",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      outModes: {
        default: "out",
      },
      random: false,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50,
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
} as const;

const testimonials = [
  {
    name: "João Silva",
    role: "Motorista Profissional",
    image: "/testimonials/joao.jpg",
    text: "O Mater revolucionou a forma como lido com emergências no trânsito. Agora tenho assistência rápida e confiável sempre que preciso.",
  },
  {
    name: "Maria Santos",
    role: "Proprietária de Frota",
    image: "/testimonials/maria.jpg",
    text: "Como gestora de frota, o Mater me dá tranquilidade. Seus recursos de rastreamento e assistência são essenciais para nosso negócio.",
  },
  {
    name: "Pedro Costa",
    role: "Entusiasta de Carros",
    image: "/testimonials/pedro.jpg",
    text: "A interface intuitiva e o atendimento rápido fazem do Mater minha primeira escolha para assistência veicular.",
  },
] as const;

const stats = [
  {
    number: "10k+",
    label: "Usuários Ativos",
    icon: "👥"
  },
  {
    number: "15min",
    label: "Tempo Médio de Resposta",
    icon: "⚡"
  },
  {
    number: "100+",
    label: "Cidades Cobertas",
    icon: "🌎"
  },
  {
    number: "98%",
    label: "Satisfação dos Usuários",
    icon: "⭐"
  }
] as const;

const partners = [
  {
    name: "AutoTech",
    logo: "/partners/autotech.png",
    description: "Parceiro estratégico em tecnologia veicular"
  },
  {
    name: "RoadAssist",
    logo: "/partners/roadassist.png",
    description: "Rede nacional de assistência"
  },
  {
    name: "SafeDrive",
    logo: "/partners/safedrive.png",
    description: "Especialista em segurança veicular"
  }
] as const;

const blogPosts = [
  {
    title: "Como escolher o melhor serviço de guincho",
    excerpt: "Dicas essenciais para garantir a melhor assistência veicular quando você mais precisa.",
    image: "/blog/guincho.png",
    date: "15 Mar 2024"
  },
  {
    title: "Tecnologia e segurança: o futuro da assistência veicular",
    excerpt: "Conheça as inovações que estão transformando o setor de assistência veicular.",
    image: "/blog/tech.png",
    date: "10 Mar 2024"
  },
  {
    title: "5 benefícios de ter um app de assistência veicular",
    excerpt: "Descubra por que ter um aplicativo de assistência veicular pode salvar seu dia.",
    image: "/blog/benefits.png",
    date: "5 Mar 2024"
  }
] as const;

const appFeatures = [
  {
    title: "Localização em Tempo Real",
    description: "Acompanhe a localização do guincho em tempo real",
    icon: "📍"
  },
  {
    title: "Chat Integrado",
    description: "Comunicação direta com o motorista do guincho",
    icon: "💬"
  },
  {
    title: "Histórico de Serviços",
    description: "Acesso ao histórico completo de assistências",
    icon: "📜"
  }
] as const;

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 segundos
    return () => clearInterval(interval);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Memoize motion variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full glass-effect z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold gradient-text"
          >
            Mater
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium animate-pulse"
            >
              Em Desenvolvimento
            </motion.span>
            <a
              href="/careers"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Trabalhe Conosco
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-400/20 to-blue-600/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 z-0"
        />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ●
              </motion.span>
              Lançamento em breve
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-blue-900 mb-6"
            >
              Mater
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-800 mb-8 max-w-2xl mx-auto"
            >
              Transformando a assistência veicular em uma experiência simples e rápida. <br /> Seu guincho está a apenas um toque de distância.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <a
                href="#features"
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Saiba Mais
              </a>
              <a
                href="#subscribe"
                className="px-8 py-3 bg-white text-blue-600 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Quero Participar
              </a>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center gap-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-blue-800">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-blue-800">Suporte</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1º</div>
                <div className="text-sm text-blue-800">Acesso</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Recursos em Desenvolvimento
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-700">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Roadmap de Desenvolvimento
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {roadmap.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">{item.icon}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-blue-700">{item.description}</p>
                    <div className="mt-2 text-sm text-blue-600">
                      Status: <span className="font-medium">{item.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Por que Participar Agora?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <span className="text-blue-600 text-2xl">{benefit.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-blue-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            O que Dizem Nossos Usuários
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-6">
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-2xl font-bold">
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <p className="text-xl text-blue-800 mb-6">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-blue-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-blue-600 scale-125"
                      : "bg-blue-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Perguntas Frequentes
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Como funciona o serviço de guincho?",
                answer: "Nosso serviço de guincho é acionado através do aplicativo. Após sua solicitação, o guincho mais próximo será direcionado para sua localização em tempo real."
              },
              {
                question: "Quanto tempo leva para o guincho chegar?",
                answer: "O tempo médio de chegada é de 15 a 30 minutos, dependendo da sua localização e do tráfego local."
              },
              {
                question: "O serviço é gratuito?",
                answer: "Sim! Durante o período de lançamento, todos os serviços básicos são gratuitos para os primeiros usuários."
              },
              {
                question: "Como posso me tornar um parceiro?",
                answer: "Você pode se cadastrar como parceiro através da seção 'Trabalhe Conosco' em nosso site. Nossa equipe entrará em contato para mais detalhes."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 32px 0 rgba(59, 130, 246, 0.15)",
                  transition: { duration: 0.2 }
                }}
                className="bg-blue-50 rounded-xl p-6 cursor-pointer transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-blue-700">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-4xl font-bold text-blue-900 mb-8"
            >
              Pronto para Transformar sua Experiência no Trânsito?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-xl text-blue-800 mb-8"
            >
              Junte-se aos primeiros usuários e tenha acesso a todos os recursos premium gratuitamente.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <a
                href="#subscribe"
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Quero Participar
              </a>
              <a
                href="/careers"
                className="px-8 py-3 bg-white text-blue-600 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Seja um Parceiro
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ●
              </motion.span>
              Vagas Limitadas
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-blue-900 mb-8"
            >
              Seja um dos Primeiros a Experimentar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-blue-800 mb-8"
            >
              Inscreva-se agora para garantir seu acesso antecipado e receber atualizações exclusivas sobre o desenvolvimento.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Suspense fallback={<div>Loading...</div>}>
                <SubscribeForm />
              </Suspense>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 text-sm text-blue-600"
            >
              Ao se inscrever, você concorda em receber atualizações sobre o desenvolvimento do app.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Números que Impressionam
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-800">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/80">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Nossos Parceiros
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 32px 0 rgba(59, 130, 246, 0.10)",
                  transition: { duration: 0.2 }
                }}
                className="flex flex-col items-center justify-center p-8 rounded-2xl bg-transparent transition-all duration-200"
              >
                <div className="w-32 h-32 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain hover:drop-shadow-xl transition-all duration-200"
                    style={{ background: 'transparent' }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2 text-center">
                  {partner.name}
                </h3>
                <p className="text-blue-700 text-center text-sm opacity-80">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Últimas do Blog
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-blue-700">{post.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Conheça Nosso App
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-64 h-[500px] mx-auto bg-blue-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <img
                    src="/assets/app-preview.png"
                    alt="App Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-blue-700">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-blue-900 mb-8">
                  Entre em Contato
                </h2>
                <p className="text-xl text-blue-800 mb-8">
                  Estamos aqui para ajudar. Entre em contato conosco para mais informações.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Endereço</h3>
                      <p className="text-blue-700">São Paulo, SP - Brasil</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Email</h3>
                      <p className="text-blue-700">contato@mater.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Redes Sociais</h3>
                      <div className="flex gap-4 mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
                        <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                        <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <form className="space-y-6">
                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-900 font-medium mb-2">Mensagem</label>
                    <textarea
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 h-32 bg-transparent"
                      placeholder="Sua mensagem"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Mater</h3>
              <p className="text-gray-400">
              Transformando a assistência veicular em uma experiência simples e rápida.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#subscribe" className="text-gray-400 hover:text-white transition-colors">
                    Lista de Espera
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Trabalhe Conosco
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mater. Todos os direitos reservados.</p>
          </div>
        </motion.div>
      </footer>
    </main>
  );
} 