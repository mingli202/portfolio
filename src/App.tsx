import Me from "./components/Me";
import SectionBreakLine from "./components/SectionBreakLine";

function App() {
  return (
    <div className="flex w-[min(85%,45rem)] flex-col overflow-hidden py-16 text-xl">
      <Me />
      <SectionBreakLine sectionName="Experience" />
    </div>
  );
}

export default App;
