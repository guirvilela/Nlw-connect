"use client";

import { Copy, Link } from "lucide-react";
import React from "react";
import { ButtonIcon } from "../common/buttonIcon";
import { InputField, InputIcon, InputRoot } from "../common/input";

interface InviteInputLinkProps {
  link: string;
}

export function InviteInputLink({ link }: InviteInputLinkProps) {
  const handleCopyLink = React.useCallback(() => {
    navigator.clipboard.writeText(link);
  }, []);

  return (
    <InputRoot>
      <InputIcon>
        <Link className="size-5" />
      </InputIcon>
      <InputField readOnly defaultValue={link} />

      <ButtonIcon className="-mr-2" onClick={handleCopyLink}>
        <Copy className="size-5" />
      </ButtonIcon>
    </InputRoot>
  );
}
