<script lang="ts">
    import { t, currentLang } from "../stores/i18n";
    import content from "../data/content.json";
    const instagramUrl =
        content.socials.find((s) => s.name === "Instagram")?.url || "#";

    const formatDate = (dateString: string, lang: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        if (lang === "es") {
            const monthName = new Intl.DateTimeFormat("es", {
                month: "long",
            }).format(date);
            const capitalizedMonth =
                monthName.charAt(0).toUpperCase() + monthName.slice(1);
            return `${capitalizedMonth} ${day}, ${year}`;
        }

        return new Intl.DateTimeFormat(lang, {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };
</script>

<section id="tour" class="section show-section">
    <div class="container">
        <h2>{$t.sections.tour}</h2>
        <div class="show-list">
            {#if content.tourDates && content.tourDates.length > 0}
                {#each content.tourDates as show}
                    <div class="show-item">
                        <div class="show-date">
                            {formatDate(show.date, $currentLang)}
                        </div>
                        <div class="show-event">{show.event}</div>
                        <div class="show-location">
                            {#if show.mapLink}
                                <a
                                    href={show.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="location-link"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="pin-icon"
                                        ><path
                                            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                        ></path><circle cx="12" cy="10" r="3"
                                        ></circle></svg
                                    >
                                    {show.location}
                                </a>
                            {:else}
                                {show.location}
                            {/if}
                        </div>
                        <div class="show-action">
                            {#if show.ticketLink && show.ticketLink !== "#" && show.ticketLink !== ""}
                                <a
                                    href={show.ticketLink}
                                    class="btn btn-sm"
                                    target="_blank">{$t.actions.tickets}</a
                                >
                            {:else}
                                <button class="btn btn-sm disabled" disabled
                                    >{$t.actions.tickets}</button
                                >
                            {/if}
                        </div>
                    </div>
                {/each}
            {:else}
                <div class="no-events">
                    <p class="message">{$t.messages.noTourDates}</p>
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="instagram-link"
                    >
                        {$t.messages.followInstagram}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon"
                            ><rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                            ></rect><path
                                d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                            ></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"
                            ></line></svg
                        >
                    </a>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .show-section {
        background-color: var(--color-bg);
        text-align: center;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.9),
                rgba(0, 0, 0, 0.9)
            ),
            url("/assets/10.jpg");
        background-size: cover;
        background-attachment: fixed;
    }

    h2 {
        margin-bottom: 3rem;
        font-size: 2.5rem;
    }

    .show-list {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1px;
        background: var(--color-primary); /* Border color */
        border: 1px solid var(--color-primary);
    }

    .show-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        padding: 20px;
        background: var(--color-surface);
        transition: background 0.3s ease;
        flex-wrap: wrap;
        gap: 15px;

        &:hover {
            background: #2a2a2a;
        }
    }

    .show-date {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        color: var(--color-primary);
        text-align: left;
        min-width: 150px;
        width: 100%;
    }

    .show-event {
        text-align: left;
        font-weight: 600;
        min-width: 200px;
        width: 100%;
    }

    .show-location {
        text-align: left;
        color: #aaa;
        min-width: 150px;
        width: 100%;
    }

    .location-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: #aaa;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: var(--color-primary);
        }
    }

    .pin-icon {
        color: var(--color-primary);
    }

    .show-action {
        flex: 0 0 auto;
        width: 100%;

        & .btn {
            display: block;
            text-align: center;
            width: 100%;
        }
    }

    .btn-sm {
        padding: 8px 20px;
        font-size: 1rem;
    }

    .btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
        background-color: #555; /* Optional: darker background to indicate disabled */
        color: #aaa;
        border-color: #555;
    }

    .no-events {
        padding: 4rem 2rem;
        background: var(--color-surface);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .message {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        color: var(--color-text);
        opacity: 0.8;
    }

    .instagram-link {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: var(--color-primary);
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding-bottom: 5px;
        border-bottom: 1px solid transparent;
        transition: all 0.3s ease;

        &:hover {
            border-bottom-color: var(--color-primary);
            transform: translateY(-2px);

            & .icon {
                transform: rotate(15deg);
            }
        }
    }

    .icon {
        transition: transform 0.3s ease;
    }

    @media (min-width: 768px) {
        .show-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .show-date {
            flex: 1;
            width: auto;
        }

        .show-event {
            flex: 2;
            width: auto;
        }

        .show-location {
            flex: 1;
            width: auto;
        }

        .show-action {
            width: auto;

            & .btn {
                display: inline-block;
                width: unset;
            }
        }
    }
</style>
