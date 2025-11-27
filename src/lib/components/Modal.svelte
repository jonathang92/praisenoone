<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import { fade, scale } from "svelte/transition";

    export let show = false;
    export let transparent = false;
    export let adaptive = false;

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && show) {
            close();
        }
    }

    // Prevent scrolling when modal is open
    $: if (typeof document !== "undefined") {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if show}
    <div
        class="modal-backdrop"
        on:click={close}
        on:keydown={(e) => e.key === "Escape" && close()}
        role="button"
        tabindex="0"
        transition:fade={{ duration: 200 }}
    >
        <div
            class="modal-content"
            class:transparent
            class:adaptive
            on:click|stopPropagation
            on:keydown={() => {}}
            role="document"
            tabindex="-1"
            transition:scale={{ duration: 200, start: 0.95 }}
        >
            <button class="close-btn" on:click={close} aria-label="Close modal">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><line x1="18" y1="6" x2="6" y2="18"></line><line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                    ></line></svg
                >
            </button>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    }

    .modal-content {
        background: var(--color-bg);
        padding: 40px;
        border-radius: 4px;
        position: relative;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        border: 1px solid var(--color-primary);
    }

    .modal-content.adaptive {
        max-width: 95vw;
        width: auto;
        display: inline-block;
    }

    .modal-content.transparent {
        background: transparent;
        padding: 0;
        border: none;
        box-shadow: none;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible; /* Allow close button to be outside if needed, or just visible */
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: var(--color-text, #fff);
        cursor: pointer;
        padding: 0;
        transition: transform 0.2s;
        z-index: 10;
        background: rgba(
            0,
            0,
            0,
            0.5
        ); /* Semi-transparent background for visibility */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close-btn:hover {
        transform: scale(1.1);
        color: var(--color-primary, #ff3e00);
        background: rgba(0, 0, 0, 0.8);
    }
</style>
