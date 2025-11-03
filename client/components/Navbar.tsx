import Link from "next/link";

const Navbar = () => {
  return (
    <div className="p h-16 flex flex-row items-center justify-between bg-secondary text-secondary-content">
      <div className="">
        <h1 className="text-xl font-bold">Workshop Order</h1>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Link href="/auth/sign-up" className="btn btn-primary rounded-full">
          Sign Up
        </Link>
        <Link
          href="/auth/sign-in"
          className="btn btn-neutral btn-outline rounded-full"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
