'use client';

import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import Header from "./Header";

export default function HomePage() {
  return (
    <main>
      <Header />
      <GoalForm />
      <GoalList />
    </main>
  );
}
