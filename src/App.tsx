import "./index.css";
import ExperienceList from "./components/ExperienceList";
import Me from "./components/Me";
import Projects from "./components/Projects";
import SectionBreakLine from "./components/SectionBreakLine";
import { projects, schoolExperience, workExperience } from "./data";

function App() {
  return (
    <div className="flex w-[min(90%,45rem)] flex-col text-base font-normal md:text-xl">
      <Me />
      <SectionBreakLine sectionName={`Work (${workExperience.length})`} />
      <ExperienceList items={workExperience} />
      <SectionBreakLine
        sectionName={`Education (${schoolExperience.length})`}
      />
      <ExperienceList items={schoolExperience} />
      <SectionBreakLine sectionName={`Projects (${projects.length})`} />
      <Projects />
    </div>
  );
}

export default App;
