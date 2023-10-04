<script>
  let color = 'text-gray-900'
  let fontSize = 'text-base'
  let fontFamily = 'font-sans'
</script>
   <style>
     :root {
       --s-p-font-color: 'var(--color, text-gray-900)';
       --s-p-font-size:  'var(--fontSize, text-base)';
       --s-p-font-family: 'var(--fontFamily, font-sans)';
     }
     p {
       @apply bg-black text-white;
     }
   </style>
   <p class="m-2 dark:bg-black dark:text-white {$color} {$fontSize} {$fontFamily}">
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   </p>