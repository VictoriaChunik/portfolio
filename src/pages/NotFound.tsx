import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/site/Layout";
import styled from "styled-components";

const Section = styled.section` max-width: 1440px; margin: 0 auto; padding: 96px 24px; min-height: 60vh; display: grid; place-items: center; text-align: center; @media (min-width: 1024px){ padding: 96px 96px; } `;
const Title = styled.h1` font-size: 72px; font-weight: 800; letter-spacing: -0.03em; margin: 0; `;
const Muted = styled.p` margin-top: 8px; color: ${({ theme }) => theme.colors.muted}; font-size: 18px; `;
const Button = styled.a` margin-top: 16px; display: inline-block; background: ${({ theme }) => theme.colors.brand}; color: ${({ theme }) => theme.colors.brandForeground}; padding: 10px 16px; border-radius: 8px; `;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Section>
        <div>
          <Title>404</Title>
          <Muted>Page not found</Muted>
          <Button href="/">Go home</Button>
        </div>
      </Section>
    </Layout>
  );
};

export default NotFound;
