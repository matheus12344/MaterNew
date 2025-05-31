'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'developer',
      title: 'Desenvolvedor',
      icon: '💻',
      description: 'Junte-se à nossa equipe de desenvolvimento e ajude a construir o futuro do Mater.',
      requirements: [
        'Experiência com React/Next.js',
        'Conhecimento em TypeScript',
        'Familiaridade com desenvolvimento web moderno',
        'Boa comunicação e trabalho em equipe',
      ],
      benefits: [
        'Trabalho remoto',
        'Horário flexível',
        'Ambiente colaborativo',
        'Oportunidades de crescimento',
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: '📢',
      description: 'Ajude a construir a presença digital do Mater e atrair novos usuários.',
      requirements: [
        'Experiência em marketing digital',
        'Conhecimento em redes sociais',
        'Habilidades de escrita criativa',
        'Análise de métricas e resultados',
      ],
      benefits: [
        'Liberdade criativa',
        'Ambiente dinâmico',
        'Aprendizado contínuo',
        'Impacto direto no crescimento',
      ],
    },
    {
      id: 'finance',
      title: 'Finanças',
      icon: '💰',
      description: 'Gerencie as finanças do Mater e ajude a construir uma base sólida para o crescimento.',
      requirements: [
        'Formação em áreas financeiras',
        'Experiência em gestão financeira',
        'Conhecimento em análise de dados',
        'Habilidades de planejamento',
      ],
      benefits: [
        'Desafios estratégicos',
        'Visão geral do negócio',
        'Desenvolvimento profissional',
        'Ambiente de inovação',
      ],
    },
    {
      id: 'support',
      title: 'Suporte',
      icon: '🤝',
      description: 'Ajude nossos usuários a aproveitar ao máximo o Mater e construa uma comunidade engajada.',
      requirements: [
        'Excelente comunicação',
        'Paciente e empático',
        'Habilidades de resolução de problemas',
        'Conhecimento técnico básico',
      ],
      benefits: [
        'Contato direto com usuários',
        'Ambiente colaborativo',
        'Treinamento contínuo',
        'Oportunidades de crescimento',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full glass-effect z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            Mater
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300"
            >
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-blue-900 mb-6"
            >
              Junte-se à Nossa Equipe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-800 mb-8"
            >
              Faça parte de uma equipe apaixonada por transformar a forma como as pessoas gerenciam suas tarefas.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {roles.map((role) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="p-8 cursor-pointer"
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{role.icon}</div>
                    <h3 className="text-2xl font-bold text-blue-900">{role.title}</h3>
                  </div>
                  <p className="text-blue-800 mb-6">{role.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">
                      {selectedRole === role.id ? 'Ver menos' : 'Ver mais'}
                    </span>
                    <motion.div
                      animate={{ rotate: selectedRole === role.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: selectedRole === role.id ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 border-t border-blue-100">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">Requisitos</h4>
                      <ul className="space-y-2">
                        {role.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-blue-800">
                            <span className="text-blue-600">•</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-900 mb-3">Benefícios</h4>
                      <ul className="space-y-2">
                        {role.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-blue-800">
                            <span className="text-blue-600">•</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8">
                      <a
                        href={`mailto:careers@mater.app?subject=Candidatura - ${role.title}`}
                        className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                      >
                        Candidatar-se
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workplace Images Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-blue-900 mb-16"
          >
            Nosso Ambiente de Trabalho
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/escritorio.png"
                alt="Interior do Escritório da Mater"
                width={700}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/recepcao.png"
                alt="Recepção da Mater"
                width={700}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image  
                src="/images/salareuniao.png"
                alt="Sala de reunião da Mater"
                width={700}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/sala.png"
                alt="Prédio da Mater"
                width={700}
                height={500}
                layout="responsive"
                objectFit="cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-blue-900 mb-16"
          >
            Nossos Valores
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white shadow-lg"
            >
              <div className="text-4xl text-blue-600 mb-4">💡</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Inovação Constante</h3>
              <p className="text-blue-800">Buscamos sempre novas formas de melhorar e inovar.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white shadow-lg"
            >
              <div className="text-4xl text-blue-600 mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Colaboração e Respeito</h3>
              <p className="text-blue-800">Trabalhamos juntos em um ambiente de apoio e diversidade.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white shadow-lg"
            >
              <div className="text-4xl text-blue-600 mb-4">✨</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Foco na Experiência</h3>
              <p className="text-blue-800">Criamos produtos que encantam e superam as expectativas.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-blue-900 mb-16"
          >
            Por que Trabalhar no Mater?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Crescimento',
                description: 'Oportunidades constantes de aprendizado e desenvolvimento profissional.',
              },
              {
                icon: '💡',
                title: 'Inovação',
                description: 'Ambiente que valoriza novas ideias e soluções criativas.',
              },
              {
                icon: '🤝',
                title: 'Colaboração',
                description: 'Trabalho em equipe e cultura de apoio mútuo.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-blue-800">{item.description}</p>
              </motion.div>
            ))}
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
                Transformando a assistência veicular em uma experiência simples e rápida.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <a href="#roles" className="text-gray-400 hover:text-white transition-colors">
                    Vagas
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
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">
                careers@mater.app
              </p>
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