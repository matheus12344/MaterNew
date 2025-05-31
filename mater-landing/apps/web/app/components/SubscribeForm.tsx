'use client';

import { useState } from 'react';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Inscrição realizada com sucesso! Em breve você receberá nossas atualizações.');
        setEmail('');
        setName('');
      } else {
        setMessage(data.error || 'Erro ao realizar inscrição. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="flex-1 px-6 py-3 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-transparent"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor e-mail"
          className="flex-1 px-6 py-3 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-transparent"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Quero Participar'}
      </button>
      {message && (
        <p className={`mt-4 text-sm ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
} 