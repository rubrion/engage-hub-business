export interface MockedBlogPost {
  id: string;
  title: string;
  description: string;
  body: string;
  date?: string;
  author?: string;
  categories?: string[];
  image?: string;
  category?: string;
  iconType?: string;
  categoryIcon?: string;
  language?: string;
  featured?: boolean;
  meta?: {
    description?: string;
    author?: string;
    email?: string;
    readTime?: number;
    tags?: string[];
    [key: string]: unknown;
  };
}

// Icons are now imported from utils/iconMappings.tsx
// Using the centralized BLOG_CATEGORY_ICONS_STRINGS for backward compatibility

// Base blog post data structure for consistent content across languages
interface BaseBlogPostData {
  id: string;
  category: string;
  iconType: string;
  date: string;
  author: {
    en: string;
    es: string;
    pt: string;
  };
  email: string;
  readTime: number;
  tags: {
    en: string[];
    es: string[];
    pt: string[];
  };
  featured?: boolean;
  imageSeeds: string[];
}

const baseBlogPostsData: BaseBlogPostData[] = [
  {
    id: '1',
    category: 'Development',
    iconType: 'Development',
    date: '2024-05-25',
    author: { en: 'John Smith', es: 'Juan Pérez', pt: 'João Silva' },
    email: 'john@example.com',
    readTime: 5,
    tags: {
      en: ['React', 'Web Development', 'Frontend'],
      es: ['React', 'Desarrollo Web', 'Frontend'],
      pt: ['React', 'Desenvolvimento Web', 'Frontend'],
    },
    featured: true,
    imageSeeds: ['dev1', 'development', 'code'],
  },
  {
    id: '2',
    category: 'Artificial Intelligence',
    iconType: 'Artificial Intelligence',
    date: '2024-05-20',
    author: { en: 'Emily Johnson', es: 'María González', pt: 'Ana Costa' },
    email: 'emily@example.com',
    readTime: 7,
    tags: {
      en: ['AI', 'Machine Learning', 'Technology'],
      es: ['IA', 'Aprendizaje Automático', 'Tecnología'],
      pt: ['IA', 'Aprendizado de Máquina', 'Tecnologia'],
    },
    featured: true,
    imageSeeds: ['ai1', 'artificial-intelligence', 'robot'],
  },
  {
    id: '3',
    category: 'Performance',
    iconType: 'Performance',
    date: '2024-05-15',
    author: { en: 'Michael Chen', es: 'Carlos Rodríguez', pt: 'Pedro Santos' },
    email: 'michael@example.com',
    readTime: 6,
    tags: {
      en: ['Performance', 'Optimization', 'Web Vitals'],
      es: ['Rendimiento', 'Optimización', 'Web Vitals'],
      pt: ['Desempenho', 'Otimização', 'Web Vitals'],
    },
    imageSeeds: ['perf1', 'performance', 'speed'],
  },
  {
    id: '4',
    category: 'Business',
    iconType: 'Business',
    date: '2024-05-10',
    author: { en: 'Sarah Davis', es: 'Laura Martínez', pt: 'Mariana Oliveira' },
    email: 'sarah@example.com',
    readTime: 8,
    tags: {
      en: ['Business Strategy', 'Digital Transformation', 'Innovation'],
      es: ['Estrategia Empresarial', 'Transformación Digital', 'Innovación'],
      pt: ['Estratégia de Negócios', 'Transformação Digital', 'Inovação'],
    },
    imageSeeds: ['biz1', 'business', 'strategy'],
  },
  {
    id: '5',
    category: 'Technology',
    iconType: 'Technology',
    date: '2024-05-05',
    author: { en: 'David Wilson', es: 'Miguel Torres', pt: 'Ricardo Lima' },
    email: 'david@example.com',
    readTime: 6,
    tags: {
      en: ['Cloud Computing', 'DevOps', 'Infrastructure'],
      es: ['Computación en la Nube', 'DevOps', 'Infraestructura'],
      pt: ['Computação em Nuvem', 'DevOps', 'Infraestrutura'],
    },
    imageSeeds: ['tech1', 'technology', 'cloud'],
  },
  {
    id: '6',
    category: 'Education',
    iconType: 'Education',
    date: '2024-04-30',
    author: { en: 'Lisa Brown', es: 'Carmen Ruiz', pt: 'Fernanda Souza' },
    email: 'lisa@example.com',
    readTime: 5,
    tags: {
      en: ['E-learning', 'Online Education', 'EdTech'],
      es: ['Aprendizaje en Línea', 'Educación Online', 'EdTech'],
      pt: ['Aprendizagem Online', 'Educação Online', 'EdTech'],
    },
    imageSeeds: ['edu1', 'education', 'learning'],
  },
  {
    id: '7',
    category: 'Analytics',
    iconType: 'Analytics',
    date: '2024-04-25',
    author: {
      en: 'Robert Taylor',
      es: 'Antonio García',
      pt: 'Carlos Ferreira',
    },
    email: 'robert@example.com',
    readTime: 7,
    tags: {
      en: ['Data Analytics', 'Business Intelligence', 'Metrics'],
      es: ['Análisis de Datos', 'Inteligencia de Negocios', 'Métricas'],
      pt: ['Análise de Dados', 'Inteligência de Negócios', 'Métricas'],
    },
    imageSeeds: ['analytics1', 'data', 'charts'],
  },
  {
    id: '8',
    category: 'Development',
    iconType: 'Development',
    date: '2024-04-20',
    author: {
      en: 'Jennifer Garcia',
      es: 'Isabella López',
      pt: 'Juliana Alves',
    },
    email: 'jennifer@example.com',
    readTime: 6,
    tags: {
      en: ['Mobile Development', 'React Native', 'Cross-platform'],
      es: ['Desarrollo Móvil', 'React Native', 'Multiplataforma'],
      pt: ['Desenvolvimento Mobile', 'React Native', 'Multiplataforma'],
    },
    featured: true,
    imageSeeds: ['mobile1', 'smartphone', 'app'],
  },
  {
    id: '9',
    category: 'Performance',
    iconType: 'Performance',
    date: '2024-04-15',
    author: { en: 'Thomas Anderson', es: 'Javier Morales', pt: 'Bruno Costa' },
    email: 'thomas@example.com',
    readTime: 5,
    tags: {
      en: ['Database Optimization', 'SQL', 'Performance Tuning'],
      es: ['Optimización de Base de Datos', 'SQL', 'Ajuste de Rendimiento'],
      pt: ['Otimização de Banco de Dados', 'SQL', 'Ajuste de Performance'],
    },
    imageSeeds: ['db1', 'database', 'optimization'],
  },
  {
    id: '10',
    category: 'Artificial Intelligence',
    iconType: 'Artificial Intelligence',
    date: '2024-04-10',
    author: { en: 'Amanda White', es: 'Sofía Herrera', pt: 'Beatriz Rocha' },
    email: 'amanda@example.com',
    readTime: 8,
    tags: {
      en: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
      es: [
        'Aprendizaje Profundo',
        'Redes Neuronales',
        'Visión por Computadora',
      ],
      pt: ['Aprendizado Profundo', 'Redes Neurais', 'Visão Computacional'],
    },
    imageSeeds: ['ai2', 'neural', 'brain'],
  },
  {
    id: '11',
    category: 'Business',
    iconType: 'Business',
    date: '2024-04-05',
    author: {
      en: 'Kevin Martinez',
      es: 'Roberto Jiménez',
      pt: 'Rodrigo Barbosa',
    },
    email: 'kevin@example.com',
    readTime: 7,
    tags: {
      en: ['Startup', 'Entrepreneurship', 'Business Model'],
      es: ['Startup', 'Emprendimiento', 'Modelo de Negocio'],
      pt: ['Startup', 'Empreendedorismo', 'Modelo de Negócio'],
    },
    imageSeeds: ['startup1', 'business', 'innovation'],
  },
  {
    id: '12',
    category: 'Technology',
    iconType: 'Technology',
    date: '2024-03-30',
    author: { en: 'Rachel Green', es: 'Natalia Vargas', pt: 'Camila Mendes' },
    email: 'rachel@example.com',
    readTime: 6,
    tags: {
      en: ['Blockchain', 'Cryptocurrency', 'DeFi'],
      es: ['Blockchain', 'Criptomoneda', 'DeFi'],
      pt: ['Blockchain', 'Criptomoeda', 'DeFi'],
    },
    imageSeeds: ['blockchain1', 'crypto', 'chain'],
  },
  {
    id: '13',
    category: 'Education',
    iconType: 'Education',
    date: '2024-03-25',
    author: { en: 'Mark Thompson', es: 'Fernando Castro', pt: 'Gustavo Nunes' },
    email: 'mark@example.com',
    readTime: 5,
    tags: {
      en: ['Programming Tutorials', 'Code Learning', 'Best Practices'],
      es: [
        'Tutoriales de Programación',
        'Aprendizaje de Código',
        'Mejores Prácticas',
      ],
      pt: [
        'Tutoriais de Programação',
        'Aprendizado de Código',
        'Melhores Práticas',
      ],
    },
    imageSeeds: ['tutorial1', 'learning', 'code'],
  },
  {
    id: '14',
    category: 'Analytics',
    iconType: 'Analytics',
    date: '2024-03-20',
    author: { en: 'Nicole Lee', es: 'Valentina Reyes', pt: 'Larissa Cardoso' },
    email: 'nicole@example.com',
    readTime: 7,
    tags: {
      en: ['Web Analytics', 'User Behavior', 'Conversion Optimization'],
      es: [
        'Analítica Web',
        'Comportamiento del Usuario',
        'Optimización de Conversión',
      ],
      pt: [
        'Análise Web',
        'Comportamento do Usuário',
        'Otimização de Conversão',
      ],
    },
    featured: true,
    imageSeeds: ['webanalytics1', 'user', 'behavior'],
  },
  {
    id: '15',
    category: 'Development',
    iconType: 'Development',
    date: '2024-03-15',
    author: {
      en: 'Alex Rodriguez',
      es: 'Alejandro Mendoza',
      pt: 'Alexandre Teixeira',
    },
    email: 'alex@example.com',
    readTime: 6,
    tags: {
      en: ['API Development', 'REST', 'GraphQL'],
      es: ['Desarrollo de API', 'REST', 'GraphQL'],
      pt: ['Desenvolvimento de API', 'REST', 'GraphQL'],
    },
    imageSeeds: ['api1', 'development', 'integration'],
  },
  {
    id: '16',
    category: 'Performance',
    iconType: 'Performance',
    date: '2024-03-10',
    author: {
      en: 'Stephanie Clark',
      es: 'Cristina Delgado',
      pt: 'Stephanie Moreira',
    },
    email: 'stephanie@example.com',
    readTime: 5,
    tags: {
      en: ['Frontend Performance', 'Loading Speed', 'User Experience'],
      es: [
        'Rendimiento Frontend',
        'Velocidad de Carga',
        'Experiencia del Usuario',
      ],
      pt: [
        'Performance Frontend',
        'Velocidade de Carregamento',
        'Experiência do Usuário',
      ],
    },
    imageSeeds: ['frontend1', 'speed', 'performance'],
  },
  {
    id: '17',
    category: 'Artificial Intelligence',
    iconType: 'Artificial Intelligence',
    date: '2024-03-05',
    author: { en: 'Daniel Kim', es: 'Diego Ramírez', pt: 'Daniel Ribeiro' },
    email: 'daniel@example.com',
    readTime: 8,
    tags: {
      en: ['Natural Language Processing', 'NLP', 'Text Analysis'],
      es: ['Procesamiento de Lenguaje Natural', 'PLN', 'Análisis de Texto'],
      pt: ['Processamento de Linguagem Natural', 'PLN', 'Análise de Texto'],
    },
    imageSeeds: ['nlp1', 'language', 'text'],
  },
  {
    id: '18',
    category: 'Business',
    iconType: 'Business',
    date: '2024-02-28',
    author: { en: 'Monica Ross', es: 'Mónica Silva', pt: 'Mônica Dias' },
    email: 'monica@example.com',
    readTime: 7,
    tags: {
      en: ['Digital Marketing', 'SEO', 'Content Strategy'],
      es: ['Marketing Digital', 'SEO', 'Estrategia de Contenido'],
      pt: ['Marketing Digital', 'SEO', 'Estratégia de Conteúdo'],
    },
    featured: true,
    imageSeeds: ['marketing1', 'digital', 'seo'],
  },
];

// Blog post content templates for each language
const blogContentTemplates = {
  en: {
    default: `
      <div>
        <p>Welcome to our latest blog post! In this comprehensive article, we explore cutting-edge practices and insights that are shaping the industry in 2024.</p>
        <img src="https://picsum.photos/seed/{imageSeeds[0]}/800/400" alt="Featured Image" style="max-width:100%; height:auto;" />
        <h2>Why This Matters</h2>
        <p>In today's rapidly evolving technological landscape, staying informed and adapting to new methodologies is crucial for professional success and innovation.</p>
        <blockquote>
          "Innovation distinguishes between a leader and a follower." - Steve Jobs
        </blockquote>
        <h3>Key Topics Covered</h3>
        <ul>
          <li>Latest industry best practices</li>
          <li>Performance optimization techniques</li>
          <li>Emerging tools and technologies</li>
          <li>Real-world implementation strategies</li>
        </ul>
        <h2>Practical Applications</h2>
        <p>Throughout this article, we provide actionable insights that you can immediately apply to your projects. These strategies have been tested and proven effective in various professional environments.</p>
        <p>We hope you find this post insightful and valuable for your professional development. Don't forget to share your thoughts and experiences in the comments below!</p>
      </div>
    `,
  },
  es: {
    default: `
      <div>
        <p>¡Bienvenido a nuestro último artículo del blog! En este artículo integral, exploramos prácticas e ideas de vanguardia que están dando forma a la industria en 2024.</p>
        <img src="https://picsum.photos/seed/{imageSeeds[0]}-es/800/400" alt="Imagen Destacada" style="max-width:100%; height:auto;" />
        <h2>Por Qué Esto Importa</h2>
        <p>En el panorama tecnológico en rápida evolución de hoy, mantenerse informado y adaptarse a nuevas metodologías es crucial para el éxito profesional y la innovación.</p>
        <blockquote>
          "La innovación distingue entre un líder y un seguidor." - Steve Jobs
        </blockquote>
        <h3>Temas Principales Cubiertos</h3>
        <ul>
          <li>Últimas mejores prácticas de la industria</li>
          <li>Técnicas de optimización del rendimiento</li>
          <li>Herramientas y tecnologías emergentes</li>
          <li>Estrategias de implementación del mundo real</li>
        </ul>
        <h2>Aplicaciones Prácticas</h2>
        <p>A lo largo de este artículo, proporcionamos ideas accionables que puedes aplicar inmediatamente a tus proyectos. Estas estrategias han sido probadas y demostradas como efectivas en varios entornos profesionales.</p>
        <p>Esperamos que encuentres este artículo perspicaz y valioso para tu desarrollo profesional. ¡No olvides compartir tus pensamientos y experiencias en los comentarios a continuación!</p>
      </div>
    `,
  },
  pt: {
    default: `
      <div>
        <p>Bem-vindo ao nosso mais recente post do blog! Neste artigo abrangente, exploramos práticas e insights de ponta que estão moldando a indústria em 2024.</p>
        <img src="https://picsum.photos/seed/{imageSeeds[0]}-pt/800/400" alt="Imagem em Destaque" style="max-width:100%; height:auto;" />
        <h2>Por Que Isso Importa</h2>
        <p>No cenário tecnológico em rápida evolução de hoje, manter-se informado e adaptar-se a novas metodologias é crucial para o sucesso profissional e inovação.</p>
        <blockquote>
          "A inovação distingue entre um líder e um seguidor." - Steve Jobs
        </blockquote>
        <h3>Principais Tópicos Abordados</h3>
        <ul>
          <li>Últimas melhores práticas da indústria</li>
          <li>Técnicas de otimização de desempenho</li>
          <li>Ferramentas e tecnologias emergentes</li>
          <li>Estratégias de implementação do mundo real</li>
        </ul>
        <h2>Aplicações Práticas</h2>
        <p>Ao longo deste artigo, fornecemos insights acionáveis que você pode aplicar imediatamente aos seus projetos. Essas estratégias foram testadas e comprovadas como eficazes em vários ambientes profissionais.</p>
        <p>Esperamos que você ache este post perspicaz e valioso para seu desenvolvimento profissional. Não se esqueça de compartilhar seus pensamentos e experiências nos comentários abaixo!</p>
      </div>
    `,
  },
};

// Blog post translations
const blogPostTranslations = {
  // Development posts
  '1': {
    en: {
      title: 'Modern Web Development Strategies',
      description:
        'Discover the latest web development practices that will shape the industry in 2024.',
    },
    es: {
      title: 'Estrategias Modernas de Desarrollo Web',
      description:
        'Descubre las últimas prácticas de desarrollo web que darán forma a la industria en 2024.',
    },
    pt: {
      title: 'Estratégias Modernas de Desenvolvimento Web',
      description:
        'Descubra as últimas práticas de desenvolvimento web que moldarão a indústria em 2024.',
    },
  },
  '8': {
    en: {
      title: 'Mobile Development Best Practices',
      description:
        'Learn how to build efficient cross-platform mobile applications with React Native.',
    },
    es: {
      title: 'Mejores Prácticas de Desarrollo Móvil',
      description:
        'Aprende cómo construir aplicaciones móviles multiplataforma eficientes con React Native.',
    },
    pt: {
      title: 'Melhores Práticas de Desenvolvimento Mobile',
      description:
        'Aprenda como construir aplicações móveis multiplataforma eficientes com React Native.',
    },
  },
  '15': {
    en: {
      title: 'API Development Fundamentals',
      description:
        'Master the art of building robust APIs with REST and GraphQL technologies.',
    },
    es: {
      title: 'Fundamentos del Desarrollo de API',
      description:
        'Domina el arte de construir APIs robustas con tecnologías REST y GraphQL.',
    },
    pt: {
      title: 'Fundamentos do Desenvolvimento de API',
      description:
        'Domine a arte de construir APIs robustas com tecnologias REST e GraphQL.',
    },
  },
  // AI posts
  '2': {
    en: {
      title: 'The Rise of AI in Web Applications',
      description:
        'How artificial intelligence is transforming the web development landscape.',
    },
    es: {
      title: 'El Auge de la IA en Aplicaciones Web',
      description:
        'Cómo la inteligencia artificial está transformando el panorama del desarrollo web.',
    },
    pt: {
      title: 'A Ascensão da IA em Aplicações Web',
      description:
        'Como a inteligência artificial está transformando o cenário do desenvolvimento web.',
    },
  },
  '10': {
    en: {
      title: 'Deep Learning in Practice',
      description:
        'Exploring neural networks and computer vision applications in modern software.',
    },
    es: {
      title: 'Aprendizaje Profundo en la Práctica',
      description:
        'Explorando redes neuronales y aplicaciones de visión por computadora en software moderno.',
    },
    pt: {
      title: 'Aprendizado Profundo na Prática',
      description:
        'Explorando redes neurais e aplicações de visão computacional em software moderno.',
    },
  },
  '17': {
    en: {
      title: 'Natural Language Processing Revolution',
      description:
        'Understanding how NLP is changing human-computer interaction.',
    },
    es: {
      title: 'Revolución del Procesamiento de Lenguaje Natural',
      description:
        'Entendiendo cómo el PLN está cambiando la interacción humano-computadora.',
    },
    pt: {
      title: 'Revolução do Processamento de Linguagem Natural',
      description:
        'Entendendo como o PLN está mudando a interação humano-computador.',
    },
  },
  // Performance posts
  '3': {
    en: {
      title: 'Web Performance Optimization Guide',
      description:
        'Essential techniques for improving website speed and user experience.',
    },
    es: {
      title: 'Guía de Optimización del Rendimiento Web',
      description:
        'Técnicas esenciales para mejorar la velocidad del sitio web y la experiencia del usuario.',
    },
    pt: {
      title: 'Guia de Otimização de Performance Web',
      description:
        'Técnicas essenciais para melhorar a velocidade do site e a experiência do usuário.',
    },
  },
  '9': {
    en: {
      title: 'Database Performance Tuning',
      description:
        'Advanced SQL optimization techniques for high-performance applications.',
    },
    es: {
      title: 'Ajuste del Rendimiento de Base de Datos',
      description:
        'Técnicas avanzadas de optimización SQL para aplicaciones de alto rendimiento.',
    },
    pt: {
      title: 'Ajuste de Performance de Banco de Dados',
      description:
        'Técnicas avançadas de otimização SQL para aplicações de alto desempenho.',
    },
  },
  '16': {
    en: {
      title: 'Frontend Performance Mastery',
      description:
        'Optimizing loading speed and user experience in modern web applications.',
    },
    es: {
      title: 'Dominio del Rendimiento Frontend',
      description:
        'Optimizando la velocidad de carga y la experiencia del usuario en aplicaciones web modernas.',
    },
    pt: {
      title: 'Maestria em Performance Frontend',
      description:
        'Otimizando velocidade de carregamento e experiência do usuário em aplicações web modernas.',
    },
  },
  // Business posts
  '4': {
    en: {
      title: 'Digital Transformation Strategies',
      description:
        'How businesses can leverage technology for competitive advantage.',
    },
    es: {
      title: 'Estrategias de Transformación Digital',
      description:
        'Cómo las empresas pueden aprovechar la tecnología para obtener ventaja competitiva.',
    },
    pt: {
      title: 'Estratégias de Transformação Digital',
      description:
        'Como as empresas podem aproveitar a tecnologia para vantagem competitiva.',
    },
  },
  '11': {
    en: {
      title: 'Startup Success Blueprint',
      description:
        'Essential strategies for building and scaling successful startup ventures.',
    },
    es: {
      title: 'Plan de Éxito para Startups',
      description:
        'Estrategias esenciales para construir y escalar emprendimientos exitosos.',
    },
    pt: {
      title: 'Plano de Sucesso para Startups',
      description:
        'Estratégias essenciais para construir e escalar empreendimentos de sucesso.',
    },
  },
  '18': {
    en: {
      title: 'Digital Marketing Excellence',
      description: 'Advanced SEO and content strategies for modern businesses.',
    },
    es: {
      title: 'Excelencia en Marketing Digital',
      description:
        'Estrategias avanzadas de SEO y contenido para empresas modernas.',
    },
    pt: {
      title: 'Excelência em Marketing Digital',
      description:
        'Estratégias avançadas de SEO e conteúdo para empresas modernas.',
    },
  },
  // Technology posts
  '5': {
    en: {
      title: 'Cloud Infrastructure Essentials',
      description:
        'Building scalable applications with modern cloud computing platforms.',
    },
    es: {
      title: 'Fundamentos de Infraestructura en la Nube',
      description:
        'Construyendo aplicaciones escalables con plataformas modernas de computación en la nube.',
    },
    pt: {
      title: 'Fundamentos de Infraestrutura em Nuvem',
      description:
        'Construindo aplicações escaláveis com plataformas modernas de computação em nuvem.',
    },
  },
  '12': {
    en: {
      title: 'Blockchain Technology Deep Dive',
      description:
        'Understanding cryptocurrency and decentralized finance applications.',
    },
    es: {
      title: 'Inmersión Profunda en Tecnología Blockchain',
      description:
        'Entendiendo aplicaciones de criptomonedas y finanzas descentralizadas.',
    },
    pt: {
      title: 'Mergulho Profundo em Tecnologia Blockchain',
      description:
        'Entendendo aplicações de criptomoedas e finanças descentralizadas.',
    },
  },
  // Education posts
  '6': {
    en: {
      title: 'E-Learning Platform Development',
      description:
        'Creating engaging online education experiences with modern technology.',
    },
    es: {
      title: 'Desarrollo de Plataforma de E-Learning',
      description:
        'Creando experiencias de educación en línea atractivas con tecnología moderna.',
    },
    pt: {
      title: 'Desenvolvimento de Plataforma de E-Learning',
      description:
        'Criando experiências de educação online envolventes com tecnologia moderna.',
    },
  },
  '13': {
    en: {
      title: 'Effective Programming Tutorials',
      description:
        'Best practices for creating educational content and coding resources.',
    },
    es: {
      title: 'Tutoriales de Programación Efectivos',
      description:
        'Mejores prácticas para crear contenido educativo y recursos de codificación.',
    },
    pt: {
      title: 'Tutoriais de Programação Eficazes',
      description:
        'Melhores práticas para criar conteúdo educacional e recursos de codificação.',
    },
  },
  // Analytics posts
  '7': {
    en: {
      title: 'Business Intelligence Fundamentals',
      description:
        'Leveraging data analytics for informed business decision making.',
    },
    es: {
      title: 'Fundamentos de Inteligencia de Negocios',
      description:
        'Aprovechando el análisis de datos para la toma de decisiones comerciales informadas.',
    },
    pt: {
      title: 'Fundamentos de Inteligência de Negócios',
      description:
        'Aproveitando análise de dados para tomada de decisões comerciais informadas.',
    },
  },
  '14': {
    en: {
      title: 'Web Analytics Mastery',
      description:
        'Understanding user behavior and optimizing conversion rates effectively.',
    },
    es: {
      title: 'Dominio de Analítica Web',
      description:
        'Entendiendo el comportamiento del usuario y optimizando las tasas de conversión efectivamente.',
    },
    pt: {
      title: 'Maestria em Análise Web',
      description:
        'Entendendo comportamento do usuário e otimizando taxas de conversão efetivamente.',
    },
  },
} as const;

// Category translations
const categoryTranslations: Record<
  string,
  { en: string; es: string; pt: string }
> = {
  Development: { en: 'Development', es: 'Desarrollo', pt: 'Desenvolvimento' },
  'Artificial Intelligence': {
    en: 'Artificial Intelligence',
    es: 'Inteligencia Artificial',
    pt: 'Inteligência Artificial',
  },
  Performance: { en: 'Performance', es: 'Rendimiento', pt: 'Desempenho' },
  Business: { en: 'Business', es: 'Negocios', pt: 'Negócios' },
  Technology: { en: 'Technology', es: 'Tecnología', pt: 'Tecnologia' },
  Education: { en: 'Education', es: 'Educación', pt: 'Educação' },
  Analytics: { en: 'Analytics', es: 'Analítica', pt: 'Análise' },
};

// Function to generate blog posts for a specific language
function generateBlogPostsForLanguage(
  language: 'en' | 'es' | 'pt'
): MockedBlogPost[] {
  return baseBlogPostsData.map((basePost) => {
    const translation =
      blogPostTranslations[basePost.id as keyof typeof blogPostTranslations];
    const categoryTranslated =
      categoryTranslations[basePost.category]?.[language] || basePost.category;

    // Generate content by replacing placeholders in template
    let content = blogContentTemplates[language].default;
    content = content.replace('{imageSeeds[0]}', basePost.imageSeeds[0]);

    return {
      id: basePost.id,
      title: translation[language].title,
      description: translation[language].description,
      body: content,
      date: basePost.date,
      author: basePost.author[language],
      categories: [categoryTranslated],
      category: categoryTranslated,
      iconType: basePost.iconType,
      language: language,
      featured: basePost.featured || false,
      meta: {
        description: translation[language].description,
        author: basePost.author[language],
        email: basePost.email,
        readTime: basePost.readTime,
        tags: basePost.tags[language],
      },
    };
  });
}

// Generate blog posts for each language
export const mockBlogPostsEn: MockedBlogPost[] =
  generateBlogPostsForLanguage('en');
export const mockBlogPostsEs: MockedBlogPost[] =
  generateBlogPostsForLanguage('es');
export const mockBlogPostsPt: MockedBlogPost[] =
  generateBlogPostsForLanguage('pt');

// Combined array for backward compatibility
export const mockBlogPosts: MockedBlogPost[] = [
  ...mockBlogPostsEn,
  ...mockBlogPostsEs,
  ...mockBlogPostsPt,
];

// MSW handlers for API simulation

import { http, HttpResponse } from 'msw';

export const blogHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'en';

    const filteredPosts = mockBlogPosts.filter(
      (post) => post.language === lang || (lang === 'en' && !post.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredPosts.length);
    const paginatedPosts = filteredPosts.slice(start, end);

    return HttpResponse.json({
      posts: paginatedPosts,
      totalPages: Math.ceil(filteredPosts.length / limit),
      currentPage: page,
      totalItems: filteredPosts.length,
    });
  }),

  http.get('/api/posts/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'en';

    let post = mockBlogPosts.find((p) => p.id === id && p.language === lang);

    if (!post && lang !== 'en') {
      post = mockBlogPosts.find(
        (p) => p.id === id && (p.language === 'en' || !p.language)
      );

      if (post) {
        return HttpResponse.json({
          ...post,
          langUsed: 'en',
        });
      }
    }

    if (post) {
      return HttpResponse.json({
        ...post,
        langUsed: post.language || 'en',
      });
    }

    return HttpResponse.json(
      { error: `Blog post not found: ${id}` },
      { status: 404 }
    );
  }),
];
