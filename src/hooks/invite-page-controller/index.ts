import React from "react";

export function useInvitePageController() {
  const inviteLink = "https://invite-devstage.com/123124124";

  const handleCopyLink = React.useCallback(() => {
    navigator.clipboard.writeText(inviteLink);
  }, []);

  return { handleCopyLink };
}
