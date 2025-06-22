import { Settings, Cpu, Shield, Zap, BarChart } from "lucide-react";
import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { Toggle } from './Toggle';
import { Dropdown } from './Dropdown';


interface GlobalControlsProps {
  className?: string;
}

const modelOptions = [
  { value: 'stable-diffusion', label: 'Stable Diffusion XL' },
  { value: 'midjourney', label: 'Midjourney v6' },
  { value: 'dalle3', label: 'DALL-E 3' },
  { value: 'runway', label: 'Runway Gen-2' }
];

export const GlobalControls: React.FC<GlobalControlsProps> = ({ className }) => {
  const [selectedModel, setSelectedModel] = React.useState('runway');
  const [safetyMode, setSafetyMode] = React.useState(true);
  const [autoGenerate, setAutoGenerate] = React.useState(false);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Model Selection */}
      <GlassCard className="p-6 space-y-4" hover>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-xl">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <h2 className="font-clash font-semibold text-lg text-black">
            AI Model
          </h2>
        </div>
        
        <Dropdown
          options={modelOptions}
          value={selectedModel}
          onChange={setSelectedModel}
          placeholder="Select AI model..."
        />
        
        <div className="text-black/60 text-sm font-clash">
          <p>Current model: <span className="text-black font-medium">
            {modelOptions.find(m => m.value === selectedModel)?.label}
          </span></p>
        </div>
      </GlassCard>

      {/* Safety & Controls */}
      <GlassCard className="p-6 space-y-6" hover>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <h2 className="font-clash font-semibold text-lg text-black">
            Safety & Settings
          </h2>
        </div>

        <div className="space-y-4">
          <Toggle
            checked={safetyMode}
            onChange={setSafetyMode}
            label="Safety Mode"
          />
          
          <Toggle
            checked={autoGenerate}
            onChange={setAutoGenerate}
            label="Auto Generate"
          />
          
          <div className="text-black/60 text-xs font-clash">
            Safety mode filters content for compliance. Auto generate creates videos immediately after script generation.
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <GlassCard className="p-6 space-y-4" hover>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-xl">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <h2 className="font-clash font-semibold text-lg text-black">
            Quick Actions
          </h2>
        </div>

        <div className="grid gap-3">
          <Button variant="secondary" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2 text-black" />
            Open Settings
          </Button>
          
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <BarChart className="w-4 h-4 mr-2 text-black" />
            View Analytics
          </Button>
        </div>
      </GlassCard>

      {/* Usage Stats */}
      <GlassCard className="p-6 space-y-4" hover>
        <h3 className="font-clash font-semibold text-black">Usage Today</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-black/70 text-sm font-clash">Videos Generated</span>
            <span className="text-black font-clash font-medium">12/50</span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-1/4"></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-black/70 text-sm font-clash">Processing Time</span>
            <span className="text-black font-clash font-medium">45m</span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-accent h-2 rounded-full w-3/5"></div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};