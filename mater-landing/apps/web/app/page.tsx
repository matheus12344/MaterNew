'use client';

import React, { useState } from "react"
import { Button } from "@mater/ui"
import Link from 'next/link';
import { SubscribeForm } from './components/SubscribeForm';
import { motion } from 'framer-motion';

export default function Home() {
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
            <Link
              href="/careers"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Trabalhe Conosco
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 z-0"
        />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse"
            >
              <span className="animate-pulse">●</span> Lançamento em breve
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-blue-900 mb-6"
            >
              Mater
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xl md:text-2xl text-blue-800 mb-8 max-w-2xl mx-auto"
            >
              Transformando a assistência veicular em uma experiência simples e rápida. <br /> Seu guincho está a apenas um toque de distância.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="#features"
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Saiba Mais
              </Link>
              <Link
                href="#subscribe"
                className="px-8 py-3 bg-white text-blue-600 rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Quero Participar
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            Recursos em Desenvolvimento
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-2xl">{benefit.icon}</span>
                  </div>
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
              <span className="animate-pulse">●</span> Vagas Limitadas
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
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <SubscribeForm />
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Mater</h3>
              <p className="text-gray-400">
                Transformando a forma como você gerencia suas tarefas diárias
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
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Trabalhe Conosco
                  </Link>
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
        </div>
      </footer>
    </main>
  );
}

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
];

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
    status: 'Previsto para Q2/2024',
  },
  {
    icon: '🌟',
    title: 'Fase 3: Lançamento',
    description: 'Disponibilização pública do aplicativo com todas as funcionalidades.',
    status: 'Previsto para Q3/2024',
  },
  {
    icon: '📈',
    title: 'Fase 4: Expansão',
    description: 'Adição de novas funcionalidades e melhorias baseadas no feedback dos usuários.',
    status: 'Previsto para Q4/2024',
  },
];

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
]; 