<script lang="ts">
    import { onMount } from "svelte";
    import { t, currentLang } from "../stores/i18n";
    import { openContactModal } from "../stores/ui";

    let isScrolled = false;
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    const closeMenu = () => {
        isMenuOpen = false;
    };

    const handleScroll = () => {
        isScrolled = window.scrollY > 50;
    };

    const handleLinkClick = (e: MouseEvent, href: string) => {
        e.preventDefault();
        closeMenu();

        if (href === "#contact") {
            openContactModal();
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
</script>

<nav class:scrolled={isScrolled}>
    <div class="container nav-content">
        <a
            href="#home"
            class="logo"
            on:click={(e) => handleLinkClick(e, "#home")}
        >
            <img src="assets/mainlogo.PNG" alt="Praise No One Logo" />
        </a>

        <div
            class="nav-overlay"
            class:active={isMenuOpen}
            on:click={closeMenu}
            on:keydown={(e) => e.key === "Escape" && closeMenu()}
            role="button"
            tabindex="0"
            aria-label="Close Menu"
        ></div>

        <ul class="nav-links" class:active={isMenuOpen}>
            <li>
                <a href="#home" on:click={(e) => handleLinkClick(e, "#home")}
                    >{$t.nav.home}</a
                >
            </li>
            <li>
                <a href="#bio" on:click={(e) => handleLinkClick(e, "#bio")}
                    >{$t.nav.bio}</a
                >
            </li>
            <li>
                <a href="#music" on:click={(e) => handleLinkClick(e, "#music")}
                    >{$t.nav.music}</a
                >
            </li>
            <li>
                <a
                    href="#videos"
                    on:click={(e) => handleLinkClick(e, "#videos")}
                    >{$t.sections.videos}</a
                >
            </li>
            <li>
                <a
                    href="#gallery"
                    on:click={(e) => handleLinkClick(e, "#gallery")}
                    >{$t.nav.gallery}</a
                >
            </li>
            <li>
                <a href="#tour" on:click={(e) => handleLinkClick(e, "#tour")}
                    >{$t.nav.tour}</a
                >
            </li>
            <li>
                <a
                    href="#contact"
                    on:click={(e) => handleLinkClick(e, "#contact")}
                    >{$t.nav.contact}</a
                >
            </li>
        </ul>

        <div class="nav-actions">
            <button class="lang-toggle" on:click={() => currentLang.toggle()}>
                {$currentLang.toUpperCase()}
            </button>

            <button
                class="menu-toggle"
                on:click={toggleMenu}
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
            >
                <span class="bar" class:active={isMenuOpen}></span>
                <span class="bar" class:active={isMenuOpen}></span>
                <span class="bar" class:active={isMenuOpen}></span>
            </button>
        </div>
    </div>
</nav>

<style>
    nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        padding: 20px 0;
        transition: all 0.3s ease;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);

        &.scrolled {
            background: rgba(10, 10, 10, 0.95);
            padding: 10px 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
    }

    .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        height: 65px;

        & img {
            height: 65px;
            width: auto;
            filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
        }
    }

    .nav-actions {
        display: flex;
        align-items: center;
        gap: 20px;

        & .lang-toggle {
            background: none;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
            padding: 5px 10px;
            font-size: 0.9rem;
            font-weight: 700;
            border-radius: 4px;
            transition: all 0.3s ease;
            width: 40px;

            &:hover {
                background: var(--color-primary);
                color: var(--color-bg);
            }
        }

        & .menu-toggle {
            display: flex;
            background: none;
            border: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            z-index: 1002;

            & .bar {
                width: 25px;
                height: 3px;
                background-color: var(--color-text);
                transition: 0.3s;

                &.active:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 6px);
                }

                &.active:nth-child(2) {
                    opacity: 0;
                }

                &.active:nth-child(3) {
                    transform: rotate(-45deg) translate(5px, -6px);
                }
            }
        }
    }

    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;
        width: 70%;
        background: var(--color-surface);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.3s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
        z-index: 1001;
        list-style: none;
        gap: 30px;

        &.active {
            right: 0;
        }

        & a {
            font-family: var(--font-heading);
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            cursor: pointer;

            &::after {
                content: "";
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--color-primary);
                transition: width 0.3s ease;
            }

            &:hover::after {
                width: 100%;
            }
        }
    }

    .nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 0.3s ease,
            visibility 0.3s ease;
        z-index: 1000;

        &.active {
            opacity: 1;
            visibility: visible;
        }
    }

    @media (min-width: 1024px) {
        .nav-actions {
            & .menu-toggle {
                display: none;
            }
        }

        .nav-links {
            position: static;
            height: auto;
            width: auto;
            background: none;
            flex-direction: row;
            box-shadow: none;
            justify-content: flex-end;
        }
    }
</style>
