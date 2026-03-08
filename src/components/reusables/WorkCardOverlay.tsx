'use client';

import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Work } from '../../types';

interface WorkCardOverlayProps {
  work: Work;
  onClose: () => void;
}

const WorkCardOverlay: React.FC<WorkCardOverlayProps> = ({ work, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300">
      <Card className="max-w-lg bg-card/95 backdrop-blur-sm">
        <CardHeader className="relative pb-2">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0"
            aria-label="Close description"
          >
            <X className="h-5 w-5" />
          </Button>
          <CardTitle className="text-center text-lg sm:text-xl lg:text-2xl pr-8">
            {work.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-48 overflow-y-auto">
          <p className="text-card-foreground text-xs sm:text-sm leading-relaxed text-justify">
            {work.description}
          </p>
        </CardContent>
        <CardFooter className="justify-center pt-6">
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
