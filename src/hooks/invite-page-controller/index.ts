import {
  getRanking,
  getSubscriberInviteClicks,
  getSubscriberInviteCount,
  getSubscriberRankingPosition,
} from "@/http/api-fake";

interface InvitePageControllerProps {
  subscriptionId: string;
}

export async function useInvitePageController({
  subscriptionId,
}: InvitePageControllerProps) {
  const { ranking } = getRanking();
  const subscriptions = getSubscriberInviteCount(subscriptionId);
  const clicks = getSubscriberInviteClicks(subscriptionId);
  const rankingPosition = getSubscriberRankingPosition(subscriptionId);
  const inviteLink = `https://invite-devstage.com/invite/${subscriptionId}`;

  const sortedRanking = [...ranking].sort((a, b) => b.score - a.score);

  return {
    sortedRanking,
    subscriptions,
    clicks,
    rankingPosition,
    inviteLink,
  };
}
