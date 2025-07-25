import React, { useState, useEffect, useRef } from 'react';
import { Skill } from '../../types';
import { MOCK_SKILLS } from '../../data';
import PageHeading from '../reusables/PageHeading';
import GradientBackground from '../reusables/GradientBackground';

const SkillCard: React.FC<{ skill: Skill; isVisible: boolean; delay: number }> = ({ skill, isVisible, delay }) => {
  return (
    <div 
      className="p-0 sm:p-1 flex items-center justify-center text-center hover:scale-110 group relative aspect-square transition-all duration-300"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.6s ease-out ${delay}s`,
      }}
      title={skill.name}
    >
      <GradientBackground variant="skill" size="md" title={skill.name}>
        {skill.icon ? React.cloneElement(skill.icon as React.ReactElement<any>, { 
          className: "w-4 h-4 sm:w-4 sm:h-4 md:w-7 md:h-7 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-gray-800 dark:text-white",
          style: { minWidth: '1rem', minHeight: '1rem' }
        }) : (
          <div className="w-full h-full bg-gray-800/20 dark:bg-white/20 rounded-full flex items-center justify-center text-gray-800 dark:text-white text-xs font-bold">
            {skill.name.substring(0,1)}
          </div>
        )}
      </GradientBackground>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {skill.name}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillCategories = ['Languages', 'Frontend', 'Backend', 'Databases', 'Tools'] as const;
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1;
          setIsInView(isVisible);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillsTypewriterActions = [
    { type: 'typeString' as const, value: "That's what I do, I drink and I know things." },
    { type: 'pauseFor' as const, value: 1500 },
    { type: 'deleteChars' as const, value: 24 },
    { type: 'typeString' as const, value: "code and I know things." }
  ];

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="snap-start min-h-screen flex flex-col pt-20 bg-theme-background"
    >
      <div className="container mx-auto px-4 sm:px-1 flex flex-col flex-1 py-4 sm:py-1 max-w-7xl">
        <PageHeading
          title="My Skills"
          subtitle="That's what I do, I drink and I know things."
          typewriterActions={skillsTypewriterActions}
          isVisible={isInView}
        />
        
        {/* Mobile View - Compact Flex */}
        <div className="flex-1 flex flex-col gap-1 sm:gap-1 md:hidden">
          {skillCategories.map((category, catIndex) => {
            const categorySkills = MOCK_SKILLS.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            return (
              <div 
                key={category}
                style={{ 
                  opacity: isInView ? 1 : 0,
                  transition: `opacity 0.8s ease-out ${catIndex * 0.1}s`,
                }}
              >
                <h3 className="text-sm sm:text-base font-semibold text-theme-primary mb-1 sm:mb-1 text-center">{category}</h3>
                <div className="flex flex-wrap gap-1 justify-start items-center">
                  {categorySkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      isVisible={isInView}
                      delay={(catIndex * 0.1) + (index * 0.03)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet View - Balanced Layout */}
        <div className="hidden md:flex lg:hidden flex-1 gap-4">
          <div className="flex-1 flex flex-col gap-4">
            {/* Left Column - Languages & Frontend */}
            {['Languages', 'Frontend'].map((category, catIndex) => {
              const categorySkills = MOCK_SKILLS.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <div 
                  key={category}
                  style={{ 
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.8s ease-out ${catIndex * 0.15}s`,
                  }}
                >
                  <h3 className="text-base font-semibold text-theme-primary mb-3 text-center">{category}</h3>
                  <div className="flex flex-wrap gap-1 justify-start items-center">
                    {categorySkills.map((skill, index) => (
                      <SkillCard 
                        key={skill.id} 
                        skill={skill} 
                        isVisible={isInView}
                        delay={(catIndex * 0.15) + (index * 0.05)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {/* Right Column - Backend, Databases & Tools */}
            {['Backend', 'Databases', 'Tools'].map((category, catIndex) => {
              const categorySkills = MOCK_SKILLS.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <div 
                  key={category}
                  style={{ 
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.8s ease-out ${(catIndex + 2) * 0.15}s`,
                  }}
                >
                  <h3 className="text-base font-semibold text-theme-primary mb-3 text-center">{category}</h3>
                  <div className="flex flex-wrap gap-2 justify-start items-center">
                    {categorySkills.map((skill, index) => (
                      <SkillCard 
                        key={skill.id} 
                        skill={skill} 
                        isVisible={isInView}
                        delay={((catIndex + 2) * 0.15) + (index * 0.05)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop View - Horizontal Layout */}
        <div className="hidden lg:flex flex-1 gap-3 xl:gap-4 2xl:gap-6">
          {skillCategories.map((category, catIndex) => {
            const categorySkills = MOCK_SKILLS.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            return (
              <div 
                key={category} 
                className="flex-1"
                style={{ 
                  opacity: isInView ? 1 : 0,
                  transition: `opacity 0.8s ease-out ${catIndex * 0.15}s`,
                }}
              >
                <h3 className="text-lg xl:text-xl font-semibold text-theme-primary mb-4 xl:mb-6 text-center">{category}</h3>
                <div className="flex flex-wrap gap-2 xl:gap-3 justify-start items-center">
                  {categorySkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      isVisible={isInView}
                      delay={(catIndex * 0.15) + (index * 0.05)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
