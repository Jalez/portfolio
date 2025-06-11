import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { fetchUserProjects } from '../data';
import Carousel from './Carousel';
import Card from './Card';
import { useScrollFade } from '../hooks/useScrollFade';
import PageHeading from './PageHeading';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card>
    <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-3 sm:mb-4 text-theme-primary group-hover:text-theme-primary transition-colors leading-tight">{project.name}</h3>
    <p className="text-theme-secondary text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 flex-grow leading-relaxed line-clamp-4">{project.description}</p>
    
    {project.topics && project.topics.length > 0 && (
      <div className="mb-4 sm:mb-6">
        <h4 className="text-sm sm:text-base text-theme-secondary uppercase font-semibold mb-3">Technologies:</h4>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {project.topics.slice(0, 4).map(topic => (
            <span key={topic} className="bg-gray-800 text-white text-sm sm:text-base px-3 py-2 rounded-full font-medium border border-gray-600">{topic}</span>
          ))}
        </div>
      </div>
    )}

    <div className="flex justify-between items-center text-sm sm:text-base lg:text-lg text-theme-secondary mt-auto pt-4 sm:pt-6 border-t border-theme">
      <div className="flex space-x-4 items-center">
        {project.stargazers_count !== undefined && (
          <span className="flex items-center" title="Stars">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-theme-primary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {project.stargazers_count}
          </span>
        )}
        {project.forks_count !== undefined && (
          <span className="flex items-center" title="Forks">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="18" r="3"/>
              <circle cx="6" cy="6" r="3"/>
              <circle cx="18" cy="6" r="3"/>
              <path d="m18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
              <path d="M12 12v3"/>
            </svg>
           {project.forks_count}
          </span>
        )}
      </div>
      <a 
        href={project.html_url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-theme-primary hover:text-theme-secondary font-semibold transition-colors inline-flex items-center group text-base sm:text-lg"
      >
        View 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ml-2 transform transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </Card>
);

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInView, setIsInView] = useState(false);
  const scrollFade = useScrollFade();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      // Fetch your actual pinned repositories from GitHub
      const fetchedProjects = await fetchUserProjects('Jalez'); 
      setProjects(fetchedProjects);
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadProjects();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
          setIsInView(isVisible);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (scrollFade.ref.current) {
      observer.observe(scrollFade.ref.current);
    }

    return () => {
      if (scrollFade.ref.current) {
        observer.unobserve(scrollFade.ref.current);
      }
    };
  }, [scrollFade.ref]);

  if (loading) {
    return (
      <section 
        id="projects" 
        ref={scrollFade.ref}
        className="min-h-screen flex flex-col pt-20"
        style={scrollFade.style}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col flex-1 py-4 sm:py-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-theme-primary flex-shrink-0">Featured Projects</h2>
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary"></div>
            <p className="text-theme-secondary text-lg ml-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  const projectCards = projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <section 
      id="projects" 
      ref={scrollFade.ref}
      className="snap-start min-h-screen flex flex-col pt-20"
      style={scrollFade.style}
    >
      <div className="container mx-auto px-4 sm:px-6 flex flex-col flex-1 py-6 sm:py-8">
        <PageHeading
          title="Featured Projects"
          subtitle="Displaying last 3 public projects I've updated in GitHub"
          isVisible={isInView}
          className="mb-6 sm:mb-8 lg:mb-12"
        />
        
        <div className="flex-1 px-2 sm:px-4 lg:px-8">
          <Carousel>{projectCards}</Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
