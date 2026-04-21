import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      {/* Ambient background blobs matching app theme */}
      <div className="notfound-bg">
        <div className="notfound-blob notfound-blob--emerald" />
        <div className="notfound-blob notfound-blob--zinc" />
      </div>

      <div className="notfound-content">
        <div className="main_wrapper">
          {/* TV */}
          <div className="main">
            <div className="antenna">
              <div className="antenna_shadow"></div>
              <div className="a1"></div>
              <div className="a1d"></div>
              <div className="a2"></div>
              <div className="a2d"></div>
              <div className="a_base"></div>
            </div>

            <div className="tv">
              <div className="cruve">
                <svg
                  className="curve_svg"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 189.929 189.929"
                  xmlSpace="preserve"
                >
                  <path d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13 C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z" />
                </svg>
              </div>

              <div className="display_div">
                <div className="screen_out">
                  <div className="screen_out1">
                    {/* Static noise screen (desktop) */}
                    <div className="screen">
                      <span className="notfound_text">NOT FOUND</span>
                    </div>
                    {/* Color bars screen (mobile) */}
                    <div className="screenM">
                      <span className="notfound_text">NOT FOUND</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lines">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>

              <div className="buttons_div">
                <div className="b1"><div></div></div>
                <div className="b2"></div>
                <div className="speakers">
                  <div className="g1">
                    <div className="g11"></div>
                    <div className="g12"></div>
                    <div className="g13"></div>
                  </div>
                  <div className="g"></div>
                  <div className="g"></div>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="base1"></div>
              <div className="base2"></div>
              <div className="base3"></div>
            </div>
          </div>

          {/* Big "404" text behind */}
          <div className="text_404">
            <div className="text_4041">4</div>
            <div className="text_4042">0</div>
            <div className="text_4043">4</div>
          </div>
        </div>

        {/* Message + CTA */}
        <div className="notfound-message">
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-sub">
            Looks like you've wandered into static. The page you're looking for doesn't exist.
          </p>
          <div className="notfound-actions">
            <button
              id="notfound-home-btn"
              className="notfound-btn notfound-btn--primary"
              onClick={() => navigate('/')}
            >
              Go Back Home
            </button>
            <button
              id="notfound-back-btn"
              className="notfound-btn notfound-btn--secondary"
              onClick={() => navigate(-1)}
            >
              ← Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
