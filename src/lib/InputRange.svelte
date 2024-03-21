<script lang="ts">
    export let labelText: string;
    export let valueText: string;
    export let name: string;
    export let title: string;
    export let min: number;
    export let max: number;
    export let value: number;
</script>


<div>
    <div class="flex flex-row justify-between">
    <label for={name}>{labelText}:</label>
    <span>{valueText}</span>
  </div>
    <input
      class="block"
      type="range"
      id={name}
      min={min}
      title="{title}"
      max={max}
      bind:value={value}
    />
  </div>