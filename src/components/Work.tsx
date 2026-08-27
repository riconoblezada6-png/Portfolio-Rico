import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import MusicPlayer from "./MusicPlayer";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Hobby = {
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  player?: boolean;
};

const hobbies: Hobby[] = [
  {
    title: "Music",
    category: "Currently Playing",
    description: "Listening to this →",
    image: "/images/hobbies/hobby1.jpg",
    player: true,
  },
  {
    title: "Chess",
    category: "As if I needed more stress, I play chess.",
    description: "",
    image: "/images/hobbies/chess.jpg",
    images: ["/images/hobbies/chess1.jpg", "/images/hobbies/chess2.jpg"],
  },
  {
    title: "Gaming",
    category: "PC & Mobile Games",
    description: "",
    image: "/images/hobbies/gaming.jpg",
  },
  {
    title: "Food & Drink Experiments",
    category: "Trying New Combinations",
    description: "",
    image: "/images/hobbies/food.jpg",
  },
  {
    title: "Poetry Writing",
    category: "Creative Expression",
    description: "",
    image: "/images/hobbies/poetry.jpg",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? hobbies.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === hobbies.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="hobbies">
      <div className="work-container section-container">
        <h2>
          <span>Hobbies</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous hobby"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next hobby"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {hobbies.map((hobby, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4
                          key={`${hobby.title}-${currentIndex}`}
                          className="hobby-title-animate"
                        >
                          {hobby.title}
                        </h4>
                        <p className="carousel-category">{hobby.category}</p>
                        {hobby.player && (
                          <p className="hobby-music-caption">
                            {hobby.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      {hobby.player ? (
                        <MusicPlayer />
                      ) : hobby.images ? (
                        <div className="hobby-dual-image">
                          {hobby.images.map((img, i) => (
                            <WorkImage
                              key={i}
                              image={img}
                              alt={`${hobby.title} ${i + 1}`}
                            />
                          ))}
                        </div>
                      ) : (
                        <WorkImage image={hobby.image} alt={hobby.title} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {hobbies.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to hobby ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;