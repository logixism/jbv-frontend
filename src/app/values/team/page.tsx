import VTCard from "./vt-card";

type Lists = {
  [discordId: string]: {
    info: {
      title: string;
      icon: string;
      banner: string;
      customUrl: string;
      description: string;
    };
    stats: {
      favorites: number;
      updated: string;
      views: number;
    };
  };
};

export default async function Page() {
  const lists: Lists = await (
    await fetch("https://jbvalues.com/api/lists")
  ).json();

  // TODO: validate this on the back-end instead
  for (const [discordId, { info }] of Object.entries(lists)) {
    const validIconUrl = new RegExp(
      /^(https?:\/\/(?:[\da-z\.-]+)\.(?:[a-z\.]{2,6})(?:\/\S*)?|\/(?:[\w-]+\/)*[\w-]+\.\w+)$/
    ).test(info.icon);

    if (!validIconUrl) {
      console.warn("invalid icon url", info.icon);
      lists[discordId].info.icon = "/logo.webp";
    }
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-center -mt-6 mb-6">Value List Team</h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(36rem,1fr))]">
        {Object.values(lists).map(({ info, stats }) => (
          <VTCard
          key={info.customUrl}
          title={info.title}
          icon={info.icon}
          url={`/values/team/${info.customUrl}`}
          description={info.description}
          banner={info.banner}
          favorites={stats.favorites}
          views={stats.views}
          updated={stats.updated}
          />
        ))}
      </div>
    </div>
  );
}
