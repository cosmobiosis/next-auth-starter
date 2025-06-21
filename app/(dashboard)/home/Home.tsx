"use client"

import React, { useState } from 'react';
import { PromptInput } from '@/components/panel/PromptInput';
import { ScriptCard, Script } from '@/components/panel/ScriptCard';
import { GlobalControls } from '@/components/panel/GlobalControl';
import { ToastProvider, useToast } from '@/components/hooks/use-toast';
import { useTabStorage, useLocalStorage } from '@/components/hooks/use-local-storage';
import { cn } from '@/lib/utils';

const AppContent: React.FC = () => {
  const { showToast } = useToast();
  const { tabs, setActiveTab } = useTabStorage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scripts, setScripts] = useLocalStorage<Script[]>('videogen-scripts', []);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    
    // Create new script entry
    const newScript: Script = {
      id: `script-${Date.now()}`,
      prompt,
      content: `// Generated script for: "${prompt}"\n\nScene 1: Opening shot\n- ${prompt}\n- Duration: 5 seconds\n- Camera: Wide establishing shot\n\nScene 2: Main content\n- Focus on key elements from prompt\n- Duration: 20 seconds\n- Camera: Dynamic movement\n\nScene 3: Closing\n- Smooth transition to end\n- Duration: 5 seconds\n- Camera: Pull back to wide shot`,
      status: 'generating',
      timestamp: new Date()
    };
    
    setScripts(prev => [newScript, ...prev]);
    
    // Simulate script generation
    setTimeout(() => {
      setScripts(prev => prev.map(script => 
        script.id === newScript.id 
          ? { ...script, status: 'completed' as const }
          : script
      ));
      setIsGenerating(false);
      showToast({
        type: 'success',
        title: 'Script Generated',
        message: 'Your video script is ready for review.'
      });
    }, 3000);
  };

  const handleEditScript = (id: string, newContent: string) => {
    setScripts(prev => prev.map(script =>
      script.id === id ? { ...script, content: newContent } : script
    ));
    showToast({
      type: 'success',
      title: 'Script Updated',
      message: 'Your changes have been saved.'
    });
  };

  const handleDeleteScript = (id: string) => {
    setScripts(prev => prev.filter(script => script.id !== id));
    showToast({
      type: 'info',
      title: 'Script Deleted',
      message: 'The script has been removed.'
    });
  };

  const handleCopyScript = (content: string) => {
    navigator.clipboard.writeText(content);
    showToast({
      type: 'success',
      title: 'Copied to Clipboard',
      message: 'Script content copied successfully.'
    });
  };

  const handleSafetyCheck = (id: string) => {
    showToast({
      type: 'success',
      title: 'Safety Check Complete',
      message: 'Content passed all safety checks.'
    });
  };

  const handleGenerateVideo = (id: string) => {
    setScripts(prev => prev.map(script =>
      script.id === id ? { ...script, status: 'generating' as const } : script
    ));

    // Simulate video generation
    setTimeout(() => {
      setScripts(prev => prev.map(script =>
        script.id === id ? {
          ...script,
          status: 'completed' as const,
          videoUrl: '/api/placeholder/640/360'
        } : script
      ));
      showToast({
        type: 'success',
        title: 'Video Generated',
        message: 'Your video is ready to view!'
      });
    }, 5000);
  };

  return (
    <div>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        {/* <Header
          tabs={tabs}
          onTabChange={setActiveTab}
          onSidebarToggle={() => setIsSidebarOpen(true)}
        /> */}

        {/* Main Layout */}
        <div className="flex">
          {/* Main Content */}
          <main className="flex-1 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Left Column - Prompt & Scripts */}
              <div className="lg:col-span-2 space-y-6">
                <PromptInput
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />

                {/* Scripts List */}
                <div className="space-y-4">
                  {scripts.length > 0 && (
                    <h2 className="font-clash font-semibold text-xl text-white px-2">
                      Generated Scripts
                    </h2>
                  )}
                  {scripts.map((script) => (
                    <ScriptCard
                      key={script.id}
                      script={script}
                      onEdit={handleEditScript}
                      onDelete={handleDeleteScript}
                      onCopy={handleCopyScript}
                      onSafetyCheck={handleSafetyCheck}
                      onGenerateVideo={handleGenerateVideo}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Global Controls */}
              <div className="hidden lg:block">
                <GlobalControls />
              </div>
            </div>
          </main>

          {/* Sidebar */}
          {/* <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};