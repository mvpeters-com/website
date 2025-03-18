import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { track } from "@vercel/analytics";

import { motion, AnimatePresence } from "framer-motion";

import { ActionInputError, actions, isInputError } from "astro:actions";

type FormData = {
  email: string;
};

export const ReferralModal = ({ children }: { children: React.ReactNode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const { data, error } = await actions.sendReferrals(formData);

      if (data?.success) {
        track("send_referrals", {
          email: formData.email,
        });

        setIsSuccess(true);
        return;
      }

      if (error && isInputError(error)) {
        const inputError = error as ActionInputError<FormData>;

        for (const field in inputError.fields) {
          setError(field as keyof FormData, {
            type: "server",
            message: inputError.fields?.[
              field as keyof FormData
            ]?.[0] as string,
          });
        }

        return;
      }

      throw new Error("not successful");
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send referrals. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsSuccess(false);
      setErrorMessage(null);
      reset();
    }
  };

  const buttonTextVariants = {
    initial: { opacity: 0, y: "-20px" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "20px" },
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <a
          role="button"
          className="underline text-flamingo-400 hover:text-flamingo-500 transition-colors">
          {children}
        </a>
      </DialogTrigger>

      <DialogOverlay />

      <DialogContent className="lg:rounded-xl max-w-sm">
        <div className="relative">
          {isSuccess && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="w-16 h-16 text-flamingo-400 stroke-[1]" />
            </div>
          )}

          <div className={isSuccess ? "invisible" : ""}>
            <DialogHeader>
              <DialogTitle>Get recommendations</DialogTitle>
              <DialogDescription>
                I’ve gathered the opinions of people I recently worked with.
                Discover what they have to say.
              </DialogDescription>
            </DialogHeader>

            <form
              id="referral-form"
              className="mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-6 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className={`col-span-5 ${errors.email ? "border-red-500" : ""}`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
            </form>

            <DialogFooter className="mt-4  sm:flex-col flex-col gap-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <Button
                  type="submit"
                  form={"referral-form"}
                  className="w-full"
                  variant="default"
                  disabled={isLoading}
                >
                  <motion.span
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    key={isLoading ? "loading" : "not-loading"}
                    className="flex items-center justify-center"
                    variants={buttonTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>Send</>
                    )}
                  </motion.span>
                </Button>
                {error && (
                  <span className="w-full text-center text-red-500 text-sm mt-2">
                    {error}
                  </span>
                )}
              </AnimatePresence>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
