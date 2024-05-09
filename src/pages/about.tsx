import Link from "next/link";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.sectionHead}>About Try Angle Kids</h1>
          <p className={styles.sectionText}>
            Welcome to <strong>Try Angle Kids</strong>, an international
            after-school program that nurtures children&apos;s academic skills
            and global mindset through project-based learning and immersive
            English education. We are proud to support children from{" "}
            <strong>Try Angle Kids School</strong> and beyond in supplementing
            their STEM lessons through engaging and interactive learning
            experiences.
          </p>
          <p className={styles.sectionText}>
            Our web application, <strong>Try Angle Kids Prototype v2</strong>,
            is designed to reinforce students&apos; understanding of STEM
            lessons. The platform offers educational videos tailored to each
            lesson, while strategically timed quizzes pop up to assess and
            solidify comprehension of the material.
          </p>
          <p className={styles.sectionText}>
            At Try Angle Kids, we provide a unique learning environment where
            students can:
          </p>
          <ul className={styles.sectionText}>
            <li>
              Watch engaging educational videos aligned with their STEM
              curriculum
            </li>
            <li>Take interactive quizzes that reinforce learning</li>
            <li>Receive immediate feedback on quiz results</li>
          </ul>
          <p className={styles.sectionText}>
            Our mission is to empower children to become confident global
            citizens through English immersion and international education. Our
            experienced team of native and bilingual instructors ensures that
            each child is guided and supported throughout their learning
            journey.
          </p>
          <p className={styles.sectionText}>
            Discover more about us on our official website:{" "}
            <Link
              href="https://tryanglekids.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              tryanglekids.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
