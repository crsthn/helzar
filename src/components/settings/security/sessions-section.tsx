import LogOutDialog from "@/components/settings/security/logout-dialog";
import RevokeDialog from "@/components/settings/security/revoke-dialog";
import RevokeOtherDialog from "@/components/settings/security/revoke-other-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Laptop, Smartphone } from "lucide-react";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export default async function SessionsSection() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!currentSession) {
    return null;
  }

  const otherSessions = sessions.filter(
    (session) => session.id !== currentSession.session.id && session.userAgent
  );

  return (
    <>
      {currentSession.session.userAgent && (
        <Card className="flex items-center justify-between gap-3 p-6">
          <div className="flex items-center gap-3">
            <Badge className="size-10 rounded-lg p-0" color="secondary">
              {new UAParser(currentSession.session.userAgent || "").getDevice()
                .type === "mobile" ? (
                <Smartphone size={16} />
              ) : (
                <Laptop size={16} />
              )}
            </Badge>
            <div className="flex flex-col font-medium">
              {
                new UAParser(currentSession.session.userAgent || "").getOS()
                  .name
              }
              ,{" "}
              {
                new UAParser(
                  currentSession.session.userAgent || ""
                ).getBrowser().name
              }
              <p className="font-normal text-text-2">Current session</p>
            </div>
          </div>
          <LogOutDialog />
        </Card>
      )}

      {otherSessions.length > 0 && (
        <Card className="flex flex-col">
          <div className="flex items-center justify-between gap-3 p-6">
            {otherSessions.length} other{" "}
            {otherSessions.length > 1 ? "sessions" : "session"}
            <RevokeOtherDialog />
          </div>

          {otherSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-3 border-t p-6"
            >
              <div className="flex items-center gap-3 font-medium">
                <Badge className="size-10 rounded-lg p-0" color="secondary">
                  {new UAParser(session.userAgent || "").getDevice().type ===
                  "mobile" ? (
                    <Smartphone size={16} />
                  ) : (
                    <Laptop size={16} />
                  )}
                </Badge>
                {new UAParser(session.userAgent || "").getOS().name},{" "}
                {new UAParser(session.userAgent || "").getBrowser().name}
              </div>
              <RevokeDialog session={session} />
            </div>
          ))}
        </Card>
      )}
    </>
  );
}
