const projects = [
  { id: 1, title: "Food Blog", 
    description: "A simple food blog built with HTML, CSS, and Bootstrap.", 
    tags: ["HTML", "CSS", "Bootstrap"], 
    link: "https://20254844-dotcom.github.io/Finals-Exam/" 
  },
  { id: 2, 
    title: "User Registration Form", 
    description: "A simple user registration form built with HTML and CSS.", 
    tags: ["HTML", "CSS"], link: "https://20254844-dotcom.github.io/MID-Lab-4/" 
  },
  { id: 3, 
    title: "My Gaming Adventures", 
    description: "A gaming blog where I share my gaming experiences!", 
    tags: ["HTML", "CSS"], 
    link: "https://20254844-dotcom.github.io/MID-Lab-3/" 
  },
  { id: 4, 
    title: "My Resume", 
    description: "My first ever React project!", 
    tags: ["React"], 
    link: "https://20254844-dotcom.github.io/UNIT1-LESSON1-A-OLO-AN/" 
  },
  { id: 5, 
    title: "Student Information System", 
    description: "A student information system using prompts. Simple but fun to work on.", 
    tags: ["JavaScript"], 
    link: "https://20254844-dotcom.github.io/FG_LAB3_OLO-AN/" 
  },
  { id: 6, 
    title: "Basic Information", 
    description: "A simple project where we applied React Fragments to avoid unnecessary divs.", 
    tags: ["React"], 
    link: "https://20254844-dotcom.github.io/FG_LAB2_Olo-an/" 
  },
  { id: 7, 
    title: "University Event Registration Dashboard", 
    description: "A university event registration dashboard using prompts.", 
    tags: ["React"], 
    link: "https://20254844-dotcom.github.io/MG_LAB4_Olo-an/" 
  },
  { id: 8, 
    title: "Controlled & Uncontrolled Forms", 
    description: "Demonstrates the difference between controlled and uncontrolled form submission in React.", 
    tags: ["React"], 
    link: "https://20254844-dotcom.github.io/MG_LAB3_Olo-an/" 
  },
  { id: 9, 
    title: "Course Feedback System", 
    description: "A course feedback system where students can submit feedback. My first backend project!", 
    tags: ["React", "Node.js", "MongoDB"], 
    link: "https://20254844-dotcom.github.io/MG_LAB3_Olo-an/" 
  },
];

function Projects() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-2">Projects</h1>
      <p className="text-gray-400 mb-10">Things I've built while learning.</p>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition group"
          >
            <h2 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition">
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;