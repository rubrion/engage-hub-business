import common from './common.json';
import partnersData from './data/partnersData.json';
import teamData from './data/teamData.json';
import navigation from './navigation.json';
import about from './screens/about.json';
import blog from './screens/blog.json';
import contact from './screens/contact.json';
import home from './screens/home.json';
import landingSeasonal from './screens/landingSeasonal.json';
import notFound from './screens/notFound.json';
import partners from './screens/partners.json';
import postDetail from './screens/postDetail.json';
import projectDetail from './screens/projectDetail.json';
import projects from './screens/projects.json';
import services from './screens/services.json';
import team from './screens/team.json';
import teamJoin from './screens/teamJoin.json';

const screens = {
  about,
  blog,
  postDetail,
  contact,
  home,
  landingSeasonal,
  notFound,
  partners,
  projectDetail,
  projects,
  services,
  team,
  teamJoin,
};

const data = {
  partnersData,
  teamData,
};

export default {
  common,
  navigation,
  screens,
  data,
};
