<script lang="ts">
    import { t } from "../stores/i18n";
    import content from "../data/content.json";
    import Modal from "./Modal.svelte";

    let showModal = false;
    let currentVideoId = "";

    function openVideo(id: string) {
        currentVideoId = id;
        showModal = true;
    }

    function closeVideo() {
        showModal = false;
        currentVideoId = "";
    }
</script>

<section id="videos" class="section video-section">
    <div class="container">
        <h2>{$t.sections.videos}</h2>
        <div class="video-grid">
            {#each content.videos as video}
                <div
                    class="video-item"
                    on:click={() => openVideo(video.id)}
                    on:keydown={(e) => e.key === "Enter" && openVideo(video.id)}
                    role="button"
                    tabindex="0"
                >
                    <div class="thumbnail-wrapper">
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                        />
                        <div class="play-overlay">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"><path d="M8 5v14l11-7z" /></svg
                            >
                        </div>
                    </div>
                    <h3>{video.title}</h3>
                </div>
            {/each}
        </div>
    </div>
</section>

<Modal show={showModal} on:close={closeVideo} adaptive={true} transparent={true}>
    {#if currentVideoId}
        <div class="video-container">
            <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    {/if}
</Modal>

<style>
    .video-section {
        background-color: var(--color-bg, #000);
        text-align: center;
        padding: 4rem 0;
    }

    h2 {
        margin-bottom: 3rem;
        font-size: 2.5rem;
        font-family: var(--font-heading, sans-serif);
    }

    .video-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .video-item {
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .video-item:hover {
        transform: translateY(-5px);
    }

    .thumbnail-wrapper {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 16/9;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .thumbnail-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .video-item:hover img {
        transform: scale(1.05);
    }

    .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .video-item:hover .play-overlay {
        opacity: 1;
    }

    .play-overlay svg {
        color: #fff;
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
        width: 64px;
        height: 64px;
    }

    h3 {
        margin-top: 1rem;
        font-size: 1.2rem;
        color: var(--color-text, #fff);
    }

    .video-container {
        width: 80vw;
        max-width: 1000px;
        aspect-ratio: 16/9;
    }

    iframe {
        width: 100%;
        height: 100%;
    }
</style>
