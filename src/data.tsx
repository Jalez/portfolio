import { Project, Work, Testimonial, Skill, NavLink } from './types';
import { 
  JavaScriptIcon, 
  TypeScriptIcon, 
  PythonIcon, 
  ReactIcon, 
  ReactNativeIcon,
  NextJSIcon, 
  TailwindIcon, 
  NodeJSIcon, 
  ExpressIcon, 
  MongoDBIcon, 
  PostgreSQLIcon, 
  GitIcon, 
  DockerIcon,
  VueJSIcon,
  JavaIcon,
  CPlusPlusIcon,
  GraphQLIcon,
  PhpIcon,
  SassIcon,
  VisualStudioCodeIcon,
  FigmaIcon,
  PostmanIcon,
  AwsIcon,
  VercelIcon,
  NetlifyIcon,
  FirebaseIcon,
  RedisIcon,
  KubernetesIcon,
  WebpackIcon,
  ViteIcon,
  JestIcon,
  CypressIcon,
  PlaywrightIcon,
  TestingLibraryIcon,
  SeleniumIcon,
  ShadcnIcon,
  MaterialUIIcon,
  FlaskIcon,
  DjangoIcon,
  NestJSIcon,
  SpringIcon,
  ApacheIcon,
  HerokuIcon,
  JsonWebTokensIcon,
  StripeIcon,
  SqliteIcon,
  DynamoDBIcon,
  AwsRdsIcon,
  MongooseIcon,
  ElmIcon,
  JqueryIcon,
  RemixIcon,
  ReduxIcon,
  ReactRouterIcon,
  PiniaIcon,
  ZustandIcon,
  ThreeJSIcon
} from './constants';

export const NAV_LINKS: NavLink[] = [
  { href: '#hero', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#works', label: 'Works' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with React frontend and Node.js backend. Includes product listings, cart, checkout, and user authentication.',
    html_url: 'https://github.com/yourusername/ecommerce-platform',
    stargazers_count: 120,
    forks_count: 45,
    language: 'TypeScript',
    topics: ['react', 'nodejs', 'mongodb', 'typescript', 'tailwindcss'],
    imageUrl: 'https://picsum.photos/seed/project1/600/400'
  },
  {
    id: 2,
    name: 'Real-time Chat Application',
    description: 'A responsive chat application built with WebSockets, Next.js, and Express. Supports multiple rooms and direct messaging.',
    html_url: 'https://github.com/yourusername/chat-app',
    stargazers_count: 85,
    forks_count: 30,
    language: 'JavaScript',
    topics: ['nextjs', 'websockets', 'express', 'real-time'],
    imageUrl: 'https://picsum.photos/seed/project2/600/400'
  },
  {
    id: 3,
    name: 'AI Powered Recipe Generator',
    description: 'An innovative app that uses a generative AI to create unique recipes based on user-provided ingredients and dietary preferences.',
    html_url: 'https://github.com/yourusername/ai-recipe-generator',
    stargazers_count: 200,
    forks_count: 60,
    language: 'Python',
    topics: ['ai', 'machine-learning', 'python', 'flask', 'gemini-api'],
    imageUrl: 'https://picsum.photos/seed/project3/600/400'
  },
    {
    id: 4,
    name: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets using D3.js and React. Features various chart types and data filtering capabilities.',
    html_url: 'https://github.com/yourusername/data-viz-dashboard',
    stargazers_count: 150,
    forks_count: 55,
    language: 'TypeScript',
    topics: ['react', 'd3js', 'data-visualization', 'typescript'],
    imageUrl: 'https://picsum.photos/seed/project4/600/400'
  },
];

export const MOCK_WORKS: Work[] = [
  {
    id: 1,
    title: 'Scriba',
    description: 'Rich text editor with OCR for text extraction, text and image generation, collaboration through websocket connection, blob storage for files, stripe for payments Build with Next.js, Shadcn/ui, Tailwind CSS, PostgreSQL, Redis, Docker, aws, vercel, and more.',
    url: 'https://scriba-web.vercel.app/'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Jaakko is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are outstanding.",
    author: "Sarah Chen",
    title: "Senior Product Manager",
    company: "TechFlow Solutions",
    imageUrl: undefined,
    user_id: 1,
    is_approved: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    quote: "Working with Jaakko was a game-changer for our startup. His expertise in React and TypeScript helped us build a robust, scalable frontend that our users love.",
    author: "Marcus Rodriguez",
    title: "CTO & Co-founder",
    company: "InnovateLab",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    user_id: 2,
    is_approved: true,
    created_at: "2024-02-20T14:15:00Z",
    updated_at: "2024-02-20T14:15:00Z"
  },
  {
    id: 3,
    quote: "Jaakko's ability to quickly understand complex requirements and translate them into elegant solutions is remarkable. He helped us modernize our legacy system with minimal downtime.",
    author: "Emily Watson",
    title: "Lead Developer",
    company: "DataCorp Industries",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    user_id: 3,
    is_approved: true,
    created_at: "2024-03-10T09:45:00Z",
    updated_at: "2024-03-10T09:45:00Z"
  },
  {
    id: 4,
    quote: "I've worked with many developers, but Jaakko stands out for his reliability and technical depth. He consistently delivers clean, maintainable code.",
    author: "David Kim",
    title: "Engineering Manager",
    company: "WebScale Inc",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    user_id: 4,
    is_approved: true,
    created_at: "2024-03-25T16:20:00Z",
    updated_at: "2024-03-25T16:20:00Z"
  },
  {
    id: 5,
    quote: "Jaakko brought our vision to life with exceptional skill and creativity. His understanding of user experience and technical implementation helped us create a product that our customers love.",
    author: "Lisa Thompson",
    title: "UX Director",
    company: "Creative Digital",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    user_id: 5,
    is_approved: true,
    created_at: "2024-04-05T11:10:00Z",
    updated_at: "2024-04-05T11:10:00Z"
  }
];

export const MOCK_SKILLS: Skill[] = [
  // Languages
  { id: 1, name: 'JavaScript (ES6+)', category: 'Languages', icon: <JavaScriptIcon className="w-10 h-10 text-white" />, level: 90 },
  { id: 2, name: 'TypeScript', category: 'Languages', icon: <TypeScriptIcon className="w-10 h-10 text-white" />, level: 90 },
  { id: 3, name: 'Python', category: 'Languages', icon: <PythonIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 4, name: 'Java', category: 'Languages', icon: <JavaIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 5, name: 'C++', category: 'Languages', icon: <CPlusPlusIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 6, name: 'PHP', category: 'Languages', icon: <PhpIcon className="w-10 h-10 text-white" />, level: 60 },
  
  // Frontend
  { id: 7, name: 'React', category: 'Frontend', icon: <ReactIcon className="w-10 h-10 text-white" />, level: 95 },
  { id: 8, name: 'React Native', category: 'Frontend', icon: <ReactNativeIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 9, name: 'Vue.js', category: 'Frontend', icon: <VueJSIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 10, name: 'Next.js', category: 'Frontend', icon: <NextJSIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 11, name: 'Tailwind CSS', category: 'Frontend', icon: <TailwindIcon className="w-10 h-10 text-white" />, level: 90 },
  { id: 12, name: 'Sass/SCSS', category: 'Frontend', icon: <SassIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 36, name: 'Shadcn/ui', category: 'Frontend', icon: <ShadcnIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 37, name: 'Material UI', category: 'Frontend', icon: <MaterialUIIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 53, name: 'jQuery', category: 'Frontend', icon: <JqueryIcon className="w-10 h-10 text-white" />, level: 60 },
  { id: 54, name: 'Remix', category: 'Frontend', icon: <RemixIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 55, name: 'Redux', category: 'Frontend', icon: <ReduxIcon className="w-10 h-10 text-white" />, level: 85 },
      { id: 56, name: 'Zustand', category: 'Frontend', icon: <ZustandIcon className="w-10 h-10" />, level: 80 },
    { id: 57, name: 'Pinia', category: 'Frontend', icon: <PiniaIcon className="w-10 h-10" />, level: 75 },
  { id: 58, name: 'React Router', category: 'Frontend', icon: <ReactRouterIcon className="w-10 h-10 text-white" />, level: 90 },
  { id: 59, name: 'Three.js', category: 'Frontend', icon: <ThreeJSIcon className="w-10 h-10 text-white" />, level: 70 },
  
  // Backend
  { id: 13, name: 'Node.js', category: 'Backend', icon: <NodeJSIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 14, name: 'Express.js', category: 'Backend', icon: <ExpressIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 15, name: 'GraphQL', category: 'Backend', icon: <GraphQLIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 38, name: 'Flask', category: 'Backend', icon: <FlaskIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 39, name: 'Django', category: 'Backend', icon: <DjangoIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 40, name: 'NestJS', category: 'Backend', icon: <NestJSIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 41, name: 'Spring', category: 'Backend', icon: <SpringIcon className="w-10 h-10 text-white" />, level: 60 },
  { id: 42, name: 'Apache', category: 'Backend', icon: <ApacheIcon className="w-10 h-10 text-white" />, level: 55 },
  { id: 43, name: 'Heroku', category: 'Backend', icon: <HerokuIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 44, name: 'JWT', category: 'Backend', icon: <JsonWebTokensIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 46, name: 'Stripe', category: 'Backend', icon: <StripeIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 48, name: 'Firebase', category: 'Backend', icon: <FirebaseIcon className="w-10 h-10 text-white" />, level: 80 },
  
  // Databases
  { id: 16, name: 'MongoDB', category: 'Databases', icon: <MongoDBIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 17, name: 'PostgreSQL', category: 'Databases', icon: <PostgreSQLIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 18, name: 'Redis', category: 'Databases', icon: <RedisIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 19, name: 'Firebase', category: 'Databases', icon: <FirebaseIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 48, name: 'SQLite', category: 'Databases', icon: <SqliteIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 49, name: 'DynamoDB', category: 'Databases', icon: <DynamoDBIcon className="w-10 h-10 text-white" />, level: 60 },
  { id: 50, name: 'AWS RDS', category: 'Databases', icon: <AwsRdsIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 51, name: 'Mongoose', category: 'Databases', icon: <MongooseIcon className="w-10 h-10 text-white" />, level: 75 },
  
  // Tools & DevOps
  { id: 20, name: 'Git & GitHub', category: 'Tools', icon: <GitIcon className="w-10 h-10 text-white" />, level: 95 },
  { id: 21, name: 'Docker', category: 'Tools', icon: <DockerIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 22, name: 'VS Code', category: 'Tools', icon: <VisualStudioCodeIcon className="w-10 h-10 text-white" />, level: 95 },
  { id: 23, name: 'Figma', category: 'Tools', icon: <FigmaIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 24, name: 'Postman', category: 'Tools', icon: <PostmanIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 25, name: 'AWS', category: 'Tools', icon: <AwsIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 26, name: 'Vercel', category: 'Tools', icon: <VercelIcon className="w-10 h-10 text-white" />, level: 85 },
  { id: 27, name: 'Netlify', category: 'Tools', icon: <NetlifyIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 28, name: 'Kubernetes', category: 'Tools', icon: <KubernetesIcon className="w-10 h-10 text-white" />, level: 55 },
  { id: 29, name: 'Webpack', category: 'Tools', icon: <WebpackIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 30, name: 'Vite', category: 'Tools', icon: <ViteIcon className="w-10 h-10 text-white" />, level: 80 },
  { id: 31, name: 'Jest', category: 'Tools', icon: <JestIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 32, name: 'Cypress', category: 'Tools', icon: <CypressIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 33, name: 'Playwright', category: 'Tools', icon: <PlaywrightIcon className="w-10 h-10 text-white" />, level: 70 },
  { id: 34, name: 'Testing Library', category: 'Tools', icon: <TestingLibraryIcon className="w-10 h-10 text-white" />, level: 75 },
  { id: 35, name: 'Selenium', category: 'Tools', icon: <SeleniumIcon className="w-10 h-10 text-white" />, level: 65 },
  { id: 52, name: 'Elm', category: 'Languages', icon: <ElmIcon className="w-10 h-10 text-white" />, level: 50 },
];

// Cache for GitHub API responses to avoid rate limiting
let projectsCache: { data: Project[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch the most recently updated repositories (simulating pinned repos)


export const fetchUserProjects = async (username: string): Promise<Project[]> => {
  try {
    // Check cache first
    if (projectsCache && Date.now() - projectsCache.timestamp < CACHE_DURATION) {
      console.log('Using cached repository data');
      return projectsCache.data;
    }

    console.log(`Fetching most recent repositories for ${username}...`);
    
    // Fetch repositories sorted by most recently updated
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
    
    if (!reposResponse.ok) {
      if (reposResponse.status === 403) {
        console.warn('GitHub API rate limit exceeded. Using fallback data based on your known repositories.');
        // Return a manually curated list of your recent projects when rate limited
        return getFallbackProjects(username);
      }
      console.warn('Failed to fetch repositories from GitHub API, falling back to mock data');
      return MOCK_PROJECTS;
    }

    const repos = await reposResponse.json();
    
    // Filter to get the most recent non-fork repositories
    const recentRepos = repos
      .filter((repo: any) => !repo.fork && !repo.archived) // Exclude forks and archived repos
      .slice(0, 3); // Take the 3 most recently updated

    console.log(`Found ${recentRepos.length} recent repositories`);

    // Get detailed information including topics for each repository
    const projectsWithTopics = await Promise.all(
      recentRepos.map(async (repo: any) => {
        try {
          // Get topics for the repository
          const topicsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/topics`, {
            headers: {
              'Accept': 'application/vnd.github.mercy-preview+json'
            }
          });
          
          let topics: string[] = [];
          if (topicsResponse.ok) {
            const topicsData = await topicsResponse.json();
            topics = topicsData.names || [];
          }

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            topics,
            imageUrl: `https://opengraph.githubassets.com/1/${username}/${repo.name}`
          };
        } catch (error) {
          console.warn(`Failed to fetch topics for ${repo.name}:`, error);
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            topics: [],
            imageUrl: `https://opengraph.githubassets.com/1/${username}/${repo.name}`
          };
        }
      })
    );

    // Cache the results
    projectsCache = {
      data: projectsWithTopics,
      timestamp: Date.now()
    };

    return projectsWithTopics;

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    console.log('Falling back to curated project list');
    return getFallbackProjects(username);
  }
};

// Fallback function with your actual recent projects
const getFallbackProjects = (username: string): Project[] => {
  return [
    {
      id: 1,
      name: 'react-flow-automated-layout',
      description: 'A React library for automated layout of nested node graphs with parent-child relationships using React Flow.',
      html_url: `https://github.com/${username}/react-flow-automated-layout`,
      stargazers_count: 3,
      forks_count: 0,
      language: 'TypeScript',
      topics: ['react', 'typescript', 'graph-layout', 'react-flow'],
      imageUrl: `https://opengraph.githubassets.com/1/${username}/react-flow-automated-layout`
    },
    {
      id: 2,
      name: 'research-integrator',
      description: 'Connects to academic databases (e.g., PubMed, arXiv) to retrieve and summarize research papers.',
      html_url: `https://github.com/${username}/research-integrator`,
      stargazers_count: 0,
      forks_count: 0,
      language: 'Python',
      topics: ['research', 'api', 'academic', 'pubmed', 'arxiv'],
      imageUrl: `https://opengraph.githubassets.com/1/${username}/research-integrator`
    },
    {
      id: 3,
      name: 'react-state-history',
      description: 'A Simple yet flexible Command Pattern implementation to manage state history in your application.',
      html_url: `https://github.com/${username}/react-state-history`,
      stargazers_count: 0,
      forks_count: 0,
      language: 'TypeScript',
      topics: ['react', 'state-management', 'command-pattern', 'typescript'],
      imageUrl: `https://opengraph.githubassets.com/1/${username}/react-state-history`
    }
  ];
};
