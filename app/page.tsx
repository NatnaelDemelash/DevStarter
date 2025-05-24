import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>To create a new project, click the button below</p>
      <Link href="/new">To Create a new project</Link>
    </div>
  );
}
