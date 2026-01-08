interface ActivityDescriptionProps {
  description: string;
}

export default function ActivityDescription({
  description,
}: ActivityDescriptionProps) {
  return (
    <section className="border-nomad-black/25 flex flex-col gap-4 border-b">
      <h3 className="text-xl font-bold">체험 설명</h3>

      <p>{description}</p>
    </section>
  );
}
