import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-primary/95 shadow text-primary-content backdrop-blur supports-backdrop-filter:bg-primary/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-left">
          Built on top of{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/salimi-my/shadcn-ui-sidebar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
