import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-photo-group">
          <img
            src="/images/profile1.jpg"
            alt="Profile 1"
            className="about-photo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            src="/images/profile2.jpg"
            alt="Profile 2"
            className="about-photo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            src="/images/profile3.jpg"
            alt="Profile 3"
            className="about-photo"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
        <h3 className="title">About Me</h3>
        <p className="para blur-reveal">
        I am currently a 4th-year college student taking up a Bachelor of Science in Computer Science at St. Rose College Educational Foundation, Inc. I am a compassionate and caring person, especially when it comes to animals. Whenever I hear a chick or chicken making sounds as if it needs help, I cannot help but immediately check on it, even when I am busy or doing something else.
        </p>
      </div>
    </div>
  );
};

export default About;