import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { setupBlurReveal } from "./utils/GsapScroll";
import { MdMenu, MdClose } from "react-icons/md";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const MOBILE_BREAKPOINT = 900;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    // Give the DOM a tick to settle, then wire up the blur-reveal effect
    // for any element with the "blur-reveal" class.
    requestAnimationFrame(() => {
      setupBlurReveal();
      ScrollTrigger.refresh();
    });

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        setMenuOpen(false);
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    const handleResize = () => {
      ScrollSmoother.refresh(true);
      // Reset the hamburger menu if the window is resized/rotated back
      // into desktop view while it was left open.
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          RN
        </a>
        <a
          href="mailto:riconoblezada6@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          riconoblezada6@gmail.com
        </a>
        <ul className={menuOpen ? "nav-open" : ""}>
          <li>
            <a data-href="#landingDiv" href="#landingDiv">
              <HoverLinks text="HOME" />
            </a>
          </li>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#hobbies" href="#hobbies">
              <HoverLinks text="HOBBIES" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          data-cursor="disable"
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
