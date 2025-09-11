import ExperienceList from "./components/ExperienceList";
import Me from "./components/Me";
import Projects from "./components/Projects";
import SectionBreakLine from "./components/SectionBreakLine";
import type { ExperienceListItem } from "./types";

function App() {
  const workExperience: ExperienceListItem[] = [
    {
      title: "C#/Web Developer Intern",
      subtitle: "Genetec Inc.",
      description:
        "Genetec is a leading provider of software solutions for the biotech industry. I worked as a C#/Web Developer Intern at Genetec, where I was responsible for developing and maintaining the company's website and backend services.",
      startDate: "May 2025",
      endDate: "Aug 2025",
      location: "Montreal, Canada",
      skills: [],
      additionalInfo: [
        "I was responsible for developing and maintaining the company's website and backend services.",
        "I worked on various projects, including the development of a new website design and the implementation of new features for the existing website.",
        "I also assisted with the maintenance of the company's backend services, including the development of new APIs and the optimization of existing code.",
        "Throughout my internship, I gained valuable experience in web development, C#, and database management.",
      ],
      imageUrl: "genetec_logo.jpg",
    },
  ];

  const schoolExperience: ExperienceListItem[] = [
    {
      title: "B. Eng, Software Engineering Co-op",
      subtitle: "McGill University",
      description: "GPA: 3.94/4.0",
      startDate: "Aug 2024",
      endDate: "May 2028",
      location: "Montreal, Canada",
      skills: [],
      additionalInfo: [
        "I studied computer science at McGill University and gained a strong foundation in programming and computer science concepts.",
        "I was able to apply my knowledge of programming and computer science to various projects, including the development of a new website design and the implementation of new features for the existing website.",
        "I also gained practical experience in software development, C#, and database management.",
      ],
      imageUrl: "mcgill_logo.jpg",
    },
  ];

  return (
    <div className="flex w-[min(90%,45rem)] flex-col overflow-hidden text-base font-normal md:text-xl">
      <Me />
      <SectionBreakLine sectionName="Work" />
      <ExperienceList items={workExperience} />
      <SectionBreakLine sectionName="Education" />
      <ExperienceList items={schoolExperience} />
      <SectionBreakLine sectionName="Projects" />
      <Projects />
    </div>
  );
}

export default App;
