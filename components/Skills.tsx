import React, { useState, useEffect, useRef } from 'react';
import { Skill } from '../types';
import { MOCK_SKILLS } from '../data';
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

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
      <div className="text-white flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-gray-800 border border-gray-600 hover:border-white/50 transition-colors duration-300">
        {skill.icon ? React.cloneElement(skill.icon, { 
          className: "w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white",
          style: { minWidth: '1rem', minHeight: '1rem' }
        }) : (
          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {skill.name.substring(0,1)}
          </div>
        )}
      </div>
      
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
          setIsInView(isVisible);
          
          // Start typewriter when section comes into view for the first time
          if (isVisible && !hasTyped && headingRef.current && typewriterRef.current) {
            setHasTyped(true);
            
            // First typewriter for heading
            const headingTypewriter = new Typewriter(headingRef.current, {
              loop: false,
              delay: 80,
              deleteSpeed: 30,
            });

            // Second typewriter for description (starts after heading is done)
            const descriptionTypewriter = new Typewriter(typewriterRef.current, {
              loop: false,
              delay: 60,
              deleteSpeed: 30,
            });

            // Start with heading
            headingTypewriter
              .typeString('My Skills')
              .callFunction(() => {
                // Hide cursor from heading after completion
                if (headingRef.current) {
                  const headingElement = headingRef.current;
                  const cursor = headingElement.querySelector('.Typewriter__cursor');
                  if (cursor) {
                    (cursor as HTMLElement).style.display = 'none';
                  }
                }
                
                // After heading is complete, start description
                setTimeout(() => {
                  descriptionTypewriter
                    .typeString("That's what I do, I drink and I know things.")
                    .pauseFor(1500)
                    .deleteChars(24) // Delete "drink and I know things."
                    .typeString("code and I know things.")
                    .callFunction(() => {
                      // Hide cursor from description after completion
                      if (typewriterRef.current) {
                        const descriptionElement = typewriterRef.current;
                        const cursor = descriptionElement.querySelector('.Typewriter__cursor');
                        if (cursor) {
                          (cursor as HTMLElement).style.display = 'none';
                        }
                      }
                    })
                    .start();
                }, 500); // Brief pause before starting description
              })
              .start();
          }
        });
      },
      {
        threshold: 0.2,
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
  }, [hasTyped]);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="snap-start min-h-screen flex flex-col pt-20"
    >
      <div className="container mx-auto px-4 sm:px-2 flex flex-col flex-1 py-4 sm:py-2 max-w-7xl">
        <div className="text-center mb-6 sm:mb-4 flex-shrink-0">
          <h2 
            ref={headingRef}
            className="text-2xl sm:text-2xl lg:text-4xl font-bold text-theme-primary mb-3 min-h-[1.2em]"
          />
          <p 
            ref={typewriterRef}
            className="text-base sm:text-lg lg:text-xl text-theme-secondary max-w-3xl mx-auto min-h-[2.5em] leading-relaxed"
          />
        </div>
        
        {/* Mobile View - Compact Grid */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-4 md:hidden">
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
                <h3 className="text-sm sm:text-base font-semibold text-theme-primary mb-2 sm:mb-3 text-center">{category}</h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-x-0 gap-y-2 sm:gap-x-1 sm:gap-y-2 justify-items-center">
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
                  <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
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
                  <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 justify-items-center">
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
                <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 xl:gap-3 justify-items-center">
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
