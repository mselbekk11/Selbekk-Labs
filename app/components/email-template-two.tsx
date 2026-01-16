import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  project: string;
  services: string[];
  budget: string;
}

export function ContactFormEmail({
  name,
  email,
  project,
  services,
  budget,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>New Contact Form Submission from {name}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://selbekk.dev/logo-black.png"
                width="40"
                height="37"
                alt="Selbekk Labs Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              New Contact Form Submission
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Name:</strong> {name}
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Email:</strong> {email}
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Services:</strong> {services.join(", ")}
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              <strong>Budget:</strong> {budget}
            </Text>
            <Section className="mt-[16px] p-[16px] bg-[#f9f9f9] rounded">
              <Text className="text-[14px] text-black leading-[24px] m-0">
                <strong>About their project:</strong>
              </Text>
              <Text className="text-[14px] text-black leading-[24px] mt-[8px]">
                {project}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
