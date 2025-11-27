<script lang="ts">
    import { t, currentLang } from "../stores/i18n";
    import content from "../data/content.json";
    import Modal from "./Modal.svelte";

    let showModal = false;

    const toggleModal = () => {
        showModal = !showModal;
    };
</script>

<section id="bio" class="section bio-section">
    <div class="container">
        <h2>{$t.sections.bio}</h2>
        <div class="bio-preview">
            <p>{content.bio[$currentLang].preview}</p>
            <button class="btn" on:click={toggleModal}
                >{$t.actions.readMore}</button
            >
        </div>
    </div>

    <Modal show={showModal} on:close={toggleModal}>
        <h3>{$t.sections.bio}</h3>
        <div class="modal-body">
            {#each content.bio[$currentLang].full as paragraph}
                <p>{@html paragraph}</p>
            {/each}
        </div>
    </Modal>
</section>

<style>
    .bio-section {
        background-color: var(--color-surface);
        text-align: center;
    }

    h2 {
        margin-bottom: 2rem;
        font-size: 2.5rem;
    }

    .bio-preview p {
        max-width: 800px;
        margin: 0 auto 2rem;
        font-size: 1.2rem;
        color: #ccc;
    }

    .modal-body {
        max-height: 60vh;
        overflow-y: auto;
        padding-right: 10px; /* Space for scrollbar */
    }

    .modal-body p {
        margin-bottom: 1.5rem;
        text-align: left;
        line-height: 1.8;
    }

    h3 {
        margin-bottom: 20px;
        color: var(--color-primary);
        border-bottom: 1px solid var(--color-surface);
        padding-bottom: 10px;
        margin-top: 0;
    }
</style>
