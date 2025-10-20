
import { getUser } from "@/lib/better-auth";
import { redirect } from "next/navigation";
import { getUserWatchlist } from "@/lib/actions/watch-list-action";
import Watchlist from "./_components/watchlist";

const WatchListPage = async () => {
  const { user } = await getUser();
  if (!user) redirect("/sign-in");
  const watchlist = await getUserWatchlist(user.id);
  return (
    <section className="max-w-7xl mx-auto py-5">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      <Watchlist watchlist={JSON.stringify(watchlist)} />
    </section>
  );
};
export default WatchListPage;
