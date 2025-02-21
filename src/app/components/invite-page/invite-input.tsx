"use client";

import { useInvitePageController } from "@/hooks/invite-page-controller";
import { Copy, Link } from "lucide-react";
import { ButtonIcon } from "../common/buttonIcon";
import { InputField, InputIcon, InputRoot } from "../common/input";

export function InviteInputLink() {
  const { handleCopyLink } = useInvitePageController();

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>
      <InputField readOnly defaultValue={"https://localhost:300/invite/123"} />

      <ButtonIcon className="-mr-2" onClick={handleCopyLink}>
        <Copy className="size-5" />
      </ButtonIcon>
    </InputRoot>
  );
}
