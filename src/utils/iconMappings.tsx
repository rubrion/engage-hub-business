import AgricultureIcon from '@mui/icons-material/Agriculture';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatIcon from '@mui/icons-material/Chat';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FactoryIcon from '@mui/icons-material/Factory';
import GamesIcon from '@mui/icons-material/Games';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeIcon from '@mui/icons-material/Home';
import LandscapeIcon from '@mui/icons-material/Landscape';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedIcon from '@mui/icons-material/Speed';
import SportsIcon from '@mui/icons-material/Sports';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import { SvgIcon } from '@mui/material';

/**
 * Central mapping of category names to their corresponding icon components
 * Used across the application for consistent category icon display
 */
export const CATEGORY_ICONS: Record<string, typeof SvgIcon> = {
  // General categories
  Project: WorkIcon,

  // Domain categories - English
  Energy: ElectricBoltIcon,
  Healthcare: HealthAndSafetyIcon,
  Finance: MonetizationOnIcon,
  'E-commerce': ShoppingCartIcon,
  'Smart Cities': LocationCityIcon,
  Education: SchoolIcon,
  Agriculture: AgricultureIcon,
  Transportation: DirectionsBusIcon,
  Entertainment: GamesIcon,
  Security: SecurityIcon,
  Communication: CampaignIcon,
  Manufacturing: FactoryIcon,
  'Real Estate': HomeIcon,
  Tourism: TravelExploreIcon,
  Sports: SportsIcon,
  Food: RestaurantIcon,
  Environment: LandscapeIcon,
  'Social Impact': VolunteerActivismIcon,

  // Domain categories - Spanish
  Energía: ElectricBoltIcon,
  Salud: HealthAndSafetyIcon,
  Finanzas: MonetizationOnIcon,
  'Comercio Electrónico': ShoppingCartIcon,
  'Ciudades Inteligentes': LocationCityIcon,
  Educación: SchoolIcon,
  Transporte: DirectionsBusIcon,
  Entretenimiento: GamesIcon,
  Seguridad: SecurityIcon,
  Comunicación: CampaignIcon,
  Manufactura: FactoryIcon,
  'Bienes Raíces': HomeIcon,
  Deportes: SportsIcon,
  Alimentación: RestaurantIcon,
  'Medio Ambiente': LandscapeIcon,

  // Domain categories - Portuguese
  Energia: ElectricBoltIcon,
  Saúde: HealthAndSafetyIcon,
  Finanças: MonetizationOnIcon,
  'Comércio Eletrônico': ShoppingCartIcon,
  Educação: SchoolIcon,
  Agricultura: AgricultureIcon,
  Entretenimento: GamesIcon,
  Segurança: SecurityIcon,
  Imobiliário: HomeIcon,
  Turismo: TravelExploreIcon,
  Esportes: SportsIcon,
  'Meio Ambiente': LandscapeIcon,
  'Impacto Social': VolunteerActivismIcon,

  // AI and ML categories
  'Artificial Intelligence': PsychologyIcon,
  'Inteligência Artificial': PsychologyIcon,
  'Inteligencia Artificial': PsychologyIcon,
  IA: PsychologyIcon,
  'Machine Learning': PsychologyIcon,
  'Computer Vision': VisibilityIcon,
  'Visão Computacional': VisibilityIcon,
  'Visión Computacional': VisibilityIcon,
  'Natural Language Processing': ChatIcon,
  'Processamento de Texto': ChatIcon,
  'Processamento de Linguagem Natural': ChatIcon,
  'Procesamiento de Texto': ChatIcon,
  NLP: ChatIcon,
  RAG: ChatIcon,
  Analytics: BarChartIcon,
  'Análise de Dados': BarChartIcon,
  'Data Science': StorageIcon,

  // Blog categories
  Development: CodeIcon,
  Desarrollo: CodeIcon,
  Desenvolvimento: CodeIcon,
  Technology: DevicesIcon,
  Tecnología: DevicesIcon,
  Tecnologia: DevicesIcon,
  Performance: SpeedIcon,
  Rendimiento: SpeedIcon,
  Desempenho: SpeedIcon,
  Business: BusinessIcon,
  Negocios: BusinessIcon,
  Negócios: BusinessIcon,
  Analítica: BarChartIcon,
  Análise: BarChartIcon,
};

/**
 * Legacy string-based category icon mapping
 * Maintained for backwards compatibility
 */
export const PROJECT_CATEGORY_ICONS_STRINGS = {
  // English categories
  'Artificial Intelligence': 'PsychologyIcon',
  'Computer Vision': 'VisibilityIcon',
  'Natural Language Processing': 'ChatIcon',
  'Data Science': 'StorageIcon',

  // Portuguese categories
  'Inteligência Artificial': 'PsychologyIcon',
  'Visão Computacional': 'VisibilityIcon',
  'Processamento de Texto': 'ChatIcon',
  'Processamento de Linguagem Natural': 'ChatIcon',
  'Análise de Dados': 'BarChartIcon',
  IA: 'PsychologyIcon',

  // Spanish categories
  'Inteligencia Artificial': 'PsychologyIcon',
  'Visión Computacional': 'VisibilityIcon',
  'Procesamiento de Texto': 'ChatIcon',

  // Common abbreviations and terms
  Analytics: 'BarChartIcon',
  NLP: 'ChatIcon',
  RAG: 'ChatIcon',
  'Machine Learning': 'PsychologyIcon',
};

/**
 * Blog category icon mapping
 * @deprecated Use CATEGORY_ICONS instead
 */
export const BLOG_CATEGORY_ICONS_STRINGS = {
  Development: 'CodeIcon',
  Desarrollo: 'CodeIcon',
  Desenvolvimento: 'CodeIcon',
  'Artificial Intelligence': 'PsychologyIcon',
  'Inteligencia Artificial': 'PsychologyIcon',
  'Inteligência Artificial': 'PsychologyIcon',
  Performance: 'SpeedIcon',
  Rendimiento: 'SpeedIcon',
  Desempenho: 'SpeedIcon',
  Technology: 'DevicesIcon',
  Tecnología: 'DevicesIcon',
  Tecnologia: 'DevicesIcon',
  Business: 'BusinessIcon',
  Negocios: 'BusinessIcon',
  Negócios: 'BusinessIcon',
  Education: 'SchoolIcon',
  Educación: 'SchoolIcon',
  Educação: 'SchoolIcon',
  Analytics: 'BarChartIcon',
  Analítica: 'BarChartIcon',
  Análise: 'BarChartIcon',
};
