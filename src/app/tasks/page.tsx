import TaskList from "@/components/TaskList";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function TasksPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-950">
              Task Manager
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Manage your tasks with our AI-powered task management system
            </p>
          </div>
          
          <TaskList />
        </div>
      </main>
      <Footer />
    </>
  );
}