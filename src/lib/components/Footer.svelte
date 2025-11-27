<script lang="ts">
  import { t } from "../stores/i18n";
  import content from "../data/content.json";
</script>

<footer id="contact-footer">
  <div class="container footer-content">
    <div class="social-links">
      {#each content.socials as social}
        <a
          href={social.url}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {@html social.icon}
        </a>
      {/each}
    </div>

    <div class="producer-logo">
      <a href={content.producer.url} target="_blank" rel="noopener noreferrer">
        <img src={content.producer.logo} alt="Fidedignin Producciones" />
      </a>
    </div>

    <p class="copyright">
      &copy; {new Date().getFullYear()} Praise No One. {$t.footer.rights}
    </p>
  </div>
</footer>

<style>
  footer {
    background-color: #000;
    padding: 40px 0;
    text-align: center;
    border-top: 1px solid var(--color-surface);
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;

    & a {
      color: var(--color-text);
      transition:
        color 0.3s ease,
        transform 0.3s ease;

      &:hover {
        color: var(--color-primary);
        transform: translateY(-3px);
      }
    }
  }

  .producer-logo {
    /* margin-bottom: 20px; */

    & img {
      height: 40px; /* Adjust size as needed */
      width: auto;
      filter: grayscale(100%) brightness(200%); /* Make it fit the dark theme if needed, or remove filter */
      opacity: 0.8;
      transition: all 0.3s ease;

      &:hover {
        filter: none;
        opacity: 1;
      }
    }
  }

  .copyright {
    color: #666;
    font-size: 0.9rem;
  }
</style>
