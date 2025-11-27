<script lang="ts">
    import { t } from "../stores/i18n";
    import content from "../data/content.json";
    import Modal from "./Modal.svelte";

    let showModal = false;
    let selectedImage: { src: string; alt: string } | null = null;

    function openImage(image: { src: string; alt: string }) {
        selectedImage = image;
        showModal = true;
    }

    function closeImage() {
        showModal = false;
        selectedImage = null;
    }
</script>

<section id="gallery" class="section gallery-section">
    <div class="container">
        <h2>{$t.sections.gallery}</h2>
        <div class="gallery-grid">
            {#each content.gallery as image}
                <div
                    class="gallery-item"
                    on:click={() => openImage(image)}
                    on:keydown={(e) => e.key === "Enter" && openImage(image)}
                    role="button"
                    tabindex="0"
                >
                    <img
                        src={image.src}
                        alt={image.alt || "Praise No One"}
                        loading="lazy"
                    />
                </div>
            {/each}
        </div>
    </div>
</section>

<Modal
    show={showModal}
    on:close={closeImage}
    transparent={true}
    adaptive={true}
>
    {#if selectedImage}
        <div class="image-container">
            <img
                src={selectedImage.src}
                alt={selectedImage.alt
                    ? `${selectedImage.alt} Full Size`
                    : "Praise No One Full Size"}
            />
        </div>
    {/if}
</Modal>

<style>
    .gallery-section {
        background-color: var(--color-surface);
        text-align: center;
    }

    h2 {
        margin-bottom: 3rem;
        font-size: 2rem;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .gallery-item {
        overflow: hidden;
        border-radius: 4px;
        height: 300px;
        position: relative;
        cursor: pointer;

        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        &:hover img {
            transform: scale(1.1);
        }
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;

        & img {
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            border-radius: 4px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        }
    }

    @media (min-width: 768px) {
        h2 {
            font-size: 2.5rem;
        }
    }
</style>
