import ChangeCard from "./change-card";

export type Change = {
  date: string;
  id: string;
  reviewerReason: string;
  status: string;
  value: number;
  username: string;
  userImage: string;
  userId: string;
  time: string;
  submissionid: string;
  listName: string;
  listImage: string;
  itemName: string;
  itemImage: string;
  impact: number;
};

export type Changes = Array<Change>;

export default async function Page() {
  const changes: Changes = await (
    await fetch("https://jbvalues.com/api/recentsubmissions/100")
  ).json();

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
      {changes.map((change) => (
        <ChangeCard key={change.submissionid} change={change} />
      ))}
    </div>
  );
}
