'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

import reactLogo from '@/public/react.png';
import viteLogo from '@/public/vite.png';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

const techStacks = ['Next.js', 'React', 'Vite'] as const;
const addons = [
  'TypeScript',
  'TailwindCSS',
  'Zustand',
  'Supabase',
  'Firebase',
] as const;

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState('');
  const [baseStack, setBaseStack] = useState('Next.js');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddonChange = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon)
        ? prev.filter((item) => item !== addon)
        : [...prev, addon]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const { data, error } = await supabase.from('Projects').insert([
      {
        name: projectName,
        stack: baseStack,
        addons: selectedAddons,
        status: 'in-progress',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Insert failed:', error.message);
      // show user error
      toast({
        title: 'Insert failed ❌',
        description: error.message || 'Something went wrong.',
        variant: 'destructive',
      });
    } else {
      console.log('Insert successful:', data);
      // show success, redirect, etc.
      toast({
        title: 'Project Created 🎉',
        description: 'Your project was added successfully.',
      });

      setProjectName('');
      setBaseStack('Next.js');
      setSelectedAddons([]);
    }

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="w-full space-y-2 animate-fade-in mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Project
          </h1>
          <p className="text-sm text-gray-500">
            Pick your tech stack and generate a ready-to-go project instantly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Card */}
          <Card className="flex-1 shadow-lg transition-all duration-300 hover:shadow-xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Project Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-gray-700">
                    Project Name
                  </Label>
                  <Input
                    id="project-name"
                    placeholder="my-awesome-app"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700 block">
                    Choose Tech Stack
                  </Label>
                  <RadioGroup
                    value={baseStack}
                    onValueChange={setBaseStack}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2"
                  >
                    {techStacks.map((stack) => (
                      <div key={stack}>
                        <RadioGroupItem
                          value={stack}
                          id={stack}
                          className="peer hidden"
                        />
                        <Label
                          htmlFor={stack}
                          className={`flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 cursor-pointer transition-all peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-indigo-200`}
                        >
                          <span className="text-sm font-medium text-gray-900">
                            {stack}
                          </span>
                          <div className="mt-2 h-8 w-8">
                            {stack === 'Next.js' && (
                              <svg
                                viewBox="0 0 128 128"
                                className="h-full w-full"
                              >
                                <path
                                  d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            )}
                            {stack === 'React' && (
                              <Image
                                src={reactLogo}
                                width={50}
                                height={50}
                                alt="React logo"
                              />
                            )}
                            {stack === 'Vite' && (
                              <Image
                                src={viteLogo}
                                width={50}
                                height={50}
                                alt="Vite logo"
                              />
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-700 block">Add-ons</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-1">
                    {addons.map((addon) => (
                      <div key={addon} className="flex items-center space-x-2">
                        <Checkbox
                          id={addon}
                          checked={selectedAddons.includes(addon)}
                          onCheckedChange={() => handleAddonChange(addon)}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label
                          htmlFor={addon}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {addon}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || !projectName.trim()}
                  className={`max-w-2xl  py-6 text-lg font-medium transition-all ${
                    isGenerating ? 'bg-[#555]' : 'bg-[#333] hover:bg-[#222]'
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>🔨</span>
                      <span>Generate Project</span>
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview Card - Updated to be more visually appealing */}
          <div className="lg:w-96 animate-fade-in-up delay-100">
            <Card className="h-full shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Project Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Project Name
                      </h3>
                      <p className="text-lg  text-gray-900">
                        {projectName || (
                          <span className="text-sm text-gray-500">
                            Unnamed project
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Base Stack
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6">
                          {baseStack === 'Next.js' && (
                            <svg
                              viewBox="0 0 128 128"
                              className="h-full w-full"
                            >
                              <path
                                d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
                                fill="#000000"
                              ></path>
                            </svg>
                          )}
                          {baseStack === 'React' && (
                            <Image
                              src={reactLogo}
                              width={50}
                              height={50}
                              alt="React logo"
                            />
                          )}
                          {baseStack === 'Vite' && (
                            <Image
                              src={viteLogo}
                              width={50}
                              height={50}
                              alt="Vite logo"
                            />
                          )}
                        </div>
                        <p className="text-lg font-semibold text-gray-900">
                          {baseStack}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Add-ons
                      </h3>
                      {selectedAddons.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedAddons.map((addon) => (
                            <span
                              key={addon}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              {addon}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">
                          No add-ons selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {projectName && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Ready to generate:
                    </h4>
                    <div className="font-mono text-sm bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto">
                      <span className="text-green-400">$</span> npx create-
                      {baseStack.toLowerCase()}-app {projectName}
                      {selectedAddons.includes('TypeScript') && ' --typescript'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
