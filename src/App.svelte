<script lang="ts">
  import Navbar from "./lib/components/Navbar.svelte";
  import Hero from "./lib/components/Hero.svelte";
  import Bio from "./lib/components/Bio.svelte";
  import Music from "./lib/components/Music.svelte";
  import Videos from "./lib/components/Videos.svelte";
  import Gallery from "./lib/components/Gallery.svelte";
  import TourDates from "./lib/components/TourDates.svelte";
  import Footer from "./lib/components/Footer.svelte";
  import Modal from "./lib/components/Modal.svelte";
  import { isContactModalOpen, closeContactModal } from "./lib/stores/ui";
  import content from "./lib/data/content.json";
</script>

<main>
  <Navbar />
  <Hero />
  <Bio />
  <Music />
  <Videos />
  <Gallery />
  <TourDates />
  <Footer />
</main>

<Modal show={$isContactModalOpen} on:close={closeContactModal}>
  <div class="contact-modal">
    <h2>Contact Us</h2>
    <p>For booking and inquiries:</p>
    <a href="mailto:{content.contact.email}" class="email-link"
      >{content.contact.email}</a
    >
  </div>
</Modal>

<style>
  /* Global styles are in app.css */
  .contact-modal {
    text-align: center;
    color: var(--color-text);
  }

  .contact-modal h2 {
    margin-bottom: 1rem;
    color: var(--color-primary);
  }

  .contact-modal p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .email-link {
    font-size: 1.5rem;
    color: var(--color-accent);
    text-decoration: underline;
    transition: color 0.3s;
  }

  .email-link:hover {
    color: var(--color-primary);
  }
</style>
