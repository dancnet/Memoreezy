<script>
    import { options, sections, hash, current, questions, cards_random_pile } from '$lib/store'

    const move = (card_id) => {
        hash.set({
            type: 'card',
            id: card_id
        });
        show_menu = false;
    }

    const toggle_question = () => {
        if($hash.type === 'question') hash.set({
            type: 'card',
            id: 0
        });
        else if ($hash.type === 'card') hash.set({
            type: 'question',
            id: 0
        });
    }

    const random = () => {
        hash.set({
            type: 'card',
            id: +cards_random_pile
        });
    }

    let show_menu = false;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
</script>

<div class="w3-bar w3-border-bottom">
    {#if $sections.length > 0}
    {#if isIOS}
    <div class="w3-dropdown-click w3-light-grey">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="w3-button w3-text-cyan" on:click={() => show_menu = !show_menu}>
            <i class="fa-regular fa-folder-open"></i>
        </button>
        <div class="w3-dropdown-content w3-bar-block w3-border winky-sans" class:w3-show={show_menu}>
            {#each $sections as section}
            <button class="w3-bar-item w3-button w3-text-cyan" on:click={() => move(section['card_id'])}>{section['name']}</button>
            {/each}
        </div>
    </div>
    {:else}
    <div class="w3-dropdown-hover w3-light-grey">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="w3-button w3-text-cyan">
            <i class="fa-regular fa-folder-open"></i>
        </button>
        <div class="w3-dropdown-content w3-bar-block w3-border winky-sans">
            {#each $sections as section}
            <button class="w3-bar-item w3-button w3-text-cyan" on:click={() => move(section['card_id'])}>{section['name']}</button>
            {/each}
        </div>
    </div>
    {/if}
    {/if}
    {#if $options['random'] === true}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="w3-button w3-text-cyan" on:click={random}>
        <i class="fa-solid fa-shuffle"></i>
    </button>
    {/if}
    {#if $questions.length > 0}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="w3-button w3-text-cyan" on:click={toggle_question}>
        {#if $hash.type === 'card'}
        <i class="fa-regular fa-circle-question"></i>
        {:else if $hash.type === 'question'}
        <i class="fa-regular fa-file-lines"></i>
        {/if}
    </button>
    {/if}
    <div class="w3-bar-item w3-text-cyan winky-sans">
        {$hash.id + 1}/{$current.length}
    </div>
</div>

<style>
.w3-bar {
    display: flex;
    justify-content:space-between;
}
</style>