<script>
    import { hash, current, questions_random_pile } from '$lib/store';
    
    const next = () => {
        if ($hash.type === 'card') {
            hash.set({
                type: 'card',
                id: $hash.id + 1
            });
        } else if ($hash.type === 'question') {
            hash.set({
                type: 'question',
                id: +questions_random_pile
            });
        }
        
    };

    const previous = () => {
        hash.set({
            type: $hash.type,
            id: $hash.id - 1
        });
    }

    let type, url, text, showing_answer;
    
    current.subscribe(value => {
        ({type, url, text} = value.el ?? {});
        showing_answer = false;
    });

    const toggle = () => {
        if ($hash.type === 'question' && $current.el.answer) {
            let data
            if (showing_answer) {
                data = $current.el;
            } else {
                data = $current.el.answer;
            }
            ({type, url, text} = data);
            showing_answer = !showing_answer;
        }
    }
</script>

<div class="main-wrapper">
    {#if $hash.type === 'card'}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="w3-button w3-text-cyan w3-hover-none w3-xxlarge" on:click={previous} disabled={$hash.id === 0}>
        <i class="fa fa-caret-left"></i>
    </button>
    {:else if $hash.type === 'question'}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="w3-button w3-text-cyan w3-hover-none w3-xlarge" on:click={toggle} disabled={!$current.el?.answer}>
        {#if showing_answer}
        <i class="fa fa-circle-question"></i>
        {:else}
        <i class="fa fa-lightbulb"></i>
        {/if}
    </button>
    {/if}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="content-wrapper">
        {#if type === 'img'}
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src="{url}" class="w3-card-4">
        {:else if type === 'txt'}
        <div class="text-content w3-card playwrite-ro">
            {@html text}
        </div>
        {/if}
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button class="w3-button w3-text-cyan w3-hover-none w3-xxlarge" on:click={next} disabled={$hash.type === 'card' && $hash.id === $current.length - 1}>
        <i class="fa fa-caret-right"></i>
    </button>
</div>

<style>
img {
    max-width: calc(100vw - 102px);
    max-height: calc(100% - 25px);
    object-fit: contain
}
.text-content {
    width: calc(100vw - 102px);
    /* height: min(max(438px, auto), calc(100% - 40px)); */
    min-height: min(438px, 100vh - 40px);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    /* padding: 10px 10px 45px 10px; */
    padding: 10px 20px;
    font-size: 33px;
    color: #1E4E8C;
    background: repeating-linear-gradient(to bottom,#ffeb3b,#ffeb3b 54px,black 55px);
    background-size: 100% 55px;
    background-attachment: local;
    line-height: 55px;
}
.text-content::-webkit-scrollbar {
    display: none;
}
.main-wrapper {
    height: calc(100vh - 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}
.content-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>