import { Sparkles, Wand } from "lucide-react";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { TextArea } from './TextArea';


interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  className?: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  onGenerate,
  isGenerating,
  className
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    "A serene sunset over a mountain lake with golden reflections",
    "Futuristic cityscape with flying cars and neon lights",
    "Ancient forest with mystical creatures and glowing mushrooms",
    "Ocean waves crashing against dramatic cliffs"
  ];

  return (
    <GlassCard className={cn('p-6 space-y-6', className)} hover>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Wand className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-clash font-semibold text-lg text-black">
          Create Video
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextArea
          label="Describe your video"
          placeholder="Enter a detailed description of the video you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="min-h-[120px]"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            loading={isGenerating}
            className="flex-1"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Video
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={() => setPrompt('')}
            disabled={isGenerating}
          >
            Clear
          </Button>
        </div>
      </form>

      {/* Example Prompts */}
      <div className="space-y-3">
        <h3 className="font-clash font-medium text-black text-sm">
          Try these examples:
        </h3>
        <div className="grid gap-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              disabled={isGenerating}
              className={cn(
                'text-left p-3 rounded-lg text-sm font-clash',
                'bg-white/5 hover:bg-white/10 text-black/70 hover:text-black',
                'transition-all duration-250 ease-out border border-white/10',
                'hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};