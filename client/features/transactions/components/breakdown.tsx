import { Container } from "@/shared/ui";
import { PropsWithChildren } from "react";

type BreakdownProps = PropsWithChildren;

export const Breakdown = ({ children }: BreakdownProps) => {
  return (
    <section className="pb-8">
      <Container>
        <div className="flex gap-5">{children}</div>
      </Container>
    </section>
  );
};
