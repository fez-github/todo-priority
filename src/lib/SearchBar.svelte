<!--Range input that has descriptive tesk for each value of the range.-->
<script lang="ts">
  export let label: string = "Label";
  export let title: string = "Tooltip";
  export let placeholder: string = "Placeholder";
  export let submitValue: (str: string) => void;

  function onChange(e: Event) {
    let searchTerm = (e.target as HTMLInputElement).value;
    submitValue(searchTerm);
  }
</script>

<label
  >{label}
  <input
    type="text"
    {title}
    {placeholder}
    on:input={(e) => onChange(e)}
    on:submit|preventDefault
  />
</label>
