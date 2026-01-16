import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VercelInviteUserEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailTemplateTwo = ({}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>Selbekk Labs - New Submission</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="/logo-black.svg"
                width="40"
                height="37"
                alt="Selbekk Labs Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              New Submission:
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">Name:</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Email:
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              About their project:
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Services:
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Budget:
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VercelInviteUserEmail.PreviewProps = {
  username: "alanturing",
  userImage: `${baseUrl}/static/vercel-user.png`,
  invitedByUsername: "Alan",
  invitedByEmail: "alan.turing@example.com",
  teamName: "Enigma",
  teamImage: `${baseUrl}/static/vercel-team.png`,
  inviteLink: "https://vercel.com",
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as VercelInviteUserEmailProps;

export default VercelInviteUserEmail;
