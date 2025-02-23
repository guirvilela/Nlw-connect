import { MedalCard } from "@/app/components/invite-page/card-medal";
import { CardPoint } from "@/app/components/invite-page/card-points";
import { InviteInputLink } from "@/app/components/invite-page/invite-input";
import { useInvitePageController } from "@/hooks/invite-page-controller";
import { BadgeCheck, Medal, MousePointerClick } from "lucide-react";
import Image from "next/image";
import Logo from "../../../assets/logo.svg";

interface InvitePageProps {
  params: Promise<{
    subscriptionId: string;
  }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { subscriptionId } = await params;
  const { clicks, inviteLink, rankingPosition, sortedRanking, subscriptions } =
    await useInvitePageController({ subscriptionId });

  return (
    <div className="min-h-dvh flex items-center justify-between gap-16 flex-col md:flex-row">
      <div className="flex flex-col gap-10 w-full max-w-[550px]">
        <Image
          src={Logo}
          alt="devStage"
          width={108.5}
          height={30}
          quality={100}
        />

        <div className="space-y-2">
          <h1 className="text-4xl font-semibold font-heading text-gray-100 leading-none">
            Inscrição confirmada!
          </h1>
          <p className="text-gray-300">
            Para entrar no evento, acesse o link enviado para o seu e-mail
          </p>
        </div>

        <div className="space-y-6 ">
          <div className="space-y-3">
            <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
              Indique e ganhe
            </h2>
            <p className="text-gray-300">
              Convide mais pessoas para o evento e concorra a prêmios
              exclusivos! <br /> É só compartilhar o link abaixo e acompanhar as
              incrições:
            </p>
          </div>

          <InviteInputLink link={inviteLink} />

          <div className="grid gap-3 md:grid-cols-3">
            <CardPoint
              text="Acessos ao link"
              value={Number(clicks.count)}
              icon={MousePointerClick}
            />
            <CardPoint
              text="Inscrições feitas"
              value={Number(subscriptions.count)}
              icon={BadgeCheck}
            />
            <CardPoint
              text="Posição no ranking"
              value={Number(rankingPosition.position)}
              icon={Medal}
              position
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[440px] space-y-5">
        <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
          Ranking de indicações
        </h2>

        <div className="space-y-4">
          {sortedRanking.map((rank, index) => {
            let medal: "gold" | "silver" | "cooper" = "cooper";
            if (index === 0) medal = "gold";
            if (index === 1) medal = "silver";
            if (index === 2) medal = "cooper";

            return (
              <MedalCard
                key={rank.id}
                name={rank.name}
                value={rank.score}
                medal={medal}
                position={index + 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
