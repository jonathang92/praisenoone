<script lang="ts">
    import { t } from "../stores/i18n";
</script>

<section id="music" class="section music-section">
    <div class="container">
        <h2>{$t.sections.music}</h2>
        <div class="spotify-embed">
            <iframe
                style="border-radius:12px"
                src="https://open.spotify.com/embed/playlist/6bdqeVzWjl3tJHeKe38cGr?utm_source=generator&theme=0"
                width="100%"
                height="450"
                frameBorder="0"
                allowfullscreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Praise No One Spotify Player"
            ></iframe>
        </div>
    </div>
</section>

<style>
    .music-section {
        background-color: var(--color-bg);
        text-align: center;
    }

    h2 {
        margin-bottom: 3rem;
        font-size: 2.5rem;
    }

    .spotify-embed {
        max-width: 800px;
        margin: 0 auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
</style>
