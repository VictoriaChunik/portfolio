import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import styled from "styled-components";
import { Mail, ArrowRight } from "lucide-react";
import Typewriter from "@/components/common/Typewriter";
import PortraitCircle from "@/components/common/PortraitCircle";
import { withParams } from "@/lib/imageUtils";
import { projects, type Project } from "@/content/projects";

/* ─── Layout ─────────────────────────────────────────────── */
const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px;
  @media (min-width: 1024px) { padding: 48px 96px; }
`;

/* ─── Hero ───────────────────────────────────────────────── */
const Split = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  align-items: center;
  @media (min-width: 768px) { grid-template-columns: 1.2fr 0.8fr; gap: 64px; }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  margin-bottom: 16px;
`;
const Dot = styled.span`
  width: 8px; height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brand};
  display: inline-block;
`;
const HeroTitle = styled.h1`
  font-size: clamp(36px, 5vw, 60px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
`;
const Paragraph = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 17px;
  line-height: 1.65;
  margin: 0 0 28px;
`;
const EmailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.brand};
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(124,58,237,.35);
  transition: opacity .2s;
  &:hover { opacity: .88; }
`;

/* ─── Featured Work ──────────────────────────────────────── */
const SectionHeading = styled.h2`
  font-size: 42px;
  font-weight: 800;
  text-align: center;
  margin: 0 0 40px;
`;
const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 700;
  padding: 14px 32px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.brand};
  text-decoration: none;
  transition: background .2s, color .2s, gap .2s;
  &:hover {
    background: ${({ theme }) => theme.colors.brand};
    color: #fff;
    gap: 12px;
  }
`;

/* 2 большие колонки */
const FeatGrid = styled.div`
  display: grid;
  gap: 28px;
  grid-template-columns: 1fr;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const FeatCard = styled.div`
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: transform .3s ease, box-shadow .3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,.22);
  }
`;

const FeatThumb = styled.div`
  position: relative;
  height: 420px;
  overflow: hidden;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    transition: transform .45s ease;
  }
  ${FeatCard}:hover & img { transform: scale(1.05); }
`;

const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.3);
  opacity: 0;
  transition: opacity .25s;
  ${FeatCard}:hover & { opacity: 1; }
`;
const PlayIcon = styled.div`
  width: 64px; height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,.93);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 24px rgba(0,0,0,.4);
  svg { width: 26px; height: 26px; margin-left: 4px; fill: #111; }
`;

const FeatBody = styled.div`
  padding: 22px 24px 24px;
  h3 { margin: 0 0 8px; font-size: 22px; font-weight: 700; }
  p  { margin: 0 0 16px; font-size: 16px; color: ${({ theme }) => theme.colors.muted}; line-height: 1.6; }
`;

const Tags = styled.div` display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; `;
const Tag  = styled.span`
  font-size: 13px; padding: 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
`;
const CardLinks = styled.div` display: flex; gap: 10px; flex-wrap: wrap; `;
const DemoBtn = styled.a`
  font-size: 15px; font-weight: 600;
  padding: 10px 22px; border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand};
  color: #fff; text-decoration: none;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;
const GhBtn = styled.a`
  font-size: 15px; font-weight: 600;
  padding: 10px 22px; border-radius: 10px;
  background: #24292e;
  color: #fff;
  text-decoration: none;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;

/* ─── Modal ──────────────────────────────────────────────── */
const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.88);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? "all" : "none"};
  transition: opacity .25s ease;
`;
const ModalBox = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px; overflow: hidden;
  max-width: 1000px; width: 100%; max-height: 94vh;
  display: flex; flex-direction: column;
  transform: ${p => p.$open ? "scale(1)" : "scale(.93)"};
  transition: transform .25s ease;
  box-shadow: 0 40px 100px rgba(0,0,0,.6);
`;
const ModalMedia = styled.div`
  position: relative; background: #000;
  img, video { width: 100%; max-height: 55vh; object-fit: contain; display: block; }
`;
const ModalClose = styled.button`
  position: absolute; top: 14px; right: 14px;
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(0,0,0,.7); color: #fff; border: none;
  cursor: pointer; font-size: 20px;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; transition: background .2s;
  &:hover { background: rgba(0,0,0,.95); }
`;
const MediaTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;
const MediaTab = styled.button<{ $active?: boolean }>`
  flex: 1; padding: 14px 0;
  font-size: 15px; font-weight: 700;
  border: none; cursor: pointer; transition: all .2s;
  border-bottom: 3px solid ${p => p.$active ? p.theme.colors.brand : "transparent"};
  background: ${p => p.$active ? p.theme.colors.border : "transparent"};
  color: ${p => p.$active ? p.theme.colors.foreground : p.theme.colors.muted};
  &:hover { background: ${({ theme }) => theme.colors.border}; color: ${({ theme }) => theme.colors.foreground}; }
`;
const ModalBody = styled.div`
  padding: 26px 32px 32px; overflow-y: auto;
  h2 { margin: 0 0 10px; font-size: 28px; font-weight: 800; }
  p  { margin: 0 0 20px; color: ${({ theme }) => theme.colors.muted}; font-size: 17px; line-height: 1.7; }
`;
const ModalLinks = styled.div` display: flex; gap: 12px; flex-wrap: wrap; `;
const ModalDemoBtn = styled.a`
  font-size: 16px; font-weight: 700; padding: 13px 28px; border-radius: 12px;
  background: ${({ theme }) => theme.colors.brand}; color: #fff;
  text-decoration: none; transition: opacity .2s;
  &:hover { opacity: .85; }
`;
const ModalGhBtn = styled.a`
  font-size: 16px; font-weight: 700; padding: 13px 28px; border-radius: 12px;
  background: #24292e;
  color: #fff;
  text-decoration: none;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [showVideo, setShowVideo] = useState(false);
  const open = project !== null;

  useEffect(() => { if (open) setShowVideo(false); }, [project?.id, open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <Backdrop $open={open} onClick={onClose}>
      <ModalBox $open={open} onClick={e => e.stopPropagation()}>
        {project && (
          <>
            <ModalMedia>
              <ModalClose onClick={onClose}>✕</ModalClose>
              {showVideo
                ? <video key={project.id + "-v"} src={`/videos/${project.id}.mp4`} autoPlay muted loop playsInline controls />
                : <img   key={project.id + "-i"} src={`/screenshots/${project.id}.png`} alt={project.title} />
              }
            </ModalMedia>
            <MediaTabs>
              <MediaTab $active={!showVideo} onClick={() => setShowVideo(false)}>📷 Screenshot</MediaTab>
              <MediaTab $active={showVideo}  onClick={() => setShowVideo(true)}>▶ Video</MediaTab>
            </MediaTabs>
            <ModalBody>
              <h2>{project.title}</h2>
              <Tags>{project.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
              <p>{project.desc}</p>
              <ModalLinks>
                {project.demo && <ModalDemoBtn href={project.demo} target="_blank" rel="noreferrer">🔗 Live Demo</ModalDemoBtn>}
                <ModalGhBtn href={project.github} target="_blank" rel="noreferrer">GitHub</ModalGhBtn>
              </ModalLinks>
            </ModalBody>
          </>
        )}
      </ModalBox>
    </Backdrop>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Index() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  // Только 2 лучших проекта на главной
  const featured = [projects[0], projects[1]] as Project[];

  return (
    <Layout>
      {/* Hero */}
      <Section>
        <Split>
          <div>
            <Row><Dot /><Typewriter text="Frontend Developer · JavaScript & AI" speed={45} /></Row>
            <HeroTitle>
              Привет,<br />
              я Виктория Чуник<br />
              <span style={{ color: "var(--brand, #7C3AED)" }}>Frontend Developer</span>
            </HeroTitle>
            <Paragraph>
              Подключу любой AI/REST API,
              починю JS-логику, добавлю функциональность.
            </Paragraph>
            <EmailBtn href="mailto:vikcoding24@gmail.com">
              <Mail size={16} /> vikcoding24@gmail.com
            </EmailBtn>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <PortraitCircle
              src={withParams("https://cdn.builder.io/api/v1/image/assets%2Fd75ebc21747e42afa30f803241846269%2F6971a81129354500817a10c34f4b202d", { width: 800, format: "webp", quality: 95 })}
              srcSet={[176,224,400,800].map(w =>
                `${withParams("https://cdn.builder.io/api/v1/image/assets%2Fd75ebc21747e42afa30f803241846269%2F6971a81129354500817a10c34f4b202d", { width: w, format: "webp", quality: 95 })} ${w}w`
              ).join(", ")}
              sizes="(max-width: 768px) 176px, 224px"
              alt="Portrait"
              objectPosition="5% 45%"
            />
          </div>
        </Split>
      </Section>

      {/* Featured Work — только 2 лучших */}
      <Section>
        <SectionHeading>Featured Work</SectionHeading>

        <FeatGrid>
          {featured.map(p => (
            <FeatCard key={p.id} onClick={() => setSelected(p)}>
              <FeatThumb>
                <img src={`/screenshots/${p.id}.png`} alt={p.title} />
                <PlayOverlay>
                  <PlayIcon>
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </PlayIcon>
                </PlayOverlay>
              </FeatThumb>
              <FeatBody>
                <h3>{p.title}</h3>
                <Tags>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
                <p>{p.desc}</p>
                <CardLinks>
                  {p.demo && <DemoBtn href={p.demo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>Live Demo</DemoBtn>}
                  <GhBtn href={p.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>GitHub</GhBtn>
                </CardLinks>
              </FeatBody>
            </FeatCard>
          ))}
        </FeatGrid>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <ViewAll to="/work">
            View all 6 projects <ArrowRight size={18} />
          </ViewAll>
        </div>
      </Section>

      <ProjectModal project={selected} onClose={close} />
    </Layout>
  );
}