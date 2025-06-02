import { http, HttpResponse } from 'msw';

export interface ProjectReference {
  title: string;
  url: string;
  type: 'article' | 'link';
}

export interface Author {
  name: string;
  role: string;
  image: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface MockProject {
  id: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  category?: string;
  categoryIcon?: string;
  date?: string;
  technologies?: string[];
  github?: string;
  website?: string;
  featured?: boolean;
  references?: ProjectReference[];
  authors?: Author[];
  language?: string;
  excerpt?: string;
  meta?: {
    description?: string;
    team?: Author[];
    technologies?: string[];
    [key: string]: unknown;
  };
  iconType?: string;
}

import { PROJECT_CATEGORY_ICONS_STRINGS as PROJECT_CATEGORY_ICONS } from '../utils/iconMappings';
export { PROJECT_CATEGORY_ICONS };

// Base project data structure for consistent content across languages
interface BaseProjectData {
  id: string;
  category: string;
  iconType: string;
  date: string;
  technologies: string[];
  github?: string;
  website?: string;
  featured?: boolean;
  references?: {
    en: ProjectReference[];
    es: ProjectReference[];
    pt: ProjectReference[];
  };
  meta: {
    technologies: string[];
    team?: Author[];
  };
}

const baseProjectsData: BaseProjectData[] = [
  {
    id: '1',
    category: 'Energy',
    iconType: 'Energy',
    date: '2024-03-15',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS Lambda'],
    github: 'https://github.com/example/energy-project',
    website: 'https://energy-project.example.com',

    references: {
      en: [
        {
          title: 'Energy Management Systems Overview',
          url: 'https://example.com/energy-article',
          type: 'article',
        },
        {
          title: 'Project Documentation',
          url: 'https://docs.example.com/energy-project',
          type: 'link',
        },
      ],
      es: [
        {
          title: 'Visión General de Sistemas de Gestión Energética',
          url: 'https://example.com/energy-article-es',
          type: 'article',
        },
        {
          title: 'Documentación del Proyecto',
          url: 'https://docs.example.com/energy-project-es',
          type: 'link',
        },
      ],
      pt: [
        {
          title: 'Visão Geral de Sistemas de Gestão de Energia',
          url: 'https://example.com/energy-article-pt',
          type: 'article',
        },
        {
          title: 'Documentação do Projeto',
          url: 'https://docs.example.com/energy-project-pt',
          type: 'link',
        },
      ],
    },
    meta: {
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS Lambda'],
      team: [
        {
          name: 'John Smith',
          role: 'Project Lead',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
          bio: 'Software engineering team lead with 10+ years experience in energy sector applications.',
          email: 'john@example.com',
          linkedin: 'https://linkedin.com/in/johnsmith',
          github: 'https://github.com/johnsmith',
          website: 'https://johnsmith.dev',
        },
        {
          name: 'Emily Davis',
          role: 'UI/UX Designer',
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
          bio: 'Creative designer focusing on user experiences that are both beautiful and functional.',
          email: 'emily@example.com',
          linkedin: 'https://linkedin.com/in/emilydavis',
        },
      ],
    },
  },
  {
    id: '2',
    category: 'Healthcare',
    iconType: 'Healthcare',
    date: '2024-02-20',
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'Google Cloud'],
    github: 'https://github.com/example/healthcare-project',

    meta: {
      technologies: ['Vue.js', 'Python', 'TensorFlow', 'Google Cloud'],
      team: [
        {
          name: 'Sarah Johnson',
          role: 'Data Scientist',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
          bio: 'Expert in machine learning and healthcare data analytics with PhD in computational biology.',
          email: 'sarah@example.com',
          github: 'https://github.com/sarahjohnson',
          linkedin: 'https://linkedin.com/in/sarahjohnson',
        },
      ],
    },
  },
  {
    id: '3',
    category: 'Finance',
    iconType: 'Finance',
    date: '2024-01-10',
    technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    website: 'https://finance-project.example.com',
    github: 'https://github.com/example/finance-project',
    meta: {
      technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    },
  },
  {
    id: '4',
    category: 'E-commerce',
    iconType: 'E-commerce',
    date: '2023-12-05',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    github: 'https://github.com/example/ecommerce-project',
    website: 'https://ecommerce-demo.example.com',
    meta: {
      technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    },
  },
  {
    id: '5',
    category: 'Smart Cities',
    iconType: 'Smart Cities',
    date: '2023-11-22',
    technologies: ['React', 'Python', 'Kafka', 'Elasticsearch', 'Docker'],
    github: 'https://github.com/example/smart-city-project',
    meta: {
      technologies: ['React', 'Python', 'Kafka', 'Elasticsearch', 'Docker'],
    },
  },
  {
    id: '6',
    category: 'Education',
    iconType: 'Education',
    date: '2023-10-15',
    technologies: ['Next.js', 'GraphQL', 'MongoDB', 'AWS Amplify'],
    website: 'https://education-platform.example.com',
    meta: {
      technologies: ['Next.js', 'GraphQL', 'MongoDB', 'AWS Amplify'],
    },
  },
  {
    id: '7',
    category: 'Agriculture',
    iconType: 'Agriculture',
    date: '2023-09-12',
    technologies: ['React', 'FastAPI', 'PostgreSQL', 'IoT Sensors'],
    github: 'https://github.com/example/agriculture-project',
    meta: {
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'IoT Sensors'],
    },
  },
  {
    id: '8',
    category: 'Transportation',
    iconType: 'Transportation',
    date: '2023-08-08',
    technologies: ['React Native', 'Express.js', 'MongoDB', 'Google Maps API'],
    website: 'https://transport-app.example.com',
    meta: {
      technologies: [
        'React Native',
        'Express.js',
        'MongoDB',
        'Google Maps API',
      ],
    },
  },
  {
    id: '9',
    category: 'Entertainment',
    iconType: 'Entertainment',
    date: '2023-07-25',
    technologies: ['Unity', 'C#', 'Firebase', 'Photon'],
    github: 'https://github.com/example/game-project',
    meta: {
      technologies: ['Unity', 'C#', 'Firebase', 'Photon'],
    },
  },
  {
    id: '10',
    category: 'Security',
    iconType: 'Security',
    date: '2023-06-18',
    technologies: ['Python', 'Blockchain', 'Ethereum', 'Web3.js'],
    github: 'https://github.com/example/security-project',

    meta: {
      technologies: ['Python', 'Blockchain', 'Ethereum', 'Web3.js'],
    },
  },
  {
    id: '11',
    category: 'Communication',
    iconType: 'Communication',
    date: '2023-05-30',
    technologies: ['React', 'Socket.io', 'Redis', 'WebRTC'],
    website: 'https://chat-app.example.com',
    meta: {
      technologies: ['React', 'Socket.io', 'Redis', 'WebRTC'],
    },
  },
  {
    id: '12',
    category: 'Manufacturing',
    iconType: 'Manufacturing',
    date: '2023-04-22',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'ROS'],
    github: 'https://github.com/example/manufacturing-project',
    meta: {
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'ROS'],
    },
  },
  {
    id: '13',
    category: 'Real Estate',
    iconType: 'Real Estate',
    date: '2023-03-14',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API'],
    website: 'https://realestate-platform.example.com',
    meta: {
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API'],
    },
  },
  {
    id: '14',
    category: 'Tourism',
    iconType: 'Tourism',
    date: '2023-02-28',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe API'],
    github: 'https://github.com/example/tourism-project',

    meta: {
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe API'],
    },
  },
  {
    id: '15',
    category: 'Sports',
    iconType: 'Sports',
    date: '2023-01-20',
    technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    website: 'https://sports-analytics.example.com',
    meta: {
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker'],
    },
  },
  {
    id: '16',
    category: 'Food',
    iconType: 'Food',
    date: '2022-12-15',
    technologies: ['React', 'Express.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/example/food-delivery-project',
    meta: {
      technologies: ['React', 'Express.js', 'MongoDB', 'Stripe'],
    },
  },
  {
    id: '17',
    category: 'Environment',
    iconType: 'Environment',
    date: '2022-11-10',
    technologies: ['Python', 'Machine Learning', 'Satellite API', 'PostgreSQL'],
    website: 'https://environment-monitor.example.com',

    meta: {
      technologies: [
        'Python',
        'Machine Learning',
        'Satellite API',
        'PostgreSQL',
      ],
    },
  },
  {
    id: '18',
    category: 'Social Impact',
    iconType: 'Social Impact',
    date: '2022-10-05',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Blockchain'],
    github: 'https://github.com/example/social-impact-project',
    meta: {
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Blockchain'],
    },
  },
];

// Project content templates for each language
const projectContentTemplates = {
  en: `
    <div>
      <h2>Project Overview</h2>
      <p>This project was developed to solve real-world problems in various domains. We used cutting-edge technologies to create an efficient and scalable solution.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Real-time data processing</li>
        <li>Scalable cloud architecture</li>
        <li>Interactive dashboards</li>
        <li>Mobile-responsive design</li>
      </ul>
      
      <h3>Technical Challenges</h3>
      <p>One of the main challenges was optimizing performance while handling large datasets. We solved this by implementing:</p>
      <ol>
        <li>Efficient data caching strategies</li>
        <li>Lazy loading of components</li>
        <li>Serverless functions for heavy computations</li>
      </ol>
      
      <h3>Results</h3>
      <p>Our solution achieved a 40% improvement in processing speed and reduced operational costs by 25%.</p>
    </div>
  `,
  es: `
    <div>
      <h2>Descripción del Proyecto</h2>
      <p>Este proyecto se desarrolló para resolver problemas del mundo real en varios dominios. Utilizamos tecnologías de vanguardia para crear una solución eficiente y escalable.</p>
      
      <h3>Características Principales</h3>
      <ul>
        <li>Procesamiento de datos en tiempo real</li>
        <li>Arquitectura cloud escalable</li>
        <li>Dashboards interactivos</li>
        <li>Diseño adaptable para dispositivos móviles</li>
      </ul>
      
      <h3>Desafíos Técnicos</h3>
      <p>Uno de los principales desafíos fue optimizar el rendimiento al manejar grandes conjuntos de datos. Lo resolvimos implementando:</p>
      <ol>
        <li>Estrategias eficientes de almacenamiento en caché</li>
        <li>Carga diferida de componentes</li>
        <li>Funciones serverless para cálculos pesados</li>
      </ol>
      
      <h3>Resultados</h3>
      <p>Nuestra solución logró una mejora del 40% en la velocidad de procesamiento y redujo los costos operativos en un 25%.</p>
    </div>
  `,
  pt: `
    <div>
      <h2>Visão Geral do Projeto</h2>
      <p>Este projeto foi desenvolvido para resolver problemas do mundo real em vários domínios. Utilizamos tecnologias de ponta para criar uma solução eficiente e escalável.</p>
      
      <h3>Características Principais</h3>
      <ul>
        <li>Processamento de dados em tempo real</li>
        <li>Arquitetura de nuvem escalável</li>
        <li>Painéis interativos</li>
        <li>Design responsivo para dispositivos móveis</li>
      </ul>
      
      <h3>Desafios Técnicos</h3>
      <p>Um dos principais desafios foi otimizar o desempenho ao lidar com grandes conjuntos de dados. Resolvemos isso implementando:</p>
      <ol>
        <li>Estratégias eficientes de cache de dados</li>
        <li>Carregamento lazy de componentes</li>
        <li>Funções serverless para cálculos pesados</li>
      </ol>
      
      <h3>Resultados</h3>
      <p>Nossa solução alcançou uma melhoria de 40% na velocidade de processamento e reduziu os custos operacionais em 25%.</p>
    </div>
  `,
};

// Project titles and descriptions for each language
const projectTranslations = {
  en: [
    {
      title: 'Energy Management System',
      description:
        'A comprehensive solution for energy management with real-time monitoring and optimization features',
    },
    {
      title: 'Healthcare Systems',
      description:
        'An innovative healthcare management solution that improves patient care and operational efficiency',
    },
    {
      title: 'Financial Analytics Platform',
      description:
        'A robust financial analytics platform for data-driven decision making and strategic planning',
    },
    {
      title: 'E-commerce Solution',
      description:
        'A scalable e-commerce platform with advanced product management and customer analytics',
    },
    {
      title: 'Smart City Dashboard',
      description:
        'An integrated dashboard for smart city monitoring and management with IoT integration',
    },
    {
      title: 'Educational Platform',
      description:
        'An interactive educational platform with personalized learning paths and progress tracking',
    },
    {
      title: 'Agricultural Management System',
      description:
        'A modern agricultural solution with IoT sensors for crop monitoring and optimization',
    },
    {
      title: 'Transportation Network',
      description:
        'A comprehensive transportation management system with real-time tracking and route optimization',
    },
    {
      title: 'Entertainment Platform',
      description:
        'An immersive gaming platform with multiplayer capabilities and social features',
    },
    {
      title: 'Security & Blockchain Solution',
      description:
        'A decentralized security platform leveraging blockchain technology for data protection',
    },
    {
      title: 'Communication Hub',
      description:
        'A real-time communication platform with video conferencing and collaboration tools',
    },
    {
      title: 'Manufacturing Automation',
      description:
        'An intelligent manufacturing system with computer vision and robotic process automation',
    },
    {
      title: 'Real Estate Platform',
      description:
        'A comprehensive real estate management system with property listings and virtual tours',
    },
    {
      title: 'Tourism & Travel App',
      description:
        'A mobile tourism platform with booking capabilities and local experiences discovery',
    },
    {
      title: 'Sports Analytics Dashboard',
      description:
        'An advanced sports analytics platform for performance tracking and strategic insights',
    },
    {
      title: 'Food Delivery System',
      description:
        'A complete food delivery solution with order management and real-time tracking',
    },
    {
      title: 'Environmental Monitoring',
      description:
        'An environmental monitoring system using satellite data and machine learning for climate analysis',
    },
    {
      title: 'Social Impact Platform',
      description:
        'A blockchain-based platform for transparent social impact projects and donation tracking',
    },
  ],
  es: [
    {
      title: 'Sistema de Gestión Energética',
      description:
        'Una solución integral para la gestión de energía con monitoreo en tiempo real y características de optimización',
    },
    {
      title: 'Sistemas de Salud',
      description:
        'Una solución innovadora de gestión sanitaria que mejora la atención al paciente y la eficiencia operativa',
    },
    {
      title: 'Plataforma de Análisis Financiero',
      description:
        'Una sólida plataforma de análisis financiero para la toma de decisiones basada en datos y la planificación estratégica',
    },
    {
      title: 'Solución de Comercio Electrónico',
      description:
        'Una plataforma de comercio electrónico escalable con gestión avanzada de productos y análisis de clientes',
    },
    {
      title: 'Panel de Ciudad Inteligente',
      description:
        'Un panel integrado para la supervisión y gestión de ciudades inteligentes con integración IoT',
    },
    {
      title: 'Plataforma Educativa',
      description:
        'Una plataforma educativa interactiva con rutas de aprendizaje personalizadas y seguimiento del progreso',
    },
    {
      title: 'Sistema de Gestión Agrícola',
      description:
        'Una solución agrícola moderna con sensores IoT para monitoreo y optimización de cultivos',
    },
    {
      title: 'Red de Transporte',
      description:
        'Un sistema integral de gestión de transporte con seguimiento en tiempo real y optimización de rutas',
    },
    {
      title: 'Plataforma de Entretenimiento',
      description:
        'Una plataforma de juegos inmersiva con capacidades multijugador y características sociales',
    },
    {
      title: 'Solución de Seguridad y Blockchain',
      description:
        'Una plataforma de seguridad descentralizada que aprovecha la tecnología blockchain para protección de datos',
    },
    {
      title: 'Centro de Comunicación',
      description:
        'Una plataforma de comunicación en tiempo real con videoconferencias y herramientas de colaboración',
    },
    {
      title: 'Automatización de Manufactura',
      description:
        'Un sistema de manufactura inteligente con visión por computadora y automatización de procesos robóticos',
    },
    {
      title: 'Plataforma Inmobiliaria',
      description:
        'Un sistema integral de gestión inmobiliaria con listados de propiedades y tours virtuales',
    },
    {
      title: 'App de Turismo y Viajes',
      description:
        'Una plataforma móvil de turismo con capacidades de reserva y descubrimiento de experiencias locales',
    },
    {
      title: 'Panel de Análisis Deportivo',
      description:
        'Una plataforma avanzada de análisis deportivo para seguimiento de rendimiento y perspectivas estratégicas',
    },
    {
      title: 'Sistema de Entrega de Comida',
      description:
        'Una solución completa de entrega de comida con gestión de pedidos y seguimiento en tiempo real',
    },
    {
      title: 'Monitoreo Ambiental',
      description:
        'Un sistema de monitoreo ambiental usando datos satelitales y aprendizaje automático para análisis climático',
    },
    {
      title: 'Plataforma de Impacto Social',
      description:
        'Una plataforma basada en blockchain para proyectos de impacto social transparentes y seguimiento de donaciones',
    },
  ],
  pt: [
    {
      title: 'Sistema de Gestão de Energia',
      description:
        'Uma solução abrangente para gestão de energia com monitoramento em tempo real e recursos de otimização',
    },
    {
      title: 'Sistemas de Saúde',
      description:
        'Uma solução inovadora de gestão de saúde que melhora o atendimento ao paciente e a eficiência operacional',
    },
    {
      title: 'Plataforma de Análise Financeira',
      description:
        'Uma plataforma robusta de análise financeira para tomada de decisões baseada em dados e planejamento estratégico',
    },
    {
      title: 'Solução de E-commerce',
      description:
        'Uma plataforma de e-commerce escalável com gerenciamento avançado de produtos e análise de clientes',
    },
    {
      title: 'Painel de Cidade Inteligente',
      description:
        'Um painel integrado para monitoramento e gerenciamento de cidades inteligentes com integração IoT',
    },
    {
      title: 'Plataforma Educacional',
      description:
        'Uma plataforma educacional interativa com percursos de aprendizagem personalizados e acompanhamento de progresso',
    },
    {
      title: 'Sistema de Gestão Agrícola',
      description:
        'Uma solução agrícola moderna com sensores IoT para monitoramento e otimização de culturas',
    },
    {
      title: 'Rede de Transporte',
      description:
        'Um sistema abrangente de gestão de transporte com rastreamento em tempo real e otimização de rotas',
    },
    {
      title: 'Plataforma de Entretenimento',
      description:
        'Uma plataforma de jogos imersiva com capacidades multijogador e recursos sociais',
    },
    {
      title: 'Solução de Segurança e Blockchain',
      description:
        'Uma plataforma de segurança descentralizada aproveitando a tecnologia blockchain para proteção de dados',
    },
    {
      title: 'Central de Comunicação',
      description:
        'Uma plataforma de comunicação em tempo real com videoconferência e ferramentas de colaboração',
    },
    {
      title: 'Automação de Manufatura',
      description:
        'Um sistema de manufatura inteligente com visão computacional e automação de processos robóticos',
    },
    {
      title: 'Plataforma Imobiliária',
      description:
        'Um sistema abrangente de gestão imobiliária com listagens de propriedades e tours virtuais',
    },
    {
      title: 'App de Turismo e Viagens',
      description:
        'Uma plataforma móvel de turismo com capacidades de reserva e descoberta de experiências locais',
    },
    {
      title: 'Painel de Análise Esportiva',
      description:
        'Uma plataforma avançada de análise esportiva para acompanhamento de performance e insights estratégicos',
    },
    {
      title: 'Sistema de Entrega de Comida',
      description:
        'Uma solução completa de entrega de comida com gestão de pedidos e rastreamento em tempo real',
    },
    {
      title: 'Monitoramento Ambiental',
      description:
        'Um sistema de monitoramento ambiental usando dados de satélite e aprendizado de máquina para análise climática',
    },
    {
      title: 'Plataforma de Impacto Social',
      description:
        'Uma plataforma baseada em blockchain para projetos de impacto social transparentes e rastreamento de doações',
    },
  ],
};

// Category translations
const categoryTranslations = {
  en: {
    Energy: 'Energy',
    Healthcare: 'Healthcare',
    Finance: 'Finance',
    'E-commerce': 'E-commerce',
    'Smart Cities': 'Smart Cities',
    Education: 'Education',
    Agriculture: 'Agriculture',
    Transportation: 'Transportation',
    Entertainment: 'Entertainment',
    Security: 'Security',
    Communication: 'Communication',
    Manufacturing: 'Manufacturing',
    'Real Estate': 'Real Estate',
    Tourism: 'Tourism',
    Sports: 'Sports',
    Food: 'Food',
    Environment: 'Environment',
    'Social Impact': 'Social Impact',
  },
  es: {
    Energy: 'Energía',
    Healthcare: 'Salud',
    Finance: 'Finanzas',
    'E-commerce': 'Comercio Electrónico',
    'Smart Cities': 'Ciudades Inteligentes',
    Education: 'Educación',
    Agriculture: 'Agricultura',
    Transportation: 'Transporte',
    Entertainment: 'Entretenimiento',
    Security: 'Seguridad',
    Communication: 'Comunicación',
    Manufacturing: 'Manufactura',
    'Real Estate': 'Bienes Raíces',
    Tourism: 'Turismo',
    Sports: 'Deportes',
    Food: 'Alimentación',
    Environment: 'Medio Ambiente',
    'Social Impact': 'Impacto Social',
  },
  pt: {
    Energy: 'Energia',
    Healthcare: 'Saúde',
    Finance: 'Finanças',
    'E-commerce': 'E-commerce',
    'Smart Cities': 'Cidades Inteligentes',
    Education: 'Educação',
    Agriculture: 'Agricultura',
    Transportation: 'Transporte',
    Entertainment: 'Entretenimento',
    Security: 'Segurança',
    Communication: 'Comunicação',
    Manufacturing: 'Manufatura',
    'Real Estate': 'Imobiliário',
    Tourism: 'Turismo',
    Sports: 'Esportes',
    Food: 'Alimentação',
    Environment: 'Meio Ambiente',
    'Social Impact': 'Impacto Social',
  },
} as const;

// Generate projects for each language
function generateProjectsForLanguage(
  language: 'en' | 'es' | 'pt'
): MockProject[] {
  return baseProjectsData.map((baseProject, index) => ({
    id: baseProject.id,
    title: `Project ${baseProject.id}: ${projectTranslations[language][index].title}`,
    description: projectTranslations[language][index].description,
    body: projectContentTemplates[language],
    category:
      categoryTranslations[language][
        baseProject.category as keyof (typeof categoryTranslations)[typeof language]
      ],
    iconType: baseProject.iconType,
    date: baseProject.date,
    language: language,
    technologies: baseProject.technologies,
    github: baseProject.github,
    website: baseProject.website,
    featured: baseProject.featured,
    references: baseProject.references?.[language],
    meta: {
      ...baseProject.meta,
      team: baseProject.meta.team,
    },
  }));
}

// Generate all projects
export const mockProjectsEn: MockProject[] = generateProjectsForLanguage('en');
export const mockProjectsEs: MockProject[] = generateProjectsForLanguage('es');
export const mockProjectsPt: MockProject[] = generateProjectsForLanguage('pt');

export const mockProjects: MockProject[] = [
  ...mockProjectsEn,
  ...mockProjectsEs,
  ...mockProjectsPt,
];

export const projectHandlers = [
  http.get('/api/projects', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    const lang = url.searchParams.get('lang') || 'pt';

    // Filter projects by language
    const filteredProjects = mockProjects.filter(
      (project) =>
        project.language === lang || (lang === 'pt' && !project.language)
    );

    const start = (page - 1) * limit;
    const end = Math.min(start + limit, filteredProjects.length);
    const paginatedProjects = filteredProjects.slice(start, end);

    return HttpResponse.json({
      projects: paginatedProjects,
      totalPages: Math.ceil(filteredProjects.length / limit),
      currentPage: page,
      totalItems: filteredProjects.length,
    });
  }),

  http.get('/api/projects/:id', ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const lang = url.searchParams.get('lang') || 'pt';

    // Find project with the specified language
    let project = mockProjects.find((p) => p.id === id && p.language === lang);

    // If not found and language is not Portuguese, fallback to Portuguese
    if (!project && lang !== 'pt') {
      project = mockProjects.find(
        (p) => p.id === id && (p.language === 'pt' || !p.language)
      );

      if (project) {
        return HttpResponse.json({
          ...project,
          langUsed: 'pt',
        });
      }
    }

    if (project) {
      return HttpResponse.json({
        ...project,
        langUsed: project.language || 'pt',
      });
    }

    return HttpResponse.json(
      { error: `Projeto não encontrado: ${id}` },
      { status: 404 }
    );
  }),
];
