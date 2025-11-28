<script lang="ts">
  import { onMount } from "svelte";
  import { t } from "../stores/i18n";
  import content from "../data/content.json";

  let videoLoaded = false;

  onMount(() => {
    const video = document.querySelector("video");
    if (video) {
      video.addEventListener("loadeddata", () => {
        videoLoaded = true;
      });
    }
  });
</script>

<section id="home" class="hero">
  <div class="background-container">
    <div class="fallback-image"></div>
    <video
      autoplay
      muted
      loop
      playsinline
      class:visible={videoLoaded}
      poster="assets/10.jpg"
    >
      <source src="assets/PNO LOOP 2.mp4" type="video/mp4" />
    </video>
    <div class="overlay"></div>
  </div>

  <div class="content">
    <img
      src="assets/Praise No One (Logo).png"
      alt="Praise No One"
      class="hero-logo"
    />
    <h1>{content.hero.title}</h1>
    <div class="cta-group">
      <a href="#music" class="btn btn-primary">{$t.actions.listenNow}</a>
      <a href="#tour" class="btn">{$t.actions.upcoming}</a>
    </div>
  </div>
</section>

<style>
  .hero {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .fallback-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("assets/10.jpg");
    background-size: cover;
    background-position: center;
  }

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease;

    &.visible {
      opacity: 1;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  .content {
    z-index: 1;
    text-align: center;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    & .hero-logo {
      max-width: 300px;
      width: 90%;
      filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.8));
    }

    & h1 {
      font-size: 1.5rem;
      color: var(--color-text);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    & .cta-group {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;

      & .btn {
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) {
    .content {
      & .hero-logo {
        max-width: 600px;
      }

      & h1 {
        font-size: 2rem;
      }

      & .cta-group {
        & .btn {
          width: unset;
        }
      }
    }
  }
</style>
