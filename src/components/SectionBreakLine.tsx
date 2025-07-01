type Props = {
  sectionName: string;
};

export default function SectionBreakLine({ sectionName }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 text-base">
      <div className="bg-primary h-0.5 w-full" />
      <h2 className="text-primary">{sectionName}</h2>
      <div className="bg-primary h-0.5 w-full" />
    </div>
  );
}
