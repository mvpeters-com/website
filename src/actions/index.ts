import ReferralsEmail from '@/emails/referrals';
import { render } from '@react-email/components';
import {defineAction} from 'astro:actions';
import {z} from 'astro:schema';
import {Resend} from 'resend';

const resendApiKey: string = import.meta.env.RESEND_API_KEY;

const resend = new Resend(resendApiKey);

const playAiApiKey: string = import.meta.env.PLAY_AI_API_KEY;
const playAiUserId: string = import.meta.env.PLAY_AI_USER_ID;

export const server = {
    getPlayAiAuth: defineAction({
        input: z.object({
            agentId: z.string(),
        }),
        handler: async ({agentId}) => {
            try {
                console.log(playAiApiKey, playAiUserId, agentId);

                
                const response = await fetch('https://api.play.ai/api/v1/talk/auth', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${playAiApiKey}`,
                        'X-User-Id': playAiUserId,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ agentId })
                });

                if (!response.ok) {
                    console.log(response.statusText);
                    throw new Error(`Authentication failed: ${response.statusText}`);
                }

                const data = await response.json();

                console.log(data);
                return {
                    success: true,
                    webSocketUrl: data['Play3.0-mini'].webSocketUrl
                };
            } catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Authentication failed'
                };
            }
        },
    }),
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