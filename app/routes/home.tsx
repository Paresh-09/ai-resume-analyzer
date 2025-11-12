import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {useLocation, useNavigate} from "react-router";
import {usePuterStore} from "../../lib/puter";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMate" },
    { name: "description", content: "Intelligent resume feedback that gets you hired" },
  ];
}

export default function Home() {
    const {isLoading,auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate()
    ;
    if(auth.isAuthenticated) navigate(next);
    useEffect(() => {

    }, [auth.isAuthenticated,next]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      <section className="main-section">
            <div className="page-heading py-16">
                <h1>Track Your Application & Resume Heading</h1>
                <h2>Review your submissions and check AI-powered feedbacks</h2>
            </div>

      {
          resumes.length > 0 && (
              <div className="resumes-section">
                  {
                      resumes.map((resume, index) => (
                          <ResumeCard key={resume.id} resume={resume} />
                      ))
                  }
              </div>
          )
      }
      </section>
  </main>;
}
