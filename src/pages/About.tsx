import PageHelmet from '../components/PageHelmet';

function About() {
  return (
    <div className="about-page">
      <PageHelmet routeKey="ABOUT" />

      <h1>About Us</h1>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Rubrion, we are dedicated to creating robust and scalable web
          applications that empower businesses to succeed in the digital
          landscape. Our mission is to combine cutting-edge technology with
          user-centric design to deliver exceptional digital experiences.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          Our team consists of passionate developers, designers, and product
          specialists who work together to build remarkable web applications.
          With expertise in React, TypeScript, and modern web development
          practices, we tackle complex challenges with elegant solutions.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Quality:</strong> We prioritize code quality and
            maintainable solutions
          </li>
          <li>
            <strong>Innovation:</strong> We embrace new technologies and
            approaches
          </li>
          <li>
            <strong>Collaboration:</strong> We believe great products come from
            great teamwork
          </li>
          <li>
            <strong>User Focus:</strong> We design with the end user in mind
          </li>
        </ul>
      </section>
    </div>
  );
}

export default About;
