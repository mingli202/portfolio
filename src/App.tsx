import Me from "./components/Me";
import SectionBreakLine from "./components/SectionBreakLine";

function App() {
  return (
    <div className="flex w-[min(85%,45rem)] flex-col overflow-hidden py-16 text-xl">
      <Me />
      <SectionBreakLine sectionName="Experience" />
      <SectionBreakLine sectionName="Education" />
      <SectionBreakLine sectionName="Projects" />
      <SectionBreakLine sectionName="Contact" />
    </div>
  );
}

export default App;
