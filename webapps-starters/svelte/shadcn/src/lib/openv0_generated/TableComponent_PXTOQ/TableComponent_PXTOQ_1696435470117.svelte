<script>
import { Button } from '$lib/components/ui/button';
import * as Table from '$lib/components/ui/table';
</script>
   <section class="dark:bg-black dark:text-white">
     <h1 class="text-2xl font-bold">Shared Components</h1>
     <p class="text-sm mb-5">Components you have shared on openv0</p>
     <Table.Root>
       <Table.Caption class="dark:text-white">Component Table</Table.Caption>
       <Table.Header>
         <Table.Row>
           <Table.Head class="w-1/4 dark:bg-black dark:text-white">Name</Table.Head>
           <Table.Head class="w-1/4 dark:bg-black dark:text-white">Stack</Table.Head>
           <Table.Head class="w-1/4 dark:bg-black dark:text-white">Versions</Table.Head>
           <Table.Head class="w-1/4 dark:bg-black dark:text-white">Add Component Command</Table.Head>
         </Table.Row>
       </Table.Header>
       <Table.Body>
         <Table.Row>
           <Table.Cell class="dark:text-white">HelloWorld_MK99</Table.Cell>
           <Table.Cell class="dark:text-white">React</Table.Cell>
           <Table.Cell class="dark:text-white">3</Table.Cell>
           <Table.Cell>
             <Button variant="outline" class="dark:text-white dark:border-white">
               npx add HelloWorld_MK99
             </Button>
           </Table.Cell>
         </Table.Row>
       </Table.Body>
     </Table.Root>
   </section>