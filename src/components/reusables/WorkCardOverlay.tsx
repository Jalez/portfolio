'use client';

import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Work } from '../../types';

interface WorkCardOverlayProps {
  work: Work;
  onClose: () => void;
}

const WorkCardOverlay: React.FC<WorkCardOverlayProps> = ({ work, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300">
      {/* Close button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10"
        aria-label="Close description"
      >
        <X className="h-6 w-6" />
      </Button>

      <Card className="text-center max-w-lg bg-card/95 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-card-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
            {work.description}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild size="lg">
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Work
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkCardOverlay;
