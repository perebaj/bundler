import Link from "next/link";
import { MailIcon, TwitterIcon } from "@/components/icons";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <p className="text-lg font-medium text-muted-foreground">
          Made with love by the Ivy League engineers
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-primary-foreground">
          Contact us
        </h1>
        <div className="mt-4 flex justify-center space-x-4">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            <MailIcon className="mr-2 h-5 w-5" />
            perebaj@gmail.com
          </Link>
          <Link
            href="https://twitter.com/jj_neno"
            className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            <TwitterIcon className="mr-2 h-5 w-5" />
            Twitter
          </Link>
        </div>
      </div>
    </div>
  );
}
