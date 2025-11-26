import React from 'react';
// Import technology icons from React Icons
import { 
  SiJavascript, 
  SiTypescript, 
  SiPython, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiGit, 
  SiDocker,
  SiVuedotjs,
  SiOpenjdk, // Java alternative
  SiCplusplus,
  SiGraphql,
  SiPhp,
  SiSass,
  SiFigma,
  SiPostman,
  SiAmazon, // AWS alternative
  SiVercel,
  SiNetlify,
  SiFirebase,
  SiRedis,
  SiKubernetes,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiMui, // Material UI icon
  SiFlask,
  SiDjango,
  SiNestjs,
  SiSpring,
  SiApache,
  SiHeroku,
  SiJsonwebtokens,
  SiSqlite,
  SiAmazondynamodb,
  SiMongoose,
  SiElm,
  SiJquery,
  SiRemix,
  SiRedux,
  SiReactrouter,
  SiThreedotjs
} from 'react-icons/si';

// Import generic icons for VS Code
import { VscCode } from 'react-icons/vsc';

export const ABOUT_DESCRIPTION = "Full-stack developer who loves turning wild ideas into clean, working code. I build things that matter, solve real problems, and maybe break a few things along the way (in a good way, I promise).";

// Technology-specific icons
export const JavaScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiJavascript {...props} />;
export const TypeScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiTypescript {...props} />;
export const PythonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiPython {...props} />;
export const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiReact {...props} />;
export const ReactNativeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiReact {...props} />;
export const NextJSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiNextdotjs {...props} />;
export const TailwindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiTailwindcss {...props} />;
export const NodeJSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiNodedotjs {...props} />;
export const ExpressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiExpress {...props} />;
export const MongoDBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiMongodb {...props} />;
export const PostgreSQLIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiPostgresql {...props} />;
export const GitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiGit {...props} />;
export const DockerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiDocker {...props} />;

// Additional technology icons
export const VueJSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiVuedotjs {...props} />;
export const JavaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiOpenjdk {...props} />;
export const CPlusPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiCplusplus {...props} />;
export const GraphQLIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiGraphql {...props} />;
export const PhpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiPhp {...props} />;
export const SassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiSass {...props} />;
export const VisualStudioCodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <VscCode {...props} />;
export const FigmaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiFigma {...props} />;
export const PostmanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiPostman {...props} />;
export const AwsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiAmazon {...props} />;
export const VercelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiVercel {...props} />;
export const NetlifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiNetlify {...props} />;
export const FirebaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiFirebase {...props} />;
export const RedisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiRedis {...props} />;
export const KubernetesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiKubernetes {...props} />;
export const WebpackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiWebpack {...props} />;
export const ViteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiVite {...props} />;
export const JestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiJest {...props} />;
export const CypressIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiCypress {...props} />;

// State Management icons
export const ReduxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiRedux {...props} />;
export const ReactRouterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiReactrouter {...props} />;

// Custom icons for Pinia and Zustand - using official SVG files
export const PiniaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <img 
      src="/pinia.svg" 
      alt="Pinia" 
      className={props.className}
      style={{ 
        filter: 'brightness(0)',
        width: props.width || '1em',
        height: props.height || '1em',
        ...props.style 
      }} 
    />
  );
};

export const ZustandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <img 
      src="/zustand.svg" 
      alt="Zustand" 
      className={props.className}
      style={{ 
        filter: 'brightness(0)',
        width: props.width || '1em',
        height: props.height || '1em',
        ...props.style 
      }} 
    />
  );
};

// 3D library icon
export const ThreeJSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiThreedotjs {...props} />;

// Additional UI library icons
export const ShadcnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const MaterialUIIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiMui {...props} />;

// Testing tools - custom icons since they're not available in react-icons
export const PlaywrightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

export const TestingLibraryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const SeleniumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18L18.82 7 12 9.82 5.18 7 12 4.18zm-8 4.72L10 11.9v6.28l-6-3-2-1zm8 7.28v-6.28L18 7.9v8.28l-6 3z"/>
  </svg>
);

// Backend technology icons
export const FlaskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiFlask {...props} />;
export const DjangoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiDjango {...props} />;
export const NestJSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiNestjs {...props} />;
export const SpringIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiSpring {...props} />;
export const ApacheIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiApache {...props} />;
export const HerokuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiHeroku {...props} />;
export const JsonWebTokensIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiJsonwebtokens {...props} />;

// Custom backend icons for technologies without specific react-icons
export const RestApiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
    <path d="M12 7L12.5 11.5L17 12L12.5 12.5L12 17L11.5 12.5L7 12L11.5 11.5L12 7Z"/>
  </svg>
);

export const ServerlessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 6h20v2H2V6zm3 3h14v2H5V9zm2 3h10v2H7v-2zm1 3h8v2H8v-2z"/>
  </svg>
);

export const StripeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.392 1.728-1.392 2.145 0 4.817.645 7.479 1.819v-4.031c-2.021-.696-4.301-1.056-7.479-1.056-4.823 0-8.181 2.526-8.181 6.756 0 3.196 2.584 4.982 6.687 6.212 2.935.831 3.356 1.426 3.356 2.226 0 1.009-.831 1.596-2.226 1.596-2.935 0-6.148-.645-8.966-2.226v4.301c2.584.831 5.674 1.226 8.966 1.226 5.674 0 8.966-2.584 8.966-6.756 0-3.356-2.584-5.142-6.974-6.456z"/>
  </svg>
);

export const SqliteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiSqlite {...props} />;
export const DynamoDBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiAmazondynamodb {...props} />;
export const AwsRdsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiAmazon {...props} />;
export const MongooseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiMongoose {...props} />;

export const ElmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiElm {...props} />;
export const JqueryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiJquery {...props} />;
export const RemixIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <SiRemix {...props} />;
