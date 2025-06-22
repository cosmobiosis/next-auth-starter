import { Copy, Trash2, Play, Shield, CreditCard, CheckCircle } from "lucide-react";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { Button } from './Button';


export interface Script {
  id: string;
  prompt: string;
  content: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  timestamp: Date;
  videoUrl?: string;
}

interface ScriptCardProps {
  script: Script;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
  onSafetyCheck: (id: string) => void;
  onGenerateVideo: (id: string) => void;
  className?: string;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({
  script,
  onEdit,
  onDelete,
  onCopy,
  onSafetyCheck,
  onGenerateVideo,
  className
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(script.content);

  const handleSave = () => {
    onEdit(script.id, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(script.content);
    setIsEditing(false);
  };

  const statusColors = {
    pending: 'text-yellow-400 border-yellow-400/30',
    generating: 'text-blue-400 border-blue-400/30',
    completed: 'text-green-400 border-green-400/30',
    error: 'text-red-400 border-red-400/30'
  };

  const statusLabels = {
    pending: 'Pending',
    generating: 'Generating...',
    completed: 'Completed',
    error: 'Error'
  };

  return (
    <GlassCard className={cn('p-6 space-y-4', className)} hover>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className={cn(
                'inline-flex px-2 py-1 rounded-full text-xs font-clash font-medium border',
                statusColors[script.status]
              )}
            >
              {statusLabels[script.status]}
            </span>
            <span className="text-black/60 text-xs font-clash">
              {script.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <p className="text-black/80 text-sm font-clash line-clamp-2">
            {script.prompt}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCopy(script.content)}
            title="Copy content"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(script.id)}
            title="Delete script"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={6}
              className={cn(
                'w-full px-4 py-3 font-mono text-sm',
                'bg-black/20 border border-white/20 rounded-lg',
                'text-black placeholder-black/60',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'resize-none'
              )}
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <pre className={cn(
              'whitespace-pre-wrap font-mono text-sm text-black/90',
              'bg-black/20 border border-white/20 rounded-lg p-4',
              'max-h-48 overflow-y-auto'
            )}>
              {script.content}
            </pre>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Edit
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSafetyCheck(script.id)}
                disabled={script.status === 'generating'}
              >
                <Shield className="w-4 h-4 mr-2" />
                Safety Check
              </Button>
              
              <Button
                size="sm"
                onClick={() => onGenerateVideo(script.id)}
                disabled={script.status === 'generating'}
                loading={script.status === 'generating'}
              >
                <Play className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Video Preview */}
      {script.videoUrl && script.status === 'completed' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="font-clash font-medium text-green-400 text-sm">
              Video Generated
            </span>
          </div>
          <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
            <video
              src={script.videoUrl}
              controls
              className="w-full h-full object-cover"
              poster="/api/placeholder/640/360"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </GlassCard>
  );
};