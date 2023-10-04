<script>
import { Button } from '$lib/components/ui/button';
import * as Table from '$lib/components/ui/table';
</script>
   <Table.Root>
     <Table.Caption class="dark:text-white">Component Table</Table.Caption>
     <Table.Header>
       <Table.Row>
         <Table.Head class="w-1/4 dark:bg-gray-900 dark:text-white">Name</Table.Head>
         <Table.Head class="w-1/4 dark:bg-gray-900 dark:text-white">Stack</Table.Head>
         <Table.Head class="w-1/4 dark:bg-gray-900 dark:text-white">Versions</Table.Head>
         <Table.Head class="w-1/4 dark:bg-gray-900 dark:text-white">Add Component Command</Table.Head>
       </Table.Row>
     </Table.Header>
     <Table.Body>
       <Table.Row>
         <Table.Cell class="dark:text-white">HelloWorld_MK99</Table.Cell>
         <Table.Cell class="dark:text-white">React</Table.Cell>
         <Table.Cell class="dark:text-white">3</Table.Cell>
         <Table.Cell>
           <Button variant="outline">
             npx add HelloWorld_MK99
           </Button>
         </Table.Cell>
       </Table.Row>
     </Table.Body>
   </Table.Root>