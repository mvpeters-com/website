import {Heading, Tailwind, Html, Head, Preview, Container, Section, Img, Hr, Text, Link, Row, Column} from "@react-email/components";
import Logo from './components/Logo';
import { Fonts } from "./components/Fonts";

const MY_EMAIL =  'simon@mvpeters.com';

const WEBSITE_URL = process.env.NODE_ENV === "production" ? "https://mvpeters.com/" : "http://localhost:4321/";


const testimonials = [
    {
        name: "Luc Heylen",
        title: "Managing Partner at WeWantMore",
        website: "https://wewantmore.studio",
        email: "luc@wewantmore.studio",
        quote: "We were looking for a developer with the necessary technical skills, the right mindset and an interest in sustainability to help us develop the Monark app.  Luckily Simon was interested in our project and went the extra mile which made a huge difference!",
        avatar: WEBSITE_URL + "referrals/luc.jpeg",
    },
    {
        name: "Paul Delange",
        title: "Fouder at Calabi",
        phoneNumber: "+0987654321",
        website: "https://calabi.be",
        email: "paul@calabi.be",
        quote: "Simon led the development of our complex software at Calabi for more than 2 years. His choices, methodology, and execution demonstrate not only a deep understanding of the technology but also of the end user. He is a hard and thorough worker, and through his ability to ask the right questions at the right moments, there is now a robust and intuitive application that is used daily by 100+ companies.",
        avatar: WEBSITE_URL + "referrals/paul.jpeg",
    },
    {
        name: "Dieter De Smet",
        title: "Co-Founder & designer at Omvorm",
        website: "https://omvorm.studio",
        phoneNumber: "+0987654321",
        email: "dieter@omvorm.studio",
        quote: "I have had the pleasure of working closely with Simon on various projects.Simon commits fully to a project and thinks far beyond mere development.Simon ensures that the right technological and strategic choices are made to make a project succeed within a given scope, timing and budget. Realistic and hands-on without losing sight of the big picture.A passion for technology, a heart for UX and design, and a very broad range of knowledge.Simon is solid, fast and extremely flexible. Very pleasant to brainstorm with as a designer.",
        avatar: WEBSITE_URL + "referrals/dieter.jpeg",
    },
];


export default function ReferralsEmail() {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        fontFamily: {
                            articulat: ['articulat-cf', 'Arial', 'sans-serif'],
                            rajdhani: ['Rajdhani', 'Arial', 'sans-serif'],
                          },
                        colors: {
                            flamingo: {
                                50: '#ffe8de',
                                100: '#ffc2b0',
                                200: '#ff9c7e',
                                300: '#ff754c',
                                400: '#ff4f1a',
                                500: '#e63500',
                                600: '#b42800',
                                700: '#811c00',
                                800: '#4f0f00',
                                900: '#210200',
                            },
                        },
                    },
                },
            }}>
            <Html>
                <Head>
                    <Fonts />
                </Head>
                <Preview>Check out what our customers are saying about us!</Preview>
                
                <Container className="mx-auto py-5 px-4">
                    {/* Logo Section */}
                    <Section className="mt-4 flex justify-center">
                        <Img
                            src={WEBSITE_URL + "mvpeters-logo.png"}
                            width="150"
                            height="50"
                            alt="Logo"
                            className="inline-block"
                        />
                    </Section>

                    {/* Intro Section */}
                    <Section className="mt-8">
                        <Text className="text-gray-800 text-lg">
                            Below are some testimonials from people I've worked with. I hope you find them helpful and that they give you a good idea of what it's like to work with me.
                            Feel free to contact them directly if you have any questions.
                            Interested in working together? <Link href={`mailto:${MY_EMAIL}`}>Let's talk!</Link>
                          </Text>
                    </Section>

                    {/* Testimonials Section */}
                    {testimonials.map((testimonial, index) => (
                        <Section key={index}>
                            <Hr className="border-gray-200 my-12" />
                            
                            <Text className="text-gray-800 italic text-xl leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </Text>
                            
                            <Row>
                                <Column align="left" width={84}>
                                    <Img
                                        src={testimonial.avatar}
                                        width="84"
                                        height="84"
                                        alt={testimonial.name}
                                        className="rounded-full"
                                    />
                                </Column>
                                
                                <Column width={16}></Column>
                                
                                <Column align="left">
                                    <Heading className="text-gray-900 font-semibold text-lg m-0">
                                        {testimonial.name}
                                    </Heading>

                                    <Text className="text-gray-600 m-0">
                                        {testimonial.title}
                                    </Text>
                                    
                                    {testimonial.email && (
                                        <Text className="m-0">
                                            <Link
                                                href={`mailto:${testimonial.email}`}
                                                className="text-flamingo-500"
                                            >
                                                {testimonial.email}
                                            </Link>
                                        </Text>
                                    )}
                                    
                                    {testimonial.phoneNumber && (
                                        <Text className="m-0">
                                            <Link
                                                href={`tel:${testimonial.phoneNumber}`}
                                                className="text-flamingo-500"
                                            >
                                                {testimonial.phoneNumber}
                                            </Link>
                                        </Text>
                                    )}
                                </Column>
                            </Row>
                        </Section>
                    ))}

                    {/* Footer Section */}
                    <Section className="mt-8 text-center">
                        <Text className="text-gray-600 text-sm">
                            I hope you find these testimonials helpful and that they give you a good idea of what it's like to work with me. Interested in working together? <Link href="mailto:simon@mvpeters.com">Let's talk!</Link>
                        </Text>
                    </Section>
                </Container>
            </Html>
        </Tailwind>
    );
}