import { Lang } from '../lang';
import { RemoteDoc } from '../useRemoteDoc';

/**
 * Mock database structure for remote documents
 * Organized by document type, slug, and language
 */
interface MockDatabase {
  projects: Record<string, Partial<Record<Lang, RemoteDoc>>>;
  blogPosts: Record<string, Partial<Record<Lang, RemoteDoc>>>;
}

/**
 * Mock database with sample content in different languages
 */
export const mockDb: MockDatabase = {
  projects: {
    '1': {
      en: {
        title: 'Energy Management System',
        body: `<div>
          <h2>Project Overview</h2>
          <p>This project was developed to solve real-world problems in the domain of sustainable energy. We used cutting-edge technologies to create an efficient and scalable solution.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Real-time data processing</li>
            <li>Scalable cloud architecture</li>
            <li>Interactive dashboards</li>
          </ul>
        </div>`,
        meta: {
          description:
            'A comprehensive solution for energy management using React and Node.js',
          technologies: ['React', 'TypeScript', 'Node.js', 'AWS Lambda'],
          category: 'Energy',
        },
      },
      es: {
        title: 'Sistema de Gestión de Energía',
        body: `<div>
          <h2>Descripción del Proyecto</h2>
          <p>Este proyecto se desarrolló para resolver problemas del mundo real en el ámbito de la energía sostenible. Utilizamos tecnologías de vanguardia para crear una solución eficiente y escalable.</p>
          
          <h3>Características Principales</h3>
          <ul>
            <li>Procesamiento de datos en tiempo real</li>
            <li>Arquitectura cloud escalable</li>
            <li>Dashboards interactivos</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Una solución integral para la gestión de energía usando React y Node.js',
          technologies: ['React', 'TypeScript', 'Node.js', 'AWS Lambda'],
          category: 'Energía',
        },
      },
      pt: {
        title: 'Sistema de Gerenciamento de Energia',
        body: `<div>
          <h2>Visão Geral do Projeto</h2>
          <p>Este projeto foi desenvolvido para resolver problemas do mundo real no domínio da energia sustentável. Utilizamos tecnologias de ponta para criar uma solução eficiente e escalável.</p>
          
          <h3>Principais Recursos</h3>
          <ul>
            <li>Processamento de dados em tempo real</li>
            <li>Arquitetura de nuvem escalável</li>
            <li>Painéis interativos</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Uma solução abrangente para gerenciamento de energia usando React e Node.js',
          technologies: ['React', 'TypeScript', 'Node.js', 'AWS Lambda'],
          category: 'Energia',
        },
      },
    },
    '2': {
      en: {
        title: 'Healthcare Systems Project',
        body: `<div>
          <h2>Project Overview</h2>
          <p>An innovative healthcare management system designed to improve patient care and hospital efficiency.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Patient record management</li>
            <li>Appointment scheduling</li>
            <li>Medical imaging integration</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Healthcare management system built with Vue.js and Python',
          technologies: ['Vue.js', 'Python', 'TensorFlow', 'Google Cloud'],
          category: 'Healthcare',
        },
      },
      es: {
        title: 'Proyecto de Sistemas de Salud',
        body: `<div>
          <h2>Descripción del Proyecto</h2>
          <p>Un innovador sistema de gestión sanitaria diseñado para mejorar la atención al paciente y la eficiencia hospitalaria.</p>
          
          <h3>Características Principales</h3>
          <ul>
            <li>Gestión de registros de pacientes</li>
            <li>Programación de citas</li>
            <li>Integración de imágenes médicas</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Sistema de gestión sanitaria construido con Vue.js y Python',
          technologies: ['Vue.js', 'Python', 'TensorFlow', 'Google Cloud'],
          category: 'Salud',
        },
      },
      // Note: Portuguese version intentionally missing to test fallback
    },
    '3': {
      en: {
        title: 'Financial Analytics Platform',
        body: `<div>
          <h2>Project Overview</h2>
          <p>A comprehensive financial analytics platform for businesses to track and optimize their financial performance.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li>Real-time financial reporting</li>
            <li>Predictive analytics</li>
            <li>Custom dashboard creation</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Financial analytics platform built with Angular and Java',
          technologies: [
            'Angular',
            'Java',
            'Spring Boot',
            'PostgreSQL',
            'Docker',
          ],
          category: 'Finance',
        },
      },
      // Note: Both Spanish and Portuguese versions missing to test fallback
    },
  },
  blogPosts: {
    '1': {
      en: {
        title: 'Modern Web Development Strategies',
        body: `<div>
          <p>Welcome to our latest blog post! In this article, we will explore <strong>the best practices for web development</strong> in 2024.</p>
          <h2>Why Stay Updated?</h2>
          <p>Technology evolves rapidly, and staying informed ensures you're using the most efficient tools and methods.</p>
          <blockquote>
              "Innovation distinguishes between a leader and a follower." - Steve Jobs
          </blockquote>
        </div>`,
        meta: {
          description:
            'Learn about the latest web development strategies for 2024',
          author: 'John Smith',
          category: 'Development',
          date: '2023-01-01',
        },
      },
      es: {
        title: 'Estrategias modernas de desarrollo web',
        body: `<div>
          <p>¡Bienvenido a nuestro último artículo del blog! En este artículo, exploraremos <strong>las mejores prácticas para el desarrollo web</strong> en 2024.</p>
          <h2>¿Por qué mantenerse actualizado?</h2>
          <p>La tecnología evoluciona rápidamente, y mantenerse informado garantiza que estés utilizando las herramientas y métodos más eficientes.</p>
          <blockquote>
              "La innovación distingue entre un líder y un seguidor." - Steve Jobs
          </blockquote>
        </div>`,
        meta: {
          description:
            'Aprende sobre las últimas estrategias de desarrollo web para 2024',
          author: 'María González',
          category: 'Desarrollo',
          date: '2023-01-01',
        },
      },
      pt: {
        title: 'Estratégias modernas de desenvolvimento web',
        body: `<div>
          <p>Bem-vindo ao nosso mais recente post do blog! Neste artigo, vamos explorar <strong>as melhores práticas para desenvolvimento web</strong> em 2024.</p>
          <h2>Por que se manter atualizado?</h2>
          <p>A tecnologia evolui rapidamente, e manter-se informado garante que você está usando as ferramentas e métodos mais eficientes.</p>
          <blockquote>
              "A inovação distingue entre um líder e um seguidor." - Steve Jobs
          </blockquote>
        </div>`,
        meta: {
          description:
            'Aprenda sobre as mais recentes estratégias de desenvolvimento web para 2024',
          author: 'João Silva',
          category: 'Desenvolvimento',
          date: '2023-01-01',
        },
      },
    },
    '2': {
      en: {
        title: 'The Future of AI in Web Applications',
        body: `<div>
          <p>Artificial intelligence is revolutionizing how we build and interact with web applications.</p>
          <h2>Key AI Technologies</h2>
          <ul>
            <li>Natural Language Processing</li>
            <li>Computer Vision</li>
            <li>Predictive Analytics</li>
          </ul>
        </div>`,
        meta: {
          description: 'Explore how AI is transforming web development',
          author: 'Emily Johnson',
          category: 'Technology',
          date: '2023-02-15',
        },
      },
      es: {
        title: 'El futuro de la IA en aplicaciones web',
        body: `<div>
          <p>La inteligencia artificial está revolucionando cómo construimos e interactuamos con aplicaciones web.</p>
          <h2>Tecnologías clave de IA</h2>
          <ul>
            <li>Procesamiento del lenguaje natural</li>
            <li>Visión por computadora</li>
            <li>Análisis predictivo</li>
          </ul>
        </div>`,
        meta: {
          description:
            'Explora cómo la IA está transformando el desarrollo web',
          author: 'Carlos Rodríguez',
          category: 'Tecnología',
          date: '2023-02-15',
        },
      },
      // Note: Portuguese version intentionally missing to test fallback
    },
  },
};

/**
 * Gets a document from the mock database with language fallback
 *
 * @param type Document type ('projects' or 'blogPosts')
 * @param slug Document identifier
 * @param lang Requested language
 * @returns Object with document data and the language actually used
 */
export function getDocument(
  type: keyof MockDatabase,
  slug: string,
  lang: Lang
): { data: RemoteDoc | null; langUsed: Lang } {
  if (!mockDb[type]) {
    return { data: null, langUsed: lang };
  }

  const document = mockDb[type][slug];
  if (!document) {
    return { data: null, langUsed: lang };
  }

  if (document[lang]) {
    return { data: document[lang]!, langUsed: lang };
  }

  if (lang !== 'en' && document['en']) {
    return { data: document['en']!, langUsed: 'en' };
  }

  return { data: null, langUsed: lang };
}
