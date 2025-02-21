import { BadgeCheck, Medal, MousePointerClick } from "lucide-react";
import Image from "next/image";
import Logo from "../../assets/logo.svg";
import { MedalCard } from "../components/invite-page/card-medal";
import { CardPoint } from "../components/invite-page/card-points";
import { InviteInputLink } from "../components/invite-page/invite-input";

export default function InvitePage() {
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

          <InviteInputLink />

          <div className="grid gap-3 md:grid-cols-3">
            <CardPoint
              text="Acessos ao link"
              value={954}
              icon={MousePointerClick}
            />
            <CardPoint text="Inscrições feitas" value={266} icon={BadgeCheck} />
            <CardPoint
              text="Posição no ranking"
              value={3}
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
          <MedalCard
            name="Guilherme Vilela"
            value={1203}
            medal="gold"
            position={1}
          />
          <MedalCard
            name="Júlia Caroline"
            value={410}
            medal="silver"
            position={2}
          />
          <MedalCard
            name="Silvio da silva"
            value={277}
            medal="cooper"
            position={3}
          />
        </div>
      </div>
    </div>
  );
}
