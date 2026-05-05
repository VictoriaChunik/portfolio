import Layout from "@/components/site/Layout";
import styled from "styled-components";
import { Mail } from "lucide-react";

const Section = styled.section`
  max-width: 680px;
  margin: 0 auto;
  padding: 80px 24px 120px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
`;

const Lead = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 40px;
`;

const EmailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  padding: 16px 36px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.brand};
  color: #fff;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(124,58,237,.35);
  transition: opacity .2s, transform .2s;
  &:hover { opacity: .88; transform: translateY(-2px); }
`;

const Or = styled.p`
  margin: 28px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  a {
    color: ${({ theme }) => theme.colors.brand};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export default function Contact() {
  return (
    <Layout>
      <Section>
        <Title>Свяжитесь со мной</Title>
        <Lead>
          Открыта для фриланс-проектов.<br />
          Напишите — обсудим вашу задачу.
        </Lead>
        <EmailBtn href="mailto:vikcoding24@gmail.com">
          <Mail size={20} /> vikcoding24@gmail.com
        </EmailBtn>
        <Or>
          или напишите в&nbsp;<a href="https://t.me/myitPro" target="_blank" rel="noreferrer">Telegram</a>
        </Or>
      </Section>
    </Layout>
  );
}