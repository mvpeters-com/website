import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger
} from "./ui/dialog"
import {Button} from '@/components/ui/button.tsx';
import {useForm} from 'react-hook-form';
import {Input} from "./ui/input";
import {Label} from "./ui/label";

import { actions } from 'astro:actions';

type FormData = {
    email: string;
};

export const ReferralModal = ({
                                  children
                              }: {
    children: React.ReactNode
}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await actions.sendReferrals(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a className={'cursor-pointer'}>{children}</a>
            </DialogTrigger>

            <DialogOverlay className="custom-backdrop-bg"/>


            <DialogContent className="rounded-xl max-w-sm">
                <DialogHeader>
                    <DialogTitle>Send Referrals</DialogTitle>
                    <DialogDescription>
                        Receive an email featuring testimonials and contact details from some of
                        my
                        clients. Hear firsthand how I help build solutions that truly matter.
                    </DialogDescription>
                </DialogHeader>

                <form id="referral-form" onSubmit={handleSubmit(onSubmit)}>
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

                <DialogFooter>
                    <Button type="submit" form={'referral-form'} className="w-full"
                            variant="default">
                        Send Referrals
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};