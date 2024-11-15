import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger
} from "./ui/dialog"
import {Button} from '@/components/ui/button.tsx';
import {useForm} from 'react-hook-form';
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {useState} from 'react';
import { Loader2, Check } from "lucide-react";

import { actions } from 'astro:actions';

type FormData = {
    email: string;
};

export const ReferralModal = ({
                                  children
                              }: {
    children: React.ReactNode
}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true);
            setError(null);
            await actions.sendReferrals(data);
            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            setError('Failed to send referrals. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsSuccess(false);
            setError(null);
            reset();
        }
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <a className={'cursor-pointer'}>{children}</a>
            </DialogTrigger>

            <DialogOverlay className="custom-backdrop-bg"/>

            <DialogContent className="rounded-xl max-w-sm">
                <div className="relative">
                    {isSuccess && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-16 h-16 text-flamingo-400 stroke-[1]" />
                        </div>
                    )}

                    <div className={isSuccess ? 'invisible' : ''}>
                        <DialogHeader>
                            <DialogTitle>Send Referrals</DialogTitle>
                            <DialogDescription>
                                Receive an email featuring testimonials and contact details from some of
                                my clients. Hear firsthand how I help build solutions that truly matter.
                            </DialogDescription>
                        </DialogHeader>

                        <form id="referral-form" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-6 items-center gap-4">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    className="col-span-5"
                                    {...register("email", {required: "Email is required"})}
                                />
                                {errors.email &&
                                    <span className="col-span-6 text-red-500">{errors.email.message}</span>}
                            </div>
                        </form>

                        <DialogFooter className="mt-4">
                            <Button 
                                type="submit" 
                                form={'referral-form'} 
                                className="w-full"
                                variant="default"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Referrals'
                                )}
                            </Button>
                            {error && (
                                <span className="w-full text-center text-red-500 text-sm mt-2">
                                    {error}
                                </span>
                            )}
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};