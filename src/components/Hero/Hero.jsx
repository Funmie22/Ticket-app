import React from 'react';
import './hero.css';
import waveSrc from '@assets/wave.svg';
import circle1 from '@assets/circle-1.svg';
import circle2 from '@assets/circle-2.svg';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading" role="region">
      <div className="hero-inner container">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            Tickify
            <span className="hero-accent">for modern workflows</span>
          </h1>

          <p className="hero-sub">
            Organize, prioritize, and resolve work faster. Built for teams that value clarity and speed.
          </p>

          <div className="hero-ctas">
            <a className="btn btn-primary" href="/auth/signup" role="button">Get Started</a>
            <a className="btn btn-primary btn-secondary" href="/auth/login" role="button">Login</a>
          </div>
        </div>
      </div>

      <img className="decor decor-circle-1" src={circle1} alt="" aria-hidden="true" />
      <img className="decor decor-circle-2" src={circle2} alt="" aria-hidden="true" />

      <div className="hero-wave" aria-hidden>
        <img src={waveSrc} alt="" />
      </div>
    </section>
  );
}
