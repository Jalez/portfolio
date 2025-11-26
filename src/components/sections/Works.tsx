'use client';

import React from 'react';
import { MOCK_WORKS } from '../../data';
import Carousel from '../reusables/Carousel';
import Section from '../reusables/Section';
import WorkCard from '../reusables/WorkCard';

const Works: React.FC = () => {
  const workCards = MOCK_WORKS.map((work) => (
    <WorkCard key={work.id} work={work} />
  ));

  return (
    <Section
      id="works"
      title="Featured Works"
      subtitle="Showcasing my live projects and applications"
    >
      <Carousel>{workCards}</Carousel>
    </Section>
  );
};

export default Works;
