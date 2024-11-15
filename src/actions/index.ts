import ReferralsEmail from '@/emails/referrals';
import { render } from '@react-email/components';
import {defineAction} from 'astro:actions';
import {z} from 'astro:schema';
import {Resend} from 'resend';

const resendApiKey: string = import.meta.env.RESEND_API_KEY;

const resend = new Resend(resendApiKey);

export const server = {
    sendReferrals: defineAction({
        input: z.object({
            email: z.string().email(),
        }),
        handler: async ({email}) => {
            await resend.emails.send({
                from: 'simon@mvpeters.com',
                to: email,
                subject: 'MVPeters referrals',
                html: await render(ReferralsEmail(), {
                    pretty: true,
                })
            });

            return {success: true};
        },
    })
}