import { useState, useEffect, useRef, useCallback } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./styles/TechStack.css";

type TechCard = {
  title: string;
  tag: string;
  type: "image" | "video";
  src: string;
};

const cards: TechCard[] = [
  {
    title: "HTML",
    tag: "Frontend",
    type: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    title: "CSS",
    tag: "Frontend",
    type: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    title: "Laravel",
    tag: "Backend",
    type: "image",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
];
const CARDS_PER_SLIDE = 3;
const SLIDE_DURATION = 4500; // ms

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

const TechStack = () => {
  const slides = chunk(cards, CARDS_PER_SLIDE);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(Date.now());

  const goToSlide = useCallback(
    (index: number) => {
      const next = (index + slides.length) % slides.length;
      setCurrentSlide(next);
      setProgress(0);
      startRef.current = Date.now();
    },
    [slides.length]
  );

  const goNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(pct);
      if (pct >= 100) {
        goToSlide(currentSlide + 1);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isPaused]);

  return (
    <div className="techstack-section" id="techstack">
      <h2>
        My <span>Techstack</span>
      </h2>

      <div
        className="tech-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          startRef.current = Date.now() - (progress / 100) * SLIDE_DURATION;
        }}
      >
        <div className="tech-cards-track">
          {slides[currentSlide]?.map((card, i) => (
            <div className="tech-card" key={`${currentSlide}-${i}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="tech-card-media">
                {card.type === "video" ? (
                  <video
                    src={card.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={(e) => (e.currentTarget.style.opacity = "0")}
                  />
                ) : (
                  <img
                    src={card.src}
                    alt={card.title}
                    onError={(e) => (e.currentTarget.style.opacity = "0")}
                  />
                )}
                <div className="tech-card-fade" />
              </div>
              <div className="tech-card-info">
                <span className="tech-card-tag">{card.tag}</span>
                <h4>{card.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="tech-carousel-controls">
          <button
            className="tech-arrow"
            onClick={goPrev}
            aria-label="Previous"
            data-cursor="disable"
          >
            <MdChevronLeft />
          </button>
          <button
            className="tech-arrow"
            onClick={goNext}
            aria-label="Next"
            data-cursor="disable"
          >
            <MdChevronRight />
          </button>

          <div className="tech-progress-track">
            <div
              className="tech-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="tech-counter">
            {String(currentSlide + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;