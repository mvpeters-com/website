import {defineAction} from 'astro:actions';
import {z} from 'astro:schema';

export const server = {
    sendReferrals: defineAction({
        input: z.object({
            email: z.string().email(),
        }),
        handler: async ({email}) => {
            console.log(`Sending referral email to ${email}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return {success: true};
        },
    })
}