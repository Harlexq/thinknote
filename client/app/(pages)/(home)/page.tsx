import TypographyH1 from "@/app/components/ui/typography/title/TypographyH1";
import TypographyH2 from "@/app/components/ui/typography/title/TypographyH2";
import TypographyH3 from "@/app/components/ui/typography/title/TypographyH3";
import TypographyH4 from "@/app/components/ui/typography/title/TypographyH4";
import TypographyInlineCode from "@/app/components/ui/typography/TypographyInlineCode";
import TypographyP from "@/app/components/ui/typography/TypographyP";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <TypographyH1>Typography H1</TypographyH1>
      <TypographyH2>Typography H2</TypographyH2>
      <TypographyH3>Typography H3</TypographyH3>
      <TypographyH4>Typography H4</TypographyH4>
      <TypographyP>Typography P</TypographyP>
      <TypographyInlineCode>Typography Inline Code</TypographyInlineCode>
    </div>
  );
};

export default Home;
