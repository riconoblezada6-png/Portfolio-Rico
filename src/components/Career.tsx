import "./styles/Career.css";

type Project = {
  title: string;
  tag: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Digital Game Store Platform",
    tag: "",
    description:
      "A responsive web platform built for gamers to easily discover and explore various games to play. This project focuses on delivering a smooth user experience by integrating clean layouts and an optimized search functionality for seamless catalog exploration..",
    image: "/images/projects/project1.jpg",
    link: "https://gamelibrary.infinityfreeapp.com/",
  },
  {
    title: "QR-Based Attendance System ",
    tag: "",
    description:
      "A modern web application that streamlines classroom monitoring through digital session tracking and instant QR code check-ins. This project enhances student accountability by integrating an automated email alert system that triggers notifications to parents or guardians in real-time when a student is recorded absent..",
    image: "/images/projects/project2.jpg",
    link: "http://pumasokkalangpasadokana.xo.je/"
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div className="project-card blur-reveal" key={index}>
              <div className="project-card-image">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="project-card-body">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <span className="project-tag">{project.tag}</span>
                <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="project-view-btn">View Project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
