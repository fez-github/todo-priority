<script lang="ts">
  export let labelText: string;
  export let valueText: string;
  export let name: string;
  export let title: string;
  export let min: number;
  export let max: number;
  export let value: number;
</script>

<div class="w-1/2">
  <div class="flex flex-row justify-between">
    <label for={name}>{labelText}:</label>
    <span>{valueText}</span>
  </div>
  <input
    class="block w-full"
    type="range"
    id={name}
    {min}
    {title}
    {max}
    bind:value
  />
</div>
