import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/body.css';
import '../Styles/Pages/about.css';

function AboutPage() {
  return (
    <div>
      <div className="hero___container">
        <div className="hero___wrapper">
          <img
            src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/01/Top-10-Ranking-About-Us-Pages.png"
            alt=""
            className="hero___background___image"
          />
          <h1 className="hero___title">
            A Place for People <br />
            and Their Ideas
          </h1>

          <h3 className="hero___subtitle">
            Media Group strives to provide an elevated employee experience with
            a wide range of benefits. On top of excellent health and wellbeing
            benefits, we are always working to offer innovative programs and
            perks across our global workforce.
          </h3>

          <hr className="hero___divider" />
        </div>
      </div>

      <div className="core___container">
        <div className="core___wrapper">
          <h3 className="core___title">Diversity, Equity and Inclusion</h3>

          <h3 className="core___subtitle">Core Behaviors</h3>
          <h4>
            How we create is intrinsically linked to the values we uphold. These
            core behaviors influence everything we do. Consider this a guide to
            how we treat ourselves, and each other, as we create work that
            pushes the world forward for our audience.
          </h4>
        </div>
        <hr className="core___divider" />
      </div>

      <div className="connect___conainer">
        <div className="connect___wrapper">
          <h1>Let's Connect</h1>
          <Link to="/contact">
            <h3 className="contact___us">Contact us</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
