'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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

  const handleGenerate = () => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            🚀 New Project Wizard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Pick your tech stack and generate a ready-to-go project instantly.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input
              placeholder="my-awesome-app"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Choose Tech Stack</Label>
            <RadioGroup
              value={baseStack}
              onValueChange={setBaseStack}
              className="flex gap-4"
            >
              {techStacks.map((stack) => (
                <div key={stack} className="flex items-center space-x-2">
                  <RadioGroupItem value={stack} id={stack} />
                  <Label htmlFor={stack}>{stack}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Add-ons</Label>
            {/* Adds on checkboxes */}
            {addons.map((addon) => (
              <div key={addon} className="flex items-center space-x-2">
                <Checkbox id={addon} />
                <Label htmlFor={addon}>{addon}</Label>
              </div>
            ))}
          </div>

          <Button onClick={handleGenerate} className="w-full mt-4 text-lg">
            🔨 Generate Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
