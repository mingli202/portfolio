type Props = {
  sectionName: string;
};

export default function SectionBreakLine({ sectionName }: Props) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="bg-primary h-0.5 w-full rounded-full" />
      <h2 className="text-primary font-thin">{sectionName}</h2>
      <div className="bg-primary h-0.5 w-full rounded-full" />
    </div>
  );
}
