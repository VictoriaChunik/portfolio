import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Mail, Sparkles } from "lucide-react";
import React from "react";

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 3L3 11l6 2 2 6 10-16z" />
    <path d="M9 13l12-10" />
  </svg>
);

// const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
//     <rect x="3" y="3" width="18" height="18" rx="3"/>
//     <text x="7.2" y="15.5" fontSize="10" fontFamily="Inter, system-ui, Arial" fontWeight="700" fill="currentColor">B</text>
//   </svg>
// );

const HeaderWrap = styled.header`
  position: sticky; top: 0; z-index: 40; width: 100vw; left: 0; right: 0;
  backdrop-filter: blur(8px);
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Container = styled.div`
  max-width: 1440px; margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between;
  @media (min-width: 1024px){ padding: 0 96px; }
`;

const Brand = styled.div`
  display: flex; align-items: center; gap: 8px;
  .badge { height: 28px; width: 28px; display: grid; place-items: center; border-radius: 8px; background: ${({ theme }) => theme.colors.brand}; color: ${({ theme }) => theme.colors.brandForeground}; box-shadow: ${({ theme }) => theme.shadow.sm}; }
  span { font-weight: 600; letter-spacing: -0.01em; }
`;

const NavBar = styled.nav`
  display: flex;
  gap: 56px; /* Увеличил gap с 6px до 24px - возможно здесь была проблема */
  margin: 0;
  padding: 0;
`;

const NavItem = styled(NavLink)<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  transition: color .2s ease;
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  padding: 8px 0; /* Добавил вертикальные padding вместо margin */
  margin: 0; /* Убедился что margin нет */
  
  ${({ $active, theme }) => ($active ? `
    text-underline-offset: 5px;
    text-decoration: underline;
    text-decoration-color: ${theme.colors.brand};
    text-decoration-thickness: 2px;
  ` : "")}
  
  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const FooterWrap = styled.footer`
  margin-top: 96px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Socials = styled.div`
  display: flex;
  gap: 43px;
  align-items: center;
  
  a {
    color: ${({ theme }) => theme.colors.muted};
    transition: color .2s ease;
    padding: 8px; /* Добавил padding для социальных иконок */
  }
  
  a:hover {
    color: ${({ theme }) => theme.colors.brand};
  }
`;

const FooterCtaWrap = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 24px;
  
  @media (min-width: 1024px) {
    padding: 24px 96px 24px;
  }
`;

const CtaCard = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.muted};
  }
  
  a {
    margin-top: 12px;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    background: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.background};
    padding: 10px 16px;
    border-radius: 8px;
  }
`;

const FooterInfo = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 24px 16px;
  
  @media (min-width: 1024px) {
    padding: 32px 96px 16px;
  }
  
  text-align: center;
  
  h3 {
    font-size: 36px;
    line-height: 1;
    margin: 0 0 24px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.foreground};
  }
  
  p {
    margin: 0 auto 48px;
    color: ${({ theme }) => theme.colors.foreground};
    max-width: 521px;
  }
  
  a {
    display: inline-block;
    width: 293px;
    text-align: center;
    color: ${({ theme }) => theme.colors.foreground};
    text-decoration: none;
    background: rgba(222,222,222,0.06);
    border: 1px solid rgba(222,222,222,0.22);
    border-radius: 8px;
    padding: 16px 48px;
    transition: background .2s ease, border-color .2s ease;
  }
  
  a:hover {
    background: rgba(222,222,222,0.12);
    border-color: rgba(222,222,222,0.35);
  }
`;

const SocialBar = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 24px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  @media (min-width: 1024px) { padding: 24px 96px 16px; }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  text-align: center;
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
`;

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <HeaderWrap>
      <Container>
        <Brand>
          <div className="badge"><Sparkles size={16} /></div>
          <span>Виктория Чуник · Frontend Developer</span>
        </Brand>
        <NavBar>
          <NavItem to="/" $active={pathname === "/"}>Home</NavItem>
          <NavItem to="/work" $active={pathname.startsWith("/work")}>Work</NavItem>
          <NavItem to="/contact" $active={pathname.startsWith("/contact")}>Contact</NavItem>
        </NavBar>
      </Container>
    </HeaderWrap>
  );
}

export function SiteFooter() {
  return (
    <FooterWrap>
      <SocialBar>
        <Socials>
          <a href="https://t.me/myitPro" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram"><TelegramIcon width={32} height={32} /></a>
        </Socials>
        <Copyright>© 2025 Виктория Чуник. Все права защищены.</Copyright>
      </SocialBar>
    </FooterWrap>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Page>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </Page>
  );
}