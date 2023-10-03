<script>
  let count = 0;
  function increment() {
    count += 1;
  }
</script>
<main>
  <h1>SUPER MARIO</h1>
  <p>Count: {count}</p>
  <button on:click={increment}>Increment</button>
</main>
