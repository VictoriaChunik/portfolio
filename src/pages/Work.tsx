import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/site/Layout";
import styled from "styled-components";
import { projects, type Project } from "@/content/projects";

/* ─── Layout ─────────────────────────────────────────────── */
const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 24px;
  @media (min-width: 1024px) { padding: 48px 96px; }
`;
const Title = styled.h1`
  font-size: 42px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: center;
`;
const Lead = styled.p`
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  text-align: center;
`;

const Grid = styled.div`
  margin-top: 44px;
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr;
  @media (min-width: 640px)  { grid-template-columns: repeat(2, 1fr); }
`;

/* ─── Card ───────────────────────────────────────────────── */
const Card = styled.div`
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: transform .3s ease, box-shadow .3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,.22);
  }
`;

const Thumb = styled.div`
  position: relative;
  height: 360px;
  cursor: pointer;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
    transition: transform .45s ease;
  }
  &:hover img { transform: scale(1.05); }
`;

const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.32);
  opacity: 0;
  transition: opacity .25s ease;
  ${Thumb}:hover & { opacity: 1; }
`;
const PlayIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,.93);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(0,0,0,.4);
  svg { width: 30px; height: 30px; margin-left: 5px; fill: #111; }
`;
const VideoLabel = styled.div`
  position: absolute;
  bottom: 14px;
  right: 14px;
  background: rgba(0,0,0,.7);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 999px;
  letter-spacing: .05em;
  pointer-events: none;
`;

const CardBody = styled.div`
  padding: 24px 26px 26px;
  h3 {
    margin: 0 0 10px;
    font-weight: 700;
    font-size: 22px;
  }
  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 16px;
    line-height: 1.65;
  }
`;

const Tags = styled.div` display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; `;
const Tag  = styled.span`
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
`;

const Links = styled.div` display: flex; gap: 10px; flex-wrap: wrap; `;

const DemoBtn = styled.a`
  font-size: 15px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand};
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;
const GhBtn = styled.a`
  font-size: 15px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 10px;
  background: #24292e;
  color: #fff;
  text-decoration: none;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;

/* ─── Modal ──────────────────────────────────────────────── */
const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0,0,0,.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: ${p => p.$open ? 1 : 0};
  pointer-events: ${p => p.$open ? "all" : "none"};
  transition: opacity .25s ease;
`;

const ModalBox = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  overflow: hidden;
  max-width: 1000px;
  width: 100%;
  max-height: 94vh;
  display: flex;
  flex-direction: column;
  transform: ${p => p.$open ? "scale(1)" : "scale(.93)"};
  transition: transform .25s ease;
  box-shadow: 0 40px 100px rgba(0,0,0,.6);
`;

const ModalMedia = styled.div`
  position: relative;
  background: #000;
  img, video {
    width: 100%;
    max-height: 55vh;
    object-fit: contain;
    display: block;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,.7);
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background .2s;
  &:hover { background: rgba(0,0,0,.95); }
`;

/* Кнопки Screenshot / Video — заметная полоска под медиа */
const MediaTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const MediaTab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 14px 0;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all .2s;
  border-bottom: 3px solid ${p => p.$active ? p.theme.colors.brand : "transparent"};
  background: ${p => p.$active ? p.theme.colors.border : "transparent"};
  color: ${p => p.$active ? p.theme.colors.foreground : p.theme.colors.muted};
  &:hover { background: ${({ theme }) => theme.colors.border}; color: ${({ theme }) => theme.colors.foreground}; }
`;

const ModalBody = styled.div`
  padding: 26px 32px 32px;
  overflow-y: auto;
  h2 { margin: 0 0 10px; font-size: 28px; font-weight: 800; }
  p  { margin: 0 0 20px; color: ${({ theme }) => theme.colors.muted}; font-size: 17px; line-height: 1.7; }
`;

const ModalLinks = styled.div` display: flex; gap: 12px; flex-wrap: wrap; `;

const ModalDemoBtn = styled.a`
  font-size: 16px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.brand};
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: opacity .2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover { opacity: .85; }
`;
const ModalGhBtn = styled.a`
  font-size: 16px;
  font-weight: 700;
  padding: 13px 28px;
  border-radius: 12px;
  background: #24292e;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity .2s;
  &:hover { opacity: .85; }
`;

/* ─── Modal component ────────────────────────────────────── */
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
              <ModalClose onClick={onClose} aria-label="Close">✕</ModalClose>
              {showVideo ? (
                <video key={project.id + "-v"} src={`/videos/${project.id}.mp4`} autoPlay muted loop playsInline controls />
              ) : (
                <img key={project.id + "-i"} src={`/screenshots/${project.id}.png`} alt={project.title} />
              )}
            </ModalMedia>

            {/* Заметные табы под медиа */}
            <MediaTabs>
              <MediaTab $active={!showVideo} onClick={() => setShowVideo(false)}>
                📷 Screenshot
              </MediaTab>
              <MediaTab $active={showVideo} onClick={() => setShowVideo(true)}>
                ▶ Video
              </MediaTab>
            </MediaTabs>

            <ModalBody>
              <h2>{project.title}</h2>
              <Tags>{project.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
              <p>{project.desc}</p>
              <ModalLinks>
                {project.demo && (
                  <ModalDemoBtn href={project.demo} target="_blank" rel="noreferrer">
                    🔗 Live Demo
                  </ModalDemoBtn>
                )}
                <ModalGhBtn href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </ModalGhBtn>
              </ModalLinks>
            </ModalBody>
          </>
        )}
      </ModalBox>
    </Backdrop>
  );
}

/* ─── Card component ─────────────────────────────────────── */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <Card>
      <Thumb onClick={() => onOpen(project)} role="button" aria-label={`Open ${project.title}`}>
        <img src={`/screenshots/${project.id}.png`} alt={project.title} />
        <PlayOverlay>
          <PlayIcon>
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </PlayIcon>
        </PlayOverlay>
        <VideoLabel>▶ VIDEO</VideoLabel>
      </Thumb>

      <CardBody>
        <h3>{project.title}</h3>
        <Tags>{project.tags.map(t => <Tag key={t}>{t}</Tag>)}</Tags>
        <p>{project.desc}</p>
        <Links>
          {project.demo && <DemoBtn href={project.demo} target="_blank" rel="noreferrer">Live Demo</DemoBtn>}
          <GhBtn href={project.github} target="_blank" rel="noreferrer">GitHub</GhBtn>
        </Links>
      </CardBody>
    </Card>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Layout>
      <Section>
        <Title>Work</Title>
        <Lead>
          JavaScript разработка — логика, API интеграции и AI. Нажми на проект чтобы посмотреть крупнее и запустить видео.
        </Lead>
        <Grid>
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </Grid>
      </Section>

      <ProjectModal project={selected} onClose={close} />
    </Layout>
  );
}