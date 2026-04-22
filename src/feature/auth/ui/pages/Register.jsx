import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  getAuthSession,
  saveAuthSession,
  saveRegisteredUser,
} from "../../../../utils/authStorage";
const authOptions = [
  {
    label: "Sign up with phone number",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="7" y="2.75" width="10" height="18.5" rx="2.25" />
        <circle cx="12" cy="17.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Sign up with Google",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="#EA4335"
          d="M12.24 10.285v3.821h5.445c-.22 1.233-.937 2.278-2.016 2.98l3.26 2.53c1.9-1.75 2.99-4.327 2.99-7.396 0-.71-.063-1.393-.18-2.056z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.964-.894 6.619-2.414l-3.26-2.53c-.905.607-2.062.967-3.359.967-2.582 0-4.769-1.744-5.55-4.088H3.08v2.57A9.996 9.996 0 0 0 12 22"
        />
        <path
          fill="#4A90E2"
          d="M6.45 13.935A5.996 5.996 0 0 1 6.14 12c0-.672.116-1.323.31-1.935V7.495H3.08A9.997 9.997 0 0 0 2 12c0 1.61.386 3.13 1.08 4.505z"
        />
        <path
          fill="#FBBC05"
          d="M12 5.977c1.468 0 2.786.505 3.822 1.498l2.868-2.868C16.959 2.99 14.695 2 12 2A9.996 9.996 0 0 0 3.08 7.495l3.37 2.57C7.231 7.72 9.418 5.977 12 5.977"
        />
      </svg>
    ),
  },
  {
    label: "Sign up with Apple",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M15.11 5.236c.784-.95 1.314-2.274 1.17-3.586-1.128.045-2.49.75-3.302 1.7-.724.83-1.36 2.17-1.186 3.45 1.259.097 2.534-.64 3.318-1.564Z" />
        <path d="M19.173 12.334c.028-2.426 1.985-3.59 2.074-3.644-1.133-1.655-2.9-1.882-3.527-1.91-1.5-.152-2.928.883-3.69.883-.761 0-1.937-.861-3.184-.839-1.637.024-3.145.952-3.986 2.413-1.7 2.947-.434 7.304 1.222 9.693.81 1.168 1.777 2.478 3.046 2.432 1.221-.048 1.68-.79 3.154-.79 1.474 0 1.886.79 3.177.762 1.315-.021 2.146-1.19 2.95-2.363.928-1.356 1.31-2.67 1.333-2.737-.028-.01-2.548-.978-2.569-3.9Z" />
      </svg>
    ),
  },
];

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  React.useEffect(() => {
    if (getAuthSession()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const onSubmit = (values) => {
    // Store the registered account so login can verify it later.
    saveRegisteredUser(values);
    saveAuthSession({
      name: values.name,
      email: values.email,
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col">
        <div className="h-2 w-full bg-gradient-to-r from-[#5f3f5a] via-[#4a3f57] to-[#403749]" />

        <section className="flex flex-1 items-start justify-center px-6 pb-12 pt-10 sm:px-8 sm:pt-14">
          <div className="w-full max-w-[734px] rounded-[28px] bg-[#121212]">
            <div className="mx-auto flex w-full max-w-[324px] flex-col items-center">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                >
                  <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Zm4.817 15.13a.653.653 0 0 1-.9.216c-2.462-1.503-5.56-1.844-9.207-1.013a.655.655 0 0 1-.291-1.277c4.001-.913 7.432-.526 10.18 1.153.31.189.408.592.218.92Zm1.286-2.863a.818.818 0 0 1-1.124.27c-2.818-1.73-7.114-2.23-10.447-1.216a.818.818 0 1 1-.476-1.565c3.809-1.157 8.545-.594 11.78 1.39a.818.818 0 0 1 .267 1.121Zm.11-2.983C14.834 8.777 9.263 8.59 6.037 9.57a.98.98 0 0 1-.568-1.876c3.704-1.123 9.86-.906 13.768 1.415a.98.98 0 1 1-1.003 1.675Z" />
                </svg>
              </div>

              <h1 className="text-center text-[2.55rem] font-black leading-[1.02] tracking-[-0.04em] sm:text-[3.35rem]">
                Sign up to
                <br />
                start listening
              </h1>

              <form
                className="mt-10 w-full space-y-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-white"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className="h-12 w-full rounded-md border border-white/35 bg-transparent px-3.5 text-[15px] text-white outline-none transition placeholder:text-white/55 hover:border-white/55 focus:border-white focus:ring-2 focus:ring-white/20"
                  />
                  {errors.name ? (
                    <p className="text-sm text-[#ff8a8a]">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-white"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@domain.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="h-12 w-full rounded-md border border-white/35 bg-transparent px-3.5 text-[15px] text-white outline-none transition placeholder:text-white/55 hover:border-white/55 focus:border-white focus:ring-2 focus:ring-white/20"
                  />
                  {errors.email ? (
                    <p className="text-sm text-[#ff8a8a]">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold text-white"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="h-12 w-full rounded-md border border-white/35 bg-transparent px-3.5 text-[15px] text-white outline-none transition placeholder:text-white/55 hover:border-white/55 focus:border-white focus:ring-2 focus:ring-white/20"
                  />
                  {errors.password ? (
                    <p className="text-sm text-[#ff8a8a]">
                      {errors.password.message}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-full bg-[#1ed760] text-[16px] font-bold text-black transition hover:scale-[1.02] hover:bg-[#3be477] active:scale-[0.99]"
                >
                  Next
                </button>
              </form>

              <div className="my-5 flex w-full items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[15px] text-white/90">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="w-full space-y-3">
                {authOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    className="flex h-12 w-full items-center rounded-full border border-white/35 bg-transparent px-6 text-left transition hover:border-white/60 hover:bg-white/[0.03]"
                  >
                    <span className="flex w-8 shrink-0 items-center justify-center text-white">
                      {option.icon}
                    </span>
                    <span className="flex-1 pr-8 text-center text-[16px] font-bold tracking-[-0.01em] text-white">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-16 text-center">
                <p className="text-[17px] text-white/70">
                  Already have an account?
                </p>
                <a
                  onClick={() => navigate("/login")}
                  className="mt-3 inline-block text-[18px] font-bold text-white underline decoration-white/55 underline-offset-4 transition hover:text-[#1ed760] cursor-pointer"
                >
                  Log in
                </a>
              </div>

              <p className="mt-16 max-w-[290px] text-center text-[12px] leading-5 text-white/45">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="/"
                  className="underline underline-offset-2 hover:text-white/70"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="underline underline-offset-2 hover:text-white/70"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
